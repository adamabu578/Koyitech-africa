import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tvlzkkrewfoksgdmccpr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bHpra3Jld2Zva3NnZG1jY3ByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyNDczNjksImV4cCI6MjA5MjgyMzM2OX0.Uxoc4O_aaReAWjKgnNPXc28UuZwqHHrGX5NZoGija-s';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data, error } = await supabase.storage.listBuckets();
  console.log("Buckets:", data);
  console.log("Error:", error);
}

check();
