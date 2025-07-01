
import { ListingData, HorseDiscipline, HorseExperienceLevel } from "@/types/listing";

export const useListingDataMapping = () => {
  const mapDatabaseToFormData = (data: any): Partial<ListingData> => {
    console.log('Mapping database data to form data:', data);
    const mapped = {
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
      // Radio button fields - ensure they're properly mapped
      userRole: data.user_role,
      ownerType: data.owner_type,
      listingType: data.listing_type || [],
      agentContactVisibility: data.agent_contact_visibility,
      // Add additional owner info fields
      ownerName: data.owner_name,
      ownerEmail: data.owner_email,
      ownerPhone: data.owner_phone,
      ownerZip: data.owner_zip,
      displayOwnerName: data.display_owner_name || false,
      businessName: data.business_name,
      businessEmail: data.business_email,
      businessPhone: data.business_phone,
      authorizedAgentName: data.authorized_agent_name,
      authorizedAgentEmail: data.authorized_agent_email,
      authorizedAgentPhone: data.authorized_agent_phone,
      displayBusinessName: data.display_business_name || false,
    };
    console.log('Mapped form data:', mapped);
    return mapped;
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

    const mapped = {
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
      // Radio button fields - ensure they're properly mapped
      user_role: listingData.userRole,
      owner_type: listingData.ownerType,
      listing_type: listingData.listingType || [],
      agent_contact_visibility: listingData.agentContactVisibility,
      // Add additional owner info fields
      owner_name: listingData.ownerName,
      owner_email: listingData.ownerEmail,
      owner_phone: listingData.ownerPhone,
      owner_zip: listingData.ownerZip,
      display_owner_name: listingData.displayOwnerName || false,
      business_name: listingData.businessName,
      business_email: listingData.businessEmail,
      business_phone: listingData.businessPhone,
      authorized_agent_name: listingData.authorizedAgentName,
      authorized_agent_email: listingData.authorizedAgentEmail,
      authorized_agent_phone: listingData.authorizedAgentPhone,
      display_business_name: listingData.displayBusinessName || false,
      listing_status: 'draft',
      is_available: true,
      updated_at: new Date().toISOString(),
    };
    console.log('Mapping form data to database:', mapped);
    return mapped;
  };

  return {
    mapDatabaseToFormData,
    mapFormDataToDatabase,
  };
};
