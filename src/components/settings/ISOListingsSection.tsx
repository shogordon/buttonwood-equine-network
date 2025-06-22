
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const ISOListingsSection = () => {
  const { user } = useAuth();

  const { data: buyerProfiles = [], isLoading } = useQuery({
    queryKey: ['buyer-profiles', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('buyer_profiles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              ISO Listings (In Search Of)
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Search
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {buyerProfiles.length === 0 ? (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">No search profiles yet</h3>
              <p className="text-white/70 text-sm mb-4">Create a search profile to find your perfect horse</p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Search Profile
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {buyerProfiles.map((profile) => (
                <div key={profile.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">{profile.profile_name}</h3>
                      <div className="text-white/70 text-sm space-y-1">
                        <p>Budget: {profile.price_range || 'Not specified'}</p>
                        <p>Experience: {profile.experience_level || 'Not specified'}</p>
                        <p>Location: {profile.location_preference || 'Any'}</p>
                        {profile.disciplines && profile.disciplines.length > 0 && (
                          <p>Disciplines: {profile.disciplines.join(', ')}</p>
                        )}
                      </div>
                      <p className="text-white/50 text-sm mt-2">
                        Created {new Date(profile.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ISOListingsSection;
