
import { useState, useEffect } from 'react';
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

export const useBrowseData = () => {
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

  const handleUpgradePrompt = () => {
    navigate('/verification');
  };

  return {
    horses,
    loading,
    profile,
    signOut,
    handleUpgradePrompt
  };
};
