"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        router.push("/login");
        return;
      }

      const isProfile = pathname === "/student/profile";

      if (!isProfile) {
        try {
          const enrolledCourses = localStorage.getItem("enrolledCourses");
          const parsed = enrolledCourses ? JSON.parse(enrolledCourses) : [];
          if (!parsed || parsed.length === 0) {
            toast.error("Please enroll in a course to access this page.", { id: "enroll-toast" });
            router.push("/courses");
            return;
          }
        } catch (err) {
          toast.error("Please enroll in a course to access this page.", { id: "enroll-toast" });
          router.push("/courses");
          return;
        }
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [router, pathname]);

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
}
