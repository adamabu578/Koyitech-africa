import { supabase } from './supabase';

export const authApi = {
  // Login with email and password
  signIn: (credentials: { email: string; password: string }) => 
    supabase.auth.signInWithPassword(credentials),

  // Register a new user
  signUp: (credentials: { email: string; password: string; options?: any }) => 
    supabase.auth.signUp(credentials),

  // Logout the current user
  signOut: () => 
    supabase.auth.signOut(),

  // Get the current session
  getSession: () => 
    supabase.auth.getSession(),

  // Get the current logged-in user
  getUser: () => 
    supabase.auth.getUser(),

  // Update user attributes
  updateUser: (attributes: any) => 
    supabase.auth.updateUser(attributes),

  // Reset password
  resetPasswordForEmail: (email: string, options?: any) => 
    supabase.auth.resetPasswordForEmail(email, options)
};
