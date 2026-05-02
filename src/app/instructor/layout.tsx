"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import { Loader2, ShieldAlert } from "lucide-react";
import { Sidebar } from "../components/Sidebar";

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [status, setStatus] = useState<string>("active");

  useEffect(() => {
    const checkAuth = async () => {
      const currentUserStr = localStorage.getItem("currentUser");
      if (!currentUserStr) {
        router.push("/login");
        return;
      }

      const currentUser = JSON.parse(currentUserStr);

      try {
        // Fetch the fresh role from the database to prevent localStorage tampering
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();

        if (error) {
          console.error("Error fetching profile, falling back to localStorage role", error);
        }

        if (profile?.role === "admin" || currentUser.role === "admin") {
          router.push("/admin");
          return;
        }

        const rawRole = profile?.role || currentUser.role;
        const userStatus = rawRole === "pending_instructor" ? "pending" : "active";
        setStatus(userStatus);

        // Update local storage to keep it in sync
        localStorage.setItem("currentUser", JSON.stringify({ ...currentUser, status: userStatus }));

        const isProfile = pathname === "/instructor/profile";
        if (userStatus === "pending" && !isProfile) {
          setIsChecking(false);
          toast.error("Confirmation yet from admin approval pending", { id: "pending-toast" });
          router.push("/");
          return;
        }

      } catch (err) {
        console.error("Error verifying instructor status", err);
        // On fatal error, assume pending to be safe
        setStatus("pending");
        setIsChecking(false);
        toast.error("Confirmation yet from admin approval pending", { id: "pending-toast" });
        router.push("/");
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [router, pathname]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // The pending screen UI block was removed, layout now handles access via redirection just like student layout

  return <>{children}</>;
}
