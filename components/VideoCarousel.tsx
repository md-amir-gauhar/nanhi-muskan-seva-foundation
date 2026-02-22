"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

const videos = [
  {
    id: 1,
    title: "Education Program",
    description: "See how we're transforming lives through education",
    thumbnail:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "Healthcare Camp",
    description: "Our medical teams bringing care to remote villages",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    title: "Community Kitchen",
    description: "Feeding over 1000 children daily",
    thumbnail:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 4,
    title: "Sports Day",
    description: "Building confidence through physical activities",
    thumbnail:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

const VideoCarousel = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={ref} className="py-24 bg-foreground" id="programs">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body font-semibold text-sm uppercase tracking-wider">
            Our Stories
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-background mt-3 mb-4">
            Watch Our Impact
          </h2>
          <p className="font-body text-background/70 max-w-2xl mx-auto">
            Real stories from the ground. See how your support transforms lives
            every day.
          </p>
        </motion.div>

        {/* Main Video Display - Vertical/Reel Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <div className="relative aspect-[9/16] rounded-4xl overflow-hidden shadow-elevated bg-muted">
            <video
              ref={videoRef}
              src={videos[activeIndex].videoUrl}
              poster={videos[activeIndex].thumbnail}
              className="w-full h-full object-cover"
              loop
              playsInline
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/80" />

            {/* Play Button */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-elevated hover:scale-110 active:scale-95 transition-transform duration-150"
            >
              {isPlaying ? (
                <Pause
                  className="w-8 h-8 text-primary-foreground"
                  fill="currentColor"
                />
              ) : (
                <Play
                  className="w-8 h-8 text-primary-foreground ml-1"
                  fill="currentColor"
                />
              )}
            </button>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-display font-bold text-xl text-background mb-2">
                {videos[activeIndex].title}
              </h3>
              <p className="font-body text-background/80 text-sm">
                {videos[activeIndex].description}
              </p>
            </div>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              aria-label="Previous video"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 active:scale-90 transition-all duration-150"
            >
              <ChevronLeft className="w-6 h-6 text-background" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next video"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 active:scale-90 transition-all duration-150"
            >
              <ChevronRight className="w-6 h-6 text-background" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setIsPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-primary"
                    : "bg-background/30 hover:bg-background/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoCarousel;
