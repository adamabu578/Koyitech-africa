"use client";

import { motion } from "motion/react";
import { Sidebar } from "../../components/Sidebar";
import { HelpCircle, Clock, Award, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setQuizzes(data || []);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fdf8f5] dark:bg-slate-950 md:p-6 lg:p-8 transition-colors duration-300">
      <div className="flex-1 flex bg-white dark:bg-slate-900 md:rounded-[2.5rem] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-orange-50/50 dark:border-slate-800">
        <Sidebar userType="student" />

        <main className="flex-1 overflow-y-auto">
          <header className="bg-white dark:bg-slate-900 border-b border-border pl-4 pr-20 md:px-8 py-4 md:py-6 sticky top-0 z-20 flex justify-between items-center text-foreground transition-colors">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">Quizzes</h1>
            <p className="text-muted-foreground font-medium">Test your understanding and track your progress.</p>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {isLoading ? (
               <div className="col-span-1 md:col-span-2 text-center py-10">
                 <p className="text-muted-foreground">Loading quizzes...</p>
               </div>
            ) : quizzes.length === 0 ? (
               <div className="col-span-1 md:col-span-2 text-center py-10 bg-background border border-border rounded-2xl md:rounded-[2.5rem]">
                 <p className="text-muted-foreground">No quizzes available right now.</p>
               </div>
            ) : (
              quizzes.map((quiz, index) => {
                const status = quiz.status || "Available";
                const score = quiz.score || null;
                return (
                <motion.div 
                  key={quiz.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl md:rounded-[2.5rem] flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-primary transition-all group cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className={`text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full ${status === 'Completed' ? 'bg-secondary/20 text-secondary' : 'bg-primary/10 text-primary'}`}>
                        {status}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-primary">
                         {status === 'Completed' ? <Star size={20} className="text-secondary" /> : <HelpCircle size={20} />}
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black mb-1 md:mb-2 text-foreground">{quiz.title}</h3>
                    <p className="text-sm md:text-base font-bold text-muted-foreground mb-6 md:mb-8">{quiz.course}</p>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                        <div className="text-center flex-1 border-r border-border">
                           <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Questions</p>
                           <p className="text-sm md:text-lg font-bold text-foreground">{quiz.questions || 1}</p>
                        </div>
                        <div className="text-center flex-1 border-r border-border">
                           <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Duration</p>
                           <p className="text-sm md:text-lg font-bold text-foreground flex items-center justify-center gap-1"><Clock size={14}/> {quiz.duration || "10 mins"}</p>
                        </div>
                        <div className="text-center flex-1">
                           <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Score</p>
                           <p className={`text-sm md:text-lg font-black ${score ? 'text-secondary' : 'text-foreground'}`}>{score || "-"}</p>
                        </div>
                     </div>

                     {status === 'Available' ? (
                        <button className="w-full py-3 md:py-4 bg-primary text-white rounded-lg md:rounded-xl font-black text-xs md:text-sm tracking-widest uppercase hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                          Start Quiz
                        </button>
                     ) : (
                        <button className="w-full py-3 md:py-4 bg-muted text-foreground rounded-lg md:rounded-xl font-black text-xs md:text-sm tracking-widest uppercase hover:bg-border transition-all">
                          Review Answers
                        </button>
                     )}
                  </div>
                </motion.div>
              )})
            )}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}
