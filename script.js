// Import the Supabase client library (we'll use a CDN link)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Your Supabase project URL and Anon key
const SUPABASE_URL = 'https://uwhiizmwjirfivzbnujr.supabase.co'; // Replace with your actual URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3aGlpem13amlyZml2emJudWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMjc3MDIsImV4cCI6MjA2MDkwMzcwMn0.T3rkvFHzUVYLqrFDFDk9ara3zipciHnM91CteMxJe80'; // Replace with your actual anon key

// Create the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase Initialized!", supabase); // Verify client object creation