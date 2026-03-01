import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1B2232] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#FA8B46]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FA8B46]/5 rounded-full blur-3xl" />

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#FA8B46] flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white">
                  Nanhi Muskan
                </span>
                <span className="block text-xs text-white/60 font-body">
                  Seva Foundation
                </span>
              </div>
            </div>
            <p className="text-white/70 font-body leading-relaxed text-sm mb-6">
              Serving humanity with care. Working to uplift lives and support
              communities through compassionate, grassroots action.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#FA8B46] hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#FA8B46] hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#FA8B46] hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#FA8B46] hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-body">
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-[#FA8B46] hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/70 hover:text-[#FA8B46] hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/70 hover:text-[#FA8B46] hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-white">
              Our Programs
            </h4>
            <ul className="space-y-2.5 font-body">
              <li>
                <Link
                  href="/#programs"
                  className="text-white/70 hover:text-[#FA8B46] hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                >
                  Education Support
                </Link>
              </li>
              <li>
                <Link
                  href="/#programs"
                  className="text-white/70 hover:text-[#FA8B46] hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                >
                  Healthcare Camps
                </Link>
              </li>
              <li>
                <Link
                  href="/#programs"
                  className="text-white/70 hover:text-[#FA8B46] hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                >
                  Nutrition Program
                </Link>
              </li>
              <li>
                <Link
                  href="/#programs"
                  className="text-white/70 hover:text-[#FA8B46] hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                >
                  Sports & Activities
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-white">
              Contact Us
            </h4>
            <ul className="space-y-3 font-body">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FA8B46] mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm leading-relaxed">
                  123 Hope Street, Sunshine District, Mumbai 400001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FA8B46] flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-white/70 hover:text-[#FA8B46] transition-colors text-sm"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FA8B46] flex-shrink-0" />
                <a
                  href="mailto:contact@nanhimuskanseva.org"
                  className="text-white/70 hover:text-[#FA8B46] transition-colors text-sm"
                >
                  contact@nanhimuskanseva.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 font-body text-sm">
              © {new Date().getFullYear()} Nanhi Muskan Seva Foundation. All
              rights reserved.
            </p>
            <p className="text-white/50 font-body text-sm flex items-center gap-1">
              Made with{" "}
              <Heart className="w-4 h-4 text-[#FA8B46]" fill="currentColor" />{" "}
              for humanity
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
