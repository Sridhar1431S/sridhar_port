import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Turnstile type declarations
declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        'expired-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

// Cloudflare Turnstile Site Key (public - safe for client)
const TURNSTILE_SITE_KEY = '0x4AAAAAABfDqQWO3xMvPwz3';

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email').max(255, 'Email must be less than 255 characters'),
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  message: z.string().trim().min(1, 'Message is required').max(5000, 'Message must be less than 5000 characters'),
});

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sridhar709398@gmail.com',
    href: 'mailto:sridhar709398@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 7093987241',
    href: 'tel:+917093987241',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Chittoor, India',
    href: null,
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sridhar-reddy-a4779b258',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/Sridhar1431S/sridhar_port',
  },
];

export const Contact = () => {
  const ref = useRef(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(null);

  // Load Turnstile script and render widget
  useEffect(() => {
    // Check if script already loaded
    if (document.getElementById('turnstile-script')) {
      if (window.turnstile && turnstileRef.current && !turnstileWidgetId) {
        const widgetId = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(null),
          theme: 'dark',
        });
        setTurnstileWidgetId(widgetId);
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
    script.async = true;

    (window as any).onTurnstileLoad = () => {
      if (turnstileRef.current && window.turnstile) {
        const widgetId = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(null),
          theme: 'dark',
        });
        setTurnstileWidgetId(widgetId);
      }
    };

    document.head.appendChild(script);

    return () => {
      if (turnstileWidgetId && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId);
      }
    };
  }, [turnstileWidgetId]);

  const resetTurnstile = useCallback(() => {
    if (turnstileWidgetId && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId);
      setTurnstileToken(null);
    }
  }, [turnstileWidgetId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    
    // Check honeypot field - if filled, it's likely a bot
    const honeypot = formData.get('website') as string;
    if (honeypot) {
      // Silently reject but show success to not alert the bot
      setIsSubmitting(false);
      toast({
        title: 'Message sent!',
        description: 'Thank you for reaching out.',
      });
      return;
    }
    
    const formValues = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    // Check Turnstile token
    if (!turnstileToken) {
      setIsSubmitting(false);
      toast({
        title: 'Verification Required',
        description: 'Please complete the security verification.',
        variant: 'destructive',
      });
      return;
    }

    // Client-side validation
    const validation = contactSchema.safeParse(formValues);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      toast({
        title: 'Validation Error',
        description: 'Please check the form fields and try again.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: { ...validation.data, turnstileToken },
      });

      if (error) throw error;

      toast({
        title: 'Message sent!',
        description: 'Thank you for reaching out. I\'ll get back to you soon.',
      });
      
      (e.target as HTMLFormElement).reset();
      resetTurnstile();
    } catch (error: any) {
      toast({
        title: 'Error sending message',
        description: error.message || 'Please try again or contact me directly via email.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative section-padding bg-secondary/30">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-4 group glass-card rounded-xl p-4 hover:border-primary/50 transition-all duration-300"
                    >
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 glass-card rounded-xl p-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-card rounded-xl hover:border-primary/50 hover:text-primary transition-all duration-300"
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 lg:p-8 space-y-6">
              {/* Honeypot field - hidden from users, bots will fill it */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    maxLength={100}
                    required
                    className={`bg-background/50 ${errors.name ? 'border-destructive' : ''}`}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    maxLength={255}
                    required
                    className={`bg-background/50 ${errors.email ? 'border-destructive' : ''}`}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  maxLength={200}
                  required
                  className={`bg-background/50 ${errors.subject ? 'border-destructive' : ''}`}
                />
                {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  rows={5}
                  maxLength={5000}
                  required
                  className={`bg-background/50 resize-none ${errors.message ? 'border-destructive' : ''}`}
                />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Turnstile CAPTCHA Widget */}
              <div className="flex justify-center">
                <div ref={turnstileRef} />
              </div>

              <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting || !turnstileToken}>
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
