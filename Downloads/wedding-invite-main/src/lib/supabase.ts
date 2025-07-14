import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cjfrslbsmgkztjffzxcr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZnJzbGJzbWdrenRqZmZ6eGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MzQzNDYsImV4cCI6MjA2NjUxMDM0Nn0.jMgoYbbKjUrjudts4Kw3Fwv_xgkL0uVk6MiNvuZauy0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface RSVPResponse {
  id: number;
  name: string;
  attendance: 'yes' | 'no';
  guest_count: number;
  message: string;
  created_at: string;
}
