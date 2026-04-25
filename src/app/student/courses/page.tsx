"use client";

import { motion } from "motion/react";
import { Sidebar } from "../../components/Sidebar";
import { BookOpen, Clock, ChevronRight, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyCourses() {
  const router = useRouter();

  const courses = [
    {
      id: "1",
      title: "UI/UX Design Masterclass",
      tutor: "Sarah O.",
      progress: 75,
      totalModules: 12,
      completedModules: 9,
      status: "In Progress"
    },
    {
      id: "2",
      title: "Data Analysis Essentials",
      tutor: "Mike J.",
      progress: 30,
      totalModules: 10,
      completedModules: 3,
      status: "In Progress"
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#fdf8f5] dark:bg-slate-950 md:p-6 lg:p-8 transition-colors duration-300">
      <div className="flex-1 flex bg-white dark:bg-slate-900 md:rounded-[2.5rem] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-orange-50/50 dark:border-slate-800">
        <Sidebar userType="student" />

        <main className="flex-1 overflow-y-auto">
          <header className="bg-white dark:bg-slate-900 border-b border-border pl-6 pr-20 md:px-10 py-6 md:py-8 sticky top-0 z-20 flex justify-between items-center text-foreground transition-colors">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">My Courses</h1>
            <p className="text-muted-foreground font-medium">Continue your learning journey.</p>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 md:space-y-10">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {courses.map((course, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => router.push(`/course/${course.id}`)}
                className="group cursor-pointer bg-background p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:border-primary transition-all"
              >
                <div className="flex justify-between items-start mb-6 md:mb-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-secondary/10 flex items-center justify-center text-primary shadow-sm">
                    <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] uppercase font-black tracking-widest">
                    {course.status}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-black mb-1 md:mb-2 tracking-tight group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground font-medium mb-6 md:mb-8">Tutor: {course.tutor}</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Course Progress</span>
                    <span className="text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                       <PlayCircle size={14} className="text-secondary" />
                       <span>{course.completedModules} / {course.totalModules} Modules</span>
                    </div>
                    <ChevronRight size={20} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                  </div>
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
