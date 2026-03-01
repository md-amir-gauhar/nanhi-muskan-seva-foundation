"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

const TermsPage = () => {
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
              <FileText className="w-4 h-4 text-white" />
              <span className="text-white font-body text-sm font-semibold">
                Legal Information
              </span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-6xl text-foreground mb-6">
              Terms & Conditions
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
                  General Information
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  All website content is for general information only. Donations
                  are voluntary and non-refundable. Unauthorized use of content
                  is prohibited, and policies may be updated without prior
                  notice.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  By accessing and using this website, you accept and agree to
                  be bound by the terms and provisions of this agreement. If you
                  do not agree to abide by these terms, please do not use this
                  website.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  2. Website Content
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  The information provided on this website is for general
                  informational purposes only. While we strive to keep the
                  information up-to-date and accurate, we make no
                  representations or warranties of any kind about:
                </p>
                <ul className="list-disc list-inside space-y-2 font-body text-muted-foreground ml-4">
                  <li>The completeness or accuracy of the information</li>
                  <li>The reliability or availability of the website</li>
                  <li>
                    The suitability of the information for any particular
                    purpose
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  3. Donations
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  All donations made through this website are:
                </p>
                <ul className="list-disc list-inside space-y-2 font-body text-muted-foreground ml-4">
                  <li>
                    <strong>Voluntary:</strong> Made of your own free will
                    without any obligation
                  </li>
                  <li>
                    <strong>Non-refundable:</strong> Once processed, donations
                    cannot be returned or refunded
                  </li>
                  <li>
                    <strong>Tax-deductible:</strong> Where applicable under
                    local laws (receipts will be provided)
                  </li>
                  <li>
                    <strong>Used responsibly:</strong> Allocated to programs and
                    operational costs as per our organizational objectives
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  4. Intellectual Property
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  All content on this website, including text, images, logos,
                  graphics, and design elements, is the property of our
                  organization or used with permission. Unauthorized use,
                  reproduction, or distribution of any content is strictly
                  prohibited without prior written consent.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  5. Third-Party Links
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites for your
                  convenience. We are not responsible for the content, privacy
                  practices, or terms of use of these external sites. Accessing
                  these links is at your own risk.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  6. Limitation of Liability
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  To the fullest extent permitted by law, our organization shall
                  not be liable for any direct, indirect, incidental, or
                  consequential damages arising from your use of this website or
                  inability to use it, even if we have been advised of the
                  possibility of such damages.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  7. User Conduct
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  When using our website, you agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 font-body text-muted-foreground ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the rights of others</li>
                  <li>Transmit harmful code, viruses, or malicious software</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the website for fraudulent or illegal purposes</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  8. Changes to Terms
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We reserve the right to modify or update these Terms &
                  Conditions at any time without prior notice. Changes will be
                  effective immediately upon posting on this page. Continued use
                  of the website after changes constitutes acceptance of the
                  modified terms.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  9. Governing Law
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  These terms and conditions are governed by and construed in
                  accordance with the laws of India. Any disputes arising from
                  these terms shall be subject to the exclusive jurisdiction of
                  the courts in Mumbai, India.
                </p>
              </section>

              <section className="pt-6 border-t border-gray-200">
                <p className="font-body text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms & Conditions,
                  please contact us at:
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

export default TermsPage;
