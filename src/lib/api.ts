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
};
