import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

const envText = fs.readFileSync('.env.local', 'utf-8');
envText.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    process.env[match[1]] = match[2];
  }
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function test() {
  const email = `test+${Date.now()}@example.com`;
  console.log('Attempting to sign up:', email);
  
  // Try instructor
  let { data, error } = await supabase.auth.signUp({
    email,
    password: 'Password123!',
    options: {
      data: {
        firstName: 'Test',
        lastName: 'User',
        role: 'instructor'
      }
    }
  });

  if (error) {
    console.error('Signup Error (instructor):', error);
  } else {
    console.log('Signup Success (instructor):', data.user?.id);
  }
}

test();
