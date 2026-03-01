"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FlowerSVG, ButterflySVG } from "./DecorativeSVGs";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress, scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 120], [72, 56]);
  const logoScale = useTransform(scrollY, [0, 120], [1, 0.85]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0.85, 0.98]);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Programs", path: "/#programs" },
    { name: "Gallery", path: "/#gallery" },
    { name: "Contact", path: "/#contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    if (path.startsWith("/#")) return false; // Hash links are always on home page
    return pathname === path;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: headerHeight }}
      className={`fixed top-9 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/98 backdrop-blur-xl shadow-md border-b border-border/50"
          : "bg-background/85 backdrop-blur-md border-b border-border/30"
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-primary origin-left"
        style={{ scaleX }}
      />
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              style={{ scale: logoScale }}
              className="relative w-10 h-10 rounded-xl overflow-hidden shadow-soft group-hover:shadow-elevated transition-shadow duration-300"
            >
              <Image
                src="/logo.jpg"
                alt="Nanhi Muskan Seva Foundation Logo"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <motion.div style={{ scale: logoScale }}>
              <span className="font-display font-bold text-lg text-foreground leading-tight">
                Nanhi Muskan
              </span>
              <span className="block text-[10px] text-muted-foreground font-body tracking-wider uppercase">
                Seva Foundation
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="relative px-2 py-2 font-body font-medium text-sm text-muted-foreground hover:text-[#FA8B46] transition-colors duration-300 group"
              >
                {link.name}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FA8B46] rounded-full"
                  initial={false}
                  animate={{ scaleX: isActive(link.path) ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{ originX: 0.5 }}
                />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/donate-us">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button className="bg-[#FA8B46] hover:bg-[#FA8B46]/90 text-white px-6 py-2.5 rounded-full font-display font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300">
                  <Heart className="w-3.5 h-3.5 mr-1.5" fill="currentColor" />
                  Donate Now
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-foreground rounded-lg hover:bg-muted active:bg-muted/80 transition-colors duration-150"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-background/98 backdrop-blur-xl border-t border-border/50 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-body font-semibold text-sm py-2.5 px-3 rounded-lg transition-all duration-200 ${
                      isActive(link.path)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                <Link href="/donate-us" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-primary text-primary-foreground w-full mt-3 rounded-full font-display font-bold text-sm py-2.5">
                    <Heart className="w-3.5 h-3.5 mr-1.5" fill="currentColor" />
                    Donate Now
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
