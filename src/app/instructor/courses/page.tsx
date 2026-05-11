"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Search, Plus, BookOpen, Users, Clock, Edit3, Trash2, Video, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/api";
import { toast } from "sonner";

export default function InstructorCourses() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");

  const [courses, setCourses] = useState<any[]>([]);

  // Create/Edit Course State
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Draft");

  const fetchCourses = async () => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      const { data } = await api.getCoursesByInstructor(parsedUser.id);
      if (data) {
        setCourses(data);
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmitCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    toast.loading(editingCourseId ? "Updating course..." : "Creating course...");

    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      toast.dismiss();
      toast.error("User not found.");
      return;
    }
    const parsedUser = JSON.parse(currentUser);

    const payload = {
      instructor_id: parsedUser.id,
      title,
      description,
      status,
    };

    let response;
    if (editingCourseId) {
      response = await api.updateCourse(editingCourseId, payload).select();
    } else {
      response = await api.createCourse(payload).select();
    }

    const { data, error } = response;

    toast.dismiss();

    if (error) {
      toast.error(`Failed to ${editingCourseId ? 'update' : 'create'} course: ${error.message || error.details}`);
      console.error(error);
      return;
    }

    if (data && data.length > 0) {
      if (editingCourseId) {
        setCourses(courses.map(c => c.id === editingCourseId ? data[0] : c));
      } else {
        setCourses([data[0], ...courses]);
      }
    }

    toast.success(`Course ${editingCourseId ? 'updated' : 'created'} successfully!`);
    resetForm();
    setActiveTab("courses");
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("Draft");
    setEditingCourseId(null);
  };

  const handleEditClick = (course: any) => {
    setEditingCourseId(course.id);
    setTitle(course.title);
    setDescription(course.description);
    setStatus(course.status || "Draft");
    setActiveTab("create");
  };

  const handleDeleteCourse = async (id: string) => {
    toast("Delete Course?", {
      id: "delete-course",
      className: "bg-white text-red-600 border-red-500 border-2",
      style: { backgroundColor: '#ffffff', color: '#dc2626', borderColor: '#ef4444', borderWidth: '2px' },
      description: "Are you sure you want to delete this course? This cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          toast.dismiss("delete-course");
          const loadingId = toast.loading("Deleting course...");
          const { error } = await api.deleteCourse(id);
          toast.dismiss(loadingId);
          if (error) {
            toast.error("Failed to delete course.");
            console.error(error);
          } else {
            toast.success("Course deleted successfully.");
            setCourses(courses.filter(c => c.id !== id));
          }
        }
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss("delete-course")
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-muted/30 dark:bg-background">
      <Sidebar userType="instructor" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-background border-b border-border px-4 md:px-8 py-4 md:py-6 pr-16 md:pr-8 sticky top-0 z-20 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-foreground">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">My Courses</h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">View and manage the courses assigned to you.</p>
          </div>
          <button 
            onClick={() => { resetForm(); setActiveTab("create"); }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all text-xs md:text-sm uppercase tracking-widest shadow-lg shadow-primary/20 w-full sm:w-auto">
            <Plus size={18} />
            Create Course
          </button>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
          
          {/* Tabs */}
          <div className="flex gap-2 md:gap-4 border-b border-border overflow-x-auto no-scrollbar pb-1">
            {[
              { id: "courses", label: "All Courses" },
              { id: "create", label: editingCourseId ? "Edit Course" : "Create New Course" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === "create") {
                    if (!editingCourseId) resetForm();
                  } else {
                    resetForm();
                  }
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-4 md:px-6 py-4 font-bold text-xs md:text-sm uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {activeTab === "courses" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-background p-4 rounded-2xl border border-border">
                  <div className="relative w-full sm:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 md:w-5 md:h-5" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 md:pl-12 pr-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <select className="w-full sm:w-auto px-4 py-3 rounded-xl bg-muted/50 border-none outline-none text-sm font-bold text-foreground">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Draft</option>
                    </select>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
                  {courses.length > 0 ? courses.map((course) => (
                    <div key={course.id} className="p-6 md:p-8 bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] flex flex-col gap-4 md:gap-6 group hover:border-primary transition-all shadow-sm cursor-pointer">
                      <div className="flex gap-4 md:gap-6 items-start">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm shrink-0">
                          <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                          <h4 className="text-lg md:text-xl font-black mb-1 md:mb-2">{course.title}</h4>
                          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">{course.description}</p>
                          <div className="flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Users size={14} className="text-primary" /> 0 Students</span>
                            <span className="flex items-center gap-1.5 text-green-500 bg-green-500/10 px-2 py-1 rounded-md">{course.status || 'Active'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-auto pt-6 border-t border-border">
                        <button 
                          onClick={() => router.push(`/instructor/courses/${course.id}`)}
                          className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                        >
                          Manage Content
                        </button>
                        <button 
                          onClick={() => handleEditClick(course)}
                          className="px-4 py-3 bg-muted rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteCourse(course.id)}
                          className="px-4 py-3 bg-red-500/10 rounded-xl text-red-500 hover:bg-red-500/20 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )) : <p className="text-sm text-muted-foreground">No courses found.</p>}
                </div>
              </div>
            )}

            {activeTab === "create" && (
              <div className="bg-background border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 max-w-3xl">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-black">{editingCourseId ? 'Edit Course' : 'Create New Course'}</h2>
                  {editingCourseId && (
                    <button 
                      onClick={() => { resetForm(); setActiveTab('courses'); }} 
                      className="text-xs font-bold text-muted-foreground hover:text-foreground"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
                <form onSubmit={handleSubmitCourse} className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Course Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Introduction to React"
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium text-sm md:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Description</label>
                    <textarea
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Provide a detailed description of the course..."
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium resize-none text-sm md:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium text-sm md:text-base"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                    </select>
                  </div>
                  <div className="pt-2 md:pt-4">
                    <button type="submit" className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                      {editingCourseId ? 'Save Changes' : 'Create Course'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
