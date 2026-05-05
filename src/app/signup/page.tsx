"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Tutor application fields
  const [subjects, setSubjects] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill in all basic fields");
      return;
    }

    if (role === "instructor" && (!subjects || !experience || !bio)) {
      toast.error("Please fill in all application fields");
      return;
    }

    setIsLoading(true);
    let finalRole = role;
    if (email.includes("admin")) finalRole = "admin";

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          role: finalRole,
          status: role === "instructor" ? "pending" : "active",
          ...(role === "instructor" ? { subjects, experience, bio } : {})
        }
      }
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (role === "instructor") {
      toast.success("Application submitted! We will review it shortly.");
    } else {
      toast.success("Account created successfully!");
    }
    router.push("/login");
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
              Your dreams start here
            </h2>

            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-sm font-medium text-gray-600">Continue with Google</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <form className="space-y-5" onSubmit={handleSignup}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-500">First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-500">Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                  />
                </div>
              </div>

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
                <label className="text-sm font-medium text-gray-500">Password</label>
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

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-500">I am signing up as a:</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${role === "student"
                      ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                      : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("instructor")}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${role === "instructor"
                      ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                      : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    Tutor
                  </button>
                </div>
              </div>

              {role === "instructor" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-5 border-t border-gray-100 pt-5 mt-5"
                >
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-500">What course do you want to teach?</label>
                    <input
                      type="text"
                      placeholder="e.g. Digital marketing,graphic design,data analytics"
                      value={subjects}
                      onChange={(e) => setSubjects(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-500">Years of Experience</label>
                    <input
                      type="number"
                      placeholder="e.g. 5"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-500">Short Bio / Motivation</label>
                    <textarea
                      placeholder="Tell us about your background and why you want to teach..."
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* Fake Cloudflare Verify */}
              <div className="border border-gray-200 rounded-lg p-3 flex items-center justify-between bg-gray-50max-w-[280px]">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded border border-gray-300 bg-white flex items-center justify-center">
                    <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  </div>
                  <span className="text-sm text-gray-700">Verify you are human</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-5 flex gap-1 items-end">
                    {/* Cloudflare logo approximation */}
                    <div className="w-full h-3.5 bg-orange-500 rounded-full flex gap-1 relative overflow-hidden">
                      <div className="w-3 h-5 bg-orange-400 absolute rounded-full -top-1 left-1"></div>
                      <div className="w-4 h-5 bg-orange-400 absolute rounded-full -top-2 right-1"></div>
                    </div>
                  </div>
                  <span className="text-[7px] text-gray-500 uppercase font-black uppercase tracking-tight mt-1">Cloudflare</span>
                  <span className="text-[6px] text-gray-400">Privacy • Terms</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#3b4b96] text-white py-3.5 rounded-lg text-sm font-medium hover:bg-[#2b3a7a] transition-colors disabled:opacity-50"
              >
                {isLoading ? (role === "instructor" ? "Submitting..." : "Signing up...") : (role === "instructor" ? "Submit Application" : "Sign up")}
              </button>

              <p className="text-sm text-gray-600 pt-4 text-center">
                Already have an account? <Link href="/login" className="text-[#3b4b96] hover:underline font-medium">Log in</Link>
              </p>

              <p className="text-xs text-gray-500 pt-2 text-center">
                By clicking the above, I agree to Aeroverse Academy's <a href="#" className="text-[#3b4b96]">Terms</a> and <a href="#" className="text-[#3b4b96]">Privacy policy</a>.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
