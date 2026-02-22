import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Users, BookOpen, Utensils, Home, Stethoscope } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonationForm from "@/components/DonationForm";

const campaigns = [
  {
    id: 1,
    title: "Education for All",
    description: "Help us provide quality education, books, and school supplies to underprivileged children.",
    icon: BookOpen,
    raised: 245000,
    goal: 500000,
    color: "primary",
  },
  {
    id: 2,
    title: "Nutrition Program",
    description: "Ensure every child receives nutritious meals for healthy growth and development.",
    icon: Utensils,
    raised: 180000,
    goal: 300000,
    color: "secondary",
  },
  {
    id: 3,
    title: "Healthcare Initiative",
    description: "Provide medical checkups, vaccinations, and healthcare access to children in need.",
    icon: Stethoscope,
    raised: 320000,
    goal: 400000,
    color: "accent",
  },
  {
    id: 4,
    title: "Safe Shelter Project",
    description: "Build safe homes and shelters for homeless and orphaned children.",
    icon: Home,
    raised: 150000,
    goal: 600000,
    color: "primary",
  },
  {
    id: 5,
    title: "Community Support",
    description: "Empower communities to create sustainable support systems for children.",
    icon: Users,
    raised: 95000,
    goal: 200000,
    color: "secondary",
  },
];

const DonatePage = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm px-4 py-2 rounded-full text-primary-foreground font-body font-semibold text-sm mb-6">
              <Heart className="w-4 h-4" fill="currentColor" />
              Make a Difference Today
            </span>
            <h1 className="font-display font-black text-4xl md:text-6xl text-primary-foreground mb-6">
              Support Our Campaigns
            </h1>
            <p className="font-body text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto">
              Every donation brings hope and transforms lives. Choose a campaign close to your heart and help us create a brighter future for children.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-body font-semibold text-sm uppercase tracking-wider">
              Our Initiatives
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-foreground mt-3">
              Active Campaigns
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => {
              const Icon = campaign.icon;
              const progress = getProgressPercentage(campaign.raised, campaign.goal);
              
              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-playful p-6 cursor-pointer hover:shadow-xl transition-all duration-300 group"
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-${campaign.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 text-${campaign.color}`} />
                  </div>
                  
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">
                    {campaign.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm mb-4 leading-relaxed">
                    {campaign.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${progress}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full bg-${campaign.color} rounded-full`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="font-body text-muted-foreground">
                      Raised: <span className="font-semibold text-foreground">{formatCurrency(campaign.raised)}</span>
                    </span>
                    <span className="font-body text-muted-foreground">
                      Goal: <span className="font-semibold text-foreground">{formatCurrency(campaign.goal)}</span>
                    </span>
                  </div>

                  <button className="mt-4 w-full btn-hero py-3 text-sm">
                    <Heart className="w-4 h-4 mr-2" fill="currentColor" />
                    Donate Now
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donation Form Modal/Section */}
      {selectedCampaign && (
        <DonationForm
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default DonatePage;
