"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data.user) {
      // Fetch role from profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, first_name, last_name')
        .eq('id', data.user.id)
        .single();
        
      const userRole = profile?.role || 'student';
      
      // Keep currentUser in localStorage for compatibility during transition
      const userData = {
        id: data.user.id,
        email: data.user.email,
        firstName: profile?.first_name || '',
        lastName: profile?.last_name || '',
        role: userRole
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      toast.success("Welcome back!");
      router.push(userRole === "admin" ? "/admin" : userRole === "instructor" ? "/instructor" : "/student");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="bg-white rounded-[2rem] shadow-sm w-full max-w-5xl flex flex-col md:flex-row overflow-hidden min-h-0 md:min-h-[700px]">
        
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 p-4 h-64 md:h-auto min-h-[250px] md:min-h-0 shrink-0">
           <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
             <img 
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
               alt="Campus Illustration" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply"></div>
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-14 flex flex-col justify-center relative flex-1">
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="w-full max-w-md mx-auto space-y-8"
           >
              <h2 className="text-4xl font-serif tracking-tight text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Welcome back
              </h2>

              <button type="button" className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                 <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                 </svg>
                 <span className="text-sm font-medium text-gray-600">Log in with Google</span>
              </button>

              <div className="flex items-center gap-4">
                 <div className="flex-1 h-px bg-gray-200"></div>
                 <span className="text-sm text-gray-400">or</span>
                 <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <form className="space-y-5" onSubmit={handleLogin}>
                 <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <input
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                    />
                 </div>

                 <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                       <label className="text-sm font-medium text-gray-500">Password</label>
                       <button type="button" className="text-xs font-medium text-[#3b4b96] hover:underline">Forgot password?</button>
                    </div>
                    <div className="relative">
                       <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                       />
                       <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                       >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                       </button>
                     </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#3b4b96] text-white py-3.5 rounded-lg text-sm font-medium hover:bg-[#2b3a7a] transition-colors disabled:opacity-50 mt-4"
                 >
                    {isLoading ? "Signing in..." : "Log in"}
                 </button>

                 <p className="text-sm text-gray-600 pt-4 text-center">
                    Don't have an account? <Link href="/signup" className="text-[#3b4b96] hover:underline font-medium">Sign up</Link>
                 </p>
              </form>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
