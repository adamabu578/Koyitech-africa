"use client";

import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Search, Plus, BookOpen, Users, Clock, Edit3, Trash2, Video, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InstructorCourses() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    { id: 1, title: "UI/UX Design Masterclass", description: "Learn advanced UI/UX principles and practical application in Figma.", students: 45, status: "Active" },
    { id: 2, title: "Visual Communication Basics", description: "Introduction to visual hierarchy, typography, and color theory.", students: 38, status: "Active" },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30 dark:bg-background">
      <Sidebar userType="instructor" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-4 md:px-8 py-4 md:py-6 pr-16 md:pr-8 sticky top-0 z-20 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-foreground">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">My Courses</h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">View and manage the courses assigned to you.</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all text-xs md:text-sm uppercase tracking-widest shadow-lg shadow-primary/20 w-full sm:w-auto">
            <Plus size={18} />
            Create Course
          </button>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-background p-4 rounded-2xl border border-border">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 md:pl-12 pr-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <select className="w-full sm:w-auto px-4 py-3 rounded-xl bg-muted/50 border-none outline-none text-sm font-bold text-foreground">
                <option>All Status</option>
                <option>Active</option>
                <option>Draft</option>
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
            {courses.map((course) => (
              <div key={course.id} className="p-6 md:p-8 bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] flex flex-col gap-4 md:gap-6 group hover:border-primary transition-all shadow-sm">
                <div className="flex gap-4 md:gap-6 items-start">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm shrink-0">
                    <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-black mb-1 md:mb-2">{course.title}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Users size={14} className="text-primary" /> {course.students} Students</span>
                      <span className="flex items-center gap-1.5 text-green-500 bg-green-500/10 px-2 py-1 rounded-md">{course.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-auto pt-6 border-t border-border">
                   <button 
                     onClick={() => router.push(`/instructor/courses/${course.id}`)}
                     className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                   >
                     Manage Content
                   </button>
                   <button className="px-4 py-3 bg-muted rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                     <Edit3 size={18} />
                   </button>
                   <button className="px-4 py-3 bg-red-500/10 rounded-xl text-red-500 hover:bg-red-500/20 transition-colors">
                     <Trash2 size={18} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
