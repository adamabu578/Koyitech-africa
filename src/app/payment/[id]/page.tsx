"use client";

import { motion } from "motion/react";
import { useRouter, useParams } from "next/navigation";
import { CreditCard, ArrowLeft, Lock, CheckCircle2, Mail, ShieldCheck, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { toast } from "sonner";

export default function Payment() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const config = {
      reference: (new Date()).getTime().toString(),
      email: email,
      amount: 150000 * 100, // Example: 150,000 NGN in kobo
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  };

  const onSuccess = (reference: any) => {
    setSuccess(true);
    toast.success("Payment successful!");
    setTimeout(() => {
      router.push("/student");
    }, 3000);
  };

  const onClose = () => {
    setIsLoading(false);
    toast.error("Payment cancelled");
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }
    setIsLoading(true);
    initializePayment({ onSuccess, onClose });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center border border-border"
        >
          <div className="w-24 h-24 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-emerald-500">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black mb-4">Payment Successful</h2>
          <p className="text-muted-foreground font-medium mb-10 leading-relaxed">
            Your enrollment is confirmed. You now have access to your course.
          </p>
          <div className="space-y-4">
             <button 
                onClick={() => router.push("/student")}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20"
             >
                Go to Dashboard
             </button>
             <button 
                onClick={() => router.push("/student/classes")}
                className="w-full py-5 bg-muted text-foreground rounded-2xl font-black text-sm uppercase tracking-widest"
             >
                Start Learning
             </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.05),transparent)]">
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-background rounded-[3rem] shadow-2xl border border-border overflow-hidden">
        
        {/* Course Summary */}
        <div className="p-10 md:p-14 bg-[#181059] text-white space-y-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.15),transparent)]" />
           <div className="relative z-10">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors text-xs font-black uppercase tracking-widest"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Selection
              </button>
              
              <div className="space-y-6">
                 <div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-2">Checkout Info</h2>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">Complete Your <span className="italic text-primary">Enrollment</span></h1>
                    <p className="text-white/60 font-medium text-sm mt-3">Secure your spot and get access to your course and tutor.</p>
                 </div>
                 
                 <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                    <div className="flex gap-4">
                       <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                          <Zap size={24} className="fill-primary" />
                       </div>
                       <div>
                          <p className="text-xs font-black uppercase tracking-widest opacity-60">Enrolling In</p>
                          <p className="text-lg font-bold">UI/UX Design Masterclass</p>
                       </div>
                    </div>
                    
                    <div className="space-y-3 pt-6 border-t border-white/10">
                       <div className="flex justify-between text-sm">
                          <span className="opacity-60 font-medium">Course Duration</span>
                          <span className="font-bold">12 Weeks</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span className="opacity-60 font-medium">Tutor Support</span>
                          <span className="font-bold text-secondary">Included</span>
                       </div>
                       <div className="flex justify-between text-xl pt-4 border-t border-white/10">
                          <span className="font-black">Price</span>
                          <span className="font-black text-primary italic">₦150,000</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="relative z-10 flex items-center gap-3 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <ShieldCheck className="text-emerald-500" />
              <p className="text-xs font-medium text-emerald-100">Secure transaction processed through Paystack.</p>
           </div>
        </div>

        {/* Payment Form */}
        <div className="p-10 md:p-14 flex flex-col justify-center text-foreground">
           <div className="space-y-10">
              <div className="space-y-2">
                 <h2 className="text-2xl font-black tracking-tight">Payment Details</h2>
                 <p className="text-muted-foreground font-medium text-sm">Fill in your information to proceed.</p>
              </div>

              {mounted && (
                <form className="space-y-6" onSubmit={handlePayment}>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest ml-1">Confirm Email</label>
                      <div className="relative group">
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-all" />
                         <input 
                           type="email" 
                           placeholder="john@example.com"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted/50 border border-border focus:border-primary outline-none transition-all font-medium"
                           required
                         />
                      </div>
                   </div>

                   <div className="space-y-4 pt-4">
                      <p className="text-xs font-black uppercase tracking-widest ml-1 opacity-60">Choose Payment Method</p>
                      <div className="p-6 rounded-2xl border-2 border-primary bg-primary/5 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <CreditCard className="text-primary shrink-0" />
                            <div>
                               <span className="font-black text-sm uppercase tracking-widest block">Paystack</span>
                               <span className="text-xs font-bold text-muted-foreground">(Card, Bank Transfer, USSD)</span>
                            </div>
                         </div>
                         <div className="w-5 h-5 rounded-full border-4 border-primary bg-white shrink-0" />
                      </div>
                   </div>

                   <button
                     type="submit"
                     disabled={isLoading}
                     className="w-full py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0"
                   >
                     {isLoading ? "Verifying..." : "Proceed to Payment"}
                   </button>

                   <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Lock size={14} />
                      <span className="text-[10px] uppercase font-black tracking-widest">End-to-End Encrypted</span>
                   </div>
                </form>
              )}
           </div>
        </div>

      </div>
    </div>
  );
}
