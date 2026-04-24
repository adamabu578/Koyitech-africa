"use client";

import { motion } from "motion/react";
import { Sidebar } from "../components/Sidebar";
import { 
  BookOpen, Clock, Target, 
  Play, FileText, MessageSquare, 
  Calendar, CheckCircle2, ChevronRight,
  Zap, Award, Rocket
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  if (!user) return null;

  const stats = [
    { label: "Enrolled Courses", value: "3", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Upcoming Classes", value: "2", icon: Calendar, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Pending Assignments", value: "5", icon: Clock, color: "text-rose-500", bg: "bg-rose-500/10" },
    { label: "Completed Courses", value: "1", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  const quickActions = [
    { label: "Join Next Class", icon: Play, path: "/student/classes", color: "bg-primary" },
    { label: "View Assignments", icon: Target, path: "/student/assignments", color: "bg-secondary" },
    { label: "Access Materials", icon: FileText, path: "/student/materials", color: "bg-slate-800" },
    { label: "Contact Tutor", icon: MessageSquare, path: "/student/messages", color: "bg-blue-600" },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar userType="student" />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-background border-b border-border px-8 py-6 sticky top-0 z-20 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Welcome back, <span className="text-primary font-bold">{user?.firstName}</span></h1>
            <p className="text-muted-foreground font-medium">Continue building your skills and stay on track with your courses.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{user?.firstName} {user?.lastName?.charAt(0)}.</p>
                <p className="text-xs text-muted-foreground">ID: #{user?.id?.slice(-6) || "000000"}</p>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black border border-primary/20 uppercase">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
             </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-7xl mx-auto space-y-10">
          
          {/* Welcome Card */}
          <div className="bg-primary rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
             <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent" />
             <div className="relative z-10 space-y-6 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold border border-white/20">
                   <Zap className="w-4 h-4 fill-secondary text-secondary" />
                   Premium Member
                </div>
                <h2 className="text-4xl md:text-5xl font-black leading-tight">
                   Redefine Your <span className="text-secondary italic">Career</span> Future.
                </h2>
                <p className="text-lg text-white/80 font-medium">
                   Continue building your skills and stay on track with your courses.
                </p>
                <button 
                  onClick={() => router.push("/student/classes")}
                  className="bg-white text-primary px-8 py-4 rounded-2xl font-black shadow-xl shadow-black/10 hover:scale-105 transition-all text-sm uppercase tracking-widest flex items-center gap-3"
                >
                   Jump into Next Class
                   <ChevronRight className="w-5 h-5" />
                </button>
             </div>
             {/* Abstract Visual */}
             <div className="hidden lg:block absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/30 rounded-full blur-[100px]" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
             {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background p-8 rounded-[2rem] border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                >
                   <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} mb-6 group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-7 h-7" />
                   </div>
                   <p className="text-muted-foreground font-black text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                   <h3 className="text-3xl font-black">{stat.value}</h3>
                </motion.div>
             ))}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
             <h3 className="text-xl font-black tracking-tight px-2">Quick Actions</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {quickActions.map((action, i) => (
                   <button
                     key={i}
                     onClick={() => router.push(action.path)}
                     className="group flex flex-col items-center gap-4 p-8 bg-background border border-border rounded-3xl hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/5"
                   >
                      <div className={`w-16 h-16 rounded-2xl ${action.color} flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform`}>
                         <action.icon className="w-8 h-8" />
                      </div>
                      <span className="font-bold text-sm tracking-tight text-center">{action.label}</span>
                   </button>
                ))}
             </div>
          </div>

          {/* My Courses Summary */}
          <div className="grid md:grid-cols-2 gap-10">
             <div className="bg-background rounded-[2.5rem] border border-border overflow-hidden shadow-sm p-10 space-y-8">
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-black tracking-tight">Active Courses</h3>
                   <button className="text-primary font-bold text-sm hover:underline">View All</button>
                </div>
                
                <div className="space-y-6">
                   {[
                     { title: "UI/UX Design Masterclass", progress: 75, tutor: "Sarah O.", icon: Award },
                     { title: "Data Analysis Essentials", progress: 30, tutor: "Mike J.", icon: Rocket },
                   ].map((course, i) => (
                      <div key={i} className="group p-6 rounded-3xl bg-muted/30 border border-transparent hover:border-border hover:bg-muted/50 transition-all">
                         <div className="flex justify-between items-start mb-6">
                            <div className="flex gap-4">
                               <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                                  <course.icon className="w-6 h-6" />
                               </div>
                               <div>
                                  <h4 className="font-bold">{course.title}</h4>
                                  <p className="text-xs text-muted-foreground">Tutor: {course.tutor}</p>
                               </div>
                            </div>
                            <span className="text-xs font-black text-primary">{course.progress}%</span>
                         </div>
                         <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${course.progress}%` }}
                               className="h-full bg-primary"
                            />
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             <div className="bg-[#181059] rounded-[2.5rem] p-10 text-white space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.2),transparent)]" />
                <h3 className="text-2xl font-black tracking-tight relative z-10">Upcoming Classes</h3>
                
                <div className="space-y-6 relative z-10">
                   {[
                     { time: "10:00 AM", date: "Today", subject: "UI Design Principles", link: "#" },
                     { time: "02:00 PM", date: "Tomorrow", subject: "Data Visualization", link: "#" },
                   ].map((session, i) => (
                      <div key={i} className="flex gap-6 items-center p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                         <div className="text-center shrink-0 border-r border-white/20 pr-6">
                            <p className="text-xs font-black uppercase text-secondary tracking-widest">{session.date}</p>
                            <p className="text-lg font-bold">{session.time}</p>
                         </div>
                         <div className="flex-1">
                            <h4 className="font-bold mb-1">{session.subject}</h4>
                            <button className="text-xs font-bold text-primary-foreground/60 hover:text-white flex items-center gap-1 transition-colors">
                               Set Reminder <ChevronRight className="w-3 h-3" />
                            </button>
                         </div>
                         <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                         </button>
                      </div>
                   ))}
                </div>
                
                <div className="p-8 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 relative z-10">
                   <p className="text-sm font-medium opacity-80 mb-4">Did you know? Tutor-led students are 4x more likely to finish their courses.</p>
                   <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Get More Pro Tips</button>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
