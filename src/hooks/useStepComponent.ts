
import { useMemo } from 'react';
import { LISTING_STEPS } from '@/config/listingSteps';
import { ListingData } from '@/types/listing';

interface UseStepComponentProps {
  currentStep: number;
  listingData: Partial<ListingData>;
  updateListingData: (data: Partial<ListingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  saveDraft: () => void;
}

export const useStepComponent = ({
  currentStep,
  listingData,
  updateListingData,
  nextStep,
  prevStep,
  saveDraft,
}: UseStepComponentProps) => {
  const currentStepComponent = useMemo(() => {
    const step = LISTING_STEPS.find(step => step.id === currentStep);
    if (!step) return null;

    // Skip agent info step if user is not an agent
    if (step.id === 3 && listingData.userRole !== 'agent') {
      return null;
    }

    return step.component;
  }, [currentStep, listingData.userRole]);

  const stepProps = useMemo(() => {
    const baseProps = {
      data: listingData,
      onUpdate: updateListingData,
      onNext: nextStep,
      onPrev: prevStep,
      isFirst: currentStep === 1,
      isLast: currentStep === LISTING_STEPS.length,
    };

    // Add saveDraft function for PreviewStep
    if (currentStep === 12) {
      return { ...baseProps, onSaveDraft: saveDraft };
    }

    return baseProps;
  }, [currentStep, listingData, updateListingData, nextStep, prevStep, saveDraft]);

  return {
    CurrentStepComponent: currentStepComponent,
    stepProps,
  };
};
