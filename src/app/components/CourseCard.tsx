"use client";

import { motion } from "motion/react";
import { BookOpen, Video, MessageCircle, FileText, Users, FolderOpen, ArrowRight, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  id: string;
  title: string;
  instructor?: string;
  students?: number;
  materials?: number;
  meetLink?: string;
  whatsappLink?: string;
  image?: string;
  showActions?: boolean;
  isEnrolled?: boolean;
  onEnroll?: () => void;
  price?: string;
  progress?: number;
}

export function CourseCard({
  id,
  title,
  instructor,
  students,
  materials,
  meetLink,
  whatsappLink,
  image = "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&w=600&q=80",
  showActions = true,
  isEnrolled = true,
  onEnroll,
  price,
  progress
}: CourseCardProps) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-background rounded-[2.5rem] border border-border overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full"
    >
      {/* Image Area */}
      <div className="h-52 overflow-hidden relative cursor-pointer" onClick={() => router.push(`/course/${id}`)}>
         <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
         
         <div className="absolute top-4 left-4">
            {isEnrolled ? (
              <div className="px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-1.5">
                 <Zap size={10} className="fill-white" /> Active
              </div>
            ) : (
               price && (
                <div className="px-4 py-1.5 rounded-full bg-secondary text-primary text-[10px] font-black uppercase tracking-widest shadow-lg shadow-secondary/20">
                   {price}
                </div>
              )
            )}
         </div>
      </div>

      {/* Content area */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex-1">
           <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-primary mb-3">
              <span>Academy</span>
              <span className="opacity-20">•</span>
              <span>Professional</span>
           </div>
           <h3 className="font-black text-foreground mb-4 text-xl line-clamp-2 leading-tight group-hover:text-primary transition-colors cursor-pointer" onClick={() => router.push(`/course/${id}`)}>
              {title}
           </h3>
           
           {instructor && (
             <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{instructor[0]}</div>
                <p className="text-xs text-muted-foreground font-bold">
                  {instructor}
                </p>
             </div>
           )}
        </div>
        
        {/* Progress Bar (conditional) */}
        {progress !== undefined && isEnrolled ? (
          <div className="mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Progress</span>
              <span className="text-xs font-black text-primary">{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="bg-primary h-full rounded-full"
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-6 pt-4 border-t border-border">
             <div className="flex items-center gap-1 text-muted-foreground">
                <Users size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">{students || 0} Students</span>
             </div>
             <div className="flex items-center gap-1 text-muted-foreground">
                <FolderOpen size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">{materials || 0} Files</span>
             </div>
          </div>
        )}

        {showActions && (
          <div className="space-y-3">
            {isEnrolled ? (
               <button
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-2 justify-center group/btn"
                  onClick={() => router.push(`/course/${id}`)}
               >
                  Go to Course <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
               </button>
            ) : (
              <button
                 className="w-full bg-primary text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-2 justify-center group/btn"
                 onClick={(e) => {
                   e.stopPropagation();
                   if(onEnroll) onEnroll();
                   else router.push(`/course/${id}`);
                 }}
              >
                 Enroll Course <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
