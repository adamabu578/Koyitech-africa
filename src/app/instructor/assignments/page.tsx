"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { 
  CheckSquare, Plus, FileText, ChevronRight, 
  MessageSquare, Star
} from "lucide-react";
import { toast } from "sonner";

export default function InstructorAssignments() {
  const [activeTab, setActiveTab] = useState("assignments");
  const [assignments, setAssignments] = useState<any[]>([]);

  // Create Assignment State
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [deadline, setDeadline] = useState("");

  const defaultAssignments = [
    { title: "Landing Page Wireframe", course: "UI/UX Design Masterclass", deadline: "Oct 28, 2026", submissions: 32, instruction: "Design a wireframe for a real estate landing page..." },
    { title: "Visual Style Guide", course: "Visual Communication Basics", deadline: "Nov 05, 2026", submissions: 15, instruction: "Create a comprehensive style guide..." },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("assignments");
    if (saved) {
      setAssignments([...JSON.parse(saved), ...defaultAssignments]);
    } else {
      setAssignments(defaultAssignments);
    }
  }, []);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !instructions || !deadline) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    const newAssignment = {
      title,
      course: "General Course",
      deadline,
      submissions: 0,
      status: "Pending",
      instruction: instructions
    };

    const saved = JSON.parse(localStorage.getItem("assignments") || "[]");
    localStorage.setItem("assignments", JSON.stringify([newAssignment, ...saved]));

    setAssignments([newAssignment, ...assignments]);

    toast.success("Assignment published successfully!");
    setTitle("");
    setInstructions("");
    setDeadline("");
    setActiveTab("assignments");
  };

  return (
    <div className="flex min-h-screen bg-muted/30 dark:bg-background">
      <Sidebar userType="instructor" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-4 md:px-8 py-4 md:py-6 pr-16 md:pr-8 sticky top-0 z-20 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-foreground">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">Assignments</h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Manage course assignments and grade student submissions.</p>
          </div>
          <button 
            onClick={() => setActiveTab("create")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all text-xs md:text-sm uppercase tracking-widest shadow-lg shadow-primary/20 w-full sm:w-auto"
          >
            <Plus size={18} />
            Create Assignment
          </button>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
          
          {/* Tabs */}
          <div className="flex gap-2 md:gap-4 border-b border-border overflow-x-auto no-scrollbar pb-1">
            {[
              { id: "assignments", label: "All Assignments" },
              { id: "submissions", label: "Student Submissions" },
              { id: "create", label: "Create New" },
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
            {/* Assignments List Tab */}
            {activeTab === "assignments" && (
              <div className="space-y-6">
                {assignments.map((assignment, i) => (
                  <div key={i} className="p-6 md:p-8 bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:border-primary transition-all">
                    <div className="flex items-start sm:items-center gap-4 md:gap-6 w-full sm:w-auto">
                       <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <CheckSquare className="w-6 h-6 md:w-8 md:h-8" />
                       </div>
                       <div>
                          <h4 className="text-lg md:text-xl font-black mb-1">{assignment.title}</h4>
                          <p className="text-xs md:text-sm text-muted-foreground font-medium">{assignment.course} • Deadline: {assignment.deadline}</p>
                       </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t border-border sm:border-0">
                       <div className="text-left sm:text-right">
                          <p className="text-xl md:text-2xl font-black">{assignment.submissions}</p>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Submissions</p>
                       </div>
                       <button 
                         onClick={() => setActiveTab("submissions")}
                         className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-xl flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary transition-colors shrink-0"
                       >
                          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Create Assignment Tab */}
            {activeTab === "create" && (
              <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 max-w-3xl">
                <h2 className="text-xl md:text-2xl font-black mb-6 md:mb-8">Create Assignment</h2>
                <form onSubmit={handleCreateAssignment} className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Assignment Title</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Design a Dashboard UI"
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium text-sm md:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Instructions</label>
                    <textarea 
                      rows={6}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="Detail the requirements for this assignment..."
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium resize-none text-sm md:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Deadline</label>
                    <input 
                      type="date" 
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium text-sm md:text-base"
                    />
                  </div>
                  <div className="pt-2 md:pt-4">
                    <button type="submit" className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                      Publish Assignment
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Submissions Tab */}
            {activeTab === "submissions" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-black mb-4">Pending Reviews</h3>
                  {[
                    { name: "Chidi A.", task: "Landing Page Wireframe", date: "2m ago" },
                    { name: "Sarah O.", task: "Landing Page Wireframe", date: "1h ago" },
                  ].map((sub, i) => (
                    <div key={i} className="p-4 md:p-6 bg-background rounded-2xl md:rounded-3xl border border-border hover:border-primary transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer group gap-4">
                      <div className="flex gap-4 items-center w-full sm:w-auto">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary text-xs md:text-sm shrink-0">
                          {sub.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{sub.name}</p>
                          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tight line-clamp-1">{sub.task}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-muted-foreground uppercase">{sub.date}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                     <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary text-lg md:text-xl shrink-0">
                       CA
                     </div>
                     <div>
                       <h3 className="text-lg md:text-xl font-black">Chidi A.</h3>
                       <p className="text-xs md:text-sm text-muted-foreground font-medium line-clamp-1">Landing Page Wireframe</p>
                     </div>
                  </div>

                  <div className="bg-muted/50 rounded-2xl p-4 md:p-6 mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                     <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
                        <FileText className="text-primary shrink-0" />
                        <span className="font-bold text-xs md:text-sm truncate">chidi_wireframe_v1.fig</span>
                     </div>
                     <button className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary hover:underline shrink-0">
                        View Submission
                     </button>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs md:text-sm font-bold text-muted-foreground">Grade (0-100)</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 85"
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs md:text-sm font-bold text-muted-foreground">Feedback</label>
                      <textarea 
                        rows={4}
                        placeholder="Write feedback for student..."
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium resize-none text-sm md:text-base"
                      />
                    </div>
                    <button 
                      onClick={() => toast.success("Review submitted!")}
                      className="w-full py-3.5 md:py-4 bg-primary text-white rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
