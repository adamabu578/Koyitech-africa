"use client";

import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Users, Search, ChevronRight, MessageSquare, BookOpen, Star } from "lucide-react";

export default function InstructorStudents() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    { id: 1, name: "Chidi Anuoluwapo", course: "UI/UX Design Masterclass", progress: 75, assignments: "4/5", performance: "Excellent" },
    { id: 2, name: "Sarah Osei", course: "Visual Communication Basics", progress: 40, assignments: "2/5", performance: "Average" },
    { id: 3, name: "Blessing Emmanuel", course: "UI/UX Design Masterclass", progress: 90, assignments: "5/5", performance: "Outstanding" },
    { id: 4, name: "John Doe", course: "Visual Communication Basics", progress: 15, assignments: "1/5", performance: "Needs Attention" },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30 dark:bg-background">
      <Sidebar userType="instructor" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-4 md:px-8 py-4 md:py-6 pr-16 md:pr-8 sticky top-0 z-20 flex justify-between items-center text-foreground">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">My Students</h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Track progress and manage your students.</p>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {selectedStudent ? (
            <div className="space-y-6 md:space-y-8">
               <button 
                 onClick={() => setSelectedStudent(null)}
                 className="text-xs md:text-sm font-bold text-muted-foreground hover:text-foreground flex items-center gap-2"
               >
                 ← Back to Students
               </button>

               <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl md:text-4xl font-black shrink-0">
                     {selectedStudent.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div className="flex-1 space-y-4 md:space-y-6 w-full">
                     <div>
                        <h2 className="text-2xl md:text-3xl font-black mb-1 md:mb-2">{selectedStudent.name}</h2>
                        <div className="flex items-center gap-2 text-muted-foreground font-medium text-sm md:text-base">
                           <BookOpen size={18} className="shrink-0" />
                           <span className="truncate">{selectedStudent.course}</span>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-muted/50 rounded-2xl p-4 md:p-6">
                           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 md:mb-2">Course Progress</p>
                           <p className="text-xl md:text-2xl font-black">{selectedStudent.progress}%</p>
                        </div>
                        <div className="bg-muted/50 rounded-2xl p-4 md:p-6">
                           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 md:mb-2">Assignment Status</p>
                           <p className="text-xl md:text-2xl font-black">{selectedStudent.assignments}</p>
                        </div>
                        <div className="bg-muted/50 rounded-2xl p-4 md:p-6">
                           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 md:mb-2">Performance</p>
                           <p className="text-base md:text-lg font-black text-primary">{selectedStudent.performance}</p>
                        </div>
                     </div>

                     <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 md:py-4 bg-primary text-white rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                       <MessageSquare size={18} />
                       Message Student
                     </button>
                  </div>
               </div>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-background p-4 rounded-2xl border border-border">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 md:w-5 md:h-5" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="w-full pl-10 md:pl-12 pr-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                  />
                </div>
                <select className="w-full sm:w-auto px-4 py-3 rounded-xl bg-muted/50 border-none outline-none text-sm font-bold text-foreground">
                  <option>All Courses</option>
                  <option>UI/UX Design</option>
                  <option>Visual Comm.</option>
                </select>
              </div>

              <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="p-4 md:p-6 text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground">Student Name</th>
                      <th className="p-4 md:p-6 text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground">Course</th>
                      <th className="p-4 md:p-6 text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground">Progress</th>
                      <th className="p-4 md:p-6 text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-border hover:bg-muted/20 transition-colors group">
                        <td className="p-4 md:p-6">
                           <div className="flex items-center gap-3 md:gap-4">
                              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                 {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-bold text-sm md:text-base">{student.name}</span>
                           </div>
                        </td>
                        <td className="p-4 md:p-6 text-xs md:text-sm text-muted-foreground font-medium">{student.course}</td>
                        <td className="p-4 md:p-6">
                           <div className="flex items-center gap-2 md:gap-3">
                              <div className="w-full bg-muted rounded-full h-1.5 md:h-2 max-w-[80px] md:max-w-[100px]">
                                <div className="bg-primary h-1.5 md:h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                              </div>
                              <span className="text-[10px] md:text-xs font-bold">{student.progress}%</span>
                           </div>
                        </td>
                        <td className="p-4 md:p-6 text-right">
                           <button 
                             onClick={() => setSelectedStudent(student)}
                             className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary hover:underline whitespace-nowrap"
                           >
                              View Profile
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
