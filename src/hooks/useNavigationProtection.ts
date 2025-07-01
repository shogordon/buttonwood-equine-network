
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseNavigationProtectionProps {
  hasUnsavedChanges: boolean;
  onSave: () => Promise<void>;
}

export const useNavigationProtection = ({ 
  hasUnsavedChanges, 
  onSave 
}: UseNavigationProtectionProps) => {
  const navigate = useNavigate();

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

  // Return a simplified blocker object for compatibility
  const blocker = {
    state: 'unblocked' as const,
    proceed: () => {},
    reset: () => {},
  };

  return {
    blocker,
    navigateWithSave: handleNavigationWithSave,
  };
};
