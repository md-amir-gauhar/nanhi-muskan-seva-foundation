"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

const PrivacyPage = () => {
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
              <Shield className="w-4 h-4 text-white" />
              <span className="text-white font-body text-sm font-semibold">
                Your Privacy Matters
              </span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-6xl text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Last updated: March 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg space-y-8">
              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  Our Commitment to Your Privacy
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We respect your privacy. Any information collected through the
                  website is used only for communication and record-keeping. We
                  do not share personal data with third parties except where
                  required by law.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  1. Information We Collect
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  When you interact with our website or make a donation, we may
                  collect the following information:
                </p>
                <ul className="list-disc list-inside space-y-2 font-body text-muted-foreground ml-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Donation details and payment information</li>
                  <li>Communication preferences and messages sent to us</li>
                  <li>
                    Technical information such as IP address and browser type
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  The information we collect is used solely for:
                </p>
                <ul className="list-disc list-inside space-y-2 font-body text-muted-foreground ml-4">
                  <li>Processing donations and issuing receipts</li>
                  <li>
                    Communicating with you about our programs and activities
                  </li>
                  <li>Maintaining records for organizational purposes</li>
                  <li>Improving our website and services</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  3. Data Sharing and Disclosure
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We do not sell, rent, or share your personal information with
                  third parties for their marketing purposes. We may disclose
                  your information only:
                </p>
                <ul className="list-disc list-inside space-y-2 font-body text-muted-foreground ml-4 mt-4">
                  <li>When required by law or legal process</li>
                  <li>
                    To trusted service providers who assist in our operations
                    (under strict confidentiality agreements)
                  </li>
                  <li>
                    To protect our rights, property, or safety, or that of
                    others
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  4. Data Security
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no
                  method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  5. Your Rights
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  You have the right to access, correct, or delete your personal
                  information. To exercise these rights or if you have any
                  questions about our privacy practices, please contact us at
                  contact@nanhimuskanseva.org.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  6. Updates to This Policy
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. Any
                  changes will be posted on this page with an updated revision
                  date. We encourage you to review this policy periodically.
                </p>
              </section>

              <section className="pt-6 border-t border-gray-200">
                <p className="font-body text-muted-foreground leading-relaxed">
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at:
                  <br />
                  <span className="font-semibold text-foreground">
                    Email: contact@nanhimuskanseva.org
                  </span>
                  <br />
                  <span className="font-semibold text-foreground">
                    Phone: +91 98765 43210
                  </span>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
