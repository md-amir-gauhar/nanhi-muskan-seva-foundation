"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { X, Heart, Users, GraduationCap, Home } from "lucide-react";
import Image from "next/image";

const galleryImages = [
  "/images/IMG_2717.jpg",
  "/images/IMG_2719.jpg",
  "/images/IMG_2733.jpg",
  "/images/IMG_2744.jpg",
  "/images/IMG_2768.jpg",
  "/images/IMG_2785.jpg",
  "/images/IMG_2800.jpg",
  "/images/IMG_2897.jpg",
  "/images/IMG_2929.jpg",
  "/images/IMG_6335.jpg",
  "/images/IMG_6360.jpg",
  "/images/IMG_6364.jpg",
  "/images/IMG_6403.jpg",
  "/images/IMG_7006.jpg",
  "/images/IMG_0409.jpg",
  "/images/IMG_0430.jpg",
  "/images/IMG_0440.jpg",
  "/images/IMG_0451.jpg",
  "/images/IMG_0960.jpg",
  "/images/IMG_1013.jpg",
  "/images/IMG_1283.jpg",
  "/images/IMG_2715.jpg",
  "/images/IMG_2758.jpg",
  "/images/IMG_2889.jpg",
];

const Gallery = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-advance stories
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentStoryIndex(
            (current) => (current + 1) % galleryImages.length,
          );
          return 0;
        }
        return prev + 2; // Increment by 2% every 100ms (5 seconds total)
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const goToNextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % galleryImages.length);
    setProgress(0);
  };

  const goToPrevStory = () => {
    setCurrentStoryIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
    setProgress(0);
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background" id="gallery">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Mission & Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <span className="text-[#FA8B46] font-body font-semibold text-sm uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="font-display font-black text-4xl md:text-6xl text-foreground mt-3 mb-6">
                Transforming Lives,
                <br />
                <span className="text-[#FA8B46]">One Child at a Time</span>
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                We believe every child deserves a chance to dream, learn, and
                grow. Our foundation works tirelessly to provide education,
                healthcare, and support to underprivileged children.
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#FFF5EE] rounded-2xl p-6 border border-[#FA8B46]/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#FA8B46]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#FA8B46]" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-3xl text-foreground mb-1">
                  500+
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Children Supported
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-[#FFF5EE] rounded-2xl p-6 border border-[#FA8B46]/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#FA8B46]/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-[#FA8B46]" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-3xl text-foreground mb-1">
                  100+
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Students Educated
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-[#FFF5EE] rounded-2xl p-6 border border-[#FA8B46]/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#FA8B46]/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#FA8B46]" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-3xl text-foreground mb-1">
                  50+
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Healthcare Programs
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-[#FFF5EE] rounded-2xl p-6 border border-[#FA8B46]/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#FA8B46]/10 flex items-center justify-center">
                    <Home className="w-6 h-6 text-[#FA8B46]" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-3xl text-foreground mb-1">
                  25+
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Communities Reached
                </p>
              </motion.div>
            </div>

            {/* Mission Points */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-[#FA8B46] mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-body font-semibold text-foreground mb-1">
                    Quality Education
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    Providing access to quality education and learning resources
                    for every child.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-body font-semibold text-foreground mb-1">
                    Healthcare Support
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    Ensuring children receive proper medical care and
                    nutritional support.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-body font-semibold text-foreground mb-1">
                    Emotional Well-being
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    Creating safe spaces for children to grow emotionally and
                    socially.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Instagram Story Style */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[380px]">
              {/* Story Container */}
              <div className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-black">
                {/* Progress Bars */}
                <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-3">
                  {galleryImages.map((_, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-white rounded-full"
                        initial={{ width: "0%" }}
                        animate={{
                          width:
                            idx === currentStoryIndex
                              ? `${progress}%`
                              : idx < currentStoryIndex
                                ? "100%"
                                : "0%",
                        }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  ))}
                </div>

                {/* Story Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStoryIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={galleryImages[currentStoryIndex]}
                      alt={`Story ${currentStoryIndex + 1}`}
                      fill
                      sizes="400px"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Areas */}
                <div className="absolute inset-0 z-10 flex">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={goToPrevStory}
                  />
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={goToNextStory}
                  />
                </div>

                {/* Story Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <p className="text-white font-body text-sm">
                    {currentStoryIndex + 1} / {galleryImages.length}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
