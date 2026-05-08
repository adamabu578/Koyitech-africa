"use client";

import { motion } from "motion/react";
import { Sidebar } from "../../components/Sidebar";
import { Award, Download, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export default function Certificates() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      setUser({ firstName: "Student", lastName: "Name" });
    }
  }, []);

  // Match the courses the student is actually enrolled in
  const certificates = [
    {
      course: "UI/UX Design",
      dateAwarded: "March 15, 2026",
      id: "CERT-2026-0045"
    },
    {
      course: "Data Analysis",
      dateAwarded: "April 22, 2026",
      id: "CERT-2026-0089"
    }
  ];

  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (cert: any) => {
    setDownloading(cert.id);
    try {
      const element = document.getElementById(`cert-template-${cert.id}`);
      if (!element) {
        console.error("Certificate template not found");
        return;
      }
      // Temporary workaround for html-to-image cssRules SecurityError
      // Find and temporarily remove cross-origin stylesheets
      const crossOriginNodes: { node: Node; parent: Node; nextSibling: Node | null }[] = [];
      Array.from(document.styleSheets).forEach((sheet) => {
        try {
          // This will throw a SecurityError if the stylesheet is cross-origin
          const rules = sheet.cssRules;
        } catch (e) {
          if (sheet.ownerNode && sheet.ownerNode.parentNode) {
            crossOriginNodes.push({ 
              node: sheet.ownerNode, 
              parent: sheet.ownerNode.parentNode, 
              nextSibling: sheet.ownerNode.nextSibling 
            });
            sheet.ownerNode.parentNode.removeChild(sheet.ownerNode);
          }
        }
      });
      
      const dataUrl = await toPng(element, { quality: 1.0, pixelRatio: 2 });
      
      // Restore the cross-origin stylesheets
      crossOriginNodes.forEach(({ node, parent, nextSibling }) => {
         if (nextSibling) {
            parent.insertBefore(node, nextSibling);
         } else {
            parent.appendChild(node);
         }
      });
      
      const pdf = new jsPDF("landscape", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;
      
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${cert.id}-certificate.pdf`);
    } catch (error) {
      console.error("Failed to generate certificate", error);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fdf8f5] dark:bg-slate-950 md:p-6 lg:p-8 transition-colors duration-300">
      
      {/* Hidden Certificate Templates for PDF Generation */}
      <div className="absolute top-[-9999px] left-[-9999px]">
        {certificates.map((cert) => (
          <div
            key={`template-${cert.id}`}
            id={`cert-template-${cert.id}`}
            className="w-[1123px] h-[794px] bg-white text-gray-900 border-[16px] border-gray-100 flex overflow-hidden z-[-1] relative font-sans"
          >
            {/* Background watermark/pattern */}
            <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
              <Award className="w-[800px] h-[800px] text-[#5b4fff]" />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col pt-20 pb-20 pl-24 pr-16 relative z-10">
              
              {/* Logo */}
              <div className="flex items-center gap-4 mb-20">
                <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-white italic text-3xl font-black shadow-lg shadow-primary/20">
                  AA
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-5xl font-black tracking-tighter text-primary">KOYITECH</span>
                  <span className="text-2xl italic text-[#34d399] font-bold">AFRICA</span>
                </div>
              </div>

              {/* Date */}
              <p className="text-sm font-bold text-gray-500 mb-10 tracking-widest uppercase">
                {cert.dateAwarded}
              </p>

              {/* Student Name */}
              <h1 className="text-6xl font-serif mb-6 text-gray-900 border-b-2 border-gray-200 pb-4 inline-block min-w-[500px]">
                {user ? `${user.firstName} ${user.lastName}` : "Student Name"}
              </h1>

              {/* Completion text */}
              <p className="text-gray-500 mb-6 text-xl italic font-serif">
                has successfully completed
              </p>

              {/* Course Title */}
              <h2 className="text-4xl font-bold text-gray-900 mb-6 max-w-2xl leading-tight">
                {cert.course}
              </h2>

              {/* Authorized By */}
              <p className="text-gray-600 max-w-xl text-lg mb-auto">
                an online non-credit course authorized by <strong>Koyitech Africa</strong> and offered through Koyitech Africa
              </p>

              {/* Signature Area */}
              <div className="mt-12 flex gap-16">
                 <div>
                    <div className="border-b-2 border-gray-800 pb-2 mb-2 w-64">
                       <span className="text-5xl font-serif italic tracking-tighter pr-4 text-gray-800">Adam Abu</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-widest">Adam Abu</p>
                    <p className="text-xs text-gray-500 mt-1">Director of Koyitech Africa</p>
                 </div>
              </div>
            </div>

            {/* Right Ribbon / Banner */}
            <div className="w-[340px] relative h-full flex flex-col items-center z-10 bg-gradient-to-b from-slate-50 to-slate-200 border-l border-gray-200 shadow-2xl shadow-black/5">
              <div className="absolute -bottom-16 left-0 w-full h-[120px] bg-slate-200 z-[-1]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
              
              <div className="pt-24 text-center uppercase tracking-[0.25em] font-black text-slate-500 space-y-2 mb-24 text-sm">
                 <p>Course</p>
                 <p>Certificate</p>
              </div>

              <div className="w-[220px] h-[220px] rounded-full border-[12px] border-slate-300 flex items-center justify-center relative bg-white shadow-xl shadow-black/5">
                {/* Inner dashed ring */}
                <div className="absolute inset-3 border-2 border-dashed border-slate-300 rounded-full flex items-center justify-center p-6">
                   <div className="flex flex-col leading-none items-center">
                      <span className="text-2xl font-black tracking-tighter text-primary">KOYITECH</span>
                      <span className="text-sm italic text-[#34d399] font-bold">AFRICA</span>
                    </div>
                </div>
              </div>

              <div className="mt-auto pb-20 text-right pr-12 self-end w-full">
                 <p className="text-xs text-slate-500 mb-1 font-bold uppercase tracking-widest">Verify at:</p>
                 <p className="text-xs text-primary font-mono font-bold mb-3">{`koyitech.africa/verify/${cert.id}`}</p>
                 <p className="text-[10px] text-slate-400 mt-2 max-w-[220px] ml-auto leading-relaxed">
                    Koyitech Africa has confirmed the identity of this individual and their participation in the course.
                 </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex bg-white dark:bg-slate-900 md:rounded-[2.5rem] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-orange-50/50 dark:border-slate-800 relative z-10">
        <Sidebar userType="student" />

        <main className="flex-1 overflow-y-auto">
          <header className="bg-white dark:bg-slate-900 border-b border-border pl-4 pr-20 md:px-8 py-4 md:py-6 sticky top-0 z-20 flex justify-between items-center text-foreground transition-colors">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">Certificates</h1>
            <p className="text-muted-foreground font-medium">Your earned credentials and achievements.</p>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
          {certificates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {certificates.map((cert, index) => (
                <motion.div 
                  key={`card-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background border border-border rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-primary transition-all group"
                >
                  <div className="h-32 md:h-40 bg-[linear-gradient(45deg,#181059,#5b4fff)] flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
                     <Award className="w-12 h-12 md:w-16 md:h-16 text-secondary opacity-90" />
                     <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest">Verified</div>
                  </div>
                  <div className="p-5 md:p-8">
                    <h3 className="text-lg md:text-xl font-black mb-1 text-foreground leading-tight">{cert.course}</h3>
                    <p className="text-xs md:text-sm font-bold text-muted-foreground mb-4 md:mb-6">Issued: {cert.dateAwarded}</p>
                    <div className="bg-muted p-3 rounded-lg mb-4 md:mb-6">
                       <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Credential ID</p>
                       <p className="text-[10px] md:text-xs font-mono font-bold text-foreground break-all">{cert.id}</p>
                    </div>
                    <button 
                      onClick={() => handleDownload(cert)}
                      disabled={downloading === cert.id}
                      className="w-full py-3 md:py-4 bg-primary text-white rounded-lg md:rounded-xl font-black text-[10px] md:text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {downloading === cert.id ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} 
                      {downloading === cert.id ? "GENERATING..." : "DOWNLOAD PDF"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-background border border-dashed border-border rounded-3xl">
               <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                  <Award size={32} />
               </div>
               <h3 className="text-xl font-black text-foreground mb-2">No Certificates Yet</h3>
               <p className="text-muted-foreground font-medium">Complete courses to earn your certificates.</p>
            </div>
          )}
        </div>
      </main>
      </div>
    </div>
  );
}
