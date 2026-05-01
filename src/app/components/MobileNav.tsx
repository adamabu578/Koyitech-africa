"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, BookOpen, FileText, Upload } from "lucide-react";
import { motion } from "motion/react";

interface MobileNavProps {
  userType: "student" | "instructor";
}

export function MobileNav({ userType }: MobileNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const studentLinks = [
    { path: "/student", label: "Dashboard", icon: LayoutDashboard },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/materials", label: "Materials", icon: FileText },
  ];

  const instructorLinks = [
    { path: "/instructor", label: "Dashboard", icon: LayoutDashboard },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/upload", label: "Upload", icon: Upload },
  ];

  const links = userType === "student" ? studentLinks : instructorLinks;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around px-4 py-3">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.path;

          return (
            <Link key={link.path} href={link.path} passHref>
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors cursor-pointer ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{link.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
