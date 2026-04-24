"use client";

import { motion } from "motion/react";
import { Sidebar } from "../../components/Sidebar";
import { User, Mail, Phone, Edit3, Settings, Shield } from "lucide-react";

export default function Profile() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar userType="student" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-8 py-6 sticky top-0 z-20 flex justify-between items-center text-foreground">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Profile</h1>
            <p className="text-muted-foreground font-medium">Manage your personal information.</p>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background border border-border p-8 rounded-[3rem] shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-32 bg-[linear-gradient(45deg,#181059,#5b4fff)]" />
            
            <div className="relative pt-16 flex flex-col md:flex-row gap-8 items-start md:items-end mb-8">
               <div className="w-32 h-32 rounded-[2rem] bg-indigo-50 border-4 border-background flex items-center justify-center text-[#181059] shadow-lg shrink-0">
                  <span className="text-4xl font-black italic">CA</span>
               </div>
               <div className="flex-1">
                  <h2 className="text-3xl font-black text-foreground mb-1">Chidi A.</h2>
                  <p className="font-bold text-muted-foreground">ID: #AE-2024-001</p>
                  <div className="mt-4 inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full">
                     <Shield size={16} className="text-secondary" />
                     <span className="text-xs font-black uppercase tracking-widest text-secondary">Premium Member</span>
                  </div>
               </div>
               <button className="px-6 py-3 bg-muted hover:bg-border text-foreground rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors">
                  <Edit3 size={16} /> Edit Profile
               </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
               <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#181059] mb-4 flex items-center gap-2"><User size={16} /> Personal Info</h3>
                  <div className="p-6 bg-muted/50 rounded-2xl space-y-4">
                     <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Full Name</p>
                        <p className="text-lg font-medium text-foreground">Chidi A.</p>
                     </div>
                     <div className="w-full h-px bg-border"></div>
                     <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Email Address</p>
                        <p className="text-lg font-medium text-foreground flex items-center gap-2"><Mail size={16} className="text-muted-foreground"/> chidi.a@example.com</p>
                     </div>
                     <div className="w-full h-px bg-border"></div>
                     <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Phone Number</p>
                        <p className="text-lg font-medium text-foreground flex items-center gap-2"><Phone size={16} className="text-muted-foreground"/> +234 800 000 0000</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#181059] mb-4 flex items-center gap-2"><Settings size={16} /> Account Security</h3>
                  <div className="p-6 bg-muted/50 rounded-2xl space-y-4">
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
  );
}
