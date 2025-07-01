
import { useEffect, useCallback } from 'react';
import { useNavigate, useBlocker } from 'react-router-dom';

interface UseNavigationProtectionProps {
  hasUnsavedChanges: boolean;
  onSave: () => Promise<void>;
}

export const useNavigationProtection = ({ 
  hasUnsavedChanges, 
  onSave 
}: UseNavigationProtectionProps) => {
  const navigate = useNavigate();

  // Block navigation if there are unsaved changes
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname
  );

  // Handle browser refresh/close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleNavigationWithSave = useCallback(async (path: string) => {
    if (hasUnsavedChanges) {
      try {
        await onSave();
      } catch (error) {
        console.error('Failed to save before navigation:', error);
      }
    }
    navigate(path);
  }, [hasUnsavedChanges, onSave, navigate]);

  return {
    blocker,
    navigateWithSave: handleNavigationWithSave,
  };
};
