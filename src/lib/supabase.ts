import { createClient } from '@supabase/supabase-js';

// Use dummy values for development if env vars are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cjfrslbsmgkztjffzxcr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZnJzbGJzbWdrenRqZmZ6eGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MzQzNDYsImV4cCI6MjA2NjUxMDM0Nn0.jMgoYbbKjUrjudts4Kw3Fwv_xgkL0uVk6MiNvuZauy0';

// Only create client if we have real values
export const supabase = supabaseUrl !== 'https://cjfrslbsmgkztjffzxcr.supabase.co' && supabaseAnonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZnJzbGJzbWdrenRqZmZ6eGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MzQzNDYsImV4cCI6MjA2NjUxMDM0Nn0.jMgoYbbKjUrjudts4Kw3Fwv_xgkL0uVk6MiNvuZauy0' 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface RSVPResponse {
  id: number;
  name: string;
  attendance: 'yes' | 'no';
  guest_count: number;
  message: string;
  created_at: string;
}