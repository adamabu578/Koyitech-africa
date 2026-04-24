"use client";

import { motion } from "motion/react";
import { Sidebar } from "../components/Sidebar";
import { 
  Users, BookOpen, Plus, TrendingUp, 
  Settings, BarChart3, GraduationCap,
  Calendar, Shield, Search, Filter,
  MoreVertical, ArrowUpRight, DollarSign,
  PieChart
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
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
    { label: "Total Students", value: "1,248", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+12%" },
    { label: "Total Tutors", value: "32", icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-500/10", trend: "+4%" },
    { label: "Active Courses", value: "11", icon: BookOpen, color: "text-amber-500", bg: "bg-amber-500/10", trend: "0%" },
    { label: "Ongoing Classes", value: "8", icon: Calendar, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "+2" },
  ];

  const recentSignups = [
    { name: "John Doe", email: "john@example.com", date: "2 mins ago", course: "UI/UX Design" },
    { name: "Sarah Smith", email: "sarah@example.com", date: "15 mins ago", course: "Data Analysis" },
    { name: "Mike Johnson", email: "mike@example.com", date: "1 hour ago", course: "Web Development" },
    { name: "Emily Brown", email: "emily@example.com", date: "3 hours ago", course: "GIS Masterclass" },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar userType="admin" />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-background border-b border-border px-8 py-6 sticky top-0 z-20 flex justify-between items-center text-foreground">
          <div className="flex items-center gap-6">
             <div>
                <h1 className="text-2xl font-black tracking-tight">Super Admin</h1>
                <p className="text-muted-foreground font-medium text-sm">Control center for Aeroverse Academy.</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search anything..." 
                  className="pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border outline-none focus:border-primary transition-all text-sm w-64"
                />
             </div>
             <div className="w-12 h-12 rounded-2xl bg-[#181059] flex items-center justify-center text-white">
                <Shield size={20} />
             </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-10">
          
          {/* Main Hero Card */}
          <div className="bg-[#181059] rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.2),transparent)]" />
             <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                   <h2 className="text-4xl md:text-5xl font-black leading-tight">
                      Welcome, <span className="text-primary italic">{user?.firstName}.</span>
                   </h2>
                   <p className="text-lg text-white/60 font-medium max-w-lg">
                      Manage the entire Aeroverse Academy platform.
                   </p>
                </div>
                <div className="flex flex-wrap gap-4">
                   <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all text-xs uppercase tracking-widest flex items-center gap-3">
                      <BarChart3 className="w-5 h-5" /> Generate Report
                   </button>
                   <button className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl font-black hover:bg-white/20 transition-all text-xs uppercase tracking-widest flex items-center gap-3">
                      <Settings className="w-5 h-5" /> System Settings
                   </button>
                </div>
             </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
             {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background p-8 rounded-[2rem] border border-border shadow-sm hover:shadow-xl transition-all group"
                >
                   <div className="flex justify-between items-start mb-6">
                      <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                         <stat.icon className="w-7 h-7" />
                      </div>
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">{stat.trend}</span>
                   </div>
                   <p className="text-muted-foreground font-black text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
                   <h3 className="text-3xl font-black">{stat.value}</h3>
                </motion.div>
             ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
             {/* Main Management Section */}
             <div className="lg:col-span-2 space-y-8">
                <div className="flex justify-between items-center px-2">
                   <h3 className="text-2xl font-black tracking-tight">Quick Actions</h3>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                   {[
                     { label: "Add Course", desc: "Create a new course catalog.", icon: BookOpen, color: "bg-amber-500", action: "Create" },
                     { label: "Add Tutor", desc: "Onboard new instructors.", icon: GraduationCap, color: "bg-purple-500", action: "Add" },
                     { label: "Assign Tutor", desc: "Link courses to tutors.", icon: Users, color: "bg-blue-500", action: "Assign" },
                     { label: "View Reports", desc: "System and sales analytics.", icon: BarChart3, color: "bg-emerald-500", action: "View" },
                   ].map((item, i) => (
                      <button key={i} className="group p-8 bg-background border border-border rounded-[2.5rem] text-left hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/5">
                         <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
                            <item.icon size={28} />
                         </div>
                         <h4 className="text-xl font-bold mb-1">{item.label}</h4>
                         <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                         <div className="pt-4 border-t border-border flex justify-between items-center">
                            <span className="text-xs font-black uppercase tracking-widest">{item.action}</span>
                            <ArrowUpRight className="text-primary w-5 h-5 opacity-0 group-hover:opacity-100 transition-all font-black" />
                         </div>
                      </button>
                   ))}
                </div>
             </div>

             {/* Recent Activities */}
             <div className="space-y-8 text-foreground">
                <div className="flex justify-between items-center px-2">
                   <h3 className="text-2xl font-black tracking-tight">Recent Signups</h3>
                </div>
                
                <div className="bg-background rounded-[2.5rem] border border-border overflow-hidden p-2">
                   <div className="space-y-1">
                      {recentSignups.map((user, i) => (
                         <div key={i} className="p-6 rounded-3xl hover:bg-muted/50 transition-all flex items-center justify-between gap-4">
                            <div className="flex gap-4 items-center">
                               <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                               </div>
                               <div>
                                  <p className="font-bold text-sm tracking-tight">{user.name}</p>
                                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tight">{user.course}</p>
                               </div>
                            </div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase">{user.date}</span>
                         </div>
                      ))}
                   </div>
                   <button className="w-full py-4 mt-2 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-2xl transition-all">
                      View Full Activity Log
                   </button>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/20 p-8 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/50 space-y-4">
                   <div className="flex items-center gap-3 text-primary">
                      <PieChart size={24} />
                      <h4 className="font-bold">System Health</h4>
                   </div>
                   <p className="text-sm text-muted-foreground font-medium">All systems operational. Payment gateway (Paystack) responding normally.</p>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
