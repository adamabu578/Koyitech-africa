"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { 
  Calendar, Plus, Clock, Video, ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../../lib/supabase";

export default function InstructorClasses() {
  const [activeTab, setActiveTab] = useState("classes");
  const [classes, setClasses] = useState<any[]>([]);

  // Create Class State
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const defaultClasses = [
    {
      course: "UI/UX Design Masterclass",
      topic: "Prototyping in Figma",
      tutor: "Current User",
      date: "Mon, April 24, 2026",
      time: "10:00 AM - 12:00 PM (WAT)",
      status: "Upcoming"
    },
    {
      course: "Data Analysis Essentials",
      topic: "Introduction to SQL",
      tutor: "Current User",
      date: "Tue, April 25, 2026",
      time: "2:00 PM - 4:00 PM (WAT)",
      status: "Upcoming"
    }
  ];

  const fetchClasses = async () => {
    const { data, error } = await supabase.from('classes').select('*').order('created_at', { ascending: false });
    if (data) {
      const mapped = data.map((item: any) => ({
        course: item.course,
        topic: item.topic,
        tutor: item.tutor_name || "Tutor",
        date: item.date,
        time: item.time,
        status: item.status
      }));
      setClasses([...mapped, ...defaultClasses]);
    } else {
      setClasses(defaultClasses);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !date || !time) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    // Formatting date 
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

    const { data, error } = await supabase.from('classes').insert([
      {
        course: "General Course",
        topic,
        date: formattedDate,
        time: time + " (WAT)",
        status: "Upcoming",
        tutor_name: "Current User"
      }
    ]).select();

    if (data && data.length > 0) {
      const newClass = {
        course: data[0].course,
        topic: data[0].topic,
        tutor: data[0].tutor_name,
        date: data[0].date,
        time: data[0].time,
        status: data[0].status
      };
      setClasses([newClass, ...classes]);
    }

    toast.success("Meeting scheduled successfully!");
    setTopic("");
    setDate("");
    setTime("");
    setActiveTab("classes");
  };

  return (
    <div className="flex min-h-screen bg-muted/30 dark:bg-background">
      <Sidebar userType="instructor" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-4 md:px-8 py-4 md:py-6 pr-16 md:pr-8 sticky top-0 z-20 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-foreground">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">Classes & Meetings</h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Manage course classes and schedule new meetings.</p>
          </div>
          <button 
            onClick={() => setActiveTab("create")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all text-xs md:text-sm uppercase tracking-widest shadow-lg shadow-primary/20 w-full sm:w-auto"
          >
            <Plus size={18} />
            Schedule Meeting
          </button>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
          
          {/* Tabs */}
          <div className="flex gap-2 md:gap-4 border-b border-border overflow-x-auto no-scrollbar pb-1">
            {[
              { id: "classes", label: "Scheduled Classes" },
              { id: "create", label: "Schedule Meeting" },
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
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {/* Classes List Tab */}
            {activeTab === "classes" && (
              <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                {classes.map((cls, index) => (
                  <div 
                    key={index}
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
                    </div>
                    
                    <div className="space-y-6 mt-6">
                       <div className="bg-muted p-4 rounded-2xl space-y-3">
                          <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                             <Calendar size={16} className="text-primary"/> {cls.date}
                          </div>
                          <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                             <Clock size={16} className="text-primary"/> {cls.time}
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Create Class Tab */}
            {activeTab === "create" && (
              <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 max-w-3xl">
                <h2 className="text-xl md:text-2xl font-black mb-6 md:mb-8">Schedule a Meeting</h2>
                <form onSubmit={handleCreateClass} className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Meeting Topic</label>
                    <input 
                      type="text" 
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g. Q&A Session for Module 2"
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium text-sm md:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Date</label>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium text-sm md:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Time (e.g. 10:00 AM - 12:00 PM)</label>
                    <input 
                      type="text" 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g. 10:00 AM - 12:00 PM"
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium text-sm md:text-base"
                    />
                  </div>
                  <div className="pt-2 md:pt-4">
                    <button type="submit" className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                      Schedule Meeting
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
