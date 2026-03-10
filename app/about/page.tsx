"use client";

import { motion } from "framer-motion";
import { Heart, Users, Target, Lightbulb, Shield } from "lucide-react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { useInView } from "react-intersection-observer";

const AboutPage = () => {
  const { ref: missionRef, inView: missionInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: valuesRef, inView: valuesInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const whatWeDo = [
    {
      icon: Users,
      title: "Community Support",
      description:
        "Working directly with underserved communities to provide essential resources and support for sustainable development.",
    },
    {
      icon: Lightbulb,
      title: "Education & Awareness",
      description:
        "Empowering communities through knowledge, skill-building programs, and awareness campaigns.",
    },
    {
      icon: Heart,
      title: "Health & Well-being",
      description:
        "Organizing health camps, providing medical assistance, and promoting wellness in vulnerable communities.",
    },
    {
      icon: Target,
      title: "Animal & Environment Care",
      description:
        "Protecting our environment and caring for animals through conservation and welfare initiatives.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "Leading with empathy and kindness in all our actions",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Operating with transparency and accountability",
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Working closely with local communities",
    },
    {
      icon: Target,
      title: "Practical Solutions",
      description: "Delivering sustainable, real-world impact",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#FFF5EE] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[#FA8B46] rounded-full px-5 py-2 mb-6">
              <Heart className="w-4 h-4 text-white" fill="currentColor" />
              <span className="text-white font-body text-sm font-semibold">
                About Us
              </span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-6xl text-foreground mb-6">
              Driven by{" "}
              <span className="text-[#FA8B46]">Compassion & Action</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              We are a non-profit organization driven by compassion and action.
              We work closely with local communities to understand real needs
              and deliver practical, sustainable solutions with transparency and
              integrity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              What We Do
            </h2>
            <p className="font-body text-muted-foreground max-w-3xl mx-auto">
              We work at the ground level to support underserved communities
              through community support, education and awareness, health and
              well-being initiatives, and care for animals and the environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whatWeDo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 rounded-xl bg-[#FA8B46] flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={valuesRef}
        className="py-20 bg-gradient-to-b from-white to-[#FFF5EE]"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="font-body text-muted-foreground max-w-3xl mx-auto">
              Guided by principles that drive meaningful and lasting change in
              the communities we serve.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={valuesInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 rounded-full bg-[#FFF5EE] flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-[#FA8B46]" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1B2232] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#FA8B46]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FA8B46]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="font-body text-lg text-white/80 mb-8">
              Together, we can create meaningful change through small actions
              that lead to real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#campaigns"
                className="inline-block bg-[#FA8B46] hover:bg-[#FA8B46]/90 text-white px-8 py-4 rounded-full font-display font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Support Our Cause
              </a>
              <a
                href="/#contact"
                className="inline-block bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-display font-bold text-base transition-all duration-200 hover:scale-105"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
