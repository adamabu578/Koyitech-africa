"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import {
  CheckSquare, Plus, FileText, ChevronRight,
  MessageSquare, Star, Upload, Trash2
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../../lib/supabase";

export default function InstructorAssignments() {
  const [activeTab, setActiveTab] = useState("assignments");
  const [assignments, setAssignments] = useState<any[]>([]);

  // Create Assignment State
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState<File | null>(null);



  const fetchAssignments = async () => {
    const { data, error } = await supabase.from('assignments').select('*').order('created_at', { ascending: false });
    if (data) {
      const mapped = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        course: item.course,
        deadline: new Date(item.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        submissions: item.submissions_count,
        status: item.status,
        instruction: item.instruction
      }));
      setAssignments(mapped);
    } else {
      setAssignments([]);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !instructions || !deadline) {
      toast.error("Please fill in all fields.");
      return;
    }

    let fileUrl = null;
    let fileName = null;

    if (file) {
      toast.loading("Uploading attached file...");
      const storageName = `${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('assignments')
        .upload(storageName, file);

      if (uploadError) {
        toast.dismiss();
        toast.error("Failed to upload attached file.");
        console.error(uploadError);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('assignments')
        .getPublicUrl(storageName);

      fileUrl = publicUrlData.publicUrl;
      fileName = file.name;
    }

    if (!file) toast.loading("Publishing assignment...");

    const { data, error } = await supabase.from('assignments').insert([
      {
        title,
        course: "General Course",
        deadline,
        submissions_count: 0,
        status: "Pending",
        instruction: instructions,
        file_name: fileName,
        file_url: fileUrl
      }
    ]).select();

    toast.dismiss();

    if (error) {
      toast.error(`Failed to publish assignment: ${error.message || error.details}`);
      console.error(error);
      return;
    }

    if (data && data.length > 0) {
      const newAssignment = {
        id: data[0].id,
        title: data[0].title,
        course: data[0].course,
        deadline: new Date(data[0].deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        submissions: data[0].submissions_count,
        status: data[0].status,
        instruction: data[0].instruction,
        fileUrl: data[0].file_url
      };
      setAssignments([newAssignment, ...assignments]);
    }

    toast.success("Assignment published successfully!");
    setTitle("");
    setInstructions("");
    setDeadline("");
    setFile(null);
    setActiveTab("assignments");
  };

  const handleDeleteAssignment = async (id: any, fileUrl?: string, title?: string) => {
    toast("Delete Assignment?", {
      id: "delete-confirm",
      description: "Are you sure you want to delete this assignment? This cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          toast.dismiss("delete-confirm");
          if (typeof id === 'number' || !id) {
            // Use ID if available, otherwise fallback to title for demo assignments during HMR
            setAssignments(prev => prev.filter(a => a.id ? a.id !== id : a.title !== title));
            toast.success("Assignment deleted.", { id: "delete-success" });
            return;
          }
          
          const loadingId = toast.loading("Deleting assignment...");
          if (fileUrl) {
            const urlParts = fileUrl.split('/');
            const fileName = urlParts[urlParts.length - 1];
            await supabase.storage.from('assignments').remove([fileName]);
          }
          const { error } = await supabase.from('assignments').delete().eq('id', id);
          toast.dismiss(loadingId);
          
          if (error) {
            toast.error("Failed to delete assignment.", { id: "delete-error" });
            console.error(error);
          } else {
            toast.success("Assignment deleted.", { id: "delete-success" });
            setAssignments(prev => prev.filter(a => a.id !== id));
          }
        }
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss("delete-confirm")
      }
    });
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
                className={`flex items-center gap-2 px-4 md:px-6 py-4 font-bold text-xs md:text-sm uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id
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
                {assignments.length > 0 ? assignments.map((assignment, i) => (
                  <div key={i} className="p-6 md:p-8 bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:border-primary transition-all">
                    <div className="flex items-start sm:items-center gap-4 md:gap-6 w-full sm:w-auto">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <CheckSquare className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-black mb-1">
                          {assignment.title}
                          {assignment.fileUrl && (
                            <a href={assignment.fileUrl} target="_blank" rel="noreferrer" className="inline-block ml-3 p-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors">
                              <FileText className="w-4 h-4" />
                            </a>
                          )}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground font-medium">{assignment.course} • Deadline: {assignment.deadline}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t border-border sm:border-0">
                      <div className="text-left sm:text-right">
                        <p className="text-xl md:text-2xl font-black">{assignment.submissions || 0}</p>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Submissions</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteAssignment(assignment.id, assignment.fileUrl, assignment.title)}
                          className="w-10 h-10 md:w-12 md:h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shrink-0"
                          title="Delete Assignment"
                        >
                          <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                        <button
                          onClick={() => setActiveTab("submissions")}
                          className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-xl flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary transition-colors shrink-0"
                          title="View Submissions"
                        >
                          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                )) : <p className="text-sm text-muted-foreground">No assignments found.</p>}
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
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Attach File (Optional)</label>
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 bg-muted/50 text-foreground rounded-xl font-bold hover:bg-muted transition-all text-xs md:text-sm">
                        <Upload size={18} />
                        Choose File
                        <input
                          type="file"
                          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                          className="hidden"
                        />
                      </label>
                      {file && <span className="text-sm font-medium text-muted-foreground truncate max-w-[200px]">{file.name}</span>}
                    </div>
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
