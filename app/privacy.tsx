import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPage = () => {
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
            <h1 className="font-display font-black text-4xl md:text-6xl text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Last updated: January 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto prose prose-lg"
          >
            <div className="card-playful p-8 md:p-12 space-y-8">
              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  1. Introduction
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Little Hearts Foundation ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website or make a donation to our organization.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  2. Information We Collect
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  We may collect information about you in various ways, including:
                </p>
                <ul className="list-disc list-inside font-body text-muted-foreground space-y-2">
                  <li>Personal Data: Name, email address, phone number, mailing address</li>
                  <li>Payment Information: Credit card details for donations (processed securely through third-party providers)</li>
                  <li>Communication Data: Information you provide when contacting us</li>
                  <li>Technical Data: IP address, browser type, device information</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect for various purposes:
                </p>
                <ul className="list-disc list-inside font-body text-muted-foreground space-y-2">
                  <li>To process your donations and send receipts</li>
                  <li>To communicate with you about our programs and impact</li>
                  <li>To send newsletters and updates (with your consent)</li>
                  <li>To improve our website and services</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  4. Information Sharing
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to outside parties. 
                  We may share your information with trusted third parties who assist us in operating our 
                  website, conducting our business, or servicing you, as long as those parties agree to 
                  keep this information confidential.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  5. Data Security
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect your personal information. 
                  However, please be aware that no method of transmission over the Internet or 
                  electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  6. Your Rights
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside font-body text-muted-foreground space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  7. Cookies
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Our website may use cookies to enhance your experience. You can choose to disable 
                  cookies through your browser settings, though this may affect some functionality 
                  of our website.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  8. Children's Privacy
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  While our organization works with children, we do not knowingly collect personal 
                  information from children under 13 through our website. If you believe we have 
                  collected such information, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  9. Changes to This Policy
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  changes by posting the new Privacy Policy on this page and updating the 
                  "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  10. Contact Us
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:
                  <br /><br />
                  <strong>Little Hearts Foundation</strong><br />
                  123 Hope Street, Sunshine District<br />
                  Mumbai 400001, India<br />
                  Email: privacy@littlehearts.org<br />
                  Phone: +91 98765 43210
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
