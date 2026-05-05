import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tvlzkkrewfoksgdmccpr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bHpra3Jld2Zva3NnZG1jY3ByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyNDczNjksImV4cCI6MjA5MjgyMzM2OX0.Uxoc4O_aaReAWjKgnNPXc28UuZwqHHrGX5NZoGija-s';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createBucket() {
  const { data, error } = await supabase.storage.createBucket('assignments', {
    public: true,
  });
  console.log("Create Assignments:", data, error);
  
  const { data: d2, error: e2 } = await supabase.storage.createBucket('materials', {
    public: true,
  });
  console.log("Create Materials:", d2, e2);
}

createBucket();
