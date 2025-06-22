
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

type HorseDiscipline = Database['public']['Enums']['horse_discipline'];
type HorseExperienceLevel = Database['public']['Enums']['horse_experience_level'];

export const usePreviewPublish = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [publishing, setPublishing] = useState(false);

  const publishListing = async (data: any, missingFields: string[]) => {
    if (!user) return;
    
    if (missingFields.length > 0) {
      toast.error(`Please complete required fields: ${missingFields.join(', ')}`);
      return;
    }

    setPublishing(true);
    try {
      const age = data.yearOfBirth ? new Date().getFullYear() - data.yearOfBirth : 0;
      
      // Convert disciplines to proper enum values
      const validDisciplines = (data.disciplines || [])
        .filter((discipline): discipline is HorseDiscipline => 
          ['dressage', 'jumping', 'eventing', 'western', 'racing', 'trail', 'other'].includes(discipline)
        );

      // Convert experience level to proper enum
      const validExperienceLevel = ['beginner', 'intermediate', 'advanced', 'professional'].includes(data.experienceLevel || '') 
        ? data.experienceLevel as HorseExperienceLevel 
        : undefined;
      
      const horseData = {
        user_id: user.id,
        horse_name: data.horseName,
        sex: data.sex,
        breed: data.breed,
        color: data.color,
        height: data.height,
        year_of_birth: data.yearOfBirth,
        age: age,
        location: data.location,
        price: data.price,
        sale_type: data.saleType || 'for_sale',
        trial_available: data.trialAvailable || false,
        xrays_available: data.xraysAvailable || false,
        pros: data.pros?.filter((p: string) => p.trim()) || [],
        cons: data.cons?.filter((c: string) => c.trim()) || [],
        disciplines: validDisciplines,
        experience_level: validExperienceLevel,
        temperament: data.temperament || [],
        rideability: data.rideability || [],
        program_details: data.programDetails || [],
        maintenance_details: data.maintenanceDetails || [],
        images: data.images || [],
        videos: data.videos || [],
        description: data.description,
        show_record: data.showRecord,
        pedigree: data.pedigree,
        health_records: data.healthRecords,
        listing_status: 'published',
        is_available: true,
        verification_status: data.verificationRequested ? 'pending' : 'none',
      };

      const { data: insertedHorse, error } = await supabase
        .from('horse_profiles')
        .insert(horseData)
        .select()
        .single();

      if (error) throw error;

      // Create commission disclosure if applicable
      if (data.commissionType && data.commissionType !== 'none') {
        await supabase
          .from('commission_disclosures')
          .insert({
            horse_profile_id: insertedHorse.id,
            seller_id: user.id,
            commission_type: data.commissionType,
            commission_amount: data.commissionAmount,
            disclosure_text: data.commissionDisclosure,
          });
      }
      
      toast.success('Listing published successfully!');
      navigate('/sell');
    } catch (error) {
      console.error('Error publishing listing:', error);
      toast.error('Failed to publish listing');
    } finally {
      setPublishing(false);
    }
  };

  return { publishListing, publishing };
};
