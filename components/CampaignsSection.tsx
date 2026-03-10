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
      className="py-16 md:py-20 bg-gradient-to-b from-background to-[#FFF5EE] relative overflow-hidden"
      id="campaigns"
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FA8B46]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FA8B46]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#FA8B46] font-body font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4" />
            Our Campaigns
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mb-4">
            Make a <span className="text-[#FA8B46]">Difference</span> Today
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Join us in our mission to create positive change. Every contribution
            brings us closer to our goals.
          </p>
        </motion.div>

        {/* Campaigns Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden flex-shrink-0">
                <Image
                  src={campaign.image || "/logo.jpg"}
                  alt={campaign.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm bg-white/90 ${getCategoryColor(campaign.category)}`}
                  >
                    {campaign.category.charAt(0).toUpperCase() +
                      campaign.category.slice(1)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-display font-bold text-xl mb-3 text-foreground line-clamp-2 group-hover:text-[#FA8B46] transition-colors min-h-[3.5rem]">
                  {campaign.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm mb-5 line-clamp-3 min-h-[4rem]">
                  {campaign.description}
                </p>

                {/* Progress */}
                <div className="space-y-3 mb-5 mt-auto">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-[#FA8B46]" />
                      <span className="font-semibold text-foreground">
                        ₹{campaign.raised.toLocaleString("en-IN")}
                      </span>
                      <span className="text-muted-foreground">raised</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className="font-semibold text-gray-700">
                        ₹{campaign.goal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        inView
                          ? {
                              width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%`,
                            }
                          : {}
                      }
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className="bg-gradient-to-r from-[#FA8B46] to-[#ff9d5c] h-full rounded-full"
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#FA8B46] font-semibold">
                      {((campaign.raised / campaign.goal) * 100).toFixed(1)}%
                      funded
                    </span>
                    {campaign.donorCount !== undefined && (
                      <span className="text-muted-foreground">
                        {campaign.donorCount}{" "}
                        {campaign.donorCount === 1 ? "donor" : "donors"}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/donate?campaign=${campaign.id}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#FA8B46] hover:bg-[#FA8B46]/90 text-white py-3 rounded-xl font-display font-bold transition-all duration-300 hover:shadow-lg group-hover:scale-[1.02]"
                >
                  Donate Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-[#FFF5EE] border-2 border-[#FA8B46] text-[#FA8B46] rounded-xl font-display font-bold transition-all duration-300 hover:shadow-lg hover:scale-105"
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
