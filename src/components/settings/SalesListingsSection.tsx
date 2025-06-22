
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SalesListingsSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['user-listings', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('horse_profiles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return <Badge className="bg-green-500 text-white">Published</Badge>;
      case 'draft': return <Badge className="bg-yellow-500 text-white">Draft</Badge>;
      case 'sold': return <Badge className="bg-gray-500 text-white">Sold</Badge>;
      default: return <Badge className="bg-gray-500 text-white">{status}</Badge>;
    }
  };

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
              <Heart className="h-5 w-5" />
              Sales Listings
            </div>
            <Button 
              onClick={() => navigate('/sell/new')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Listing
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {listings.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">No listings yet</h3>
              <p className="text-white/70 text-sm mb-4">Create your first horse listing to get started</p>
              <Button 
                onClick={() => navigate('/sell/new')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Listing
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {listings.map((listing) => (
                <div key={listing.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                        <Heart className="h-8 w-8 text-white/50" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{listing.horse_name}</h3>
                        <p className="text-white/70 text-sm">
                          {listing.age} years • {listing.breed} • {listing.location}
                        </p>
                        <p className="text-white/50 text-sm">
                          Created {new Date(listing.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-white font-medium">
                          ${listing.price?.toLocaleString() || 'Price not set'}
                        </div>
                        {getStatusBadge(listing.listing_status)}
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

export default SalesListingsSection;
