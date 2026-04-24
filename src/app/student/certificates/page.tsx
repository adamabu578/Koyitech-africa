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
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar userType="student" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-8 py-6 sticky top-0 z-20 flex justify-between items-center text-foreground">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Certificates</h1>
            <p className="text-muted-foreground font-medium">Your earned credentials and achievements.</p>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {certificates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background border border-border rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-primary transition-all group"
                >
                  <div className="h-40 bg-[linear-gradient(45deg,#181059,#5b4fff)] flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
                     <Award size={64} className="text-secondary opacity-90" />
                     <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest">Verified</div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-black mb-1 text-foreground leading-tight">{cert.course}</h3>
                    <p className="text-sm font-bold text-muted-foreground mb-6">Issued: {cert.dateAwarded}</p>
                    <div className="bg-muted p-3 rounded-lg mb-6">
                       <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Credential ID</p>
                       <p className="text-xs font-mono font-bold text-foreground">{cert.id}</p>
                    </div>
                    <button className="w-full py-4 bg-primary text-white rounded-xl font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
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
  );
}
