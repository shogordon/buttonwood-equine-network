import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FilterState } from "@/components/browse/FilterPanel";

interface SearchParams {
  searchQuery?: string;
  filters?: FilterState;
}

export const useBrowseData = (searchParams?: SearchParams) => {
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
    queryKey: ['horses', searchParams?.searchQuery, searchParams?.filters],
    queryFn: async () => {
      console.log('Fetching horses with search params:', searchParams);
      
      let query = supabase
        .from('horse_profiles')
        .select('*')
        .eq('listing_status', 'published')
        .eq('is_available', true);

      // Apply text search
      if (searchParams?.searchQuery && searchParams.searchQuery.trim()) {
        const searchTerm = searchParams.searchQuery.trim();
        query = query.or(`horse_name.ilike.%${searchTerm}%,breed.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Apply filters
      if (searchParams?.filters) {
        const { filters } = searchParams;
        
        if (filters.priceMin !== undefined) {
          query = query.gte('price', filters.priceMin);
        }
        if (filters.priceMax !== undefined) {
          query = query.lte('price', filters.priceMax);
        }
        if (filters.ageMin !== undefined) {
          query = query.gte('age', filters.ageMin);
        }
        if (filters.ageMax !== undefined) {
          query = query.lte('age', filters.ageMax);
        }
        if (filters.location && filters.location.trim()) {
          query = query.ilike('location', `%${filters.location.trim()}%`);
        }
        if (filters.breed && filters.breed.trim()) {
          query = query.eq('breed', filters.breed);
        }
        if (filters.sex && filters.sex.trim()) {
          query = query.eq('sex', filters.sex);
        }
        if (filters.disciplines && filters.disciplines.length > 0) {
          query = query.overlaps('disciplines', filters.disciplines);
        }
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

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
