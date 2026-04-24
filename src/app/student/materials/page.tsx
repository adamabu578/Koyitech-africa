"use client";

import { motion } from "motion/react";
import { Sidebar } from "../../components/Sidebar";
import { FileText, Download, FileArchive } from "lucide-react";

export default function Materials() {
  const materials = [
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

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar userType="student" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-8 py-6 sticky top-0 z-20 flex justify-between items-center text-foreground">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Materials</h1>
            <p className="text-muted-foreground font-medium">Download notes, guides, and resources.</p>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <div className="grid gap-4">
            {materials.map((mat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background border border-border p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg transition-all group hover:border-primary"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                     {mat.type === "PDF" ? <FileText size={24} /> : <FileArchive size={24} />}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-foreground">{mat.title}</h4>
                    <p className="text-sm font-bold text-muted-foreground">{mat.course}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                       <span>{mat.type}</span>
                       <span>•</span>
                       <span>{mat.size}</span>
                       <span>•</span>
                       <span>Added {mat.dateAdded}</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full md:w-auto px-6 py-3 bg-muted hover:bg-primary hover:text-white text-foreground rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                  <Download size={16} /> Download
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
