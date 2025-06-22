
import { useState, useEffect } from "react";
import { Shield, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

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
  const { user, loading } = useAuth();

  const { data: horses, isLoading } = useQuery({
    queryKey: ['user-horses', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('horse_profiles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
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

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-xl font-semibold text-white">
                Buttonwood Bluebook
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/browse" className="text-white/80 hover:text-white transition-colors">
                Browse
              </Link>
              <Link to="/sell" className="text-white font-medium">
                Sell
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6 text-shadow">
              Sell Your Horse
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              List your horse with confidence. Our platform connects you with serious buyers and provides all the tools you need for a successful sale.
            </p>
            <Link to="/sell/new">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold">
                <Plus className="mr-2 h-5 w-5" />
                List a Horse
              </Button>
            </Link>
          </div>

          {/* Horse Listings */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Your Listings</h2>
            
            {horses && horses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {horses.map((horse) => (
                  <Card key={horse.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
                    <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      {horse.images && horse.images.length > 0 ? (
                        <img 
                          src={horse.images[0]} 
                          alt={horse.horse_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-white/60 text-center">
                          <Eye className="h-12 w-12 mx-auto mb-2" />
                          <p>No Image</p>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {horse.horse_name}
                          </h3>
                          <p className="text-white/60">
                            {horse.breed} • {horse.age} years old
                          </p>
                        </div>
                        <Badge 
                          variant={horse.listing_status === 'published' ? 'default' : 'secondary'}
                          className={horse.listing_status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}
                        >
                          {horse.listing_status}
                        </Badge>
                      </div>
                      
                      {horse.price && (
                        <p className="text-2xl font-bold text-white mb-4">
                          ${horse.price.toLocaleString()}
                        </p>
                      )}
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center">
                <div className="text-white/60 mb-6">
                  <Plus className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No listings yet</h3>
                  <p>Create your first horse listing to get started selling on Buttonwood Bluebook.</p>
                </div>
                <Link to="/sell/new">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl">
                    Create Your First Listing
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
