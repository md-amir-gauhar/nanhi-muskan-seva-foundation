"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  {
    src: gallery1,
    title: "Education Program",
    description: "Learning together, growing together",
  },
  {
    src: gallery2,
    title: "Nutrition Support",
    description: "Healthy meals for healthy minds",
  },
  {
    src: gallery3,
    title: "Sports Activities",
    description: "Building teamwork and confidence",
  },
  {
    src: gallery4,
    title: "Art & Creativity",
    description: "Expressing themselves through art",
  },
  {
    src: gallery5,
    title: "Healthcare Camp",
    description: "Regular health checkups for all",
  },
  {
    src: gallery6,
    title: "Environmental Care",
    description: "Teaching sustainability early",
  },
];

const ImageCarousel = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

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
            Our Programs
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mt-3 mb-4">
            Making a Difference
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Through various initiatives, we're creating lasting impact in
            children's lives.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative aspect-[16/9] rounded-4xl overflow-hidden shadow-elevated">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 ${index === currentIndex ? "z-10" : "z-0"}`}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                  quality={75}
                  priority={index === 0}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-background mb-2">
                    {image.title}
                  </h3>
                  <p className="font-body text-background/80">
                    {image.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Navigation Buttons */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 active:scale-90 transition-all duration-150"
            >
              <ChevronLeft className="w-6 h-6 text-background" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 active:scale-90 transition-all duration-150"
            >
              <ChevronRight className="w-6 h-6 text-background" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-6 overflow-x-auto pb-2 justify-center">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? "ring-4 ring-primary scale-105"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                  quality={60}
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImageCarousel;
