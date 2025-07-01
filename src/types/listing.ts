
import type { Database } from "@/integrations/supabase/types";

type HorseDiscipline = Database['public']['Enums']['horse_discipline'];
type HorseExperienceLevel = Database['public']['Enums']['horse_experience_level'];

export interface ListingData {
  // Who's filling this out
  userRole: 'owner' | 'agent' | '';
  listingType: string[];
  
  // Owner info
  ownerType: 'person' | 'business' | '';
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerZip: string;
  displayOwnerName: boolean;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  authorizedAgentName: string;
  authorizedAgentEmail: string;
  authorizedAgentPhone: string;
  displayBusinessName: boolean;
  
  // Agent/Rep info
  agentName: string;
  agentBusinessName: string;
  agentPhone: string;
  agentEmail: string;
  agentWebsite: string;
  agentSocials: string;
  hasPermissionToList: boolean;
  agentContactVisibility: 'registered_users' | 'verified_buyers' | 'on_request' | '';
  
  // Horse details
  registeredName: string;
  barnName: string;
  breed: string;
  sex: string;
  height: number;
  color: string;
  age: number;
  yearOfBirth: number;
  sire: string;
  dam: string;
  damsire: string;
  papersStatus: 'full' | 'partial' | 'none' | 'pending' | '';
  
  // New documentation fields
  registrationBodies: string[];
  papersDetails: string;
  otherRegistration: string;
  microchipped: boolean;
  microchipNumber: string;
  markings: string;
  earnings: number;
  
  // New location fields
  zipCode: string;
  facilityName: string;
  // Location & availability
  currentLocation: string;
  facilityType: string[];
  trialOptions: string[];
  travelLimits: string;
  workStatus: string[];
  
  // Price & buyer match
  price: number;
  priceInquire: boolean;
  priceNegotiable: boolean;
  leaseConsidered: boolean;
  trialConsidered: boolean;
  depositTerms: string;
  bestFor: string[];
  
  // New pricing fields
  paymentOptions: string[];
  paymentTerms: string;
  leasePrice: number;
  leaseDuration: string;
  halfLease: boolean;
  leaseTerms: string;
  specialTerms: string;
  
  // Commission
  hasCommission: boolean;
  commissionAmount: number;
  commissionType: 'flat' | 'percentage' | '';
  commissionPaidBy: 'buyer' | 'seller' | 'shared' | '';
  coBrokers: Array<{ name: string; email: string; }>;
  
  // Description & highlights
  headline: string;
  description: string;
  keyStrengths: string[];
  
  // Show & training info
  highestShowLevel: string;
  highestSchoolingLevel: string;
  showHighlights: string;
  currentTrainer: string;
  currentProgram: string;
  trainingSchedule: string;
  trainingApproach: string;
  
  // Temperament & suitability
  riderMatch: string[];
  quirksNotes: string;
  groundManners: string;
  
  // Vet & health info
  maintenance: string;
  soundnessConcerns: string;
  xraysStatus: 'full' | 'partial' | 'on_request' | 'none' | '';
  recentPPE: string;
  vetDocuments: string[];
  
  // Media
  coverPhoto: string;
  images: string[];
  videos: string[];
  videoCategories: { [key: string]: string[] };
  socialLinks: string[];
  
  // Contact info display
  useDefaultContact: boolean;
  customContactPerson: string;
  contactVisibility: 'registered' | 'verified' | 'on_request' | '';
  contactNotes: string;
  
  // Legacy fields for compatibility
  horseName: string;
  location: string;
  saleType: string;
  trialAvailable: boolean;
  xraysAvailable: boolean;
  pros: string[];
  cons: string[];
  disciplines: string[];
  experienceLevel: string;
  temperament: string[];
  rideability: string[];
  programDetails: string[];
  maintenanceDetails: string[];
  showRecord: string;
  pedigree: string;
  healthRecords: string;
}

export { type HorseDiscipline, type HorseExperienceLevel };
