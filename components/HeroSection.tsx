"use client";

import { motion } from "framer-motion";
import { Heart, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImage from "@/assets/hero-children.jpg";
import { FloatingButterfly, FloatingFlower } from "./DecorativeSVGs";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Happy children playing together"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/80" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 left-10 w-20 h-20 rounded-full bg-primary/20 blur-xl animate-float" />
      <div className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-secondary/20 blur-xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-highlight/20 blur-xl animate-pulse-soft" />

      {/* Floating SVG decorations */}
      <FloatingButterfly
        className="top-36 right-16 hidden md:block"
        delay={0}
      />
      <FloatingButterfly
        className="bottom-32 left-12 hidden md:block"
        delay={3}
      />
      <FloatingFlower
        className="top-44 left-20 hidden md:block"
        delay={1}
        size={28}
      />
      <FloatingFlower
        className="bottom-48 right-32 hidden md:block"
        delay={2}
        size={22}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8"
          >
            <Heart className="w-4 h-4 text-primary" fill="currentColor" />
            <span className="text-primary-foreground font-body text-sm font-medium">
              Changing Lives Since 2005
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-6 leading-tight">
            Every Child Deserves a{" "}
            <span className="text-primary">Brighter</span> Tomorrow
          </h1>

          {/* Subtitle */}
          <p className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join us in our mission to provide education, healthcare, and hope to
            underprivileged children. Together, we can create a world where
            every child thrives.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="/donate-us">
              <Button className="btn-hero text-lg px-10 py-6">
                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                Donate Now
              </Button>
            </a>
            <a href="#programs">
              <Button
                variant="outline"
                className="bg-transparent border-2 border-primary-foreground/80 text-primary-foreground hover:bg-primary-foreground hover:text-foreground active:scale-[0.97] px-10 py-6 rounded-full font-display font-bold text-lg transition-all duration-200 ease-out"
              >
                Learn More
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            {[
              { number: "15K+", label: "Children Helped" },
              { number: "50+", label: "Programs" },
              { number: "100+", label: "Volunteers" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <span className="font-display font-black text-3xl md:text-4xl text-primary">
                  {stat.number}
                </span>
                <span className="block font-body text-sm text-primary-foreground/70 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-primary-foreground/30 transition-colors"
          >
            <ArrowDown className="w-5 h-5 text-primary-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
