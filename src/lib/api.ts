import { supabase } from './supabase';

export const api = {
  // ---------- PROFILES ----------
  getProfilesByRole: (role: string, limitCount?: number) => {
    let query = supabase.from('profiles').select('*').eq('role', role);
    if (limitCount) query = query.limit(limitCount);
    return query;
  },

  // ---------- COURSES ----------
  getAllCourses: () => supabase.from('courses').select('*').order('created_at', { ascending: false }),
  getCourseById: (id: string) => supabase.from('courses').select('*').eq('id', id).single(),
  getCoursesByInstructor: (instructorId: string) => supabase.from('courses').select('*').eq('instructor_id', instructorId).order('created_at', { ascending: false }),
  createCourse: (courseData: any) => supabase.from('courses').insert([courseData]),
  updateCourse: (id: string, courseData: any) => supabase.from('courses').update(courseData).eq('id', id),
  deleteCourse: (id: string) => supabase.from('courses').delete().eq('id', id),

  // ---------- ENROLLMENTS ----------
  getStudentEnrollments: (studentId: string) => supabase.from('enrollments').select('course_id').eq('student_id', studentId),
  enrollStudent: (studentId: string, courseId: string) => supabase.from('enrollments').insert([{ student_id: studentId, course_id: courseId }]),

  // ---------- CLASSES ----------
  getClasses: (limitCount?: number) => {
    let query = supabase.from('classes').select('*').order('created_at', { ascending: false });
    if (limitCount) query = query.limit(limitCount);
    return query;
  },
  getClassesByTutor: (tutorId: string) => supabase.from('classes').select('*').eq('tutor_id', tutorId),
  createClass: (classData: any) => supabase.from('classes').insert([classData]),

  // ---------- ASSIGNMENTS ----------
  getAssignments: () => supabase.from('assignments').select('*, assignment_submissions(count)').order('created_at', { ascending: false }),
  getPendingAssignments: () => supabase.from('assignments').select('*').eq('status', 'Pending'),
  getAssignmentsByTutor: (tutorId: string) => supabase.from('assignments').select('*').eq('tutor_id', tutorId),
  createAssignment: (assignmentData: any) => supabase.from('assignments').insert([assignmentData]),
  deleteAssignment: (id: string) => supabase.from('assignments').delete().eq('id', id),
  
  // ---------- SUBMISSIONS ----------
  submitAssignment: (submissionData: any) => supabase.from('assignment_submissions').upsert([submissionData]),
  getStudentSubmissions: (studentId: string) => supabase.from('assignment_submissions').select('*').eq('student_id', studentId),
  getAssignmentSubmissions: (assignmentId: string) => supabase.from('assignment_submissions').select('*, profiles(first_name, last_name, email)').eq('assignment_id', assignmentId),
  updateSubmission: (id: string, updateData: any) => supabase.from('assignment_submissions').update(updateData).eq('id', id),

  // ---------- MATERIALS ----------
  getMaterials: () => supabase.from('materials').select('*').order('created_at', { ascending: false }),
  createMaterials: (materialsData: any[]) => supabase.from('materials').insert(materialsData),
  deleteMaterial: (id: string) => supabase.from('materials').delete().eq('id', id),
  getMaterialPublicUrl: (fileName: string) => supabase.storage.from('materials').getPublicUrl(fileName).data?.publicUrl,

  // ---------- QUIZZES ----------
  getQuizzes: () => supabase.from('quizzes').select('*').order('created_at', { ascending: false }),
  createQuiz: (quizData: any) => supabase.from('quizzes').insert([quizData]),
  deleteQuiz: (id: string) => supabase.from('quizzes').delete().eq('id', id),
  // ---------- RECORDINGS ----------
  getRecordingsByCourse: (courseId: string) => supabase.from('recordings').select('*').eq('course_id', courseId).order('created_at', { ascending: false }),
  createRecording: (recordingData: any) => supabase.from('recordings').insert([recordingData]),

  // ---------- INSTRUCTOR STUDENTS ----------
  getInstructorStudents: async (instructorId: string) => {
    // 1. Fetch instructor profile to get their subjects
    const { data: profile } = await supabase.from('profiles').select('subjects').eq('id', instructorId).single();
    const instructorSubjects = profile?.subjects 
      ? profile.subjects.toLowerCase().split(',').map((s: string) => s.trim()) 
      : [];

    // 2. Combine base courses and DB courses to find matching course IDs
    const baseCourses = [
      { id: "1", title: "Geography Sensing & GIS" },
      { id: "2", title: "Social Media Management" },
      { id: "3", title: "Digital Marketing" },
      { id: "4", title: "Graphics Design" },
      { id: "5", title: "UI/UX Design" },
      { id: "6", title: "Data Analysis" },
      { id: "7", title: "Virtual Assistant / Remote Work" },
      { id: "8", title: "Cybersecurity" },
      { id: "9", title: "AI Productivity" },
      { id: "10", title: "Project Management" },
      { id: "11", title: "Web Development" }
    ];
    
    const { data: dbCourses } = await supabase.from('courses').select('id, title, instructor_id');
    const allCourses = [...(dbCourses || []), ...baseCourses];
    
    let matchingCourseIds: string[] = [];
    
    if (instructorSubjects.length > 0) {
      // Find courses matching instructor's subjects dynamically
      const matchingCourses = allCourses.filter(c => 
        instructorSubjects.some((sub: string) => 
          c.title.toLowerCase().includes(sub) || 
          sub.includes(c.title.toLowerCase()) ||
          (sub.includes('data analytic') && c.title.toLowerCase().includes('data analy'))
        )
      );
      matchingCourseIds = matchingCourses.map(c => String(c.id));
    } else {
      // Fallback: courses created by the instructor
      const fallbackCourses = allCourses.filter(c => (c as any).instructor_id === instructorId);
      matchingCourseIds = fallbackCourses.map(c => String(c.id));
    }

    if (matchingCourseIds.length === 0) return { data: [] };

    // 3. Get enrollments for matching course IDs
    const { data: enrollments, error: enrollError } = await supabase.from('enrollments')
      .select('*')
      .in('course_id', matchingCourseIds);

    if (enrollError || !enrollments || enrollments.length === 0) return { data: [] };

    // 4. Get student profiles
    const studentIds = enrollments.map(e => e.student_id);
    const { data: profiles } = await supabase.from('profiles').select('*').in('id', studentIds);

    const mapped = enrollments.map(enrollment => {
      const student = profiles?.find(p => p.id === enrollment.student_id);
      const course = allCourses.find(c => String(c.id) === String(enrollment.course_id));
      return {
        id: enrollment.id,
        student_id: enrollment.student_id,
        name: student?.first_name ? `${student.first_name} ${student.last_name || ''}` : (student?.email || 'Unknown Student'),
        course: course?.title || 'Unknown Course',
        progress: enrollment.progress || 0,
        assignments: '0/0',
        performance: 'Good'
      };
    });

    return { data: mapped };
  }
};
