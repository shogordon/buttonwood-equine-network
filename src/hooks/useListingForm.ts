
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type HorseDiscipline = Database['public']['Enums']['horse_discipline'];
type HorseExperienceLevel = Database['public']['Enums']['horse_experience_level'];

interface ListingData {
  // Seller info
  sellerName: string;
  sellerRole: string;
  commissionType: string;
  commissionAmount: number;
  
  // Basic horse info
  horseName: string;
  sex: string;
  breed: string;
  color: string;
  height: number;
  yearOfBirth: number;
  location: string;
  
  // Sale info
  price: number;
  saleType: string;
  trialAvailable: boolean;
  xraysAvailable: boolean;
  
  // Pros & cons
  pros: string[];
  cons: string[];
  
  // Tags & filters
  disciplines: string[];
  experienceLevel: string;
  temperament: string[];
  rideability: string[];
  
  // Program & maintenance
  programDetails: string[];
  maintenanceDetails: string[];
  
  // Media
  images: string[];
  videos: string[];
  
  // Description
  description: string;
  
  // Verification
  showRecord: string;
  pedigree: string;
  healthRecords: string;
}

export const useListingForm = () => {
  const { user } = useAuth();
  const [listingData, setListingData] = useState<Partial<ListingData>>({});
  const [saving, setSaving] = useState(false);

  const updateListingData = (stepData: Partial<ListingData>) => {
    setListingData(prev => ({ ...prev, ...stepData }));
  };

  const saveDraft = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const age = listingData.yearOfBirth ? new Date().getFullYear() - listingData.yearOfBirth : 0;
      
      const validDisciplines = (listingData.disciplines || [])
        .filter((discipline): discipline is HorseDiscipline => 
          ['dressage', 'jumping', 'eventing', 'western', 'racing', 'trail', 'other'].includes(discipline)
        );

      const validExperienceLevel = ['beginner', 'intermediate', 'advanced', 'professional'].includes(listingData.experienceLevel || '') 
        ? listingData.experienceLevel as HorseExperienceLevel 
        : undefined;

      const horseData = {
        user_id: user.id,
        horse_name: listingData.horseName || 'Untitled Horse',
        sex: listingData.sex,
        breed: listingData.breed,
        color: listingData.color,
        height: listingData.height,
        year_of_birth: listingData.yearOfBirth,
        age: age,
        location: listingData.location,
        price: listingData.price,
        sale_type: listingData.saleType || 'for_sale',
        trial_available: listingData.trialAvailable || false,
        xrays_available: listingData.xraysAvailable || false,
        pros: listingData.pros || [],
        cons: listingData.cons || [],
        disciplines: validDisciplines,
        experience_level: validExperienceLevel,
        temperament: listingData.temperament || [],
        rideability: listingData.rideability || [],
        program_details: listingData.programDetails || [],
        maintenance_details: listingData.maintenanceDetails || [],
        images: listingData.images || [],
        videos: listingData.videos || [],
        description: listingData.description,
        show_record: listingData.showRecord,
        pedigree: listingData.pedigree,
        health_records: listingData.healthRecords,
        listing_status: 'draft',
        is_available: true,
      };

      const { error } = await supabase
        .from('horse_profiles')
        .insert(horseData);

      if (error) throw error;
      
      toast.success('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  return {
    listingData,
    updateListingData,
    saveDraft,
    saving
  };
};
