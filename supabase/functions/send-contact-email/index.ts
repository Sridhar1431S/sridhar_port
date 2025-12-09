import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-contact-email function");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();
    
    console.log(`Processing contact form from: ${name} (${email})`);
    console.log(`Subject: ${subject}`);

    // Validate inputs
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

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
              <p style="color: #fff; font-size: 16px; margin: 0;"><a href="mailto:${email}" style="color: #00d4ff; text-decoration: none;">${email}</a></p>
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
            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%); color: #000; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Reply to ${name}</a>
          </div>
        </div>
      `,
    });

    console.log("Notification email sent:", notificationEmail);

    // Send confirmation email to the sender
    const confirmationEmail = await resend.emails.send({
      from: "Sridhar Reddy <onboarding@resend.dev>",
      to: [email],
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
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
