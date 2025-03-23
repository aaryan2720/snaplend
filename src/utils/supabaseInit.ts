
import { supabase } from "@/integrations/supabase/client";

export const initializeSupabase = async () => {
  try {
    // Call the initialization function
    const { data, error } = await supabase.functions.invoke('init');
    
    if (error) {
      console.error('Error initializing Supabase:', error);
      return false;
    }
    
    console.log('Supabase initialization success:', data);
    return true;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    return false;
  }
};
