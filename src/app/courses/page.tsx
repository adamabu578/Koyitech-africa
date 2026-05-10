"use client";

import { motion } from "motion/react";
import { Sidebar } from "../components/Sidebar";
import { MobileNav } from "../components/MobileNav";
import { CourseCard } from "../components/CourseCard";
import { User, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";

export default function CoursesPage() {
  const router = useRouter();
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [userType, setUserType] = useState<"student" | "instructor">("student");

  useEffect(() => {
    // Attempt to parse out user profile & enrolled courses
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    let currentUserId = null;
    if (users.length > 0) {
      setUserType(users[0].userType || "student");
      currentUserId = users[0].id;
    }
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser && currentUser.role) {
       setUserType(currentUser.role === "instructor" ? "instructor" : "student");
       currentUserId = currentUser.id;
    }

    const fetchEnrollments = async () => {
       let existingIds: string[] = [];
       const existing = localStorage.getItem("enrolledCourses");
       if (existing) {
         try { existingIds = JSON.parse(existing); } catch (err) {}
       }

       if (currentUserId) {
          const { data: enrollments } = await api.getStudentEnrollments(currentUserId);
          if (enrollments) {
             const dbEnrolledIds = enrollments.map(e => e.course_id);
             existingIds = [...new Set([...existingIds, ...dbEnrolledIds])];
          }
       }
       setEnrolledCourseIds(existingIds);
    };

    fetchEnrollments();

    const customCourses = JSON.parse(localStorage.getItem("createdCourses") || "[]");
    if (customCourses.length > 0) {
      setAllCourses(prev => [...customCourses, ...prev]);
    }
  }, []);

  const [allCourses, setAllCourses] = useState<any[]>([
    {
      id: "1",
      title: "Geography Sensing & GIS",
      instructor: "Dr. Smith",
      students: 45,
      materials: 12,
      meetLink: "https://meet.google.com/example-1",
      whatsappLink: "https://wa.me/example-1",
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80",
      price: "₦50,000",
      progress: 68
    },
    {
      id: "2",
      title: "Social Media Management",
      instructor: "Sarah O.",
      students: 32,
      materials: 8,
      meetLink: "https://meet.google.com/example-2",
      whatsappLink: "https://wa.me/example-2",
      image: "/social-media.jpg",
      price: "₦50,000",
      progress: 34
    },
    {
      id: "3",
      title: "Digital Marketing",
      instructor: "Mike J.",
      students: 58,
      materials: 15,
      meetLink: "https://meet.google.com/example-3",
      whatsappLink: "https://wa.me/example-3",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      price: "₦50,000",
      progress: 92
    },
    {
      id: "4",
      title: "Graphics Design",
      instructor: "Emily Davis",
      students: 67,
      materials: 24,
      meetLink: "https://meet.google.com/example-4",
      whatsappLink: "https://wa.me/example-4",
      image: "/graphic-design.jpg",
      price: "₦50,000",
      progress: 15
    },
    {
      id: "5",
      title: "UI/UX Design",
      instructor: "Jane Doe",
      students: 120,
      materials: 18,
      meetLink: "https://meet.google.com/example-5",
      whatsappLink: "https://wa.me/example-5",
      image: "/user-interface.jpg",
      price: "₦50,000",
      progress: 0
    },
    {
      id: "6",
      title: "Data Analysis",
      instructor: "John Smith",
      students: 85,
      materials: 22,
      meetLink: "https://meet.google.com/example-6",
      whatsappLink: "https://wa.me/example-6",
      image: "/data-analytics.jpg",
      price: "₦50,000",
      progress: 0
    },
    {
      id: "7",
      title: "Virtual Assistant / Remote Work",
      instructor: "Alice Johnson",
      students: 40,
      materials: 10,
      meetLink: "https://meet.google.com/example-7",
      whatsappLink: "https://wa.me/example-7",
      image: "/virtual-assistant.jpg",
      price: "₦50,000",
      progress: 0
    },
    {
      id: "8",
      title: "Cybersecurity",
      instructor: "Robert Brown",
      students: 55,
      materials: 16,
      meetLink: "https://meet.google.com/example-8",
      whatsappLink: "https://wa.me/example-8",
      image: "/cybersecurity.jpg",
      price: "₦50,000",
      progress: 0
    },
    {
      id: "9",
      title: "AI Productivity",
      instructor: "Chris Green",
      students: 90,
      materials: 14,
      meetLink: "https://meet.google.com/example-9",
      whatsappLink: "https://wa.me/example-9",
      image: "/ai-productivity.jpg",
      price: "₦50,000",
      progress: 0
    },
    {
      id: "10",
      title: "Project Management",
      instructor: "David Kumar",
      students: 70,
      materials: 20,
      meetLink: "https://meet.google.com/example-10",
      whatsappLink: "https://wa.me/example-10",
      image: "/project-management.jpg",
      price: "₦50,000",
      progress: 0
    },
    {
      id: "11",
      title: "Web Development",
      instructor: "Sarah Johnson",
      students: 110,
      materials: 25,
      meetLink: "https://meet.google.com/example-11",
      whatsappLink: "https://wa.me/example-11",
      image: "/webdev.jpg",
      price: "₦50,000",
      progress: 0
    }
  ]);

  const myCourses = allCourses.filter(c => enrolledCourseIds.includes(c.id) || userType === "instructor");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType={userType} />

      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-card border-b border-border px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-xl">My Courses</h2>
            <p className="text-sm text-muted-foreground">
               {userType === "student" ? "Manage and view all your enrolled courses." : "Manage and view your active instructor courses."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <User className="w-5 h-5 text-primary" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-full hover:bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground transition-colors"
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-8 pb-24 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {myCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {myCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CourseCard {...course} isEnrolled={userType === "student"} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 mb-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-12 h-12 text-[#2563eb]" />
                </div>
                <h3 className="mb-2 font-bold text-xl">No courses yet</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Head over to the Dashboard to discover and enroll in new courses!
                </p>
              </div>
            )}
            
            {userType === "student" && (
                <>
                  <h3 className="text-2xl mb-2 font-bold text-[#2563eb]">All Available Courses</h3>
                  <p className="text-muted-foreground mb-8 text-sm">
                    Discover amazing new courses to enhance your skills
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {allCourses.filter(c => !enrolledCourseIds.includes(c.id)).map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <CourseCard 
                             {...course} 
                             isEnrolled={false} 
                             onEnroll={() => router.push(`/payment/${course.id}`)} 
                          />
                        </motion.div>
                      ))}
                  </div>
                </>
            )}
          </motion.div>
        </div>
      </div>

      <MobileNav userType={userType} />
    </div>
  );
}
