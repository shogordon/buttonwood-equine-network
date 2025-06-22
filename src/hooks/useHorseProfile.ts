
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useHorseProfile = (horseId: string) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log('useHorseProfile hook called', { horseId, user: !!user });

  useEffect(() => {
    if (!user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
    }
  }, [user, navigate]);

  const { data: horse, isLoading: horseLoading, error } = useQuery({
    queryKey: ['horse', horseId],
    queryFn: async () => {
      console.log('Fetching horse with ID:', horseId);
      const { data, error } = await supabase
        .from('horse_profiles')
        .select('*')
        .eq('id', horseId)
        .eq('listing_status', 'published')
        .eq('is_available', true)
        .single();

      if (error) {
        console.error('Error fetching horse:', error);
        throw error;
      }
      console.log('Horse fetched:', data);
      return data;
    },
    enabled: !!user && !!horseId,
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

  return {
    horse,
    profile,
    loading: horseLoading || profileLoading,
    error
  };
};
