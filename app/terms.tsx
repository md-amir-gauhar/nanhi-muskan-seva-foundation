import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsPage = () => {
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
              Terms & Conditions
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
            className="max-w-4xl mx-auto"
          >
            <div className="card-playful p-8 md:p-12 space-y-8">
              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  By accessing and using the Little Hearts Foundation website, you accept and agree 
                  to be bound by the terms and provisions of this agreement. If you do not agree to 
                  abide by these terms, please do not use this website.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  2. About Little Hearts Foundation
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Little Hearts Foundation is a registered non-profit organization dedicated to 
                  improving the lives of underprivileged children through education, healthcare, 
                  and community support programs. We are registered under the Indian Trusts Act 
                  and qualify for tax exemption under Section 80G of the Income Tax Act.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  3. Donations
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  By making a donation to Little Hearts Foundation:
                </p>
                <ul className="list-disc list-inside font-body text-muted-foreground space-y-2">
                  <li>You confirm that you are authorized to use the payment method provided</li>
                  <li>You agree that your donation is voluntary and not made in exchange for goods or services</li>
                  <li>You understand that donations are generally non-refundable unless made in error</li>
                  <li>You acknowledge that we will use your donation at our discretion to further our charitable mission</li>
                  <li>You will receive a tax receipt for your donation as per applicable laws</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  4. Use of Website
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside font-body text-muted-foreground space-y-2">
                  <li>Use the website for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to any part of the website</li>
                  <li>Use automated systems to access or copy content from the website</li>
                  <li>Transmit any harmful code or interfere with the website's functionality</li>
                  <li>Impersonate any person or entity</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  5. Intellectual Property
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  All content on this website, including text, graphics, logos, images, and software, 
                  is the property of Little Hearts Foundation or its content suppliers and is protected 
                  by international copyright laws. You may not reproduce, distribute, or create 
                  derivative works without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  6. Volunteer Services
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  If you volunteer with Little Hearts Foundation, you agree to follow our code of 
                  conduct, maintain confidentiality of sensitive information, and comply with all 
                  applicable background check requirements. Volunteer services are provided without 
                  expectation of compensation.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Little Hearts Foundation shall not be liable for any direct, indirect, incidental, 
                  special, or consequential damages arising from your use of this website or reliance 
                  on any information provided. We make no warranties about the accuracy or completeness 
                  of the website's content.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  8. Links to Third-Party Websites
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. These links are provided 
                  for your convenience only. We have no control over these websites and are not 
                  responsible for their content or privacy practices.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  9. Modifications
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting on the website. Your continued use of the website after 
                  changes are posted constitutes your acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  10. Governing Law
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of India. 
                  Any disputes arising under these terms shall be subject to the exclusive jurisdiction 
                  of the courts in Mumbai, Maharashtra.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  11. Contact Information
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  For questions about these Terms & Conditions, please contact us at:
                  <br /><br />
                  <strong>Little Hearts Foundation</strong><br />
                  123 Hope Street, Sunshine District<br />
                  Mumbai 400001, India<br />
                  Email: legal@littlehearts.org<br />
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

export default TermsPage;
