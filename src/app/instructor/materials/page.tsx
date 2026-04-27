"use client";

import { useState, useEffect, useRef } from "react";
import { Sidebar } from "../../components/Sidebar";
import { FileText, Search, Upload, Download, MoreVertical, BookOpen, FileArchive } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { toast } from "sonner";

export default function InstructorMaterials() {
  const [materials, setMaterials] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultMaterials = [
    { id: 1, name: "UI/UX Course Syllabus.pdf", size: "1.2 MB", course: "UI/UX Design Masterclass", dateAdded: "Oct 10, 2026", type: "PDF", title: "UI/UX Course Syllabus" },
    { id: 2, name: "Color Theory Basics.pptx", size: "4.5 MB", course: "Visual Communication Basics", dateAdded: "Oct 12, 2026", type: "PPTX", title: "Color Theory Basics" },
    { id: 3, name: "Figma Shortcuts Cheat Sheet.pdf", size: "0.8 MB", course: "UI/UX Design Masterclass", dateAdded: "Oct 15, 2026", type: "PDF", title: "Figma Shortcuts Cheat Sheet" },
    { id: 4, name: "Design System Starter Kit.zip", size: "24.5 MB", course: "UI/UX Design Masterclass", dateAdded: "Oct 18, 2026", type: "ZIP", title: "Design System Starter Kit" },
  ];

  const fetchMaterials = async () => {
    const { data, error } = await supabase.from('materials').select('*').order('created_at', { ascending: false });
    if (data) {
      // Map to frontend expected format
      const mapped = data.map((item: any) => ({
        id: item.id,
        name: item.file_name,
        title: item.title,
        size: item.file_size,
        course: item.course,
        dateAdded: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        type: item.file_type
      }));
      setMaterials([...mapped, ...defaultMaterials]);
    } else {
      setMaterials(defaultMaterials);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const type = file.name.split('.').pop()?.toUpperCase() || 'FILE';
      
      toast.loading("Uploading material...");
      
      const fileName = `${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('materials')
        .upload(fileName, file);
        
      if (uploadError) {
        toast.dismiss();
        toast.error("Failed to upload file to storage.");
        console.error(uploadError);
        return;
      }
      
      const { data: publicUrlData } = supabase.storage
        .from('materials')
        .getPublicUrl(fileName);
        
      const fileUrl = publicUrlData.publicUrl;
      
      const { data, error } = await supabase.from('materials').insert([
        {
          title: file.name,
          file_name: file.name,
          file_url: fileUrl,
          file_size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
          file_type: type,
          course: "General Course",
        }
      ]).select();
      
      toast.dismiss();
      
      if (error) {
        toast.error("Failed to save material details.");
        console.error(error);
        return;
      }
      
      if (data && data.length > 0) {
        toast.success("Material uploaded successfully!");
        const newMaterial = {
          id: data[0].id,
          name: data[0].file_name,
          title: data[0].title,
          size: data[0].file_size,
          course: data[0].course,
          dateAdded: new Date(data[0].created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          type: data[0].file_type,
          fileUrl: data[0].file_url
        };
        setMaterials([newMaterial, ...materials]);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-muted/30 dark:bg-background">
      <Sidebar userType="instructor" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-4 md:px-8 py-4 md:py-6 pr-16 md:pr-8 sticky top-0 z-20 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-foreground">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">Materials</h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Manage and share learning resources.</p>
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all text-xs md:text-sm uppercase tracking-widest shadow-lg shadow-primary/20 w-full sm:w-auto"
          >
            <Upload size={18} />
            Upload Resource
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
          />
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-background p-4 rounded-2xl border border-border">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search materials..."
                className="w-full pl-10 md:pl-12 pr-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
              />
            </div>
            <select className="w-full sm:w-auto px-4 py-3 rounded-xl bg-muted/50 border-none outline-none text-sm font-bold text-foreground">
              <option>All Courses</option>
              <option>UI/UX Design Masterclass</option>
              <option>Visual Communication Basics</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
             <div 
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary/10 border border-primary/20 rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/20 transition-colors h-48 lg:h-auto"
             >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-primary mb-3 md:mb-4 shadow-sm">
                   <Upload className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h4 className="font-black text-primary text-sm md:text-base">Upload New</h4>
                <p className="text-[10px] md:text-xs text-primary/70 mt-1 md:mt-2 font-medium">PDF, PPTX, ZIP up to 50MB</p>
             </div>

             <div className="bg-background border border-border rounded-[2rem] p-4 md:p-6 lg:col-span-3">
                <h3 className="text-base md:text-lg font-black mb-4">Recent Uploads</h3>
                <div className="space-y-3 md:space-y-4">
                   {materials.map((mat) => (
                      <div key={mat.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 md:p-4 bg-muted/30 rounded-2xl border border-transparent hover:border-border transition-colors group gap-4">
                         <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                               <FileText className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div className="min-w-0">
                               <h4 className="font-bold text-xs md:text-sm truncate">{mat.name}</h4>
                               <div className="flex flex-wrap gap-2 md:gap-3 text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">
                                  <span className="shrink-0">{mat.size}</span>
                                  <span className="hidden sm:inline">•</span>
                                  <span className="flex items-center gap-1 truncate"><BookOpen size={10} className="shrink-0"/> <span className="truncate">{mat.course}</span></span>
                               </div>
                            </div>
                         </div>
                         <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity w-full sm:w-auto justify-end sm:justify-start border-t sm:border-t-0 border-border pt-2 sm:pt-0 mt-2 sm:mt-0">
                            <button 
                              onClick={() => mat.fileUrl ? window.open(mat.fileUrl, '_blank') : null}
                              className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            >
                               <Download size={18} />
                            </button>
                            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                               <MoreVertical size={18} />
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
