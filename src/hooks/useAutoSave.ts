
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
  delay = 3000, 
  enabled = true 
}: UseAutoSaveProps) => {
  const lastSavedData = useRef<any>(null);
  const debouncedData = useDebounce(data, delay);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  const hasChanges = useCallback(() => {
    return JSON.stringify(debouncedData) !== JSON.stringify(lastSavedData.current);
  }, [debouncedData]);

  const performAutoSave = useCallback(async () => {
    if (!enabled || !hasChanges()) return;
    
    try {
      await saveFunction();
      lastSavedData.current = { ...debouncedData };
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, [enabled, hasChanges, saveFunction, debouncedData]);

  useEffect(() => {
    if (enabled && hasChanges() && debouncedData) {
      performAutoSave();
    }
  }, [debouncedData, enabled, hasChanges, performAutoSave]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return { hasChanges: hasChanges() };
};
