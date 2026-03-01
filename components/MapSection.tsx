"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 bg-gradient-to-b from-background via-[#FFF5EE]/30 to-background relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#FA8B46]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FA8B46]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#FA8B46] font-body font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4" />
            Visit Us
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mb-4">
            Find Our <span className="text-[#FA8B46]">Location</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-base">
            Come visit our center and see the amazing work our team does every
            day.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl p-6 border border-[#FA8B46]/10 hover:border-[#FA8B46]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#FA8B46] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    Our Address
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    123 Hope Street, Sunshine District,
                    <br />
                    Mumbai 400001, Maharashtra, India
                  </p>
                  <Button
                    variant="link"
                    className="text-[#FA8B46] p-0 h-auto mt-2 font-semibold text-sm hover:underline"
                  >
                    Get Directions →
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#FA8B46]/10 hover:border-[#FA8B46]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#FA8B46] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    Working Hours
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#FA8B46]/10 hover:border-[#FA8B46]/30 transition-all duration-300 hover:shadow-lg group">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#FA8B46] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    Get in Touch
                  </h3>
                  <div className="space-y-1">
                    <a
                      href="tel:+919876543210"
                      className="font-body text-sm text-muted-foreground hover:text-[#FA8B46] transition-colors flex items-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      +91 98765 43210
                    </a>
                    <a
                      href="mailto:hello@littlehearts.org"
                      className="font-body text-sm text-muted-foreground hover:text-[#FA8B46] transition-colors flex items-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      hello@littlehearts.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FA8B46]/10 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60337.71692024668!2d72.81818635!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "500px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Little Hearts Foundation Location"
              className="transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
