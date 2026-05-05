"use client";

import { motion } from "motion/react";
import { Sidebar } from "../components/Sidebar";
import { MobileNav } from "../components/MobileNav";
import { User, FileText, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function MaterialsPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"student" | "instructor">("student");

  const [materials, setMaterials] = useState<any[]>([
    { title: "HTML & CSS Fundamentals Syllabus", type: "PDF", size: "2.4 MB" },
    { title: "React Context API Guide & Cheat Sheet", type: "PDF", size: "1.8 MB" },
    { title: "UI Design Principles Toolkit", type: "ZIP", size: "15.2 MB" },
    { title: "Python Data Structures Overview", type: "PDF", size: "3.1 MB" },
    { title: "Koyitech Intro Class Recording", type: "MP4", size: "245.0 MB" },
    { title: "Javascript ES6 Code Snippets", type: "ZIP", size: "4.7 MB" },
  ]);

  useEffect(() => {
    // Attempt to parse out user profile & match the correct route perspective
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.length > 0) {
      setUserType(users[0].userType || "student");
    }
    
    // Read uploaded materials
    const uploaded = JSON.parse(localStorage.getItem("uploadedMaterials") || "[]");
    if (uploaded.length > 0) {
      setMaterials(prev => [...uploaded, ...prev]);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType={userType} />

      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-card border-b border-border px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-xl">Course Materials</h2>
            <p className="text-sm text-muted-foreground">Access all your downloadable resources here.</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <User className="w-5 h-5 text-primary" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-full hover:bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground transition-colors"
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-8 pb-24 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {materials.map((material, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-card rounded-[1.25rem] p-6 border border-border shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg flex flex-col items-start gap-4 hover:border-blue-500/20 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-[#2563eb] dark:text-blue-400" />
                </div>
                <div className="flex-1 w-full">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1.5 line-clamp-2 text-lg leading-tight">{material.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                    <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md uppercase text-[10px] tracking-widest">{material.type}</span>
                    <span>{material.size}</span>
                  </div>
                </div>
                <button className="w-full bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#2563eb] hover:text-white hover:border-[#2563eb] transition-colors mt-2 shadow-sm text-gray-700 dark:text-gray-300">
                  <Download className="w-4 h-4" /> Download Resource
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <MobileNav userType={userType} />
    </div>
  );
}
