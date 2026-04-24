"use client";

import { motion } from "motion/react";
import { Sidebar } from "../../components/Sidebar";
import { HelpCircle, Clock, Award, Star } from "lucide-react";

export default function Quizzes() {
  const quizzes = [
    {
      course: "UI/UX Design Masterclass",
      title: "Module 2: Color Theory & Typography",
      questions: 15,
      duration: "20 mins",
      status: "Available",
      score: null
    },
    {
      course: "UI/UX Design Masterclass",
      title: "Module 1: Design Principles",
      questions: 10,
      duration: "15 mins",
      status: "Completed",
      score: "90%"
    },
    {
      course: "Data Analysis Essentials",
      title: "Statistics Fundamentals",
      questions: 20,
      duration: "30 mins",
      status: "Available",
      score: null
    }
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar userType="student" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-8 py-6 sticky top-0 z-20 flex justify-between items-center text-foreground">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Quizzes</h1>
            <p className="text-muted-foreground font-medium">Test your understanding and track your progress.</p>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {quizzes.map((quiz, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-background border border-border rounded-[2.5rem] flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-primary transition-all group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className={`text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full ${quiz.status === 'Completed' ? 'bg-secondary/20 text-secondary' : 'bg-primary/10 text-primary'}`}>
                      {quiz.status}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-primary">
                       {quiz.status === 'Completed' ? <Star size={20} className="text-secondary" /> : <HelpCircle size={20} />}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-foreground">{quiz.title}</h3>
                  <p className="font-bold text-muted-foreground mb-8">{quiz.course}</p>
                </div>
                
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                      <div className="text-center flex-1 border-r border-border">
                         <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Questions</p>
                         <p className="text-lg font-bold text-foreground">{quiz.questions}</p>
                      </div>
                      <div className="text-center flex-1 border-r border-border">
                         <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Duration</p>
                         <p className="text-lg font-bold text-foreground flex items-center justify-center gap-1"><Clock size={14}/> {quiz.duration}</p>
                      </div>
                      <div className="text-center flex-1">
                         <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Score</p>
                         <p className={`text-lg font-black ${quiz.score ? 'text-secondary' : 'text-foreground'}`}>{quiz.score || "-"}</p>
                      </div>
                   </div>

                   {quiz.status === 'Available' ? (
                      <button className="w-full py-4 bg-primary text-white rounded-xl font-black text-sm tracking-widest uppercase hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                        Start Quiz
                      </button>
                   ) : (
                      <button className="w-full py-4 bg-muted text-foreground rounded-xl font-black text-sm tracking-widest uppercase hover:bg-border transition-all">
                        Review Answers
                      </button>
                   )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
