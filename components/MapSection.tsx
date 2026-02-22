"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Clock, Phone } from "lucide-react";

const MapSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body font-semibold text-sm uppercase tracking-wider">
            Visit Us
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mt-3 mb-4">
            Find Our Location
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Come visit our center and see the amazing work our team does every
            day.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card-playful">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    Our Address
                  </h3>
                  <p className="font-body text-muted-foreground">
                    123 Hope Street, Sunshine District,
                    <br />
                    Mumbai 400001, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>

            <div className="card-playful">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl gradient-sky flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    Working Hours
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="card-playful">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl gradient-nature flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    Get in Touch
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Phone: +91 98765 43210
                    <br />
                    Email: hello@littlehearts.org
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 rounded-4xl overflow-hidden shadow-elevated"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60337.71692024668!2d72.81818635!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Little Hearts Foundation Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
