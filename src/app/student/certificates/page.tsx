"use client";

import { motion } from "motion/react";
import { Sidebar } from "../../components/Sidebar";
import { Award, Download } from "lucide-react";

export default function Certificates() {
  const certificates = [
    {
      course: "Introduction to Digital Marketing",
      dateAwarded: "March 15, 2026",
      id: "CERT-2026-0045"
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#fdf8f5] dark:bg-slate-950 md:p-6 lg:p-8 transition-colors duration-300">
      <div className="flex-1 flex bg-white dark:bg-slate-900 md:rounded-[2.5rem] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-orange-50/50 dark:border-slate-800">
        <Sidebar userType="student" />

        <main className="flex-1 overflow-y-auto">
          <header className="bg-white dark:bg-slate-900 border-b border-border pl-4 pr-20 md:px-8 py-4 md:py-6 sticky top-0 z-20 flex justify-between items-center text-foreground transition-colors">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">Certificates</h1>
            <p className="text-muted-foreground font-medium">Your earned credentials and achievements.</p>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
          {certificates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {certificates.map((cert, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background border border-border rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-primary transition-all group"
                >
                  <div className="h-32 md:h-40 bg-[linear-gradient(45deg,#181059,#5b4fff)] flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
                     <Award className="w-12 h-12 md:w-16 md:h-16 text-secondary opacity-90" />
                     <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest">Verified</div>
                  </div>
                  <div className="p-5 md:p-8">
                    <h3 className="text-lg md:text-xl font-black mb-1 text-foreground leading-tight">{cert.course}</h3>
                    <p className="text-xs md:text-sm font-bold text-muted-foreground mb-4 md:mb-6">Issued: {cert.dateAwarded}</p>
                    <div className="bg-muted p-3 rounded-lg mb-4 md:mb-6">
                       <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Credential ID</p>
                       <p className="text-[10px] md:text-xs font-mono font-bold text-foreground break-all">{cert.id}</p>
                    </div>
                    <button className="w-full py-3 md:py-4 bg-primary text-white rounded-lg md:rounded-xl font-black text-[10px] md:text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                      <Download size={16} /> Download PDF
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-background border border-dashed border-border rounded-3xl">
               <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                  <Award size={32} />
               </div>
               <h3 className="text-xl font-black text-foreground mb-2">No Certificates Yet</h3>
               <p className="text-muted-foreground font-medium">Complete courses to earn your certificates.</p>
            </div>
          )}
        </div>
      </main>
      </div>
    </div>
  );
}
