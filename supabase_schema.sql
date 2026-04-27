-- Create profiles table linked to Supabase Auth users
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  email text unique,
  role text check (role in ('student', 'instructor', 'admin')) default 'student',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create materials table
create table public.materials (
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
create table public.assignments (
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

-- Create classes table
create table public.classes (
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
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Materials: Viewable by all, insertable by instructors
create policy "Materials viewable by everyone." on public.materials for select using (true);
create policy "Materials insertable by authenticated users." on public.materials for insert with check (auth.role() = 'authenticated');

-- Assignments: Viewable by all, insertable by instructors
create policy "Assignments viewable by everyone." on public.assignments for select using (true);
create policy "Assignments insertable by authenticated users." on public.assignments for insert with check (auth.role() = 'authenticated');

-- Classes: Viewable by all, insertable by instructors
create policy "Classes viewable by everyone." on public.classes for select using (true);
create policy "Classes insertable by authenticated users." on public.classes for insert with check (auth.role() = 'authenticated');

-- Storage bucket for materials and assignments
insert into storage.buckets (id, name, public) values ('materials', 'materials', true);
create policy "Public Access Materials" on storage.objects for select using ( bucket_id = 'materials' );
create policy "Auth Insert Materials" on storage.objects for insert with check ( bucket_id = 'materials' and auth.role() = 'authenticated' );

insert into storage.buckets (id, name, public) values ('assignments', 'assignments', true);
create policy "Public Access Assignments" on storage.objects for select using ( bucket_id = 'assignments' );
create policy "Auth Insert Assignments" on storage.objects for insert with check ( bucket_id = 'assignments' and auth.role() = 'authenticated' );

-- Automatic profile creation on signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'firstName', 
    new.raw_user_meta_data->>'lastName',
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
