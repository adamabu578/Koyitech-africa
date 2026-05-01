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
        // Fetch the fresh status from the database to prevent localStorage tampering
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("status")
          .eq("id", currentUser.id)
          .single();

        if (error) {
          throw error;
        }

        const userStatus = profile?.status || "active";
        setStatus(userStatus);
        
        // Update local storage to keep it in sync
        localStorage.setItem("currentUser", JSON.stringify({ ...currentUser, status: userStatus }));

      } catch (err) {
        console.error("Error verifying instructor status", err);
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

  // If status is pending, show the pending approval screen
  if (status === "pending") {
    return (
      <div className="flex min-h-screen bg-muted/30">
        <Sidebar userType="instructor" />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white border border-border p-10 rounded-3xl shadow-xl max-w-md w-full flex flex-col items-center space-y-6">
            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-gray-900">Account Pending Approval</h2>
              <p className="text-gray-500 font-medium">
                Your tutor account is currently being reviewed by an administrator. You will get access to your dashboard once your application is approved.
              </p>
            </div>
            <button 
              onClick={() => router.push("/")}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all uppercase tracking-widest text-xs"
            >
              Return Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  return <>{children}</>;
}
