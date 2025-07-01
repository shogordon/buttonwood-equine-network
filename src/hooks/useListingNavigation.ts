
import { useState, useCallback } from 'react';
import { LISTING_STEPS } from '@/config/listingSteps';

interface UseListingNavigationProps {
  userRole: string;
  hasUnsavedChanges: boolean;
  autoSave: () => Promise<void>;
}

export const useListingNavigation = ({ 
  userRole, 
  hasUnsavedChanges, 
  autoSave 
}: UseListingNavigationProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = useCallback(async () => {
    // Auto-save before navigation
    if (hasUnsavedChanges) {
      await autoSave();
    }

    let nextStepId = currentStep + 1;
    
    // Skip agent info step if user is not an agent
    // Use fallback to 'owner' if userRole is empty/null
    const roleToCheck = userRole || 'owner';
    if (nextStepId === 3 && roleToCheck !== 'agent') {
      nextStepId = 4;
    }

    if (nextStepId <= LISTING_STEPS.length) {
      setCurrentStep(nextStepId);
    }
  }, [currentStep, userRole, hasUnsavedChanges, autoSave]);

  const prevStep = useCallback(async () => {
    // Auto-save before navigation
    if (hasUnsavedChanges) {
      await autoSave();
    }

    let prevStepId = currentStep - 1;
    
    // Skip agent info step if user is not an agent
    // Use fallback to 'owner' if userRole is empty/null
    const roleToCheck = userRole || 'owner';
    if (prevStepId === 3 && roleToCheck !== 'agent') {
      prevStepId = 2;
    }

    if (prevStepId >= 1) {
      setCurrentStep(prevStepId);
    }
  }, [currentStep, userRole, hasUnsavedChanges, autoSave]);

  return {
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
  };
};
