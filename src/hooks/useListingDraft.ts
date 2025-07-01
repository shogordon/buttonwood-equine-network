
import { useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ListingData } from "@/types/listing";
import { useListingDataMapping } from "./useListingDataMapping";
import { generateTagline } from "@/utils/taglineGenerator";

export const useListingDraft = () => {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  const [originalListingStatus, setOriginalListingStatus] = useState<string>('draft');
  const { mapDatabaseToFormData, mapFormDataToDatabase } = useListingDataMapping();

  // Check if the listing data has meaningful content
  const hasMinimalContent = (listingData: Partial<ListingData>) => {
    return !!(
      listingData.horseName?.trim() ||
      listingData.barnName?.trim() ||
      listingData.breed?.trim() ||
      listingData.location?.trim() ||
      listingData.currentLocation?.trim() ||
      listingData.price ||
      listingData.description?.trim() ||
      listingData.userRole ||
      listingData.ownerType ||
      (listingData.listingType && listingData.listingType.length > 0) ||
      listingData.agentContactVisibility
    );
  };

  // Generate a smart draft name based on available data
  const generateDraftName = (listingData: Partial<ListingData>): string => {
    const horseName = listingData.barnName || listingData.horseName;
    const breed = listingData.breed;
    const location = listingData.location || listingData.currentLocation;
    
    if (horseName?.trim() && horseName !== 'Draft Horse') {
      // Build name with additional context
      let name = horseName.trim();
      
      if (breed) {
        name += ` - ${breed}`;
      }
      
      if (location) {
        name += ` (${location})`;
      }
      
      // Try to generate a tagline if we have enough information
      if (listingData.description || listingData.disciplines?.length) {
        try {
          const tagline = generateTagline(listingData);
          if (tagline && tagline !== horseName) {
            name += ` - ${tagline}`;
          }
        } catch (error) {
          console.error('Error generating tagline:', error);
        }
      }
      
      return name;
    }
    
    // Fallback naming strategy with more context
    const userRole = listingData.userRole || 'owner';
    const ownerType = listingData.ownerType || 'person';
    const timestamp = new Date().toLocaleDateString();
    return `New ${userRole} listing (${ownerType}) - ${timestamp}`;
  };

  const loadDraft = useCallback(async (draftId: string) => {
    if (!user || !draftId || loading) return null;
    
    setLoading(true);
    
    try {
      console.log('Loading listing for editing:', draftId);
      
      // Load any listing status (draft or published) for editing
      const { data, error } = await supabase
        .from('horse_profiles')
        .select('*')
        .eq('id', draftId)
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error loading listing:', error);
        toast.error('Failed to load listing');
        return null;
      }

      if (data) {
        console.log('Loaded listing data:', data);
        
        // Store the original listing status to preserve it during saves
        setOriginalListingStatus(data.listing_status || 'draft');
        
        const mappedData = mapDatabaseToFormData(data);
        setCurrentDraftId(draftId);
        console.log('Listing loaded successfully:', mappedData);
        return mappedData;
      }
    } catch (error) {
      console.error('Error loading listing:', error);
      toast.error('Failed to load listing');
    } finally {
      setLoading(false);
    }
    
    return null;
  }, [user, mapDatabaseToFormData, loading]);

  const saveDraft = async (listingData: Partial<ListingData>, showToast = true, retryCount = 0) => {
    if (!user) return;
    
    // Only save if there's meaningful content
    if (!hasMinimalContent(listingData)) {
      console.log('Skipping auto-save: No meaningful content to save');
      return;
    }
    
    setSaving(true);
    setSaveStatus('saving');
    
    try {
      const horseData = mapFormDataToDatabase(listingData, user.id);
      
      // Preserve the original listing status when editing existing listings
      if (currentDraftId && originalListingStatus) {
        horseData.listing_status = originalListingStatus;
      }
      
      // Use the smart naming strategy for new drafts only
      if (!currentDraftId && horseData.listing_status === 'draft') {
        horseData.horse_name = generateDraftName(listingData);
      }

      console.log('Saving listing with data:', horseData);

      if (currentDraftId) {
        // Update existing listing (draft or published)
        const { error } = await supabase
          .from('horse_profiles')
          .update(horseData)
          .eq('id', currentDraftId)
          .eq('user_id', user.id);

        if (error) throw error;
        
        const statusText = originalListingStatus === 'published' ? 'Published listing' : 'Draft';
        if (showToast) toast.success(`${statusText} updated successfully!`);
      } else {
        // Create new draft
        const { data, error } = await supabase
          .from('horse_profiles')
          .insert(horseData)
          .select()
          .single();

        if (error) throw error;
        
        setCurrentDraftId(data.id);
        setOriginalListingStatus('draft');
        if (showToast) toast.success('Draft saved successfully!');
      }

      setSaveStatus('saved');
      setLastSaved(new Date());
      
    } catch (error) {
      console.error('Error saving listing:', error);
      setSaveStatus('error');
      
      // Retry logic for failed saves
      if (retryCount < 2) {
        setTimeout(() => {
          saveDraft(listingData, false, retryCount + 1);
        }, 2000 * (retryCount + 1));
      } else {
        if (showToast) toast.error('Failed to save listing after multiple attempts');
      }
    } finally {
      setSaving(false);
    }
  };

  const cleanupEmptyDrafts = async () => {
    if (!user) return;
    
    try {
      // Delete drafts with minimal content (empty or just "Draft Horse")
      const { error } = await supabase
        .from('horse_profiles')
        .delete()
        .eq('user_id', user.id)
        .eq('listing_status', 'draft')
        .or('horse_name.eq.Draft Horse,horse_name.is.null,description.is.null')
        .is('breed', null)
        .is('price', null);

      if (error) {
        console.error('Error cleaning up empty drafts:', error);
      } else {
        console.log('Empty drafts cleaned up successfully');
      }
    } catch (error) {
      console.error('Error during draft cleanup:', error);
    }
  };

  return {
    loadDraft,
    saveDraft,
    saving,
    loading,
    saveStatus,
    lastSaved,
    currentDraftId,
    setCurrentDraftId,
    cleanupEmptyDrafts,
  };
};
