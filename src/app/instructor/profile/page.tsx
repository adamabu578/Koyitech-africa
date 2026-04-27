"use client";

import { Sidebar } from "../../components/Sidebar";
import { User, Mail, Phone, MapPin, Edit3, Camera } from "lucide-react";
import { useState, useEffect } from "react";

export default function InstructorProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-muted/30 dark:bg-background">
      <Sidebar userType="instructor" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-4 md:px-8 py-4 md:py-6 pr-16 md:pr-8 sticky top-0 z-20 flex justify-between items-center text-foreground">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">My Profile</h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Manage your personal information.</p>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 md:space-y-8">
          <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-[#181059]"></div>
             
             <div className="relative pt-12 md:pt-16 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-end text-center md:text-left">
                <div className="relative group">
                   <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white border-4 border-background flex items-center justify-center text-3xl md:text-4xl font-black text-[#181059] shadow-xl">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                   </div>
                   <button className="absolute bottom-[-10px] right-[-10px] w-8 h-8 md:w-10 md:h-10 bg-primary text-white rounded-xl flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <Camera className="w-4 h-4 md:w-5 md:h-5" />
                   </button>
                </div>
                
                <div className="flex-1 pb-0 md:pb-4">
                   <h2 className="text-2xl md:text-3xl font-black">{user.firstName} {user.lastName}</h2>
                   <p className="text-muted-foreground font-medium text-sm md:text-lg">Expert Mentor</p>
                </div>
                
                <button className="pb-0 md:pb-4 flex items-center gap-2 text-primary font-bold hover:underline text-sm md:text-base">
                   <Edit3 size={18} /> Edit Profile
                </button>
             </div>
          </div>

          <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10">
             <h3 className="text-lg md:text-xl font-black mb-6 md:mb-8 border-b border-border pb-4">Personal Information</h3>
             
             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                   <div>
                      <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground block mb-2">First Name</label>
                      <p className="font-bold text-lg">{user.firstName}</p>
                   </div>
                   <div>
                      <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground block mb-2">Email Address</label>
                      <div className="flex items-center gap-3">
                         <Mail size={18} className="text-primary" />
                         <p className="font-bold">{user.email}</p>
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground block mb-2">Bio</label>
                      <p className="font-medium text-muted-foreground leading-relaxed">
                         Senior UI/UX Designer with over 10 years of experience in creating digital products. Passionate about teaching and sharing knowledge with the next generation of designers.
                      </p>
                   </div>
                </div>
                
                 <div className="space-y-4 md:space-y-6">
                    <div>
                       <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground block mb-1 md:mb-2">Last Name</label>
                       <p className="font-bold text-base md:text-lg">{user.lastName}</p>
                    </div>
                    <div>
                       <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground block mb-1 md:mb-2">Phone Number</label>
                       <div className="flex items-center gap-3">
                          <Phone size={18} className="text-primary shrink-0" />
                          <p className="font-bold text-sm md:text-base">{user.phone || "+234 800 000 0000"}</p>
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground block mb-1 md:mb-2">Location</label>
                       <div className="flex items-center gap-3">
                          <MapPin size={18} className="text-primary shrink-0" />
                          <p className="font-bold text-sm md:text-base">Lagos, Nigeria</p>
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-border flex justify-end">
                 <button className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-primary text-white rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                    Update Profile
                 </button>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}
