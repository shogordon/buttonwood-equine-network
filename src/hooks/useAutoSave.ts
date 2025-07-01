
import { useEffect, useRef, useCallback } from 'react';
import { useDebounce } from './useDebounce';

interface UseAutoSaveProps {
  data: any;
  saveFunction: () => Promise<void>;
  delay?: number;
  enabled?: boolean;
}

export const useAutoSave = ({ 
  data, 
  saveFunction, 
  delay = 5000, // Increased delay to 5 seconds
  enabled = true 
}: UseAutoSaveProps) => {
  const lastSavedData = useRef<any>(null);
  const debouncedData = useDebounce(data, delay);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Check if data has meaningful changes
  const hasSignificantChanges = useCallback(() => {
    if (!debouncedData || !lastSavedData.current) return false;
    
    const currentDataStr = JSON.stringify(debouncedData);
    const lastSavedDataStr = JSON.stringify(lastSavedData.current);
    
    // Only consider it a significant change if there's actual content
    const hasContent = !!(
      debouncedData.horseName?.trim() ||
      debouncedData.horse_name?.trim() ||
      debouncedData.breed?.trim() ||
      debouncedData.location?.trim() ||
      debouncedData.price ||
      debouncedData.description?.trim() ||
      debouncedData.userRole
    );
    
    return hasContent && currentDataStr !== lastSavedDataStr;
  }, [debouncedData]);

  const performAutoSave = useCallback(async () => {
    if (!enabled || !hasSignificantChanges()) return;
    
    try {
      await saveFunction();
      lastSavedData.current = { ...debouncedData };
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, [enabled, hasSignificantChanges, saveFunction, debouncedData]);

  useEffect(() => {
    if (enabled && hasSignificantChanges() && debouncedData) {
      performAutoSave();
    }
  }, [debouncedData, enabled, hasSignificantChanges, performAutoSave]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return { hasChanges: hasSignificantChanges() };
};
