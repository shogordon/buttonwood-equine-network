import { useState, useEffect, useCallback } from 'react';
import { ListingData } from '@/types/listing';

const BACKUP_KEY = 'listing_form_backup';
const BACKUP_TIMESTAMP_KEY = 'listing_form_backup_timestamp';

export const useLocalStorageBackup = (listingData: Partial<ListingData>, currentDraftId?: string | null) => {
  const [hasBackup, setHasBackup] = useState(false);
  const [backupTimestamp, setBackupTimestamp] = useState<Date | null>(null);

  // Save data to localStorage
  const saveBackup = useCallback((data: Partial<ListingData>) => {
    try {
      const backupData = {
        ...data,
        _backupMeta: {
          draftId: currentDraftId,
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      };
      
      localStorage.setItem(BACKUP_KEY, JSON.stringify(backupData));
      localStorage.setItem(BACKUP_TIMESTAMP_KEY, new Date().toISOString());
      setHasBackup(true);
      setBackupTimestamp(new Date());
      console.log('Local backup saved');
    } catch (error) {
      console.error('Failed to save local backup:', error);
    }
  }, [currentDraftId]);

  // Load data from localStorage
  const loadBackup = useCallback((): Partial<ListingData> | null => {
    try {
      const backupStr = localStorage.getItem(BACKUP_KEY);
      if (!backupStr) return null;

      const backup = JSON.parse(backupStr);
      
      // Remove backup metadata before returning
      if (backup._backupMeta) {
        delete backup._backupMeta;
      }
      
      console.log('Local backup loaded');
      return backup;
    } catch (error) {
      console.error('Failed to load local backup:', error);
      return null;
    }
  }, []);

  // Clear backup
  const clearBackup = useCallback(() => {
    try {
      localStorage.removeItem(BACKUP_KEY);
      localStorage.removeItem(BACKUP_TIMESTAMP_KEY);
      setHasBackup(false);
      setBackupTimestamp(null);
      console.log('Local backup cleared');
    } catch (error) {
      console.error('Failed to clear local backup:', error);
    }
  }, []);

  // Check if backup exists on mount
  useEffect(() => {
    try {
      const backupStr = localStorage.getItem(BACKUP_KEY);
      const timestampStr = localStorage.getItem(BACKUP_TIMESTAMP_KEY);
      
      if (backupStr && timestampStr) {
        setHasBackup(true);
        setBackupTimestamp(new Date(timestampStr));
      }
    } catch (error) {
      console.error('Failed to check for existing backup:', error);
    }
  }, []);

  // Auto-save to localStorage when data changes
  useEffect(() => {
    if (listingData && Object.keys(listingData).length > 0) {
      const timeoutId = setTimeout(() => {
        saveBackup(listingData);
      }, 1000); // Debounce saves

      return () => clearTimeout(timeoutId);
    }
  }, [listingData, saveBackup]);

  return {
    hasBackup,
    backupTimestamp,
    saveBackup,
    loadBackup,
    clearBackup
  };
};