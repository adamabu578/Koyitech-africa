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
  getAssignments: () => supabase.from('assignments').select('*').order('created_at', { ascending: false }),
  getPendingAssignments: () => supabase.from('assignments').select('*').eq('status', 'Pending'),
  getAssignmentsByTutor: (tutorId: string) => supabase.from('assignments').select('*').eq('tutor_id', tutorId),
  createAssignment: (assignmentData: any) => supabase.from('assignments').insert([assignmentData]),
  deleteAssignment: (id: string) => supabase.from('assignments').delete().eq('id', id),

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
    const { data: courses } = await supabase.from('courses').select('id, title').eq('instructor_id', instructorId);
    if (!courses || courses.length === 0) return { data: [] };
    const courseIds = courses.map(c => c.id);

    const { data: enrollments, error: enrollError } = await supabase.from('enrollments')
      .select('*')
      .in('course_id', courseIds);

    if (enrollError || !enrollments || enrollments.length === 0) return { data: [] };

    const studentIds = enrollments.map(e => e.student_id);
    const { data: profiles } = await supabase.from('profiles').select('*').in('id', studentIds);

    const mapped = enrollments.map(enrollment => {
      const student = profiles?.find(p => p.id === enrollment.student_id);
      const course = courses.find(c => c.id === enrollment.course_id);
      return {
        id: enrollment.id,
        student_id: enrollment.student_id,
        name: student?.full_name || student?.username || 'Unknown Student',
        course: course?.title || 'Unknown Course',
        progress: enrollment.progress || 0,
        assignments: '0/0',
        performance: 'Good'
      };
    });

    return { data: mapped };
  }
};
