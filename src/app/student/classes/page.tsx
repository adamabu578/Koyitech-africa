"use client";

import { motion } from "motion/react";
import { Sidebar } from "../../components/Sidebar";
import { Calendar, Clock, Video } from "lucide-react";

export default function Classes() {
  const classes = [
    {
      course: "UI/UX Design Masterclass",
      topic: "Prototyping in Figma",
      tutor: "Sarah O.",
      date: "Mon, April 24, 2026",
      time: "10:00 AM - 12:00 PM (WAT)",
      status: "Upcoming"
    },
    {
      course: "Data Analysis Essentials",
      topic: "Introduction to SQL",
      tutor: "Mike J.",
      date: "Tue, April 25, 2026",
      time: "2:00 PM - 4:00 PM (WAT)",
      status: "Upcoming"
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#fdf8f5] dark:bg-slate-950 md:p-6 lg:p-8 transition-colors duration-300">
      <div className="flex-1 flex bg-white dark:bg-slate-900 md:rounded-[2.5rem] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-orange-50/50 dark:border-slate-800">
        <Sidebar userType="student" />

        <main className="flex-1 overflow-y-auto">
          <header className="bg-white dark:bg-slate-900 border-b border-border px-4 md:px-8 py-4 md:py-6 sticky top-0 z-20 flex justify-between items-center text-foreground transition-colors">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">Classes</h1>
            <p className="text-muted-foreground font-medium">Join your scheduled sessions.</p>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 md:space-y-10">
          <h2 className="text-lg md:text-xl font-black mb-4 md:mb-6">Upcoming Live Classes</h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {classes.map((cls, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl md:rounded-[2rem] flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-primary transition-all group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {cls.status}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-primary">
                       <Video size={20} />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-1 md:mb-2 text-foreground">{cls.topic}</h3>
                  <p className="text-sm md:text-base font-bold text-muted-foreground mb-1">{cls.course}</p>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground mb-6 md:mb-8">Tutor: {cls.tutor}</p>
                </div>
                
                <div className="space-y-6">
                   <div className="bg-muted p-4 rounded-2xl space-y-3">
                      <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                         <Calendar size={16} className="text-primary"/> {cls.date}
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                         <Clock size={16} className="text-primary"/> {cls.time}
                      </div>
                   </div>

                    <button className="w-full py-3 md:py-4 bg-primary text-white rounded-lg md:rounded-xl font-black text-xs md:text-sm tracking-widest uppercase hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                     Join Class
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}
