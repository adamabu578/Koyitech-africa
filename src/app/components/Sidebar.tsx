"use client";

import { useRouter, usePathname } from "next/navigation";
import { 
  LayoutDashboard, BookOpen, FileText, 
  Upload, MessageSquare, Users, 
  Settings, BarChart3, GraduationCap,
  Calendar, CheckSquare, PencilLine,
  User, LogOut
} from "lucide-react";
import { motion } from "motion/react";

interface SidebarProps {
  userType: "student" | "instructor" | "admin";
}

export function Sidebar({ userType }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const studentLinks = [
    { path: "/student", label: "Dashboard", icon: LayoutDashboard },
    { path: "/student/courses", label: "My Courses", icon: BookOpen },
    { path: "/student/assignments", label: "Assignments", icon: CheckSquare },
    { path: "/student/classes", label: "Classes", icon: Calendar },
    { path: "/student/materials", label: "Materials", icon: FileText },
    { path: "/student/quizzes", label: "Quizzes", icon: PencilLine },
    { path: "/student/certificates", label: "Certificates", icon: GraduationCap },
    { path: "/student/profile", label: "Profile", icon: User },
  ];

  const instructorLinks = [
    { path: "/instructor", label: "Dashboard", icon: LayoutDashboard },
    { path: "/instructor/courses", label: "My Courses", icon: BookOpen },
    { path: "/instructor/students", label: "Students", icon: Users },
    { path: "/instructor/assignments", label: "Assignments", icon: CheckSquare },
    { path: "/instructor/quizzes", label: "Quizzes", icon: PencilLine },
    { path: "/instructor/materials", label: "Materials", icon: FileText },
    { path: "/instructor/messages", label: "Messages", icon: MessageSquare },
    { path: "/instructor/profile", label: "Profile", icon: User },
  ];

  const adminLinks = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/courses", label: "Courses", icon: BookOpen },
    { path: "/admin/tutors", label: "Tutors", icon: GraduationCap },
    { path: "/admin/students", label: "Students", icon: Users },
    { path: "/admin/reports", label: "Reports", icon: BarChart3 },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const links = userType === "student" ? studentLinks : userType === "instructor" ? instructorLinks : adminLinks;

  return (
    <div className="hidden md:flex w-72 bg-card border-r border-border h-screen sticky top-0 flex-col py-8">
      <div className="px-8 mb-10">
        <div 
          className="flex items-center gap-3 text-xl font-black tracking-tighter cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white italic text-xs shadow-lg shadow-primary/20">
            AA
          </div>
          AEROVERSE <span className="text-primary italic">ACADEMY</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.path;

          return (
            <button
              key={link.path}
              onClick={() => router.push(link.path)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-sm uppercase tracking-widest ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-muted-foreground"}`} strokeWidth={isActive ? 2.5 : 2} />
              <span>{link.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 border-t border-border pt-6 mt-6">
        <button
          onClick={() => router.push("/")}
          className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all font-bold text-sm uppercase tracking-widest"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
