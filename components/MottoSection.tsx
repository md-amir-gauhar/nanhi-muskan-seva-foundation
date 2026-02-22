"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useInView } from "react-intersection-observer";

const MottoSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-24 gradient-warm relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-secondary/5 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Quote marks */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center shadow-soft">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
          </motion.div>

          {/* Motto */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight"
          >
            "A child's smile is worth more than{" "}
            <span className="text-gradient-hero">all the gold</span> in the
            world"
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            We believe every child has the potential to change the world. Our
            mission is to nurture that potential through love, education, and
            opportunity.
          </motion.p>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {["Love", "Education", "Healthcare", "Equality", "Hope"].map(
              (value, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-2 bg-card rounded-full px-5 py-3 shadow-card"
                >
                  <Heart className="w-4 h-4 text-primary" fill="currentColor" />
                  <span className="font-display font-bold text-foreground">
                    {value}
                  </span>
                </motion.div>
              ),
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MottoSection;
