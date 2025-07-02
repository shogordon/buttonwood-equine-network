
import { useState, useCallback, useRef, useEffect } from "react";
import { ListingData } from "@/types/listing";
import { useListingDraft } from "./useListingDraft";
import { useLocalStorageBackup } from "./useLocalStorageBackup";
import { useRetry } from "./useRetry";
import { toast } from "sonner";

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

  const { withRetry, isRetrying } = useRetry();
  
  const {
    hasBackup,
    backupTimestamp,
    loadBackup,
    clearBackup
  } = useLocalStorageBackup(listingData, currentDraftId);

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
    
    return withRetry(
      async () => {
        const mappedData = await loadDraft(draftId);
        if (mappedData) {
          console.log('useListingForm: Draft loaded successfully:', mappedData);
          setListingData(mappedData);
          lastSavedDataRef.current = mappedData;
          setDraftLoaded(true);
          
          // Clear local backup since we loaded from server
          if (hasBackup) {
            clearBackup();
          }
        } else {
          // Try to load from local backup if server load fails
          const backupData = loadBackup();
          if (backupData && Object.keys(backupData).length > 0) {
            console.log('Loading from local backup');
            setListingData(backupData);
            toast.info('Loaded from local backup. Changes will sync when connection is restored.');
          }
          setDraftLoaded(true);
        }
      },
      {
        maxRetries: 2,
        delay: 1000,
        onMaxRetriesReached: () => {
          // Try to load from local backup as fallback
          const backupData = loadBackup();
          if (backupData && Object.keys(backupData).length > 0) {
            console.log('Loading from local backup after server failure');
            setListingData(backupData);
            toast.warning('Unable to load from server. Using local backup.');
          }
          setDraftLoaded(true);
        }
      }
    );
  }, [draftId, loadDraft, loading, draftLoaded, withRetry, hasBackup, clearBackup, loadBackup]);

  const saveDraft = useCallback(async (showToast = true) => {
    console.log('useListingForm: Saving draft with data:', listingData);
    
    return withRetry(
      async () => {
        await saveDraftToDb(listingData, showToast);
        lastSavedDataRef.current = { ...listingData };
        console.log('useListingForm: Draft saved successfully');
        
        // Clear local backup after successful save
        if (hasBackup) {
          clearBackup();
        }
      },
      {
        maxRetries: 3,
        delay: 2000,
        onRetry: (attempt) => {
          console.log(`Retrying save operation: attempt ${attempt}`);
        },
        onMaxRetriesReached: () => {
          toast.error('Unable to save to server. Your changes are backed up locally.');
        }
      }
    );
  }, [listingData, saveDraftToDb, withRetry, hasBackup, clearBackup]);

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
    saving: saving || isRetrying,
    loading,
    saveStatus,
    lastSaved,
    loadDraft: loadDraftData,
    currentDraftId,
    hasUnsavedChanges,
    hasBackup,
    backupTimestamp,
    loadBackup,
    clearBackup,
    isRetrying,
  };
};
