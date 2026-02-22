import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center">
                <Heart
                  className="w-6 h-6 text-primary-foreground"
                  fill="currentColor"
                />
              </div>
              <div>
                <span className="font-display font-bold text-xl">
                  Little Hearts
                </span>
                <span className="block text-xs opacity-70 font-body">
                  Foundation
                </span>
              </div>
            </div>
            <p className="text-background/70 font-body leading-relaxed">
              Empowering children through education, healthcare, and love. Every
              child deserves a chance to dream and grow.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-110 active:scale-95 transition-all duration-150"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-110 active:scale-95 transition-all duration-150"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-110 active:scale-95 transition-all duration-150"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-110 active:scale-95 transition-all duration-150"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 font-body">
              <li>
                <Link
                  href="/about"
                  className="text-background/70 hover:text-primary hover:translate-x-1 inline-block transition-all duration-150"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#programs"
                  className="text-background/70 hover:text-primary hover:translate-x-1 inline-block transition-all duration-150"
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/#gallery"
                  className="text-background/70 hover:text-primary hover:translate-x-1 inline-block transition-all duration-150"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-background/70 hover:text-primary hover:translate-x-1 inline-block transition-all duration-150"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-background/70 hover:text-primary hover:translate-x-1 inline-block transition-all duration-150"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-background/70 hover:text-primary hover:translate-x-1 inline-block transition-all duration-150"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">
              Our Programs
            </h4>
            <ul className="space-y-3 font-body">
              <li>
                <a
                  href="#"
                  className="text-background/70 hover:text-primary hover:translate-x-1 inline-block transition-all duration-150"
                >
                  Education Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/70 hover:text-primary hover:translate-x-1 inline-block transition-all duration-150"
                >
                  Healthcare Camps
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/70 hover:text-primary hover:translate-x-1 inline-block transition-all duration-150"
                >
                  Nutrition Program
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/70 hover:text-primary hover:translate-x-1 inline-block transition-all duration-150"
                >
                  Sports & Activities
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/70 hover:text-primary hover:translate-x-1 inline-block transition-all duration-150"
                >
                  Environment Awareness
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 font-body">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-background/70">
                  123 Hope Street, Sunshine District, Mumbai 400001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70">
                  hello@littlehearts.org
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 font-body text-sm">
              © 2024 Little Hearts Foundation. All rights reserved.
            </p>
            <p className="text-background/50 font-body text-sm flex items-center gap-1">
              Made with{" "}
              <Heart className="w-4 h-4 text-primary" fill="currentColor" /> for
              children everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
