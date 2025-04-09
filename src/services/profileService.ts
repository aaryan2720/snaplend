
import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
  gender?: string;
}

// Fetch the current user's profile
export const fetchUserProfile = async (): Promise<UserProfile | null> => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.data.user.id)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return data as UserProfile;
};

// Update user profile
export const updateUserProfile = async (updates: Partial<UserProfile>): Promise<void> => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    throw new Error("User must be authenticated to update profile");
  }

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.data.user.id);

  if (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Create user profile if it doesn't exist
export const ensureUserProfile = async (): Promise<string | null> => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    return null;
  }

  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.data.user.id)
    .single();

  // If profile exists, return the ID
  if (existingProfile) {
    return existingProfile.id;
  }

  // Otherwise, create a new profile
  const { data: userData } = user;
  const defaultName = userData.user.email?.split('@')[0] || 'User';
  const gender = userData.user.user_metadata?.gender || 'unspecified';
  
  const { data: newProfile, error } = await supabase
    .from('profiles')
    .insert({
      id: userData.user.id,
      full_name: userData.user.user_metadata?.full_name || defaultName,
      avatar_url: null,
      gender: gender
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating user profile:", error);
    return null;
  }

  return newProfile.id;
};

// Get appropriate default avatar based on gender
export const getDefaultAvatar = (gender?: string): string => {
  if (gender === 'female') {
    return 'https://i.pravatar.cc/150?img=44'; // Female avatar
  } else if (gender === 'male') {
    return 'https://i.pravatar.cc/150?img=68'; // Male avatar
  } else {
    return 'https://i.pravatar.cc/150?img=33'; // Neutral avatar
  }
};

// Upload user avatar
export const uploadAvatar = async (file: File): Promise<string> => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    throw new Error("User must be authenticated to upload avatar");
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${user.data.user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  try {
    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('user-content')
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      throw uploadError;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('user-content')
      .getPublicUrl(filePath);

    // Update the user's profile with the new avatar URL
    await updateUserProfile({ avatar_url: publicUrl });

    return publicUrl;
  } catch (error) {
    console.error("Avatar upload failed:", error);
    
    // Get user profile to determine gender for fallback avatar
    const profile = await fetchUserProfile();
    const defaultAvatar = getDefaultAvatar(profile?.gender);
    
    // Still update the profile with default avatar if upload fails
    await updateUserProfile({ avatar_url: defaultAvatar });
    
    return defaultAvatar;
  }
};
