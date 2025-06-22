
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useBrowseData = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  console.log('useBrowseData hook called', { user: !!user });

  useEffect(() => {
    if (!user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
    }
  }, [user, navigate]);

  const { data: horses = [], isLoading: horsesLoading } = useQuery({
    queryKey: ['horses'],
    queryFn: async () => {
      console.log('Fetching horses');
      const { data, error } = await supabase
        .from('horse_profiles')
        .select(`
          *,
          user_profiles!horse_profiles_user_id_fkey(
            first_name,
            last_name,
            location
          )
        `)
        .eq('listing_status', 'published')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching horses:', error);
        throw error;
      }
      console.log('Horses fetched:', data?.length);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      console.log('Fetching profile for user:', user.id);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
      console.log('Profile fetched:', data);
      return data;
    },
    enabled: !!user,
  });

  const handleSignOut = async () => {
    console.log('Signing out');
    await signOut();
    navigate('/');
  };

  const handleGetVerified = () => {
    console.log('Navigating to verification');
    navigate('/verification');
  };

  return {
    user,
    profile,
    horses,
    loading: horsesLoading || profileLoading,
    handleSignOut,
    handleGetVerified
  };
};
