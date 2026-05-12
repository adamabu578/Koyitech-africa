"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import {
  CheckSquare, Plus, FileText, ChevronRight,
  MessageSquare, Star, Upload, Trash2, Download
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../../lib/supabase";
import { api } from "../../../lib/api";

export default function InstructorAssignments() {
  const [activeTab, setActiveTab] = useState("assignments");
  const [assignments, setAssignments] = useState<any[]>([]);

  // Create Assignment State
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Submissions State
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [activeAssignmentId, setActiveAssignmentId] = useState<string | null>(null);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchSubmissions = async (assignmentId: string) => {
    toast.loading("Loading submissions...", { id: "loading-subs" });
    const { data } = await api.getAssignmentSubmissions(assignmentId);
    toast.dismiss("loading-subs");
    if (data) {
       setSubmissions(data);
       setSelectedSubmission(data[0] || null);
       if (data[0]) {
         setGrade(data[0].grade?.toString() || "");
         setFeedback(data[0].feedback || "");
       } else {
         setGrade("");
         setFeedback("");
       }
    } else {
       setSubmissions([]);
       setSelectedSubmission(null);
       setGrade("");
       setFeedback("");
    }
  };

  const handleSelectSubmission = (sub: any) => {
    setSelectedSubmission(sub);
    setGrade(sub.grade?.toString() || "");
    setFeedback(sub.feedback || "");
  };

  const handleSubmitReview = async () => {
    if (!selectedSubmission) return;
    toast.loading("Submitting review...", { id: "review" });
    const { error } = await api.updateSubmission(selectedSubmission.id, {
      grade: grade ? parseInt(grade) : null,
      feedback: feedback
    });
    
    if (error) {
      toast.dismiss("review");
      toast.error("Failed to submit review");
      return;
    }
    
    const updated = submissions.map(s => s.id === selectedSubmission.id ? { ...s, grade: grade ? parseInt(grade) : null, feedback } : s);
    setSubmissions(updated);
    setSelectedSubmission({ ...selectedSubmission, grade: grade ? parseInt(grade) : null, feedback });
    
    toast.dismiss("review");
    toast.success("Review submitted!");
  };
  const fetchAssignments = async () => {
    const { data, error } = await api.getAssignments();
    if (data) {
      const mapped = data.map((item: any) => {
        let count = item.submissions_count || 0;
        if (item.assignment_submissions && item.assignment_submissions.length > 0) {
          count = item.assignment_submissions[0].count;
        }
        return {
          id: item.id,
          title: item.title,
          course: item.course,
          deadline: new Date(item.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          submissions: count,
          status: item.status,
          instruction: item.instruction,
          fileUrl: item.file_url
        };
      });
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

    const { data, error } = await api.createAssignment(
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
    ).select();

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
          const { error } = await api.deleteAssignment(id);
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
                  })`}
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
                          onClick={() => {
                            setActiveAssignmentId(assignment.id);
                            setActiveTab("submissions");
                            fetchSubmissions(assignment.id);
                          }}
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
                {activeAssignmentId ? (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-lg md:text-xl font-black mb-4">Pending Reviews</h3>
                      {submissions.length > 0 ? submissions.map((sub, i) => (
                        <div key={i} onClick={() => handleSelectSubmission(sub)} className={`p-4 md:p-6 bg-background rounded-2xl md:rounded-3xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer group gap-4 ${selectedSubmission?.id === sub.id ? 'border-primary shadow-lg shadow-primary/5' : 'border-border hover:border-primary'}`}>
                          <div className="flex gap-4 items-center w-full sm:w-auto">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary text-xs md:text-sm shrink-0 uppercase">
                              {(sub.profiles?.first_name?.[0] || '') + (sub.profiles?.last_name?.[0] || '')}
                            </div>
                            <div>
                              <p className="font-bold text-sm">{sub.profiles?.first_name} {sub.profiles?.last_name}</p>
                              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tight line-clamp-1">{sub.file_name}</p>
                            </div>
                          </div>
                          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${sub.grade ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                            {sub.grade ? `Grade: ${sub.grade}` : 'Pending'}
                          </span>
                        </div>
                      )) : <p className="text-sm text-muted-foreground">No submissions yet for this assignment.</p>}
                    </div>

                    {selectedSubmission ? (
                      <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8">
                        <div className="flex items-center gap-4 mb-6 md:mb-8">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary text-lg md:text-xl shrink-0 uppercase">
                            {(selectedSubmission.profiles?.first_name?.[0] || '') + (selectedSubmission.profiles?.last_name?.[0] || '')}
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-black">{selectedSubmission.profiles?.first_name} {selectedSubmission.profiles?.last_name}</h3>
                            <p className="text-xs md:text-sm text-muted-foreground font-medium line-clamp-1">{selectedSubmission.file_name}</p>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-2xl p-4 md:p-6 mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
                            <FileText className="text-primary shrink-0" />
                            <span className="font-bold text-xs md:text-sm truncate">{selectedSubmission.file_name}</span>
                          </div>
                          <a href={selectedSubmission.file_url} target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary hover:underline shrink-0 flex items-center gap-1">
                            Download <Download size={14} />
                          </a>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                          <div className="space-y-2">
                            <label className="text-xs md:text-sm font-bold text-muted-foreground">Grade (0-100)</label>
                            <input
                              type="number"
                              value={grade}
                              onChange={(e) => setGrade(e.target.value)}
                              placeholder="e.g. 85"
                              className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium text-sm md:text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs md:text-sm font-bold text-muted-foreground">Feedback</label>
                            <textarea
                              rows={4}
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              placeholder="Write feedback for student..."
                              className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium resize-none text-sm md:text-base"
                            />
                          </div>
                          <button
                            onClick={handleSubmitReview}
                            className="w-full py-3.5 md:py-4 bg-primary text-white rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex items-center justify-center text-muted-foreground font-bold">
                        Select a submission to review
                      </div>
                    )}
                  </>
                ) : (
                  <div className="col-span-1 lg:col-span-2 bg-background border border-border rounded-[2rem] p-10 flex flex-col items-center justify-center text-center">
                     <FileText size={48} className="text-muted-foreground/30 mb-4" />
                     <h3 className="text-xl font-black mb-2">No Assignment Selected</h3>
                     <p className="text-muted-foreground font-medium max-w-md">Please select an assignment from the "All Assignments" tab to view its submissions.</p>
                     <button onClick={() => setActiveTab("assignments")} className="mt-6 px-6 py-3 bg-muted hover:bg-primary/10 text-foreground hover:text-primary rounded-xl font-bold uppercase tracking-widest text-xs transition-colors">
                       View Assignments
                     </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
