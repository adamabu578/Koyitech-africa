"use client";

import { motion, AnimatePresence } from "motion/react";
import { useRouter, useParams } from "next/navigation";
import { 
  ArrowLeft, Video, Download, FileText, 
  BookOpen, Play, CheckSquare, PencilLine, 
  TrendingUp, MessageSquare, ExternalLink,
  ChevronRight, ListChecks, Calendar, Clock,
  Upload, Target
} from "lucide-react";
import React, { useState } from "react";

export default function CourseDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const course = {
    title: "UI/UX Design Masterclass",
    instructor: "Sarah O.",
    instructorBio: "Senior Product Designer with 8+ years of experience building products for global brands. Expert in Figma and design systems.",
    description: "Create digital experiences people love. Learn to design intuitive interfaces and user journeys for mobile apps and websites using industry-standard tools.",
    duration: "12 Weeks",
    outcomes: [
      "Master Figma and Framer",
      "Build a professional portfolio",
      "Understand User Psychology",
      "Design Systems & Handoff"
    ]
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "live", label: "Live Classes", icon: Calendar },
    { id: "recorded", label: "Recorded Lessons", icon: Play },
    { id: "materials", label: "Materials", icon: FileText },
    { id: "assignments", label: "Assignments", icon: CheckSquare },
    { id: "quiz", label: "Quizzes", icon: PencilLine },
    { id: "progress", label: "Your Progress", icon: TrendingUp },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-10">
             <div className="space-y-6">
                <h3 className="text-2xl font-bold tracking-tight">Course Overview</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{course.description}</p>
             </div>

             <div className="space-y-4 mt-8">
                <h4 className="font-bold text-lg">Learning Outcomes</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                   {course.outcomes.map((outcome, i) => (
                      <li key={i}>{outcome}</li>
                   ))}
                </ul>
             </div>
             
             <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 bg-background border border-border rounded-3xl">
                   <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-primary">Tutor</h4>
                   <div className="flex gap-4 items-center mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center font-black">SO</div>
                      <div>
                         <p className="font-bold text-lg">{course.instructor}</p>
                         <p className="text-sm text-muted-foreground">Expert Mentor</p>
                      </div>
                   </div>
                   <p className="text-sm text-muted-foreground leading-relaxed mb-6">{course.instructorBio}</p>
                   <button className="w-full py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" /> Message Tutor
                   </button>
                </div>

                <div className="p-8 bg-background border border-border rounded-3xl space-y-6">
                   <h4 className="font-black uppercase tracking-widest text-xs text-primary">Details</h4>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                         <span className="text-muted-foreground font-medium">Duration</span>
                         <span className="font-bold">{course.duration}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                         <span className="text-muted-foreground font-medium">Lessons</span>
                         <span className="font-bold">24 Sessions</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                         <span className="text-muted-foreground font-medium">Students</span>
                         <span className="font-bold">45 Mentorees</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        );
      case "live":
        return (
          <div className="space-y-8">
             <div className="p-8 bg-primary text-white rounded-3xl relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                   <h3 className="text-2xl font-bold">Upcoming Live Classes</h3>
                   <p className="opacity-80">Join your scheduled sessions and interact with your tutor in real time.</p>
                </div>
                <div className="absolute right-0 bottom-0 p-4 opacity-20"><Video size={100} /></div>
             </div>
             
             {[
               { id: 1, title: "Visual Hierarchy & Layout", time: "10:00 AM", date: "April 26, 2026", status: "Live Soon" },
               { id: 2, title: "Wireframing Workshop", time: "02:00 PM", date: "April 28, 2026", status: "Scheduled" },
             ].map((session, i) => (
                <div key={i} className="flex flex-wrap items-center justify-between p-8 bg-background border border-border rounded-3xl gap-6 group hover:border-primary transition-all">
                   <div className="flex gap-6 items-center">
                      <div className="w-14 h-14 rounded-2xl bg-muted flex flex-col items-center justify-center text-center">
                         <p className="text-[10px] font-black uppercase text-primary">Apr</p>
                         <p className="text-lg font-black leading-none">26</p>
                      </div>
                      <div>
                         <h4 className="text-lg font-bold mb-1">{session.title}</h4>
                         <p className="text-sm text-muted-foreground flex items-center gap-2"><Clock size={14} /> {session.time} (Wat)</p>
                      </div>
                   </div>
                   <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 group-hover:scale-105 transition-all flex items-center gap-2">
                      Join Meeting <ExternalLink size={16} />
                   </button>
                </div>
             ))}
          </div>
        );
      case "recorded":
        return (
          <div className="space-y-8">
             <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-bold tracking-tight">Recorded Lessons</h3>
                <p className="text-muted-foreground font-medium">Access past classes and learn at your own pace.</p>
             </div>
             <div className="grid sm:grid-cols-2 gap-8">
                {[1,2,3,4].map(i => (
                   <div key={i} className="group cursor-pointer">
                      <div className="aspect-video rounded-3xl bg-[#181059] mb-4 overflow-hidden relative border border-border">
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                               <Play className="w-6 h-6 fill-white" />
                            </div>
                         </div>
                         <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white text-[10px] uppercase font-black tracking-widest opacity-60">
                            <span>Lesson {i}</span>
                            <span>45:32</span>
                         </div>
                      </div>
                      <h4 className="font-bold group-hover:text-primary transition-colors">Digital Design Foundations Part {i}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Recorded on April {20-i}, 2026</p>
                   </div>
                ))}
             </div>
          </div>
        );
      case "materials":
        return (
          <div className="space-y-8">
             <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-bold tracking-tight">Learning Materials</h3>
                <p className="text-muted-foreground font-medium">Download notes, guides, and resources for your course.</p>
             </div>
             <div className="space-y-4">
                {[
                  { name: "UI Design Handbook", size: "12.5 MB", type: "PDF" },
                  { name: "Color Palette Cheat Sheet", size: "2.1 MB", type: "PNG" },
                  { name: "Figma Component Library", size: "45.0 MB", type: "Zip" },
                ].map((file, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-background border border-border rounded-3xl hover:bg-muted/30 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <FileText size={24} />
                         </div>
                         <div>
                            <h4 className="font-bold">{file.name}</h4>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">{file.type} • {file.size}</p>
                         </div>
                      </div>
                      <button className="p-4 bg-muted hover:bg-primary hover:text-white rounded-2xl transition-all">
                         <Download size={20} />
                      </button>
                   </div>
                ))}
             </div>
          </div>
        );
      case "assignments":
        return (
          <div className="space-y-8">
             <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-bold tracking-tight">Assignments</h3>
                <p className="text-muted-foreground font-medium">Practice what you’ve learned and submit your work.</p>
             </div>
             <div className="space-y-6">
                {[
                  { title: "Landing Page Wireframing", deadline: "May 2, 2026", status: "Pending" },
                  { title: "Visual Style Guide", deadline: "April 25, 2026", status: "Completed" },
                ].map((assign, i) => (
                   <div key={i} className="p-8 bg-background border border-border rounded-3xl">
                      <div className="flex justify-between items-start mb-6">
                         <div>
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${assign.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                               {assign.status}
                            </span>
                            <h4 className="text-xl font-bold mt-3">{assign.title}</h4>
                            <p className="text-sm text-muted-foreground mt-2">Design a wireframe for a real estate landing page following the principles discussed in class.</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Deadline</p>
                            <p className="text-sm font-bold">{assign.deadline}</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <button className="flex-1 py-4 bg-muted hover:bg-border rounded-xl font-black text-xs uppercase tracking-widest transition-all">View Instructions</button>
                         <button className="flex-1 py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                            <Upload size={16} /> Upload Work
                         </button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        );
      case "quiz":
        return (
          <div className="space-y-10 text-center py-10">
             <div className="w-24 h-24 rounded-[2rem] bg-secondary flex items-center justify-center mx-auto text-primary shadow-xl shadow-secondary/20 rotate-6">
                <PencilLine size={40} />
             </div>
             <div className="space-y-4 max-w-sm mx-auto mb-8">
                <h3 className="text-3xl font-black">Quizzes & Tests</h3>
                <p className="text-muted-foreground font-medium">Test your understanding and track your progress.</p>
             </div>
             <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <button className="w-full py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-all">
                   Start Quiz
                </button>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">15 Questions • 20 Minutes</p>
             </div>
          </div>
        );
      case "progress":
        return (
          <div className="space-y-10">
             <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-bold tracking-tight">Your Progress</h3>
                <p className="text-muted-foreground font-medium">Track your performance and stay motivated.</p>
             </div>
             <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-[#181059] text-white relative overflow-hidden">
                   <div className="relative z-10 space-y-6">
                      <p className="text-xs font-black uppercase tracking-widest opacity-60">Overall Course Progress</p>
                      <h3 className="text-6xl font-black">75%</h3>
                      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-secondary w-3/4 shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
                      </div>
                      <p className="text-sm font-medium opacity-80">You've completed 18 out of 24 sessions. Keep it up!</p>
                   </div>
                </div>
                <div className="p-8 rounded-3xl border border-border bg-background space-y-8">
                   <div className="flex justify-between items-center">
                      <h4 className="font-bold">Next Milestone</h4>
                      <TrendingUp className="text-primary" />
                   </div>
                   <div className="space-y-4">
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Target size={20} />
                         </div>
                         <div>
                            <p className="font-bold">Course Certificate</p>
                            <p className="text-xs text-muted-foreground">Complete all modules to unlock</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="space-y-6">
                <h4 className="text-xl font-black tracking-tight">Recent Activity</h4>
                <div className="space-y-4">
                   {[
                     { task: "Completed Quiz: User Psychology", score: "92/100", date: "2 hours ago" },
                     { task: "Attended Live Class: Visual Hierarchy", score: "Present", date: "Yesterday" },
                   ].map((act, i) => (
                      <div key={i} className="flex justify-between items-center p-6 bg-muted/30 border border-transparent hover:border-border rounded-2xl transition-all">
                         <div className="flex gap-4 items-center">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <div>
                               <p className="font-bold text-sm tracking-tight">{act.task}</p>
                               <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">{act.date}</p>
                            </div>
                         </div>
                         <span className="text-sm font-black text-primary">{act.score}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Sidebar - desktop hidden for simplicity in this view but should be there */}
      <div className="hidden lg:block w-72 bg-card border-r border-border h-screen sticky top-0 py-8">
         {/* ... (Sidebar component would be here) ... */}
         <div className="px-8 mb-10">
            <div className="text-xl font-black tracking-tighter flex items-center gap-2 cursor-pointer" onClick={() => router.push("/student")}>
               <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white italic text-xs">AA</div>
               AEROVERSE
            </div>
         </div>
         <div className="px-4 space-y-1">
            {tabs.map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
                   activeTab === tab.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-muted"
                 }`}
               >
                  <tab.icon size={18} />
                  {tab.label}
               </button>
            ))}
         </div>
      </div>

      <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <nav className="h-20 bg-background border-b border-border sticky top-0 z-40 px-8 flex items-center justify-between">
             <button
                onClick={() => router.push("/student")}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs font-black uppercase tracking-widest"
             >
                <ArrowLeft className="w-4 h-4" />
                Return to Dashboard
             </button>
             <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all">
                   <MessageSquare size={20} />
                </button>
                <div className="w-10 h-10 rounded-full bg-slate-200" />
             </div>
          </nav>

          {/* Main Hero Header */}
          <div className="bg-background px-8 py-12 md:px-12 border-b border-border">
             <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                  <span>Development</span>
                  <span className="opacity-30">•</span>
                  <span>UI/UX Design</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight italic">{course.title}</h1>
                <div className="flex flex-wrap gap-6 items-center pt-2">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-primary font-black text-xs">SO</div>
                      <span className="text-sm font-bold">{course.instructor}</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-4 py-1.5 rounded-full border border-border">
                      <Clock size={16} className="text-primary" />
                      {course.duration}
                   </div>
                   <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-4 py-1.5 rounded-full border border-border">
                      <ListChecks size={16} className="text-primary" />
                      24 Sessions
                   </div>
                </div>
             </div>
          </div>

          {/* Tab Navigation - Mobile only scrollable */}
          <div className="lg:hidden bg-background sticky top-20 z-30 px-8 border-b border-border flex gap-8 overflow-x-auto no-scrollbar">
             {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-6 text-[10px] font-black uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${
                    activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                  }`}
                >
                   {tab.label}
                </button>
             ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 md:p-12">
             <div className="max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                   <motion.div
                     key={activeTab}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.3 }}
                   >
                      {renderContent()}
                   </motion.div>
                </AnimatePresence>
             </div>
          </div>
      </div>
    </div>
  );
}
