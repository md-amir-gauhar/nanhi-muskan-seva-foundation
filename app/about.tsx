import { motion } from "framer-motion";
import { Heart, Users, Target, Award, Calendar, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const AboutPage = () => {
  const stats = [
    { icon: Users, number: "15,000+", label: "Children Supported" },
    { icon: Calendar, number: "19", label: "Years of Service" },
    { icon: MapPin, number: "50+", label: "Communities Reached" },
    { icon: Award, number: "25+", label: "Awards Received" },
  ];

  const team = [
    {
      name: "Dr. Priya Sharma",
      role: "Founder & Director",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },
    {
      name: "Rajesh Kumar",
      role: "Program Manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
    {
      name: "Anita Patel",
      role: "Education Head",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    },
    {
      name: "Dr. Arun Mehta",
      role: "Healthcare Director",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-warm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary font-body font-semibold text-sm uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="font-display font-black text-4xl md:text-6xl text-foreground mt-3 mb-6">
              About <span className="text-gradient-hero">Little Hearts</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              For nearly two decades, we've been dedicated to transforming lives
              of underprivileged children through education, healthcare, and
              unconditional love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-body font-semibold text-sm uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-foreground mt-3 mb-6">
                Empowering Every Child to Reach Their Full Potential
              </h2>
              <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6">
                Little Hearts Foundation was founded in 2005 with a simple yet
                powerful vision: to ensure every child, regardless of their
                circumstances, has access to quality education, healthcare, and
                the opportunity to dream big.
              </p>
              <p className="font-body text-muted-foreground text-lg leading-relaxed mb-8">
                What started as a small initiative to help 50 children in a
                Mumbai slum has grown into a movement that touches the lives of
                over 15,000 children across 50+ communities in India.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center shadow-soft">
                  <Heart
                    className="w-8 h-8 text-primary-foreground"
                    fill="currentColor"
                  />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">
                    Founded with Love
                  </p>
                  <p className="font-body text-muted-foreground">Since 2005</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="relative rounded-3xl shadow-card aspect-square overflow-hidden">
                  <Image
                    src={gallery1}
                    alt="Children learning"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="relative rounded-3xl shadow-card aspect-[4/3] overflow-hidden">
                  <Image
                    src={gallery2}
                    alt="Community meal"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="pt-8">
                <div className="relative rounded-3xl shadow-card aspect-[3/4] overflow-hidden">
                  <Image
                    src={gallery3}
                    alt="Sports activities"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="font-display font-black text-3xl md:text-4xl text-background">
                  {stat.number}
                </p>
                <p className="font-body text-background/70 mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-body font-semibold text-sm uppercase tracking-wider">
              What We Believe In
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mt-3">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Compassion",
                description:
                  "Every child deserves to be loved, valued, and cared for. We approach our work with deep empathy and understanding.",
                color: "gradient-hero",
              },
              {
                icon: Target,
                title: "Excellence",
                description:
                  "We strive for the highest standards in everything we do, ensuring quality education and healthcare for all children.",
                color: "gradient-sky",
              },
              {
                icon: Users,
                title: "Community",
                description:
                  "We believe in the power of community. Together with families and volunteers, we create lasting change.",
                color: "gradient-nature",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-playful text-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${value.color} flex items-center justify-center mx-auto mb-6`}
                >
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="font-body text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-body font-semibold text-sm uppercase tracking-wider">
              The People Behind
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mt-3">
              Our Leadership Team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6 overflow-hidden rounded-3xl aspect-[3/4]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  {member.name}
                </h3>
                <p className="font-body text-primary">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
