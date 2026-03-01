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
    <section ref={ref} className="py-16 md:py-20 bg-gradient-to-b from-background via-[#FFF5EE]/40 to-background relative overflow-hidden" id="contact">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#FA8B46]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#FA8B46]/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#FA8B46] font-body font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4" />
              Get in Touch
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mb-4">
              We'd Love to <span className="text-[#FA8B46]">Hear</span> from You
            </h2>
            <p className="font-body text-muted-foreground text-base mb-8 leading-relaxed">
              Whether you want to volunteer, donate, or simply learn more about
              our work, we're here to help. Every message brings us closer to
              making a difference.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-center gap-4 bg-white rounded-xl p-4 border border-[#FA8B46]/10 hover:border-[#FA8B46]/30 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FA8B46] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground">
                    Email us at
                  </p>
                  <a href="mailto:hello@littlehearts.org" className="font-display font-bold text-foreground hover:text-[#FA8B46] transition-colors">
                    hello@littlehearts.org
                  </a>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-center gap-4 bg-white rounded-xl p-4 border border-[#FA8B46]/10 hover:border-[#FA8B46]/30 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FA8B46] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground">
                    Call us at
                  </p>
                  <a href="tel:+919876543210" className="font-display font-bold text-foreground hover:text-[#FA8B46] transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </motion.div>
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
              className="bg-white rounded-3xl p-8 shadow-xl border border-[#FA8B46]/10 space-y-5"
            >
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-12 h-12 rounded-xl border-[#FA8B46]/20 bg-[#FFF5EE]/30 font-body focus:ring-2 focus:ring-[#FA8B46]/30 focus:border-[#FA8B46]"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-12 h-12 rounded-xl border-[#FA8B46]/20 bg-[#FFF5EE]/30 font-body focus:ring-2 focus:ring-[#FA8B46]/30 focus:border-[#FA8B46]"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                  <Input
                    type="tel"
                    placeholder="Your Phone (Optional)"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pl-12 h-12 rounded-xl border-[#FA8B46]/20 bg-[#FFF5EE]/30 font-body focus:ring-2 focus:ring-[#FA8B46]/30 focus:border-[#FA8B46]"
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground z-10" />
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="pl-12 pt-4 min-h-[140px] rounded-xl border-[#FA8B46]/20 bg-[#FFF5EE]/30 font-body resize-none focus:ring-2 focus:ring-[#FA8B46]/30 focus:border-[#FA8B46]"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FA8B46] hover:bg-[#FA8B46]/90 text-white h-12 rounded-xl font-display font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
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
