
-- Create profiles table linked to Supabase Auth users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  email text unique,
  status text default 'active',
  role text check (role in ('student', 'instructor', 'admin')) default 'student',
  subjects text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Force add missing columns just in case the table was created earlier without them
alter table public.profiles add column if not exists subjects text;

-- Create materials table
create table if not exists public.materials (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  file_name text not null,
  file_url text,
  file_size text,
  file_type text,
  course text,
  tutor_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create assignments table
create table if not exists public.assignments (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  instruction text,
  deadline date,
  course text,
  file_name text,
  file_url text,
  status text default 'Pending',
  submissions_count integer default 0,
  tutor_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Force add missing columns just in case the table was created earlier without them
alter table public.assignments add column if not exists file_name text;
alter table public.assignments add column if not exists file_url text;

-- Create classes table
create table if not exists public.classes (
  id uuid default gen_random_uuid() primary key,
  topic text not null,
  date text,
  time text,
  course text,
  status text default 'Upcoming',
  tutor_id uuid references public.profiles(id) on delete set null,
  tutor_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.materials enable row level security;
alter table public.assignments enable row level security;
alter table public.classes enable row level security;

-- Setup RLS Policies

-- Profiles: Anyone can view profiles, but users can only update their own
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);

drop policy if exists "Users can insert their own profile." on public.profiles;
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile." on public.profiles;
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

drop policy if exists "Admins can update all profiles." on public.profiles;
create policy "Admins can update all profiles." on public.profiles for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Materials: Viewable by all, insertable by instructors
drop policy if exists "Materials viewable by everyone." on public.materials;
create policy "Materials viewable by everyone." on public.materials for select using (true);

drop policy if exists "Materials insertable by authenticated users." on public.materials;
create policy "Materials insertable by authenticated users." on public.materials for insert with check (auth.role() = 'authenticated');

drop policy if exists "Materials updatable by authenticated users." on public.materials;
create policy "Materials updatable by authenticated users." on public.materials for update using (auth.role() = 'authenticated');

drop policy if exists "Materials deletable by authenticated users." on public.materials;
create policy "Materials deletable by authenticated users." on public.materials for delete using (auth.role() = 'authenticated');

-- Assignments: Viewable by all, insertable by instructors
drop policy if exists "Assignments viewable by everyone." on public.assignments;
create policy "Assignments viewable by everyone." on public.assignments for select using (true);

drop policy if exists "Assignments insertable by authenticated users." on public.assignments;
create policy "Assignments insertable by authenticated users." on public.assignments for insert with check (auth.role() = 'authenticated');

drop policy if exists "Assignments updatable by authenticated users." on public.assignments;
create policy "Assignments updatable by authenticated users." on public.assignments for update using (auth.role() = 'authenticated');

drop policy if exists "Assignments deletable by authenticated users." on public.assignments;
create policy "Assignments deletable by authenticated users." on public.assignments for delete using (auth.role() = 'authenticated');

-- Classes: Viewable by all, insertable by instructors
drop policy if exists "Classes viewable by everyone." on public.classes;
create policy "Classes viewable by everyone." on public.classes for select using (true);

drop policy if exists "Classes insertable by authenticated users." on public.classes;
create policy "Classes insertable by authenticated users." on public.classes for insert with check (auth.role() = 'authenticated');

-- Create courses table
create table if not exists public.courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  instructor_id uuid references public.profiles(id) on delete set null,
  duration text,
  price text,
  status text default 'Draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create reports table
create table if not exists public.reports (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  type text not null,
  status text default 'Processing',
  generated_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for new tables
alter table public.courses enable row level security;
alter table public.reports enable row level security;

-- Create enrollments table
create table if not exists public.enrollments (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.profiles(id) on delete cascade,
  course_id text not null,
  progress integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.enrollments enable row level security;

drop policy if exists "Enrollments viewable by authenticated users." on public.enrollments;
create policy "Enrollments viewable by authenticated users." on public.enrollments for select using (auth.role() = 'authenticated');

drop policy if exists "Enrollments insertable by authenticated users." on public.enrollments;
create policy "Enrollments insertable by authenticated users." on public.enrollments for insert with check (auth.role() = 'authenticated');

drop policy if exists "Enrollments updatable by authenticated users." on public.enrollments;
create policy "Enrollments updatable by authenticated users." on public.enrollments for update using (auth.role() = 'authenticated');

drop policy if exists "Enrollments deletable by authenticated users." on public.enrollments;
create policy "Enrollments deletable by authenticated users." on public.enrollments for delete using (auth.role() = 'authenticated');

-- Create assignment_submissions table
create table if not exists public.assignment_submissions (
  id uuid default gen_random_uuid() primary key,
  assignment_id uuid references public.assignments(id) on delete cascade,
  student_id uuid references public.profiles(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  grade integer,
  feedback text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(assignment_id, student_id)
);

alter table public.assignment_submissions enable row level security;

drop policy if exists "Submissions viewable by authenticated users." on public.assignment_submissions;
create policy "Submissions viewable by authenticated users." on public.assignment_submissions for select using (auth.role() = 'authenticated');

drop policy if exists "Submissions insertable by authenticated users." on public.assignment_submissions;
create policy "Submissions insertable by authenticated users." on public.assignment_submissions for insert with check (auth.role() = 'authenticated');

drop policy if exists "Submissions updatable by authenticated users." on public.assignment_submissions;
create policy "Submissions updatable by authenticated users." on public.assignment_submissions for update using (auth.role() = 'authenticated');

-- Setup RLS Policies for courses and reports
drop policy if exists "Courses viewable by everyone." on public.courses;
create policy "Courses viewable by everyone." on public.courses for select using (true);

drop policy if exists "Courses insertable by authenticated users." on public.courses;
create policy "Courses insertable by authenticated users." on public.courses for insert with check (auth.role() = 'authenticated');

drop policy if exists "Courses updatable by authenticated users." on public.courses;
create policy "Courses updatable by authenticated users." on public.courses for update using (auth.role() = 'authenticated');

drop policy if exists "Courses deletable by authenticated users." on public.courses;
create policy "Courses deletable by authenticated users." on public.courses for delete using (auth.role() = 'authenticated');

drop policy if exists "Reports viewable by authenticated users." on public.reports;
create policy "Reports viewable by authenticated users." on public.reports for select using (auth.role() = 'authenticated');

drop policy if exists "Reports insertable by authenticated users." on public.reports;
create policy "Reports insertable by authenticated users." on public.reports for insert with check (auth.role() = 'authenticated');

-- Storage bucket for materials and assignments
insert into storage.buckets (id, name, public) values ('materials', 'materials', true) on conflict (id) do nothing;
drop policy if exists "Public Access Materials" on storage.objects;
create policy "Public Access Materials" on storage.objects for select using ( bucket_id = 'materials' );
drop policy if exists "Auth Insert Materials" on storage.objects;
create policy "Auth Insert Materials" on storage.objects for insert with check ( bucket_id = 'materials' and auth.role() = 'authenticated' );

insert into storage.buckets (id, name, public) values ('assignments', 'assignments', true) on conflict (id) do nothing;
drop policy if exists "Public Access Assignments" on storage.objects;
create policy "Public Access Assignments" on storage.objects for select using ( bucket_id = 'assignments' );
drop policy if exists "Auth Insert Assignments" on storage.objects;
create policy "Auth Insert Assignments" on storage.objects for insert with check ( bucket_id = 'assignments' and auth.role() = 'authenticated' );

-- Automatic profile creation on signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name, role, status, subjects)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'firstName', 
    new.raw_user_meta_data->>'lastName',
    coalesce(new.raw_user_meta_data->>'role', 'student'),
    case when coalesce(new.raw_user_meta_data->>'role', 'student') = 'instructor' then 'pending' else 'active' end,
    new.raw_user_meta_data->>'subjects'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Tell Supabase to refresh its memory so it knows about the new columns
NOTIFY pgrst, 'reload schema';
