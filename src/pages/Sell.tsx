
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppNavigation from "@/components/navigation/AppNavigation";
import SellHero from "@/components/sell/SellHero";
import UserListingsGrid from "@/components/sell/UserListingsGrid";

interface HorseProfile {
  id: string;
  horse_name: string;
  price: number | null;
  listing_status: string;
  is_available: boolean;
  images: string[] | null;
  created_at: string;
  breed: string | null;
  age: number;
}

const Sell = () => {
  const { user, loading, handleSignOut } = useAuth();

  const { data: horses, isLoading } = useQuery({
    queryKey: ['user-horses', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      console.log('Fetching horses for user:', user.id);
      
      const { data, error } = await supabase
        .from('horse_profiles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user horses:', error);
        throw error;
      }
      
      console.log('Found horses for user:', data?.length || 0);
      return data as HorseProfile[];
    },
    enabled: !!user,
  });

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Please sign in to sell horses</h2>
          <Link to="/auth">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="floating-element top-20 left-20 w-64 h-64 animate-float opacity-20" />
        <div className="floating-element top-40 right-32 w-32 h-32 animate-float opacity-15" style={{ animationDelay: '2s' }} />
        <div className="floating-element bottom-32 left-40 w-48 h-48 animate-float opacity-10" style={{ animationDelay: '4s' }} />
      </div>

      <AppNavigation onSignOut={handleSignOut} />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <SellHero />
          <UserListingsGrid horses={horses} />
        </div>
      </div>
    </div>
  );
};

export default Sell;
