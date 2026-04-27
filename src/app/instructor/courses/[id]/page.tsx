"use client";

import { useState } from "react";
import { Sidebar } from "../../../components/Sidebar";
import { 
  BookOpen, Users, Video, FileText, Calendar, 
  Upload, Link as LinkIcon, Plus, Play, ChevronLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function InstructorCourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // Form states
  const [classDate, setClassDate] = useState("");
  const [classTime, setClassTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  const handleScheduleClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classDate || !classTime || !meetingLink) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Live class scheduled successfully!");
    setClassDate("");
    setClassTime("");
    setMeetingLink("");
  };

  return (
    <div className="flex min-h-screen bg-muted/30 dark:bg-background">
      <Sidebar userType="instructor" />

      <main className="flex-1 overflow-y-auto pb-20">
        <header className="bg-background border-b border-border px-4 md:px-8 py-4 md:py-6 pr-16 md:pr-8 sticky top-0 z-20 flex items-center gap-4 text-foreground">
          <button 
            onClick={() => router.push('/instructor/courses')}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted text-muted-foreground transition-colors shrink-0"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="overflow-hidden">
            <h1 className="text-xl md:text-2xl font-black tracking-tight truncate">UI/UX Design Masterclass</h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium truncate">Manage your course content and schedule.</p>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8">
          
          {/* Tabs */}
          <div className="flex gap-2 md:gap-4 border-b border-border overflow-x-auto no-scrollbar pb-1">
            {[
              { id: "overview", label: "Overview", icon: BookOpen },
              { id: "live", label: "Live Classes", icon: Calendar },
              { id: "videos", label: "Recordings", icon: Play },
              { id: "materials", label: "Materials", icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-4 font-bold text-xs md:text-sm uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10">
                  <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <BookOpen className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black mb-2 md:mb-4">UI/UX Design Masterclass</h2>
                      <p className="text-sm md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed max-w-3xl">
                        Learn advanced UI/UX principles, practical application in Figma, and how to build production-ready design systems from scratch.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-6">
                         <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted font-bold text-xs md:text-sm text-foreground">
                            <Users size={18} className="text-primary shrink-0" />
                            <span>45 Enrolled Students</span>
                         </div>
                         <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted font-bold text-xs md:text-sm text-foreground">
                            <Video size={18} className="text-primary shrink-0" />
                            <span>12 Recorded Lessons</span>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Live Classes Tab */}
            {activeTab === "live" && (
              <div className="space-y-6 md:space-y-8">
                <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10">
                  <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2">Schedule New Class</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-6 md:mb-8">Schedule sessions and share access with your students.</p>
                  
                  <form onSubmit={handleScheduleClass} className="space-y-4 md:space-y-6 max-w-2xl">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-muted-foreground">Date</label>
                        <input 
                          type="date" 
                          value={classDate}
                          onChange={(e) => setClassDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-muted-foreground">Time</label>
                        <input 
                          type="time" 
                          value={classTime}
                          onChange={(e) => setClassTime(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground">Meeting Link (Zoom/Teams)</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input 
                          type="url" 
                          placeholder="https://zoom.us/j/..."
                          value={meetingLink}
                          onChange={(e) => setMeetingLink(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium"
                        />
                      </div>
                    </div>
                    <button type="submit" className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors">
                      Create Class
                    </button>
                  </form>
                </div>

                <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10">
                   <h3 className="text-lg md:text-xl font-black tracking-tight mb-4 md:mb-6">Upcoming Classes</h3>
                   <div className="space-y-4">
                      {[
                        { title: "Introduction to Auto Layout", date: "Oct 24, 2026", time: "10:00 AM" },
                        { title: "Design Systems & Variables", date: "Oct 26, 2026", time: "02:00 PM" }
                      ].map((cls, i) => (
                        <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 bg-muted/30 rounded-2xl border border-border gap-4">
                           <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                                 <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                              </div>
                              <div className="truncate">
                                 <h4 className="font-bold text-sm md:text-lg truncate">{cls.title}</h4>
                                 <p className="text-xs md:text-sm text-muted-foreground font-medium">{cls.date} • {cls.time}</p>
                              </div>
                           </div>
                           <button className="w-full sm:w-auto px-6 py-2.5 md:py-2 bg-white dark:bg-slate-800 text-primary dark:text-white rounded-lg font-bold text-xs md:text-sm shadow-sm border border-border hover:bg-muted transition-colors">
                             Start Now
                           </button>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {/* Recorded Videos Tab */}
            {activeTab === "videos" && (
              <div className="space-y-6 md:space-y-8">
                <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 md:mb-6">
                    <Video className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2">Upload Recorded Lessons</h3>
                  <p className="text-xs md:text-sm text-muted-foreground max-w-md mb-6 md:mb-8">Upload class recordings for students to revisit anytime.</p>
                  <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 md:py-4 bg-primary text-white rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                    <Upload size={18} />
                    Upload Video
                  </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-background border border-border rounded-2xl overflow-hidden group">
                         <div className="aspect-video bg-muted relative flex items-center justify-center group-hover:bg-primary/5 transition-colors cursor-pointer">
                            <Play className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
                         </div>
                         <div className="p-4">
                            <h4 className="font-bold mb-1">Session {i}: Typography Deep Dive</h4>
                            <p className="text-xs text-muted-foreground font-medium">Uploaded 2 days ago • 1h 24m</p>
                         </div>
                      </div>
                   ))}
                </div>
              </div>
            )}

            {/* Materials Tab */}
            {activeTab === "materials" && (
              <div className="space-y-6 md:space-y-8">
                <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 md:mb-6">
                    <FileText className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2">Course Materials</h3>
                  <p className="text-xs md:text-sm text-muted-foreground max-w-md mb-6 md:mb-8">Share notes, PDFs, and learning materials.</p>
                  <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 md:py-4 bg-primary text-white rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                    <Upload size={18} />
                    Upload Resource
                  </button>
                </div>

                <div className="space-y-4">
                   {[
                     { name: "Week 1 - Intro to Figma.pdf", size: "2.4 MB", type: "PDF" },
                     { name: "Color Theory Guide.pdf", size: "1.8 MB", type: "PDF" },
                     { name: "Starter Assets.zip", size: "15 MB", type: "ZIP" },
                   ].map((mat, i) => (
                     <div key={i} className="flex items-center justify-between p-6 bg-background rounded-2xl border border-border hover:border-primary transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                              <FileText size={24} />
                           </div>
                           <div>
                              <h4 className="font-bold">{mat.name}</h4>
                              <p className="text-sm text-muted-foreground font-medium">{mat.type} • {mat.size}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
