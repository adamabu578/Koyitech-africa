"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sidebar } from "../../components/Sidebar";
import { FileText, Download, FileArchive } from "lucide-react";

export default function Materials() {
  const [materials, setMaterials] = useState<any[]>([]);

  const defaultMaterials = [
    {
      course: "UI/UX Design Masterclass",
      title: "Module 3: Advanced UI Patterns",
      type: "PDF",
      size: "4.2 MB",
      dateAdded: "April 20, 2026"
    },
    {
      course: "UI/UX Design Masterclass",
      title: "Figma Component Library Asset",
      type: "FIG",
      size: "12.8 MB",
      dateAdded: "April 18, 2026"
    },
    {
      course: "Data Analysis Essentials",
      title: "Week 1 Raw Dataset",
      type: "CSV",
      size: "1.1 MB",
      dateAdded: "April 21, 2026"
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("materials");
    if (saved) {
      setMaterials([...JSON.parse(saved), ...defaultMaterials]);
    } else {
      setMaterials(defaultMaterials);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#fdf8f5] dark:bg-slate-950 md:p-6 lg:p-8 transition-colors duration-300">
      <div className="flex-1 flex bg-white dark:bg-slate-900 md:rounded-[2.5rem] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-orange-50/50 dark:border-slate-800">
        <Sidebar userType="student" />

        <main className="flex-1 overflow-y-auto">
          <header className="bg-white dark:bg-slate-900 border-b border-border pl-4 pr-20 md:px-8 py-4 md:py-6 sticky top-0 z-20 flex justify-between items-center text-foreground transition-colors">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">Materials</h1>
            <p className="text-muted-foreground font-medium">Download notes, guides, and resources.</p>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
          <div className="grid gap-4">
            {materials.map((mat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background border border-border p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 hover:shadow-lg transition-all group hover:border-primary"
              >
                <div className="flex items-start sm:items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                     {mat.type === "PDF" ? <FileText className="w-5 h-5 md:w-6 md:h-6" /> : <FileArchive className="w-5 h-5 md:w-6 md:h-6" />}
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-black text-foreground leading-tight md:leading-normal">{mat.title}</h4>
                    <p className="text-xs md:text-sm font-bold text-muted-foreground mt-1">{mat.course}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                       <span>{mat.type}</span>
                       <span>•</span>
                       <span>{mat.size}</span>
                       <span>•</span>
                       <span>Added {mat.dateAdded}</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-muted hover:bg-primary hover:text-white text-foreground rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors mt-2 md:mt-0">
                  <Download size={16} /> Download
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}
