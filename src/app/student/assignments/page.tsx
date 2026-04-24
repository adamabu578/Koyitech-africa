"use client";

import { motion } from "motion/react";
import { Sidebar } from "../../components/Sidebar";
import { CheckSquare, Clock, Upload, ArrowRight } from "lucide-react";

export default function Assignments() {
  const assignments = [
    {
      course: "UI/UX Design Masterclass",
      title: "Landing Page Wireframing",
      deadline: "May 2, 2026",
      status: "Pending",
      instruction: "Design a wireframe for a real estate landing page following the principles discussed in class."
    },
    {
      course: "UI/UX Design Masterclass",
      title: "Visual Style Guide",
      deadline: "April 25, 2026",
      status: "Completed",
      instruction: "Create a comprehensive style guide including colors, typography, and button states."
    },
    {
      course: "Data Analysis Essentials",
      title: "Excel Data Cleaning",
      deadline: "May 5, 2026",
      status: "Pending",
      instruction: "Clean the provided raw dataset using Excel formulas and pivot tables."
    }
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar userType="student" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-8 py-6 sticky top-0 z-20 flex justify-between items-center text-foreground">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Assignments</h1>
            <p className="text-muted-foreground font-medium">Practice what you've learned.</p>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-10">
          <div className="space-y-6">
            {assignments.map((assign, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-background border border-border rounded-3xl group hover:border-primary transition-all shadow-sm hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-primary shrink-0">
                      <CheckSquare size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${assign.status === 'Completed' ? 'bg-secondary/20 text-secondary' : 'bg-primary/10 text-primary'}`}>
                           {assign.status}
                        </span>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{assign.course}</span>
                      </div>
                      <h4 className="text-xl font-black text-foreground">{assign.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">{assign.instruction}</p>
                    </div>
                  </div>
                  <div className="text-left md:text-right shrink-0">
                     <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1 flex items-center gap-1"><Clock size={12}/> Deadline</p>
                     <p className="text-sm font-bold text-foreground">{assign.deadline}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
                  <button className="flex-1 md:flex-none px-8 py-4 bg-muted hover:bg-border text-foreground rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                    View Full Instructions
                  </button>
                  {assign.status === 'Pending' ? (
                     <button className="flex-1 md:flex-none px-8 py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-105 transition-all">
                        <Upload size={16} /> Upload Work
                     </button>
                  ) : (
                     <button className="flex-1 md:flex-none px-8 py-4 bg-emerald-500/10 text-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                        View Submission <ArrowRight size={16} />
                     </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
