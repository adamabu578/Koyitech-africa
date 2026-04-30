"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { 
  Users, BookOpen, Award, CheckCircle2, 
  ArrowRight, Play, Star, Map, 
  Share2, BarChart3, Palette, Layout, 
  Database, Shield, Zap, Rocket, 
  Globe, MessageSquare, HelpCircle,
  Clock, Target, GraduationCap, Briefcase
} from "lucide-react";
import { Navbar } from "./components/Navbar";

export default function Landing() {
  const router = useRouter();

  const courses = [
    { title: "Geography Sensing & GIS", category: "Data", icon: Map, image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80", desc: "Master spatial data analysis and mapping. Learn to interpret geographic patterns to solve complex environmental and urban challenges." },
    { title: "Social Media Management", category: "Marketing", icon: Share2, image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80", desc: 'Go beyond "posting." Learn to build brands, manage online communities, and create viral content strategies that convert.' },
    { title: "Digital Marketing", category: "Marketing", icon: Globe, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80", desc: "Master SEO, PPC, and email marketing. Learn how to drive traffic and scale businesses using the power of the internet." },
    { title: "Graphics Design", category: "Design", icon: Palette, image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80", desc: "Turn your creativity into a career. Learn the principles of visual communication and master industry-standard design tools." },
    { title: "UI/UX Design", category: "Design", icon: Layout, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80", desc: "Create digital experiences people love. Learn to design intuitive interfaces and user journeys for mobile apps and websites." },
    { title: "Data Analysis", category: "Data", icon: BarChart3, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", desc: "Turn raw numbers into powerful insights. Master Excel, SQL, and PowerBI to help companies make data-driven decisions." },
    { title: "Virtual Assistant / Remote Work", category: "Business", icon: Briefcase, image: "https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=600&q=80", desc: "Learn the administrative and organizational skills needed to support international clients and thrive in the remote workspace." },
    { title: "Cybersecurity", category: "IT", icon: Shield, image: "/cyber_security.png", desc: "Protect the digital world. Learn the fundamentals of network security, ethical hacking, and data protection strategies." },
    { title: "AI Productivity", category: "Tech", icon: Rocket, image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80", desc: "Work smarter, not harder. Master AI tools to automate your workflow, create content faster, and 10x your professional output." },
    { title: "Project Management", category: "Business", icon: Target, image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80", desc: "Lead teams to success. Learn the frameworks and methodologies (Agile, Scrum) used by top tech companies globally." },
    { title: "Web Development", category: "Tech", icon: Database, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80", desc: "Build the internet. From HTML to modern frameworks, learn to create responsive, functional, and beautiful websites from scratch." },
  ];

  const faqs = [
    { q: "Do I need experience?", a: "Most of our courses are beginner-friendly. We start from the basics and build up to advanced concepts." },
    { q: "Are classes live?", a: "Yes! We prioritize live, tutor-led sessions to ensure you can interact, ask questions, and get real-time feedback." },
    { q: "How do I enroll?", a: "Simply click the 'Register Interest' button. Our team will contact you with the next steps regarding schedules and requirements." },
    { q: "Will I get a certificate?", a: "Yes, upon successful completion of your course and projects, you will receive a certificate of completion from Aeroverse Academy." },
    { q: "Can I earn after learning?", a: "Absolutely. Our courses are specifically chosen based on their high market demand, focusing on skills that allow you to freelance or work remotely." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-40 lg:pb-56 overflow-hidden bg-[#181059] dark:bg-slate-950 text-white">
        {/* Background Decorative Stars and Elements */}
        <div className="absolute top-20 left-20">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/20"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </div>
        <div className="absolute top-1/2 left-1/3">
           <div className="w-2 h-2 bg-white/20 rounded-full"></div>
        </div>


        {/* Mobile Background Image */}
        <div className="absolute inset-0 z-0 lg:hidden">
           <img 
             src="/guy.jpeg" 
             alt="Student Learning" 
             className="w-full h-full object-cover object-top opacity-70" 
           />
           {/* Overlay to ensure text readability */}
           <div className="absolute inset-0 bg-gradient-to-b from-[#181059]/10 via-[#181059]/50 to-[#181059]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15]">
              Master the <br className="hidden md:block" />
              <span className="relative inline-block pb-2">
                Digital Skills 
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#34d399]"></span>
              </span>
              <br className="hidden md:block" /> That Pay.
            </h1>
            <p className="text-lg text-white/80 max-w-lg leading-relaxed font-medium">
              Guided by Experts, Built for Your Career. Bridge the gap between learning and earning. Aeroverse Academy provides tutor-led, practical training in high-demand digital skills designed to help Nigerians thrive in the global economy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/signup")}
                className="px-8 py-4 bg-[#5b4fff] text-white rounded-lg font-bold hover:bg-[#4a3ecc] transition-colors"
              >
                Register Your Interest
              </button>
              <button
                onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-lg font-bold hover:bg-white/10 transition-colors"
              >
                Explore Our Courses
              </button>
            </div>
          </motion.div>

          <div className="relative hidden lg:flex justify-end h-[600px] items-center">
             
             {/* Single Large Main Image */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="relative z-20 w-[600px] h-[600px]"
             >
                <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl">
                   <img 
                     src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" 
                     alt="Students Learning" 
                     className="w-full h-full object-cover" 
                   />
                </div>
                
                {/* Floating Badge aligned on left edge */}
                <div className="absolute bottom-16 -left-12 bg-white text-gray-900 rounded-2xl px-6 py-5 shadow-2xl flex items-center gap-4 z-30 transform hover:scale-105 transition-transform duration-300">
                   <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-[#5b4fff]">
                      <Award className="w-6 h-6" />
                   </div>
                   <div>
                     <p className="text-xs text-[#5b4fff] font-black uppercase tracking-widest mb-1">Guaranteed</p>
                     <p className="text-sm font-bold text-gray-900 leading-tight">Practical & <br/>Job-Ready Skills</p>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>

        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-0">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[120px] fill-background">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,126.96,195.45,116.32,238.16,109.28,280.4,85.64,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Welcome to Aeroverse Academy */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 text-[#1a064f] dark:text-white">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Welcome to Aeroverse Academy
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that learning a digital skill shouldn't be a lonely journey of watching endless YouTube videos. Aeroverse Academy is a premier digital skills center where education meets mentorship. Our programs are designed for Nigerians who want to transition into tech, scale their freelance careers, or secure high-paying remote roles through structured, tutor-led guidance.
              </p>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-[#1a064f] dark:text-white mb-6">Why Choose Us?</h3>
              <div className="space-y-6">
                {[
                  { title: "Tutor-Led Excellence", desc: "No more pre-recorded confusion. Learn live from industry professionals who answer your questions in real-time.", icon: Award },
                  { title: "Practical Curriculum", desc: "We skip the fluff. Our lessons are centered around real-world projects that you can add to your portfolio.", icon: Play },
                  { title: "Community & Mentorship", desc: "Gain access to a network of peers and mentors dedicated to your professional growth.", icon: Users },
                  { title: "Job-Ready Focus", desc: "Our goal isn't just to teach you a tool; it’s to help you build a career and increase your income potential.", icon: Rocket },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-[#5b4fff] shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a064f] dark:text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Courses */}
      <section id="courses" className="py-24 bg-muted/30 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a064f] dark:text-white">Our Courses</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start your journey with a curriculum designed for the modern job market.
              </p>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course, i) => (
                 <div key={i} className="bg-white dark:bg-gray-900 border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all group flex flex-col hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                       <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute top-3 left-3 bg-[#5b4fff] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          {course.category}
                       </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                       <h3 className="font-bold text-lg text-[#1a064f] dark:text-white mb-3 group-hover:text-[#5b4fff] transition-colors leading-tight">
                          {course.title}
                       </h3>
                       <p className="text-sm text-muted-foreground mb-6 flex-1">
                          {course.desc}
                       </p>
                       <button onClick={() => router.push("/payment/1")} className="w-full py-3 bg-slate-50 dark:bg-slate-800 text-[#5b4fff] font-bold rounded-xl group-hover:bg-[#5b4fff] group-hover:text-white transition-colors flex justify-center items-center gap-2">
                          Enroll Now <ArrowRight className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 3. The Power of Tutor-Based Learning */}
      <section className="py-24 bg-[#181059] dark:bg-slate-950 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Don’t just learn.<br />
                <span className="text-[#34d399]">Be mentored.</span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed font-medium">
                We’ve removed the guesswork from online education. At Aeroverse, you aren't just a student—you are a protégé.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Live Interactive Sessions", text: "Engage in real-time discussions, ask questions on the spot, and get immediate feedback on your work." },
                  { title: "Personalized Support", text: "Every student learns differently. Our tutors provide the individual attention needed to ensure no one is left behind." },
                  { title: "Direct Mentorship", text: "Learn from the mistakes and successes of experts who are already doing what you want to do." },
                  { title: "Collaborative Environment", text: "Work alongside fellow students in a virtual classroom setting that mimics a real-world team environment." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#34d399]/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-[#34d399]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <p className="text-white/70 text-sm mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/20">
                 <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80" alt="Tutor Session" className="rounded-xl w-full h-auto shadow-2xl" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#34d399]/20 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a064f] dark:text-white mb-6">How It Works</h2>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8 relative items-start">
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-border -z-10" />
            
            {[
              { title: "Choose a Course", text: "Browse our catalog and select the skill that aligns with your career goals.", icon: BookOpen },
              { title: "Register Interest", text: "Fill out a simple form to let us know you’re ready to start.", icon: Share2 },
              { title: "Get Contacted", text: "Our admissions team will reach out to guide you through the enrollment details and schedule.", icon: MessageSquare },
              { title: "Join Class", text: "Log into your live sessions and start your hands-on training.", icon: Play },
              { title: "Start Learning", text: "Build your portfolio, gain confidence, and begin your journey to a high-paying career.", icon: Target },
            ].map((step, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 border-2 border-[#5b4fff]/20 shadow-xl mx-auto flex items-center justify-center text-[#5b4fff]">
                  <h3 className="text-2xl font-black">{i + 1}</h3>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a064f] dark:text-white">{step.title}</h4>
                  <p className="text-xs text-muted-foreground mt-2">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What Our Students Say */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a064f] dark:text-white">What Our Students Say</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                text: "I tried learning UI/UX on my own for months but felt stuck. At Aeroverse, having a tutor to point out my mistakes in real-time changed everything. I landed my first freelance gig before the course even ended!", 
                name: "Chidi A.", location: "Lagos", avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=150&q=80" 
              },
              { 
                text: "The Data Analysis course was intense but so rewarding. The mentorship didn't just teach me tools; it taught me how to think like an analyst. Highly recommended for anyone serious about tech.", 
                name: "Sarah O.", location: "Abuja", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
              },
            ].map((testi, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-border shadow-xl">
                <div className="flex gap-1 mb-6">
                   {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-lg text-[#1a064f] dark:text-white mb-8 italic">"{testi.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={testi.avatar} alt={testi.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#1a064f] dark:text-white">{testi.name}</p>
                    <p className="text-sm text-muted-foreground">— {testi.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Ready to Rewrite Your Career Story? */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#181059] dark:bg-slate-950"></div>
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-24 text-center text-white relative z-10">
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">Ready to Rewrite Your Career Story?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            The digital economy waits for no one. Whether you are looking to switch careers or start your first professional journey, the best time to start is now. Join a community of achievers and get the guidance you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push("/signup")}
              className="px-10 py-4 bg-white text-[#181059] font-bold rounded-xl shadow-xl hover:scale-105 transition-all text-lg"
            >
              Register Interest Today
            </button>
            <button className="px-10 py-4 bg-transparent border border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all text-lg">
              Talk to a Consultant
            </button>
          </div>
        </div>
      </section>

      {/* 7. About Us */}
      <section id="about" className="py-24 bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a064f] dark:text-white">About Us</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Aeroverse Academy is a leading digital skills provider in Nigeria dedicated to closing the skills gap in the global tech ecosystem. We specialize in human-centered learning, moving away from the "watch-only" model of online education to a more rigorous, tutor-supported framework.
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900 border border-border p-10 rounded-3xl space-y-8">
              <div>
                 <h4 className="font-bold text-xl text-[#5b4fff] mb-2 flex items-center gap-2"><Target className="w-5 h-5"/> Mission</h4>
                 <p className="text-muted-foreground">To empower 100,000 Africans with job-ready digital skills through personalized, expert-led mentorship.</p>
              </div>
              <div className="w-full h-px bg-border"></div>
              <div>
                 <h4 className="font-bold text-xl text-[#34d399] mb-2 flex items-center gap-2"><Globe className="w-5 h-5"/> Vision</h4>
                 <p className="text-muted-foreground">To be the primary bridge between raw talent and professional excellence in the African digital landscape.</p>
              </div>
              <div className="w-full h-px bg-border"></div>
              <div>
                 <h4 className="font-bold text-xl text-[#1a064f] dark:text-white mb-2 flex items-center gap-2"><Shield className="w-5 h-5"/> Our Approach</h4>
                 <ul className="text-muted-foreground space-y-2 list-none">
                    <li><strong className="text-[#5b4fff]">Guided:</strong> Tutors lead every step.</li>
                    <li><strong className="text-[#5b4fff]">Practical:</strong> Projects over theory.</li>
                    <li><strong className="text-[#5b4fff]">Inclusive:</strong> Affordable and accessible learning for all.</li>
                 </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a064f] dark:text-white mb-4">FAQ</h2>
            <p className="text-muted-foreground">Answers to common questions about starting your journey.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-border bg-white dark:bg-slate-900 rounded-2xl p-6 cursor-pointer hover:border-[#5b4fff]/40 transition-colors shadow-sm">
                <summary className="font-bold text-lg flex items-center justify-between list-none text-[#1a064f] dark:text-white">
                  {faq.q}
                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-open:rotate-180 transition-transform">
                    <ArrowRight className="w-4 h-4 rotate-90 text-muted-foreground group-hover:text-[#5b4fff]" />
                  </div>
                </summary>
                <div className="pt-6 text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Get In Touch */}
      <section id="contact" className="py-24 bg-background">
         <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a064f] dark:text-white">Get In Touch</h2>
            <p className="text-xl text-muted-foreground">
              Have a question about which course is right for you? Or perhaps you want to learn more about our corporate training? Our team is friendly and ready to help you navigate your next career move. Reach out to us today!
            </p>
            <button className="px-8 py-4 bg-[#1a064f] dark:bg-white dark:text-[#1a064f] text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all text-lg inline-flex items-center gap-3">
               <MessageSquare className="w-5 h-5" /> Let's Chat
            </button>
         </div>
      </section>

      {/* 10. Footer */}
      <footer className="py-16 bg-[#181059] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-white/10 pb-12 mb-8">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-2xl font-black tracking-tighter">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white italic">AA</div>
                  Aeroverse Academy
               </div>
               <p className="text-white/60 text-sm max-w-xs font-medium">
                 Guided Learning. Practical Skills. Real Results.
               </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-6">
               <button 
                 onClick={() => router.push("/signup")}
                 className="px-8 py-3 bg-[#5b4fff] text-white rounded-lg font-bold hover:bg-[#4a3ecc] transition-colors shadow-lg"
               >
                 Register Now and Secure Your Future
               </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-white/50 font-medium">
             <p>© 2026 Aeroverse Academy. All rights reserved.</p>
             <div className="hidden sm:flex items-center gap-6">
                <span>Terms of Service</span>
                <span>Privacy Policy</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
