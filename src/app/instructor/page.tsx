"use client";

import { motion } from "motion/react";
import { Sidebar } from "../components/Sidebar";
import { 
  Users, BookOpen, Plus, TrendingUp, 
  Activity, Edit3, Trash2, Mail, 
  ExternalLink, GraduationCap, Clock,
  Calendar, CheckSquare, MessageSquare,
  Upload, Play, FileText, Target, ChevronRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function InstructorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!user) return null;

  const stats = [
    { label: "Assigned Courses", value: "3", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Students", value: "158", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Upcoming Classes", value: "4", icon: Calendar, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Pending Assignments", value: "24", icon: CheckSquare, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  const quickActions = [
    { label: "Schedule a Class", icon: Calendar, path: "/instructor/classes", color: "bg-primary" },
    { label: "Upload Material", icon: Upload, path: "/instructor/materials", color: "bg-secondary" },
    { label: "Review Assignments", icon: Target, path: "/instructor/assignments", color: "bg-slate-800" },
    { label: "Message Students", icon: MessageSquare, path: "/instructor/messages", color: "bg-blue-600" },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar userType="instructor" />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-background border-b border-border px-4 md:px-8 py-4 md:py-6 pr-16 md:pr-8 sticky top-0 z-20 flex justify-between items-center text-foreground">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">Tutor Portal</h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Manage your students and classes.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{user?.firstName} {user?.lastName?.charAt(0)}.</p>
                <p className="text-xs text-muted-foreground">Expert Mentor</p>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-primary font-black border border-secondary/20 uppercase">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
             </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-10">
          
          {/* Welcome Section */}
          <div className="bg-[#181059] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-14 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.2),transparent)]" />
             <div className="relative z-10 space-y-4 md:space-y-6 max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-black leading-tight">
                   Welcome, <span className="text-primary italic">{user?.firstName}.</span>
                </h2>
                <p className="text-sm md:text-lg text-white/60 font-medium max-w-lg">
                   Manage your students, classes, and course content from here.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
                   <button className="w-full sm:w-auto justify-center px-6 md:px-8 py-3.5 md:py-4 bg-primary text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-3">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                      View Schedule
                   </button>
                   <button className="w-full sm:w-auto justify-center px-6 md:px-8 py-3.5 md:py-4 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl font-black hover:bg-white/20 transition-all text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2">
                      Platform Reports
                   </button>
                </div>
             </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
             {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-border shadow-sm hover:shadow-xl transition-all group"
                >
                   <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6 md:w-7 md:h-7" />
                   </div>
                   <p className="text-muted-foreground font-black text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
                   <h3 className="text-3xl font-black">{stat.value}</h3>
                </motion.div>
             ))}
          </div>

          {/* Quick Actions */}
          <div className="space-y-4 md:space-y-6">
             <h3 className="text-lg md:text-xl font-black tracking-tight px-2">Quick Actions</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {quickActions.map((action, i) => (
                   <button
                     key={i}
                     onClick={() => router.push(action.path)}
                     className="group flex flex-col items-center gap-3 md:gap-4 p-6 md:p-8 bg-background border border-border rounded-3xl hover:border-primary transition-all shadow-sm hover:shadow-2xl hover:shadow-primary/5"
                   >
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${action.color} flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform`}>
                         <action.icon className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="font-bold text-sm tracking-tight text-center">{action.label}</span>
                   </button>
                ))}
             </div>
          </div>

          {/* Course & Student Management */}
          <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
             <div className="lg:col-span-2 space-y-6 md:space-y-8">
                <div className="flex justify-between items-center px-2">
                   <h3 className="text-xl md:text-2xl font-black tracking-tight">Active Courses</h3>
                   <button className="text-primary font-bold text-xs md:text-sm flex items-center gap-1 md:gap-2">Manage All <ChevronRight size={16} /></button>
                </div>
                
                <div className="space-y-4 md:space-y-6">
                   {[
                     { title: "UI/UX Design Masterclass", students: 45, nextClass: "Today, 10:00 AM", status: "Active" },
                     { title: "Visual Communication Basics", students: 38, nextClass: "Tomorrow, 02:00 PM", status: "Active" },
                   ].map((course, i) => (
                      <div key={i} className="p-6 md:p-8 bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] flex flex-col sm:flex-row flex-wrap sm:items-center justify-between gap-6 group hover:border-primary transition-all">
                         <div className="flex gap-4 md:gap-6 items-start sm:items-center w-full sm:w-auto">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-secondary/10 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform shrink-0">
                               <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <div>
                               <h4 className="text-lg md:text-xl font-black mb-1 md:mb-2">{course.title}</h4>
                               <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                  <span className="flex items-center gap-1.5"><Users size={14} className="text-primary" /> {course.students} Students</span>
                                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> Next: {course.nextClass}</span>
                               </div>
                            </div>
                         </div>
                         <div className="flex gap-3 w-full sm:w-auto">
                            <button className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all shrink-0">
                               <Edit3 size={20} />
                            </button>
                            <button className="flex-1 sm:flex-none px-6 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20">
                               Manage Course
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             <div className="space-y-6 md:space-y-8">
                <div className="flex justify-between items-center px-2">
                   <h3 className="text-xl md:text-2xl font-black tracking-tight">Recent Notifications</h3>
                </div>
                
                <div className="bg-background rounded-[2rem] md:rounded-[2.5rem] border border-border overflow-hidden p-2">
                   <div className="space-y-2">
                      {[
                        { title: "New Student Assigned", desc: "Chidi A. joined UI/UX Masterclass", time: "2m ago", type: "student" },
                        { title: "Assignment Submitted", desc: "Sarah O. submitted Landing Page Wireframe", time: "1h ago", type: "assignment" },
                        { title: "Class Reminder", desc: "Visual Comm. Basics starts in 30 mins", time: "3h ago", type: "class" },
                        { title: "Assignment Submitted", desc: "John D. submitted Mobile App Persona", time: "5h ago", type: "assignment" },
                      ].map((notif, i) => (
                         <div key={i} className="p-6 rounded-3xl hover:bg-muted/50 transition-all flex items-center justify-between gap-4 group">
                            <div className="flex gap-4 items-center">
                               <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                                  {notif.type === 'student' ? '👋' : notif.type === 'assignment' ? '📄' : '⏰'}
                               </div>
                               <div>
                                  <p className="font-bold text-sm">{notif.title}</p>
                                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tight line-clamp-1">{notif.desc}</p>
                               </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                               <span className="text-[10px] font-black text-muted-foreground uppercase">{notif.time}</span>
                               <button className="w-8 h-8 rounded-lg bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                  <ChevronRight size={16} />
                                </button>
                            </div>
                         </div>
                      ))}
                   </div>
                   <button className="w-full py-4 mt-2 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-2xl transition-all">
                      View All Notifications
                   </button>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
