"use client";

import { motion } from "motion/react";
import { Sidebar } from "../../components/Sidebar";
import { User, Mail, Phone, Edit3, Settings, Shield, Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const parsed = JSON.parse(currentUser);
      setUser(parsed);
      setFormData({
        firstName: parsed.firstName || "",
        lastName: parsed.lastName || "",
        email: parsed.email || "",
        phone: parsed.phone || ""
      });
    } else {
      // Fallback mock user if accessed directly
      setUser({
        id: "AE-2024-001",
        firstName: "Demo",
        lastName: "User",
        email: "demo@example.com",
        phone: ""
      });
    }
  }, []);

  const handleSave = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in required fields");
      return;
    }
    
    // Update current user
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    // Update in users array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = existingUsers.findIndex((u: any) => u.email === user?.email);
    if (userIndex !== -1) {
      existingUsers[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(existingUsers));
    }
    
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen bg-[#fdf8f5] dark:bg-slate-950 md:p-6 lg:p-8 transition-colors duration-300">
        <div className="flex-1 flex bg-white dark:bg-slate-900 md:rounded-[2.5rem] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-orange-50/50 dark:border-slate-800">
          <Sidebar userType="student" />
          <main className="flex-1 flex items-center justify-center">
             <p className="text-muted-foreground font-medium animate-pulse">Loading profile...</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#fdf8f5] dark:bg-slate-950 md:p-6 lg:p-8 transition-colors duration-300">
      <div className="flex-1 flex bg-white dark:bg-slate-900 md:rounded-[2.5rem] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-orange-50/50 dark:border-slate-800">
        <Sidebar userType="student" />

        <main className="flex-1 overflow-y-auto">
          <header className="bg-white dark:bg-slate-900 border-b border-border pl-4 pr-20 md:px-8 py-4 md:py-6 sticky top-0 z-20 flex justify-between items-center text-foreground transition-colors">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">Profile</h1>
            <p className="text-muted-foreground font-medium">Manage your personal information.</p>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background border border-border p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[3rem] shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-[linear-gradient(45deg,#181059,#5b4fff)]" />
            
            <div className="relative pt-12 md:pt-16 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end mb-6 md:mb-8">
               <div className="flex-1 mt-6 md:mt-0">
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1">{user.firstName} {user.lastName}</h2>
                  <p className="text-xs md:text-sm font-bold text-muted-foreground">ID: #{user.id?.slice(-6) || "000000"}</p>
                  <div className="mt-4 inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full">
                     <Shield size={16} className="text-secondary" />
                     <span className="text-xs font-black uppercase tracking-widest text-secondary">Premium Member</span>
                  </div>
               </div>
               {!isEditing ? (
                 <button 
                   onClick={() => setIsEditing(true)}
                   className="px-6 py-3 bg-muted hover:bg-border text-foreground rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors"
                 >
                    <Edit3 size={16} /> Edit Profile
                 </button>
               ) : (
                 <div className="flex gap-3">
                   <button 
                     onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          firstName: user.firstName || "",
                          lastName: user.lastName || "",
                          email: user.email || "",
                          phone: user.phone || ""
                        });
                     }}
                     className="px-6 py-3 border border-border hover:bg-muted text-foreground rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors"
                   >
                      <X size={16} /> Cancel
                   </button>
                   <button 
                     onClick={handleSave}
                     className="px-6 py-3 bg-[#181059] hover:bg-[#2b1f85] text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors"
                   >
                      <Save size={16} /> Save Changes
                   </button>
                 </div>
               )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12">
               <div className="space-y-4 md:space-y-6">
                  <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-[#181059] mb-2 md:mb-4 flex items-center gap-2"><User size={16} /> Personal Info</h3>
                  <div className="p-4 md:p-6 bg-muted/50 rounded-xl md:rounded-2xl space-y-4">
                     {isEditing ? (
                       <>
                         <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1 block">First Name</label>
                              <input 
                                type="text" 
                                value={formData.firstName} 
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#5b4fff] outline-none"
                              />
                           </div>
                           <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1 block">Last Name</label>
                              <input 
                                type="text" 
                                value={formData.lastName} 
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#5b4fff] outline-none"
                              />
                           </div>
                         </div>
                         <div className="w-full h-px bg-border my-4"></div>
                         <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1 block">Email Address</label>
                            <input 
                              type="email" 
                              value={formData.email} 
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#5b4fff] outline-none"
                            />
                         </div>
                         <div className="w-full h-px bg-border my-4"></div>
                         <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1 block">Phone Number</label>
                            <input 
                              type="text" 
                              value={formData.phone} 
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              placeholder="+234 800 000 0000"
                              className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#5b4fff] outline-none"
                            />
                         </div>
                       </>
                     ) : (
                       <>
                         <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Full Name</p>
                            <p className="text-lg font-medium text-foreground">{user.firstName} {user.lastName}</p>
                         </div>
                         <div className="w-full h-px bg-border"></div>
                         <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Email Address</p>
                            <p className="text-lg font-medium text-foreground flex items-center gap-2"><Mail size={16} className="text-muted-foreground"/> {user.email}</p>
                         </div>
                         <div className="w-full h-px bg-border"></div>
                         <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Phone Number</p>
                            <p className="text-lg font-medium text-foreground flex items-center gap-2">
                              <Phone size={16} className="text-muted-foreground"/> 
                              {user.phone || "Not provided"}
                            </p>
                         </div>
                       </>
                     )}
                  </div>
               </div>

               <div className="space-y-4 md:space-y-6">
                  <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-[#181059] mb-2 md:mb-4 flex items-center gap-2"><Settings size={16} /> Account Security</h3>
                  <div className="p-4 md:p-6 bg-muted/50 rounded-xl md:rounded-2xl space-y-4">
                     <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Password</p>
                        <p className="text-lg font-medium text-foreground">••••••••</p>
                        <button className="text-sm text-[#5b4fff] font-bold hover:underline mt-2">Change Password</button>
                     </div>
                     <div className="w-full h-px bg-border"></div>
                     <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Two-Factor Authentication</p>
                        <p className="text-lg font-medium text-muted-foreground">Not enabled</p>
                        <button className="text-sm text-[#5b4fff] font-bold hover:underline mt-2">Enable 2FA</button>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </main>
      </div>
    </div>
  );
}
