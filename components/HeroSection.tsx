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
      {/* Background with elegant gradient overlay */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Happy children playing together"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Subtle floating orbs */}
      <div className="absolute top-32 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-secondary/10 blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-highlight/10 blur-3xl animate-pulse-soft" />

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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/95 to-primary backdrop-blur-md rounded-full px-6 py-2.5 mb-8 shadow-elevated border border-white/20"
          >
            <Heart className="w-4 h-4 text-white" fill="currentColor" />
            <span className="text-white font-body text-sm font-semibold">
              Changing Lives Since 2005
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-2xl">
            Together, We Create{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-highlight drop-shadow-2xl">
              Hope and Impact
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base md:text-lg text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            <span className="font-bold">Serving Humanity with Care.</span>
            <br />
            We are a community-driven NGO working to uplift lives and support
            communities through compassionate, grassroots action.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a href="/donate">
              <Button
                size="lg"
                className="px-8 py-6 rounded-full font-display font-bold text-base shadow-elevated hover:shadow-elevated"
              >
                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                Donate Now
              </Button>
            </a>
            <a href="#programs">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 backdrop-blur-md text-white hover:bg-white hover:text-foreground px-8 py-6 rounded-full font-display font-bold text-base shadow-card hover:shadow-elevated"
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
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { number: "15K+", label: "Children Helped" },
              { number: "5+", label: "Programs" },
              { number: "100+", label: "Volunteers" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="font-display font-black text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/90 to-highlight drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="font-body text-sm md:text-base text-white/90 mt-2 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/25 hover:scale-110 transition-all duration-300 shadow-card"
          >
            <ArrowDown className="w-5 h-5 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
