
import { useState, useCallback, useRef } from "react";
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

export const useListingForm = (draftId?: string) => {
  const [listingData, setListingData] = useState<Partial<ListingData>>(getInitialListingData());
  const lastSavedDataRef = useRef<Partial<ListingData>>({});
  
  const {
    loadDraft,
    saveDraft: saveDraftToDb,
    saving,
    saveStatus,
    lastSaved,
    currentDraftId,
    setCurrentDraftId,
  } = useListingDraft();

  const updateListingData = (stepData: Partial<ListingData>) => {
    setListingData(prev => ({ ...prev, ...stepData }));
    if (saveStatus === 'saved') {
      // Reset save status when data changes
    }
  };

  const hasUnsavedChanges = useCallback(() => {
    return JSON.stringify(listingData) !== JSON.stringify(lastSavedDataRef.current);
  }, [listingData]);

  const loadDraftData = useCallback(async () => {
    if (!draftId) return;
    
    const mappedData = await loadDraft(draftId);
    if (mappedData) {
      setListingData(prev => ({ ...prev, ...mappedData }));
      lastSavedDataRef.current = { ...listingData, ...mappedData };
    }
  }, [draftId, loadDraft, listingData]);

  const saveDraft = useCallback(async (showToast = true) => {
    await saveDraftToDb(listingData, showToast);
    lastSavedDataRef.current = { ...listingData };
  }, [listingData, saveDraftToDb]);

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
    loadDraft: loadDraftData,
    currentDraftId,
    hasUnsavedChanges,
  };
};
