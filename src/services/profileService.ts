
import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
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

// Upload user avatar
export const uploadAvatar = async (file: File): Promise<string> => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    throw new Error("User must be authenticated to upload avatar");
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${user.data.user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

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
};
