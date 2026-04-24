"use client";

import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { Menu, X, Search, ShoppingBag, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    <nav className={`fixed top-0 w-full z-[100] transition-colors duration-300 ${scrolled ? 'bg-[#181059] shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left Section: Logo & Explore */}
        <div className="flex items-center gap-8">
          <motion.div
            className="text-2xl font-black cursor-pointer flex items-center gap-3 tracking-tighter text-white"
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white italic">
              AA
            </div>
            <span className="hidden sm:block uppercase">Aeroverse Academy</span>
          </motion.div>

          <div className="hidden md:flex items-center text-white/90 gap-2 cursor-pointer hover:text-white">
             <Menu className="w-5 h-5 text-emerald-400" />
             <span className="text-sm font-semibold">Explore</span>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="hidden lg:flex items-center gap-6">
           {["Courses", "Mentorship", "About", "FAQ", "Contact"].map((item) => (
             <div key={item} className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer text-sm font-medium transition-colors">
               {item}
               {["Courses"].includes(item) && <ChevronDown className="w-4 h-4" />}
             </div>
           ))}
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-5 text-white/90">
             <Search className="w-5 h-5 cursor-pointer hover:text-white" />
             <div className="relative cursor-pointer hover:text-white">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-[#181059] rounded-full flex items-center justify-center text-[10px] font-bold">
                   0
                </span>
             </div>
          </div>
          
          <button
            className="hidden sm:block bg-white text-[#181059] px-6 py-2.5 rounded-lg font-bold hover:bg-white/90 transition-all text-sm"
            onClick={() => router.push("/login")}
          >
            Log In
          </button>

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
            className="lg:hidden w-full bg-[#181059] border-t border-white/10 shadow-2xl p-6 absolute top-20 left-0 flex flex-col gap-4"
          >
            {["Courses", "Mentorship", "About", "FAQ", "Contact"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold p-4 hover:bg-white/10 text-white rounded-xl transition-colors flex justify-between items-center"
              >
                {item}
                {["Courses", "Mentorship", "About"].includes(item) && <ChevronDown className="w-5 h-5" />}
              </a>
            ))}
            <hr className="border-white/10 my-2" />
            <button
              className="p-4 bg-white text-[#181059] font-bold rounded-xl"
              onClick={() => {
                 setIsMobileMenuOpen(false);
                 router.push("/login");
              }}
            >
              Log In
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
