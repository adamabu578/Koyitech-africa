"use client";

import { motion } from "motion/react";
import { Sidebar } from "../components/Sidebar";
import { 
  BookOpen, Clock, Target, 
  Play, FileText, MessageSquare, 
  Calendar, CheckCircle2, ChevronRight,
  MoreHorizontal, Bell,
  Award, Rocket, BarChart2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  if (!user) return null;

  const stats = [
    { label: "Enrolled Courses", value: "3", icon: BookOpen, color: "bg-[#fca566]", subtitle: "Courses" },
    { label: "Pending Assignments", value: "5", icon: Clock, color: "bg-[#4ade80]", subtitle: "Tasks" },
    { label: "Completed Courses", value: "1", icon: CheckCircle2, color: "bg-[#60a5fa]", subtitle: "Finished" },
  ];

  const quickActions = [
    { label: "Join Class", icon: Play, path: "/student/classes", color: "bg-orange-400" },
    { label: "Assignments", icon: Target, path: "/student/assignments", color: "bg-emerald-400" },
    { label: "Materials", icon: FileText, path: "/student/materials", color: "bg-blue-400" },
    { label: "Messages", icon: MessageSquare, path: "/student/messages", color: "bg-purple-400" },
  ];

  return (
    <div className="flex min-h-screen bg-[#fdf8f5] dark:bg-slate-950 md:p-6 lg:p-8 transition-colors duration-300">
      {/* Container simulating the white dashboard background */}
      <div className="flex-1 flex bg-white dark:bg-slate-900 md:rounded-[2.5rem] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-orange-50/50 dark:border-slate-800 transition-colors">
        <Sidebar userType="student" />

        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <header className="pl-6 pr-20 md:px-10 py-6 md:py-8 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-20 transition-colors">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
                Welcome back, {user?.firstName}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Nice to see you again!</p>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">
                  {user?.firstName?.charAt(0)}
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Student</p>
                </div>
              </div>
              <button className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="p-6 md:p-10 pt-0 max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column (Main Content) - 2/3 width */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Overview Cards */}
                <section>
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Overview</h2>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-red-400 dark:bg-red-500 text-white rounded-full text-xs font-bold hover:bg-red-500 dark:hover:bg-red-600 transition-colors">
                      <BookOpen className="w-3 h-3" />
                      All Courses <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`${stat.color} rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all cursor-default group`}
                      >
                        {/* Wavy background decoration */}
                        <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500 delay-75" />
                        
                        <div className="relative z-10 flex items-start gap-3 mb-6">
                          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            <stat.icon className="w-5 h-5 text-white" />
                          </div>
                          <p className="text-white/90 font-medium text-sm mt-1">{stat.label}</p>
                        </div>
                        <h3 className="text-3xl font-bold text-white relative z-10">{stat.value}</h3>
                        <p className="text-white/70 text-xs mt-1 relative z-10">{stat.subtitle}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Middle Row: Active Courses & Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Active Courses Progress */}
                  <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 transition-colors">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-slate-800 dark:text-slate-100">Your Level</h3>
                    </div>
                    <div className="space-y-6">
                      {[
                        { title: "UI/UX Design Masterclass", progress: 78, color: "bg-[#4ade80]" },
                        { title: "Data Analysis Essentials", progress: 30, color: "bg-[#fca566]" },
                      ].map((course, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-slate-700 dark:text-slate-300">{course.title}</span>
                            <span className="font-bold text-slate-800 dark:text-slate-100">{course.progress}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className={`h-full ${course.color} rounded-full`} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Hours Spent (Replaced with Quick Actions) */}
                  <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 transition-colors">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100">Quick Actions</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Jump right in</p>
                      </div>
                      <select className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-transparent border-none outline-none cursor-pointer">
                        <option>Today</option>
                        <option>Weekly</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {quickActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => router.push(action.path)}
                          className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm ${action.color} group-hover:scale-110 transition-transform`}>
                            <action.icon className="w-5 h-5" />
                          </div>
                          <span className="font-semibold text-xs text-slate-700 dark:text-slate-300">{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Bottom Row: Leaderboard */}
                <section>
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Course Leaderboard</h2>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-red-400 dark:bg-red-500 text-white rounded-full text-xs font-bold hover:bg-red-500 dark:hover:bg-red-600 transition-colors">
                      <Award className="w-3 h-3" /> Current <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden transition-colors">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                            <th className="py-4 px-6 font-medium text-xs tracking-wider">RANKING</th>
                            <th className="py-4 px-6 font-medium text-xs tracking-wider">MEMBER</th>
                            <th className="py-4 px-6 font-medium text-xs tracking-wider">COURSE</th>
                            <th className="py-4 px-6 font-medium text-xs tracking-wider text-right">SCORE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { rank: 1, name: "Jerome Bell", course: "UI/UX Masterclass", score: "5520 points", active: true, img: "J" },
                            { rank: 2, name: "Courtney Henry", course: "Data Analysis", score: "5140 points", active: false, img: "C" },
                            { rank: 3, name: "Arlene McCoy", course: "Web Dev Bootcamp", score: "4780 points", active: false, img: "A" },
                            { rank: 4, name: "Darrell Steward", course: "Python Basics", score: "4520 points", active: false, img: "D" },
                          ].map((row, i) => (
                            <tr key={i} className={`border-b last:border-0 border-slate-50 dark:border-slate-800/50 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/50 ${row.active ? 'bg-orange-50/30 dark:bg-orange-500/10' : ''}`}>
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  <span className={`font-bold ${row.active ? 'text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>{row.rank}</span>
                                  {row.active ? (
                                    <span className="text-orange-400 text-xs">▲</span>
                                  ) : (
                                    <span className="text-red-400 text-xs">▼</span>
                                  )}
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs">
                                    {row.img}
                                  </div>
                                  <span className="font-bold text-slate-800 dark:text-slate-100">{row.name}</span>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-slate-600 dark:text-slate-400 font-medium">{row.course}</td>
                              <td className="py-4 px-6 text-right font-bold text-slate-800 dark:text-slate-100">{row.score}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

              </div>

              {/* Right Column - 1/3 width */}
              <div className="space-y-8">
                
                {/* My Schedule */}
                <section>
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">My Schedule</h2>
                    <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { title: "UI Design Principles", date: "August 9, 2024", time: "10:00 AM", icon: Play, color: "text-orange-500" },
                      { title: "Data Visualization", date: "August 11, 2024", time: "02:00 PM", icon: Target, color: "text-emerald-500" },
                      { title: "Review Session", date: "August 13, 2024", time: "11:00 AM", icon: BookOpen, color: "text-blue-500" },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-md transition-all cursor-pointer group">
                        <div className={`w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${session.color} group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors`}>
                          <session.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-orange-500 transition-colors">{session.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                            <Calendar className="w-3.5 h-3.5" /> {session.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Tutors / Friends */}
                <section>
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Tutors</h2>
                    <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 transition-colors">
                    <div className="space-y-6">
                      {[
                        { name: "Jacob Jones", role: "UI/UX Tutor", img: "J" },
                        { name: "Samuel Ethan", role: "Data Tutor", img: "S" },
                        { name: "Eleanor Pena", role: "Web Dev Tutor", img: "E" },
                        { name: "Annette Black", role: "Python Tutor", img: "A" },
                      ].map((friend, i) => (
                        <div key={i} className="flex items-center justify-between group cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                              {friend.img}
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-orange-500 transition-colors">{friend.name}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{friend.role}</p>
                            </div>
                          </div>
                          <button className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/30 group-hover:text-orange-500 group-hover:border-orange-200 dark:group-hover:border-orange-500/50 transition-all">
                            <MessageSquare className="w-4 h-4 ml-0.5 mt-0.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

