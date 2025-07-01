import { useState, useCallback, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type HorseDiscipline = Database['public']['Enums']['horse_discipline'];
type HorseExperienceLevel = Database['public']['Enums']['horse_experience_level'];

interface ListingData {
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
  papersStatus: 'yes' | 'no' | 'pending' | '';
  
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

export const useListingForm = (draftId?: string) => {
  const { user } = useAuth();
  const [listingData, setListingData] = useState<Partial<ListingData>>({
    userRole: '',
    listingType: [],
    ownerType: '',
    displayOwnerName: false,
    displayBusinessName: false,
    hasPermissionToList: false,
    authorizedAgentEmail: '',
    authorizedAgentPhone: '',
    agentContactVisibility: '',
    papersStatus: '',
    facilityType: [],
    trialOptions: [],
    workStatus: [],
    priceInquire: false,
    priceNegotiable: false,
    leaseConsidered: false,
    trialConsidered: false,
    bestFor: [],
    hasCommission: false,
    commissionType: '',
    commissionPaidBy: '',
    coBrokers: [],
    keyStrengths: [],
    riderMatch: [],
    xraysStatus: '',
    vetDocuments: [],
    images: [],
    videos: [],
    videoCategories: {},
    socialLinks: [],
    useDefaultContact: true,
    contactVisibility: 'registered',
  });
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(draftId || null);
  const lastSavedDataRef = useRef<Partial<ListingData>>({});

  const updateListingData = (stepData: Partial<ListingData>) => {
    setListingData(prev => ({ ...prev, ...stepData }));
    if (saveStatus === 'saved') {
      setSaveStatus('idle');
    }
  };

  const hasUnsavedChanges = useCallback(() => {
    return JSON.stringify(listingData) !== JSON.stringify(lastSavedDataRef.current);
  }, [listingData]);

  const loadDraft = useCallback(async () => {
    if (!user || !draftId) return;
    
    try {
      const { data, error } = await supabase
        .from('horse_profiles')
        .select('*')
        .eq('id', draftId)
        .eq('user_id', user.id)
        .eq('listing_status', 'draft')
        .single();

      if (error) {
        console.error('Error loading draft:', error);
        toast.error('Failed to load draft');
        return;
      }

      if (data) {
        // Map database fields to form data
        const mappedData: Partial<ListingData> = {
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

        setListingData(prev => ({ ...prev, ...mappedData }));
        setCurrentDraftId(draftId);
        toast.success('Draft loaded successfully');
      }
    } catch (error) {
      console.error('Error loading draft:', error);
      toast.error('Failed to load draft');
    }
  }, [user, draftId]);

  const saveDraft = async (showToast = true, retryCount = 0) => {
    if (!user) return;
    
    setSaving(true);
    setSaveStatus('saving');
    
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

      if (currentDraftId) {
        // Update existing draft
        const { error } = await supabase
          .from('horse_profiles')
          .update(horseData)
          .eq('id', currentDraftId)
          .eq('user_id', user.id);

        if (error) throw error;
        if (showToast) toast.success('Draft updated successfully!');
      } else {
        // Create new draft
        const { data, error } = await supabase
          .from('horse_profiles')
          .insert(horseData)
          .select()
          .single();

        if (error) throw error;
        
        setCurrentDraftId(data.id);
        if (showToast) toast.success('Draft saved successfully!');
      }

      // Update tracking refs
      lastSavedDataRef.current = { ...listingData };
      setSaveStatus('saved');
      setLastSaved(new Date());
      
    } catch (error) {
      console.error('Error saving draft:', error);
      setSaveStatus('error');
      
      // Retry logic for failed saves
      if (retryCount < 2) {
        setTimeout(() => {
          saveDraft(false, retryCount + 1);
        }, 2000 * (retryCount + 1));
      } else {
        if (showToast) toast.error('Failed to save draft after multiple attempts');
      }
    } finally {
      setSaving(false);
    }
  };

  const autoSave = useCallback(async () => {
    if (hasUnsavedChanges()) {
      await saveDraft(false);
    }
  }, [hasUnsavedChanges, saveDraft]);

  return {
    listingData,
    updateListingData,
    saveDraft,
    autoSave,
    saving,
    saveStatus,
    lastSaved,
    loadDraft,
    currentDraftId,
    hasUnsavedChanges,
  };
};
