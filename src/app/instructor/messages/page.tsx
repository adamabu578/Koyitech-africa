"use client";

import { Sidebar } from "../../components/Sidebar";
import { MessageSquare, Search, Send } from "lucide-react";

export default function InstructorMessages() {
  return (
    <div className="flex min-h-screen bg-muted/30 dark:bg-background">
      <Sidebar userType="instructor" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-background border-b border-border px-4 md:px-8 py-4 md:py-6 pr-16 md:pr-8 flex-shrink-0 flex justify-between items-center text-foreground z-20">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">Messages</h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Communicate directly with your students.</p>
          </div>
        </header>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 md:p-8 gap-4 md:gap-8 max-w-7xl mx-auto w-full">
          {/* Chat List */}
          <div className="w-full md:w-1/3 h-[40vh] md:h-auto bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] flex flex-col overflow-hidden shrink-0">
             <div className="p-6 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                  />
                </div>
             </div>
             <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {[
                  { name: "Chidi Anuoluwapo", msg: "Can you review my wireframe?", time: "10:30 AM", unread: true },
                  { name: "Sarah Osei", msg: "Thank you for the feedback!", time: "Yesterday", unread: false },
                  { name: "UI/UX Batch A", msg: "Class starting in 10 mins", time: "Mon", unread: false },
                ].map((chat, i) => (
                   <div key={i} className={`p-4 rounded-2xl cursor-pointer flex items-start gap-4 transition-colors ${i === 0 ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted/50 border border-transparent'}`}>
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                         {chat.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <div className="flex justify-between items-center mb-1">
                            <h4 className={`text-sm truncate ${chat.unread ? 'font-bold text-foreground' : 'font-medium text-foreground'}`}>{chat.name}</h4>
                            <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                         </div>
                         <p className={`text-xs truncate ${chat.unread ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>{chat.msg}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 h-[50vh] md:h-auto bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] flex flex-col overflow-hidden min-h-0">
             <div className="p-4 md:p-6 border-b border-border flex items-center gap-3 md:gap-4 bg-muted/10 shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm md:text-base">
                   CA
                </div>
                <div>
                   <h3 className="font-bold text-sm md:text-base">Chidi Anuoluwapo</h3>
                   <p className="text-[10px] md:text-xs text-green-500 font-medium">Online</p>
                </div>
             </div>
             
             <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 min-h-0">
                <div className="flex gap-2 md:gap-4 max-w-[90%] md:max-w-[80%]">
                   <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-200 shrink-0"></div>
                   <div className="bg-muted rounded-2xl rounded-tl-none p-3 md:p-4 text-xs md:text-sm">
                      <p>Hello Tutor, can you review my wireframe assignment? I'm having trouble with the auto layout for the navigation bar.</p>
                      <span className="text-[8px] md:text-[10px] text-muted-foreground mt-1 md:mt-2 block">10:30 AM</span>
                   </div>
                </div>
                
                <div className="flex gap-2 md:gap-4 max-w-[90%] md:max-w-[80%] ml-auto flex-row-reverse">
                   <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary shrink-0"></div>
                   <div className="bg-primary text-white rounded-2xl rounded-tr-none p-3 md:p-4 text-xs md:text-sm">
                      <p>Sure Chidi, I'll take a look at it right away. Make sure your navigation items are wrapped in an auto layout frame and set to 'Space Between'.</p>
                      <span className="text-[8px] md:text-[10px] text-primary-foreground/70 mt-1 md:mt-2 block text-right">10:35 AM</span>
                   </div>
                </div>
             </div>

             <div className="p-3 md:p-4 border-t border-border bg-muted/10 shrink-0">
                <div className="flex gap-2 md:gap-4">
                   <input 
                     type="text" 
                     placeholder="Type your message..."
                     className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-xs md:text-sm"
                   />
                   <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0">
                      <Send className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
