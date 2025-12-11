import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // Max requests per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // Honeypot field
  turnstileToken?: string; // Turnstile CAPTCHA token
}

const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY");

// Verify Turnstile token
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) {
    console.error("TURNSTILE_SECRET_KEY not configured");
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
      }),
    });

    const result = await response.json();
    console.log("Turnstile verification result:", result.success);
    return result.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

// HTML escape function to prevent XSS
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Validation function
function validateInput(data: ContactEmailRequest): { valid: boolean; error?: string } {
  const { name, email, subject, message } = data;

  // Check required fields
  if (!name || !email || !subject || !message) {
    return { valid: false, error: "All fields are required" };
  }

  // Validate lengths
  if (typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
    return { valid: false, error: "Name must be between 1 and 100 characters" };
  }
  if (typeof email !== 'string' || email.length > 255) {
    return { valid: false, error: "Email must be less than 255 characters" };
  }
  if (typeof subject !== 'string' || subject.trim().length === 0 || subject.length > 200) {
    return { valid: false, error: "Subject must be between 1 and 200 characters" };
  }
  if (typeof message !== 'string' || message.trim().length === 0 || message.length > 5000) {
    return { valid: false, error: "Message must be between 1 and 5000 characters" };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  return { valid: true };
}

// Check rate limit
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-contact-email function");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client IP for rate limiting
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("x-real-ip") || 
                   "unknown";

  // Check rate limit
  const rateLimit = checkRateLimit(clientIP);
  if (!rateLimit.allowed) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: { 
          "Content-Type": "application/json", 
          "X-RateLimit-Remaining": "0",
          ...corsHeaders 
        },
      }
    );
  }

  try {
    const body: ContactEmailRequest = await req.json();
    
    // Honeypot check - if the hidden field is filled, it's likely a bot
    if (body.website && body.website.trim().length > 0) {
      console.warn(`Honeypot triggered from IP: ${clientIP}`);
      // Return success to not alert the bot, but don't send email
      return new Response(
        JSON.stringify({ success: true, message: "Message received" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Verify Turnstile CAPTCHA token
    if (!body.turnstileToken) {
      console.warn(`Missing Turnstile token from IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Security verification required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const turnstileValid = await verifyTurnstile(body.turnstileToken, clientIP);
    if (!turnstileValid) {
      console.warn(`Turnstile verification failed for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Security verification failed. Please try again." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // Server-side validation
    const validation = validateInput(body);
    if (!validation.valid) {
      console.error("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize inputs for HTML email
    const name = escapeHtml(body.name.trim());
    const email = escapeHtml(body.email.trim());
    const subject = escapeHtml(body.subject.trim());
    const message = escapeHtml(body.message.trim());
    
    console.log(`Processing contact form from: ${name}`);

    // Send notification email to the portfolio owner
    const notificationEmail = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["sridhar709398@gmail.com"],
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); padding: 40px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00d4ff; margin: 0; font-size: 28px;">New Contact Message</h1>
            <p style="color: #888; margin-top: 8px;">Someone reached out through your portfolio</p>
          </div>
          
          <div style="background: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; border: 1px solid rgba(0,212,255,0.2);">
            <div style="margin-bottom: 20px;">
              <p style="color: #00d4ff; font-size: 12px; text-transform: uppercase; margin: 0 0 4px 0;">From</p>
              <p style="color: #fff; font-size: 16px; margin: 0;">${name}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <p style="color: #00d4ff; font-size: 12px; text-transform: uppercase; margin: 0 0 4px 0;">Email</p>
              <p style="color: #fff; font-size: 16px; margin: 0;"><a href="mailto:${body.email.trim()}" style="color: #00d4ff; text-decoration: none;">${email}</a></p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <p style="color: #00d4ff; font-size: 12px; text-transform: uppercase; margin: 0 0 4px 0;">Subject</p>
              <p style="color: #fff; font-size: 16px; margin: 0;">${subject}</p>
            </div>
            
            <div>
              <p style="color: #00d4ff; font-size: 12px; text-transform: uppercase; margin: 0 0 8px 0;">Message</p>
              <p style="color: #e0e0e0; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${body.email.trim()}" style="display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%); color: #000; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Reply to ${name}</a>
          </div>
        </div>
      `,
    });

    console.log("Notification email sent:", notificationEmail);

    // Send confirmation email to the sender
    const confirmationEmail = await resend.emails.send({
      from: "Sridhar Reddy <onboarding@resend.dev>",
      to: [body.email.trim()],
      subject: "Thank you for reaching out!",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); padding: 40px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00d4ff; margin: 0; font-size: 28px;">Thank You, ${name}!</h1>
          </div>
          
          <div style="background: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; border: 1px solid rgba(0,212,255,0.2);">
            <p style="color: #e0e0e0; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
              I've received your message and appreciate you taking the time to reach out.
            </p>
            <p style="color: #e0e0e0; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
              I'll review your message and get back to you as soon as possible, typically within 24-48 hours.
            </p>
            <p style="color: #e0e0e0; font-size: 16px; line-height: 1.6; margin: 0;">
              In the meantime, feel free to connect with me on LinkedIn or check out my projects on GitHub.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://www.linkedin.com/in/sridhar-reddy-a4779b258" style="display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%); color: #000; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 0 8px;">LinkedIn</a>
            <a href="https://github.com/sridhar" style="display: inline-block; background: rgba(255,255,255,0.1); color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 0 8px; border: 1px solid rgba(255,255,255,0.2);">GitHub</a>
          </div>
          
          <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">
            Best regards,<br/>
            <span style="color: #00d4ff; font-weight: 600;">Sridhar Reddy</span><br/>
            Full-Stack Developer & AI Engineer
          </p>
        </div>
      `,
    });

    console.log("Confirmation email sent:", confirmationEmail);

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json", 
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
          ...corsHeaders 
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
