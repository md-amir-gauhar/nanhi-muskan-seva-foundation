"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, User, Mail, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section ref={ref} className="py-24 gradient-warm" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-body font-semibold text-sm uppercase tracking-wider">
              Get in Touch
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mt-3 mb-6">
              We'd Love to Hear from You
            </h2>
            <p className="font-body text-muted-foreground text-lg mb-8 leading-relaxed">
              Whether you want to volunteer, donate, or simply learn more about
              our work, we're here to help. Every message brings us closer to
              making a difference.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">
                    Email us at
                  </p>
                  <p className="font-display font-bold text-foreground">
                    hello@littlehearts.org
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">
                    Call us at
                  </p>
                  <p className="font-display font-bold text-foreground">
                    +91 98765 43210
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="card-playful p-8 space-y-6"
            >
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-12 h-14 rounded-2xl border-border bg-muted/50 font-body focus:ring-primary"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-12 h-14 rounded-2xl border-border bg-muted/50 font-body focus:ring-primary"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="Your Phone (Optional)"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pl-12 h-14 rounded-2xl border-border bg-muted/50 font-body focus:ring-primary"
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="pl-12 pt-4 min-h-[150px] rounded-2xl border-border bg-muted/50 font-body resize-none focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="btn-hero w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
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

export default ContactSection;
