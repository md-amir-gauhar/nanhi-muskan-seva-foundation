"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Heart, Target, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Campaign {
  id: string;
  title: string;
  slug: string;
  description: string;
  goal: number;
  raised: number;
  image: string;
  category: string;
  status: string;
  endDate: string | null;
  donorCount?: number;
}

const CampaignsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/campaigns");
      const data = await response.json();
      if (data.success) {
        // Show only active campaigns, limit to 3
        const activeCampaigns = data.data
          .filter((c: Campaign) => c.status === "active")
          .slice(0, 3);
        setCampaigns(activeCampaigns);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      education: "bg-blue-500/10 text-blue-600",
      health: "bg-green-500/10 text-green-600",
      food: "bg-orange-500/10 text-orange-600",
      shelter: "bg-purple-500/10 text-purple-600",
      emergency: "bg-red-500/10 text-red-600",
      other: "bg-gray-500/10 text-gray-600",
    };
    return colors[category] || colors.other;
  };

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-[#FFF5EE]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-[#FA8B46] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden"
      id="campaigns"
    >
      {/* Elegant gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-secondary/6 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/5 backdrop-blur-sm">
            <Heart className="w-4 h-4" />
            Our Campaigns
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-foreground mb-5">
            Make a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-secondary">
              Difference
            </span>{" "}
            Today
          </h2>
          <p className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Join us in our mission to create positive change. Every contribution
            brings us closer to our goals.
          </p>
        </motion.div>

        {/* Campaigns Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 group border border-border/50 flex flex-col hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden flex-shrink-0">
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md bg-white/95 shadow-soft border border-white/50 ${getCategoryColor(campaign.category)}`}
                  >
                    {campaign.category.charAt(0).toUpperCase() +
                      campaign.category.slice(1)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-grow">
                <h3 className="font-display font-bold text-xl mb-3 text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 min-h-[3.5rem]">
                  {campaign.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm mb-6 line-clamp-3 min-h-[4rem] leading-relaxed">
                  {campaign.description}
                </p>

                {/* Progress */}
                <div className="space-y-3 mb-6 mt-auto">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground">
                        ₹{campaign.raised.toLocaleString("en-IN")}
                      </span>
                      <span className="text-muted-foreground">raised</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold text-foreground">
                        ₹{campaign.goal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        inView
                          ? {
                              width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%`,
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.2,
                        delay: index * 0.1 + 0.3,
                        ease: "easeOut",
                      }}
                      className="bg-gradient-to-r from-primary via-primary/90 to-secondary h-full rounded-full shadow-soft"
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-primary font-bold">
                      {((campaign.raised / campaign.goal) * 100).toFixed(1)}%
                      funded
                    </span>
                    {campaign.donorCount !== undefined && (
                      <span className="text-muted-foreground font-medium">
                        {campaign.donorCount}{" "}
                        {campaign.donorCount === 1 ? "donor" : "donors"}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/donate?campaign=${campaign.id}`}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-3.5 rounded-xl font-display font-bold transition-all duration-300 shadow-soft hover:shadow-card group-hover:scale-[1.02] active:scale-[0.98]"
                >
                  Donate Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {campaigns.length >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm hover:from-primary/5 hover:to-primary/10 border-2 border-primary/30 text-primary rounded-2xl font-display font-bold transition-all duration-300 shadow-card hover:shadow-elevated hover:scale-105 hover:border-primary/50 active:scale-95"
            >
              View All Campaigns
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CampaignsSection;
