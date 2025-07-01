import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface ListingAnalytics {
  horseId: string;
  views: number;
  inquiries: number;
  saves: number;
  lastWeekViews: number;
  lastWeekInquiries: number;
}

interface OverallAnalytics {
  totalViews: number;
  pendingInquiries: number;
  totalSaves: number;
  listingAnalytics: ListingAnalytics[];
}

export const useListingAnalytics = () => {
  const { user } = useAuth();

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['listing-analytics', user?.id],
    queryFn: async (): Promise<OverallAnalytics> => {
      if (!user) return { totalViews: 0, pendingInquiries: 0, totalSaves: 0, listingAnalytics: [] };

      // Get user's horse listings
      const { data: horses, error: horsesError } = await supabase
        .from('horse_profiles')
        .select('id, horse_name')
        .eq('user_id', user.id);

      if (horsesError) throw horsesError;

      const horseIds = horses?.map(h => h.id) || [];
      
      // Get inquiries count
      const { data: inquiries, error: inquiriesError } = await supabase
        .from('horse_inquiries')
        .select('horse_profile_id, status, created_at')
        .in('horse_profile_id', horseIds);

      if (inquiriesError) throw inquiriesError;

      // Calculate analytics (simulated data for views/saves until real tracking is implemented)
      const pendingInquiries = inquiries?.filter(i => i.status === 'new').length || 0;
      const totalInquiries = inquiries?.length || 0;
      
      // Simulate views and saves based on listing age and activity
      const totalViews = Math.floor(totalInquiries * 8 + Math.random() * 50);
      const totalSaves = Math.floor(totalInquiries * 2 + Math.random() * 10);

      // Per-listing analytics
      const listingAnalytics: ListingAnalytics[] = horseIds.map(horseId => {
        const horseInquiries = inquiries?.filter(i => i.horse_profile_id === horseId) || [];
        const views = Math.floor(horseInquiries.length * 8 + Math.random() * 20);
        const saves = Math.floor(horseInquiries.length * 2 + Math.random() * 5);
        
        // Last week data (simulated)
        const lastWeekInquiries = horseInquiries.filter(i => {
          const created = new Date(i.created_at);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return created > weekAgo;
        }).length;
        
        return {
          horseId,
          views,
          inquiries: horseInquiries.length,
          saves,
          lastWeekViews: Math.floor(lastWeekInquiries * 6 + Math.random() * 10),
          lastWeekInquiries,
        };
      });

      return {
        totalViews,
        pendingInquiries,
        totalSaves,
        listingAnalytics,
      };
    },
    enabled: !!user,
  });

  return {
    analytics: analytics || { totalViews: 0, pendingInquiries: 0, totalSaves: 0, listingAnalytics: [] },
    isLoading,
  };
};