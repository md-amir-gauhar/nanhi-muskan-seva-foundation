"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const videos = [
  {
    id: 1,
    title: "Community Support",
    description: "Empowering communities through grassroots action",
    videoUrl: "/vids/1771482153720582.mp4",
  },
  {
    id: 2,
    title: "Making Impact",
    description: "Real change through small actions",
    videoUrl: "/vids/1771482330175695.mp4",
  },
  {
    id: 3,
    title: "Our Mission",
    description: "Serving humanity with care",
    videoUrl: "/vids/IMG_1015.MOV",
  },
  {
    id: 4,
    title: "Health & Well-being",
    description: "Supporting health initiatives in communities",
    videoUrl: "/vids/IMG_1325.MOV",
  },
  {
    id: 5,
    title: "Education Support",
    description: "Building awareness and knowledge",
    videoUrl: "/vids/IMG_1480.MOV",
  },
  {
    id: 6,
    title: "Community Care",
    description: "Working together for a better tomorrow",
    videoUrl: "/vids/IMG_1519.MOV",
  },
  {
    id: 7,
    title: "Environmental Action",
    description: "Caring for our planet and animals",
    videoUrl: "/vids/IMG_1744.MOV",
  },
];

const VideoCarousel = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(
    new Set([0, 1, 2, 3, 4, 5, 6]),
  );
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0",
          );
          const video = videoRefs.current[index];

          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            setActiveIndex(index);
            if (video) {
              video.play().catch(() => {});
              setPlayingVideos((prev) => new Set(prev).add(index));
            }
          } else {
            if (video) {
              video.pause();
              setPlayingVideos((prev) => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
              });
            }
          }
        });
      },
      { threshold: [0.7], root: scrollContainerRef.current },
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (playingVideos.has(index)) {
        video.pause();
        setPlayingVideos((prev) => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      } else {
        video.play().catch(() => {});
        setPlayingVideos((prev) => new Set(prev).add(index));
      }
    }
  };

  const toggleMute = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = !video.muted;
      setMutedVideos((prev) => {
        const newSet = new Set(prev);
        if (video.muted) {
          newSet.add(index);
        } else {
          newSet.delete(index);
        }
        return newSet;
      });
    }
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-linear-to-b from-white to-[#FFF5EE]"
      id="programs"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#FA8B46] font-body font-semibold text-sm uppercase tracking-wider">
            Our Stories
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mt-3 mb-4">
            Watch Our Impact
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Real stories from the ground. See how your support transforms lives
            every day.
          </p>
        </motion.div>

        {/* Horizontal Scrolling Reels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {videos.map((video, index) => (
              <div
                key={video.id}
                data-index={index}
                className="shrink-0 w-70 md:w-80 snap-center"
              >
                <div className="relative aspect-9/16 rounded-2xl overflow-hidden shadow-lg bg-black group">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={video.videoUrl}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    muted
                    preload="metadata"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70 pointer-events-none" />

                  {/* Play/Pause Button */}
                  <button
                    onClick={() => togglePlay(index)}
                    aria-label={
                      playingVideos.has(index) ? "Pause video" : "Play video"
                    }
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-all duration-300 ${
                      playingVideos.has(index)
                        ? "opacity-0 group-hover:opacity-100"
                        : "opacity-100"
                    } hover:scale-110 active:scale-95`}
                  >
                    {playingVideos.has(index) ? (
                      <Pause
                        className="w-7 h-7 text-[#FA8B46]"
                        fill="currentColor"
                      />
                    ) : (
                      <Play
                        className="w-7 h-7 text-[#FA8B46] ml-1"
                        fill="currentColor"
                      />
                    )}
                  </button>

                  {/* Mute/Unmute Button */}
                  <button
                    onClick={() => toggleMute(index)}
                    aria-label={
                      mutedVideos.has(index) ? "Unmute video" : "Mute video"
                    }
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all duration-200 z-10"
                  >
                    {mutedVideos.has(index) ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>

                  {/* Active indicator */}
                  {activeIndex === index && (
                    <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-[#FA8B46] animate-pulse" />
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display font-bold text-lg text-white mb-1">
                      {video.title}
                    </h3>
                    <p className="font-body text-white/90 text-sm">
                      {video.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const container = scrollContainerRef.current;
                  const video = videoRefs.current[index];
                  if (container && video) {
                    video.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                      block: "nearest",
                    });
                  }
                }}
                aria-label={`Go to video ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 bg-[#FA8B46]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default VideoCarousel;
