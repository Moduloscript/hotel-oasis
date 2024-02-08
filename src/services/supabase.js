import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vyyhwtryxhdnjoyhhrbq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5eWh3dHJ5eGhkbmpveWhocmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2OTA4NjksImV4cCI6MjAxNjI2Njg2OX0.AyC1dKoSlHXFTTkoGSVvaUuxBKPBDmCoHwiPGb_I8Y4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
