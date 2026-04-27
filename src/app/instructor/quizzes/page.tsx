"use client";

import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { PencilLine, Plus, Search, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function InstructorQuizzes() {
  const [activeTab, setActiveTab] = useState("list");
  
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !option1 || !option2 || !correctAnswer) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Quiz published successfully!");
    setQuestion("");
    setOption1("");
    setOption2("");
    setCorrectAnswer("");
    setActiveTab("list");
  };

  return (
    <div className="flex min-h-screen bg-muted/30 dark:bg-background">
      <Sidebar userType="instructor" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-4 md:px-8 py-4 md:py-6 pr-16 md:pr-8 sticky top-0 z-20 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-foreground">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">Quizzes & Tests</h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Create and manage assessments for your students.</p>
          </div>
          <button 
            onClick={() => setActiveTab("create")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all text-xs md:text-sm uppercase tracking-widest shadow-lg shadow-primary/20 w-full sm:w-auto"
          >
            <Plus size={18} />
            Create Quiz
          </button>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
          
          <div className="flex gap-2 md:gap-4 border-b border-border overflow-x-auto no-scrollbar pb-1">
            {[
              { id: "list", label: "All Quizzes" },
              { id: "create", label: "Create Quiz" },
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
            {activeTab === "list" && (
              <div className="space-y-6">
                {[
                  { title: "Color Theory Basics", course: "Visual Communication Basics", questions: 10, attempts: 24 },
                  { title: "Figma Shortcuts Quiz", course: "UI/UX Design Masterclass", questions: 15, attempts: 42 },
                ].map((quiz, i) => (
                  <div key={i} className="p-6 md:p-8 bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:border-primary transition-all">
                    <div className="flex items-start sm:items-center gap-4 md:gap-6 w-full sm:w-auto">
                       <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <PencilLine className="w-6 h-6 md:w-8 md:h-8" />
                       </div>
                       <div>
                          <h4 className="text-lg md:text-xl font-black mb-1">{quiz.title}</h4>
                          <p className="text-xs md:text-sm text-muted-foreground font-medium">{quiz.course} • {quiz.questions} Questions</p>
                       </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t border-border sm:border-0">
                       <div className="text-left sm:text-right">
                          <p className="text-xl md:text-2xl font-black">{quiz.attempts}</p>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Attempts</p>
                       </div>
                       <button className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-xl flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary transition-colors shrink-0">
                          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "create" && (
              <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 max-w-3xl">
                <h2 className="text-xl md:text-2xl font-black mb-6 md:mb-8">Create Quiz</h2>
                <form onSubmit={handleCreateQuiz} className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Question</label>
                    <input 
                      type="text" 
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Enter the question..."
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium text-sm md:text-base"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground">Option 1</label>
                      <input 
                        type="text" 
                        value={option1}
                        onChange={(e) => setOption1(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground">Option 2</label>
                      <input 
                        type="text" 
                        value={option2}
                        onChange={(e) => setOption2(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium text-sm md:text-base"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Correct Answer</label>
                    <input 
                      type="text" 
                      value={correctAnswer}
                      onChange={(e) => setCorrectAnswer(e.target.value)}
                      placeholder="Must match one of the options exactly"
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium text-sm md:text-base"
                    />
                  </div>
                  <div className="pt-2 md:pt-4 flex flex-col sm:flex-row gap-3 md:gap-4">
                    <button type="button" className="w-full sm:w-auto px-6 py-3.5 md:py-4 bg-muted text-foreground rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-muted/80 transition-colors">
                      Add Question
                    </button>
                    <button type="submit" className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-primary text-white rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                      Publish Quiz
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
