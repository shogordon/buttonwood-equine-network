
import { useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ListingData } from "@/types/listing";
import { useListingDataMapping } from "./useListingDataMapping";

export const useListingDraft = () => {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  const { mapDatabaseToFormData, mapFormDataToDatabase } = useListingDataMapping();

  const loadDraft = useCallback(async (draftId: string) => {
    if (!user || !draftId || loading) return null;
    
    setLoading(true);
    
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
        return null;
      }

      if (data) {
        const mappedData = mapDatabaseToFormData(data);
        setCurrentDraftId(draftId);
        // Remove the success toast for draft loading as it's expected behavior
        return mappedData;
      }
    } catch (error) {
      console.error('Error loading draft:', error);
      toast.error('Failed to load draft');
    } finally {
      setLoading(false);
    }
    
    return null;
  }, [user, mapDatabaseToFormData, loading]);

  const saveDraft = async (listingData: Partial<ListingData>, showToast = true, retryCount = 0) => {
    if (!user) return;
    
    setSaving(true);
    setSaveStatus('saving');
    
    try {
      const horseData = mapFormDataToDatabase(listingData, user.id);

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

      setSaveStatus('saved');
      setLastSaved(new Date());
      
    } catch (error) {
      console.error('Error saving draft:', error);
      setSaveStatus('error');
      
      // Retry logic for failed saves
      if (retryCount < 2) {
        setTimeout(() => {
          saveDraft(listingData, false, retryCount + 1);
        }, 2000 * (retryCount + 1));
      } else {
        if (showToast) toast.error('Failed to save draft after multiple attempts');
      }
    } finally {
      setSaving(false);
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
  };
};
