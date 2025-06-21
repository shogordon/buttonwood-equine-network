
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Star, MapPin, Calendar, Ruler, Lock, Eye, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Horse {
  id: string;
  horse_name: string;
  age: number;
  breed?: string;
  height?: number;
  location?: string;
  price?: number;
  description?: string;
  images?: string[];
  disciplines?: string[];
  visibility_level?: string;
  show_price_to?: string;
  show_contact_to?: string;
  featured: boolean;
  is_available: boolean;
  color?: string;
  gender?: string;
  training_level?: string;
  experience_level?: string;
}

const Browse = () => {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (profile && !profile.onboarding_completed) {
      navigate('/onboarding');
      return;
    }

    fetchHorses();
  }, [user, profile, navigate]);

  const fetchHorses = async () => {
    try {
      const { data, error } = await supabase
        .from('horse_profiles')
        .select('*')
        .eq('is_available', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map the data to match our interface
      const mappedHorses = (data || []).map(horse => ({
        id: horse.id,
        horse_name: horse.horse_name,
        age: horse.age,
        breed: horse.breed,
        height: horse.height,
        location: horse.location,
        price: horse.price,
        description: horse.description,
        images: horse.images,
        disciplines: horse.disciplines,
        visibility_level: (horse as any).visibility_level || 'public',
        show_price_to: (horse as any).show_price_to || 'verified',
        show_contact_to: (horse as any).show_contact_to || 'verified',
        featured: horse.featured || false,
        is_available: horse.is_available,
        color: horse.color,
        gender: horse.gender,
        training_level: horse.training_level,
        experience_level: horse.experience_level,
      }));
      
      setHorses(mappedHorses);
    } catch (error: any) {
      toast({
        title: "Error loading horses",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const canViewPrice = (horse: Horse) => {
    if (horse.show_price_to === 'all') return true;
    if (horse.show_price_to === 'verified' && profile?.verification_status === 'verified') return true;
    if (horse.show_price_to === 'premium' && ['premium', 'professional'].includes(profile?.account_type || '')) return true;
    return false;
  };

  const canViewContact = (horse: Horse) => {
    if (horse.show_contact_to === 'all') return true;
    if (horse.show_contact_to === 'verified' && profile?.verification_status === 'verified') return true;
    if (horse.show_contact_to === 'premium' && ['premium', 'professional'].includes(profile?.account_type || '')) return true;
    return false;
  };

  const handleUpgradePrompt = () => {
    navigate('/verification');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-ivory-50 to-french-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-french-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-slate-gray-600">Loading horses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-ivory-50 to-french-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-french-blue-600" />
              <span className="text-xl font-semibold text-slate-gray-800">
                Buttonwood Bluebook
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {profile && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-gray-600">
                    Welcome, {profile.first_name || 'User'}
                  </span>
                  <Badge 
                    variant={profile.verification_status === 'verified' ? 'default' : 'secondary'}
                    className={profile.verification_status === 'verified' ? 'bg-green-500' : ''}
                  >
                    {profile.verification_status === 'verified' ? '✓ Verified' : 'Unverified'}
                  </Badge>
                </div>
              )}
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-gray-800 mb-2">
            Premium Sport Horses
          </h1>
          <p className="text-xl text-slate-gray-600">
            Discover exceptional hunter/jumper prospects from verified sellers
          </p>
          
          {profile?.verification_status !== 'verified' && (
            <Card className="mt-6 border-french-blue-200 bg-french-blue-50">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Lock className="h-5 w-5 text-french-blue-600" />
                  <div>
                    <p className="font-medium text-french-blue-800">
                      Unlock full access with verification
                    </p>
                    <p className="text-sm text-french-blue-600">
                      View pricing, contact info, and medical records
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleUpgradePrompt}
                  className="bg-french-blue-600 hover:bg-french-blue-700"
                >
                  Get Verified
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {horses.map((horse) => (
            <Card key={horse.id} className="glass-card hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                {horse.images && horse.images.length > 0 ? (
                  <img
                    src={horse.images[0]}
                    alt={horse.horse_name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <Heart className="h-12 w-12 text-slate-400" />
                  </div>
                )}
                {horse.featured && (
                  <Badge className="absolute top-3 left-3 bg-burnt-orange-500">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-slate-gray-800 mb-2">
                    {horse.horse_name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {horse.disciplines?.map((discipline) => (
                      <Badge key={discipline} variant="secondary" className="text-xs">
                        {discipline}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-2 text-sm text-slate-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {horse.age} years old
                    </div>
                    {horse.height && (
                      <div className="flex items-center">
                        <Ruler className="h-4 w-4 mr-2" />
                        {horse.height}" hands
                      </div>
                    )}
                    {horse.breed && (
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        {horse.breed}
                      </div>
                    )}
                    {horse.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {horse.location}
                      </div>
                    )}
                  </div>
                </div>

                {horse.description && (
                  <p className="text-sm text-slate-gray-600 mb-4 line-clamp-3">
                    {horse.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  {canViewPrice(horse) && horse.price ? (
                    <span className="text-lg font-semibold text-french-blue-600">
                      ${horse.price.toLocaleString()}
                    </span>
                  ) : (
                    <div className="flex items-center text-slate-400">
                      <Lock className="h-4 w-4 mr-1" />
                      <span className="text-sm">Price hidden</span>
                    </div>
                  )}
                  
                  <Button
                    size="sm"
                    className="bg-french-blue-600 hover:bg-french-blue-700"
                    disabled={!canViewContact(horse)}
                  >
                    {canViewContact(horse) ? 'Contact Seller' : 'Verify to Contact'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {horses.length === 0 && (
          <Card className="text-center p-12">
            <Heart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-gray-800 mb-2">
              No horses available yet
            </h3>
            <p className="text-slate-gray-600">
              Check back soon for new listings from our verified sellers.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Browse;
