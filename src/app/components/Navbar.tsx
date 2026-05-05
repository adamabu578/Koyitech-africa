"use client";

import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { supabase } from "../../lib/supabase";

export function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-colors duration-300 ${scrolled ? 'bg-[#181059] dark:bg-slate-950 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Left Section: Logo */}
        <div className="flex flex-1 items-center justify-start">
          <Link href="/" passHref>
            <motion.div
              className="text-2xl font-black font-outfit cursor-pointer flex items-center gap-3 tracking-tighter text-white dark:text-[#34d399]"
              whileHover={{ scale: 1.02 }}
            >
              <span className="hidden sm:block uppercase tracking-tight">Koyitech Africa</span>
            </motion.div>
          </Link>
        </div>

        {/* Middle Section: Links */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
          {["Courses", "About", "FAQ", "Contact"].map((item) => (
            <a key={item} href={`/#${item.toLowerCase()}`} className="flex items-center gap-1 text-white/80 dark:text-slate-300 hover:text-white dark:hover:text-[#34d399] cursor-pointer text-lg font-bold font-outfit tracking-tight transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* Right Section: Actions */}
        <div className="flex flex-1 items-center justify-end gap-6">
          <div className="hidden sm:flex items-center gap-5 text-white/90">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
          </div>

          <Link
            href="/login"
            className="hidden sm:block bg-white text-[#181059] px-6 py-2.5 rounded-lg font-bold font-outfit tracking-tight hover:bg-white/90 transition-all text-sm"
          >
            Register
          </Link>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden w-full bg-[#181059] dark:bg-slate-950 border-t border-white/10 shadow-2xl p-6 absolute top-20 left-0 flex flex-col gap-4"
          >
            <div className="flex justify-end pb-2 border-b border-white/10 mb-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}
            </div>
            {["Courses", "About", "FAQ", "Contact"].map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold font-outfit tracking-tight p-4 hover:bg-white/10 dark:hover:bg-slate-800 text-white dark:text-slate-200 rounded-xl transition-colors flex justify-between items-center"
              >
                {item}
              </a>
            ))}
            <hr className="border-white/10 my-2" />
            
            <Link
              href="/login"
              className="p-4 bg-white text-[#181059] font-bold font-outfit tracking-tight rounded-xl text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Enrol Now/Register
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
