"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "../../components/Sidebar";
import { CheckSquare, Clock, Upload, ArrowRight, Download, X } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../lib/api";
import { supabase } from "../../../lib/supabase";

export default function Assignments() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [selectedInstruction, setSelectedInstruction] = useState<{title: string, content: string} | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: number]: File }>({});

  const fetchAssignments = async () => {
    const currentUser = localStorage.getItem("currentUser");
    const parsedUser = currentUser ? JSON.parse(currentUser) : null;
    setUser(parsedUser);

    const { data: assignData } = await api.getAssignments();
    
    let submissions: any[] = [];
    if (parsedUser) {
       const { data: subData } = await api.getStudentSubmissions(parsedUser.id);
       if (subData) submissions = subData;
    }

    if (assignData) {
      const mapped = assignData.map((item: any) => {
        const isCompleted = submissions.some(s => s.assignment_id === item.id);
        return {
          id: item.id,
          course: item.course,
          title: item.title,
          deadline: new Date(item.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: isCompleted ? 'Completed' : 'Pending',
          instruction: item.instruction,
          file_url: item.file_url,
          file_name: item.file_name
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

  const handleFileSelect = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(prev => ({ ...prev, [index]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (index: number) => {
    const file = selectedFiles[index];
    if (!file || !user) return;
    
    toast.loading("Submitting assignment...", { id: "upload" });
    const assignId = assignments[index].id;
    const storageName = `${Date.now()}_${user.id}_${file.name}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('assignments')
      .upload(storageName, file);

    if (uploadError) {
      toast.dismiss("upload");
      toast.error("Failed to upload file.");
      console.error(uploadError);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('assignments')
      .getPublicUrl(storageName);

    const fileUrl = publicUrlData.publicUrl;

    const { error: submitError } = await api.submitAssignment({
      assignment_id: assignId,
      student_id: user.id,
      file_name: file.name,
      file_url: fileUrl
    });

    toast.dismiss("upload");

    if (submitError) {
      toast.error("Failed to submit assignment.");
      console.error(submitError);
      return;
    }

    toast.success("Assignment submitted successfully!");
    const updated = [...assignments];
    updated[index] = { ...updated[index], status: "Completed" };
    setAssignments(updated);
    
    // Clear selected file
    setSelectedFiles(prev => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
  };

  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      toast.loading("Downloading file...", { id: "download" });
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'attachment';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.dismiss("download");
    } catch (error) {
      console.error("Download failed", error);
      toast.dismiss("download");
      toast.error("Failed to download file");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fdf8f5] dark:bg-slate-950 md:p-6 lg:p-8 transition-colors duration-300">
      <div className="flex-1 flex bg-white dark:bg-slate-900 md:rounded-[2.5rem] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-orange-50/50 dark:border-slate-800 relative">
        <Sidebar userType="student" />

        <main className="flex-1 overflow-y-auto">
          <header className="bg-white dark:bg-slate-900 border-b border-border pl-8 pr-20 md:px-8 py-6 sticky top-0 z-20 flex justify-between items-center text-foreground transition-colors">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Assignments</h1>
            <p className="text-muted-foreground font-medium">Practice what you've learned.</p>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 md:space-y-10">
          <div className="space-y-6">
            {assignments.length > 0 ? assignments.map((assign, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 sm:p-6 md:p-8 bg-background border border-border rounded-2xl md:rounded-3xl group hover:border-primary transition-all shadow-sm hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 mb-6">
                  <div className="flex gap-4 md:gap-6">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-secondary/10 flex items-center justify-center text-primary shrink-0">
                      <CheckSquare className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${assign.status === 'Completed' ? 'bg-secondary/20 text-secondary' : 'bg-primary/10 text-primary'}`}>
                           {assign.status}
                        </span>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{assign.course}</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-foreground">{assign.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed line-clamp-2">{assign.instruction}</p>
                    </div>
                  </div>
                  <div className="text-left md:text-right shrink-0">
                     <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1 flex items-center gap-1"><Clock size={12}/> Deadline</p>
                     <p className="text-xs sm:text-sm font-bold text-foreground">{assign.deadline}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 md:gap-4 pt-4 md:pt-6 border-t border-border">
                  <button 
                    onClick={() => setSelectedInstruction({title: assign.title, content: assign.instruction})}
                    className="flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 bg-muted hover:bg-border text-foreground rounded-lg md:rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all"
                  >
                    View Full Instructions
                  </button>
                  {assign.file_url && (
                    <button 
                      onClick={() => handleDownload(assign.file_url, assign.file_name)}
                      className="flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg md:rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                    >
                      <Download size={16} /> Download Attached File
                    </button>
                  )}
                  {assign.status === 'Pending' ? (
                     <div className="flex flex-1 md:flex-none gap-2">
                       <label className={`cursor-pointer flex-1 px-4 md:px-8 py-3 md:py-4 ${selectedFiles[index] ? 'bg-primary/10 text-primary' : 'bg-primary text-white shadow-xl shadow-primary/20'} rounded-lg md:rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all`}>
                          <input type="file" className="hidden" onChange={(e) => handleFileSelect(index, e)} />
                          <Upload size={16} /> {selectedFiles[index] ? 'Change File' : 'Attach Work'}
                       </label>
                       {selectedFiles[index] && (
                         <button 
                           onClick={() => handleSubmit(index)}
                           className="flex-1 px-4 md:px-8 py-3 md:py-4 bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 rounded-lg md:rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all"
                         >
                           <CheckSquare size={16} /> Submit
                         </button>
                       )}
                     </div>
                  ) : (
                     <button className="flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 bg-emerald-500/10 text-emerald-600 rounded-lg md:rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-default">
                        Submission Received <CheckSquare size={16} />
                     </button>
                  )}
                </div>
              </motion.div>
            )) : <p className="text-sm text-muted-foreground">No assignments found.</p>}
          </div>
        </div>
      </main>
      
      {/* Instructions Modal */}
      <AnimatePresence>
        {selectedInstruction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background w-full max-w-2xl rounded-[2rem] p-6 md:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedInstruction(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl md:text-2xl font-black mb-4 pr-12">{selectedInstruction.title}</h2>
              <div className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {selectedInstruction.content}
              </div>
              <div className="mt-8 pt-6 border-t border-border flex justify-end">
                <button 
                  onClick={() => setSelectedInstruction(null)}
                  className="px-8 py-3 md:py-4 bg-primary text-white rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
