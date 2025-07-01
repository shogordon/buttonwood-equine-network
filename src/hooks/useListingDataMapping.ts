
import { ListingData, HorseDiscipline, HorseExperienceLevel } from "@/types/listing";

export const useListingDataMapping = () => {
  const mapDatabaseToFormData = (data: any): Partial<ListingData> => {
    return {
      horseName: data.horse_name,
      barnName: data.horse_name,
      breed: data.breed,
      sex: data.sex,
      color: data.color,
      height: data.height,
      yearOfBirth: data.year_of_birth,
      age: data.age,
      location: data.location,
      currentLocation: data.location,
      price: data.price,
      saleType: data.sale_type,
      trialAvailable: data.trial_available,
      xraysAvailable: data.xrays_available,
      pros: data.pros || [],
      cons: data.cons || [],
      disciplines: data.disciplines || [],
      experienceLevel: data.experience_level,
      temperament: data.temperament || [],
      rideability: data.rideability || [],
      programDetails: data.program_details || [],
      maintenanceDetails: data.maintenance_details || [],
      images: data.images || [],
      videos: data.videos || [],
      description: data.description,
      showRecord: data.show_record,
      pedigree: data.pedigree,
      healthRecords: data.health_records,
    };
  };

  const mapFormDataToDatabase = (listingData: Partial<ListingData>, userId: string) => {
    const age = listingData.yearOfBirth ? new Date().getFullYear() - listingData.yearOfBirth : 0;
    
    const validDisciplines = (listingData.disciplines || [])
      .filter((discipline): discipline is HorseDiscipline => 
        ['dressage', 'jumping', 'eventing', 'western', 'racing', 'trail', 'other'].includes(discipline)
      );

    const validExperienceLevel = ['beginner', 'intermediate', 'advanced', 'professional'].includes(listingData.experienceLevel || '') 
      ? listingData.experienceLevel as HorseExperienceLevel 
      : undefined;

    return {
      user_id: userId,
      horse_name: listingData.barnName || listingData.horseName || 'Draft Horse',
      sex: listingData.sex,
      breed: listingData.breed,
      color: listingData.color,
      height: listingData.height,
      year_of_birth: listingData.yearOfBirth,
      age: age,
      location: listingData.currentLocation || listingData.location,
      price: listingData.price,
      sale_type: listingData.saleType || 'for_sale',
      trial_available: listingData.trialAvailable || listingData.trialConsidered || false,
      xrays_available: listingData.xraysAvailable || listingData.xraysStatus === 'full' || false,
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
      updated_at: new Date().toISOString(),
    };
  };

  return {
    mapDatabaseToFormData,
    mapFormDataToDatabase,
  };
};
