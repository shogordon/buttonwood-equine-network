
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useBrowseData = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const { data: horses = [], isLoading: horsesLoading } = useQuery({
    queryKey: ['horses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('horse_profiles')
        .select(`
          *,
          profiles!horse_profiles_user_id_fkey(
            display_name,
            verification_status,
            location
          )
        `)
        .eq('listing_status', 'published')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleGetVerified = () => {
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
