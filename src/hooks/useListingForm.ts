
import { useState, useCallback, useRef, useEffect } from "react";
import { ListingData } from "@/types/listing";
import { useListingDraft } from "./useListingDraft";

const getInitialListingData = (): Partial<ListingData> => ({
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
  trialOptions: { onSiteTrials: false, offSiteTrials: '', vetCheckWelcome: false },
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

export const useListingForm = (draftId?: string) => {
  const [listingData, setListingData] = useState<Partial<ListingData>>(getInitialListingData());
  const lastSavedDataRef = useRef<Partial<ListingData>>({});
  const [draftLoaded, setDraftLoaded] = useState(false);
  
  const {
    loadDraft,
    saveDraft: saveDraftToDb,
    saving,
    loading,
    saveStatus,
    lastSaved,
    currentDraftId,
    setCurrentDraftId,
  } = useListingDraft();

  const updateListingData = useCallback((stepData: Partial<ListingData>) => {
    console.log('useListingForm: Updating listing data with:', stepData);
    setListingData(prev => {
      const updated = { ...prev, ...stepData };
      console.log('useListingForm: New listing data state:', updated);
      return updated;
    });
  }, []);

  // Memoize the hasUnsavedChanges function to prevent unnecessary re-renders
  const hasUnsavedChanges = useCallback(() => {
    const currentDataString = JSON.stringify(listingData);
    const lastSavedDataString = JSON.stringify(lastSavedDataRef.current);
    const hasChanges = currentDataString !== lastSavedDataString;
    console.log('useListingForm: Has unsaved changes:', hasChanges);
    return hasChanges;
  }, [listingData]);

  const loadDraftData = useCallback(async () => {
    if (!draftId || loading || draftLoaded) {
      return;
    }
    
    console.log('useListingForm: Loading draft:', draftId);
    try {
      const mappedData = await loadDraft(draftId);
      if (mappedData) {
        console.log('useListingForm: Draft loaded successfully:', mappedData);
        setListingData(mappedData);
        lastSavedDataRef.current = mappedData;
        setDraftLoaded(true);
      }
    } catch (error) {
      console.error('useListingForm: Error loading draft:', error);
      setDraftLoaded(true);
    }
  }, [draftId, loadDraft, loading, draftLoaded]);

  const saveDraft = useCallback(async (showToast = true) => {
    console.log('useListingForm: Saving draft with data:', listingData);
    try {
      await saveDraftToDb(listingData, showToast);
      lastSavedDataRef.current = { ...listingData };
      console.log('useListingForm: Draft saved successfully');
    } catch (error) {
      console.error('useListingForm: Error saving draft:', error);
    }
  }, [listingData, saveDraftToDb]);

  const autoSave = useCallback(async () => {
    if (hasUnsavedChanges()) {
      console.log('useListingForm: Auto-saving due to unsaved changes');
      await saveDraft(false);
    }
  }, [hasUnsavedChanges, saveDraft]);

  // Load draft data when component mounts and draftId is available
  useEffect(() => {
    if (draftId && !draftLoaded && !loading) {
      loadDraftData();
    }
  }, [draftId, draftLoaded, loading, loadDraftData]);

  return {
    listingData,
    updateListingData,
    saveDraft,
    autoSave,
    saving,
    loading,
    saveStatus,
    lastSaved,
    loadDraft: loadDraftData,
    currentDraftId,
    hasUnsavedChanges,
  };
};
