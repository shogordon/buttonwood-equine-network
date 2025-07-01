
import { useMemo } from 'react';
import { LISTING_STEPS } from '@/config/listingSteps';

// Dynamic imports for all step components
const WhoFillingOutStep = React.lazy(() => import('@/components/listing/WhoFillingOutStep'));
const OwnerInfoStep = React.lazy(() => import('@/components/listing/OwnerInfoStep'));
const AgentInfoStep = React.lazy(() => import('@/components/listing/AgentInfoStep'));
const EnhancedHorseDetailsStep = React.lazy(() => import('@/components/listing/EnhancedHorseDetailsStep'));
const SaleInfoStep = React.lazy(() => import('@/components/listing/SaleInfoStep'));
const DescriptionStep = React.lazy(() => import('@/components/listing/DescriptionStep'));
const ProsConsStep = React.lazy(() => import('@/components/listing/ProsConsStep'));
const TagsFiltersStep = React.lazy(() => import('@/components/listing/TagsFiltersStep'));
const ProgramMaintenanceStep = React.lazy(() => import('@/components/listing/ProgramMaintenanceStep'));
const MediaUploadStep = React.lazy(() => import('@/components/listing/MediaUploadStep'));
const VerificationStep = React.lazy(() => import('@/components/listing/VerificationStep'));
const PreviewStep = React.lazy(() => import('@/components/listing/PreviewStep'));

import React from 'react';

interface UseStepComponentProps {
  currentStep: number;
  listingData: any;
  updateListingData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  saveDraft: () => void;
  setCurrentStep: (step: number) => void;
  currentDraftId?: string | null;
}

export const useStepComponent = ({
  currentStep,
  listingData,
  updateListingData,
  nextStep,
  prevStep,
  saveDraft,
  setCurrentStep,
  currentDraftId,
}: UseStepComponentProps) => {
  const stepComponents = useMemo(() => ({
    1: WhoFillingOutStep,
    2: OwnerInfoStep,
    3: AgentInfoStep,
    4: EnhancedHorseDetailsStep,
    5: SaleInfoStep,
    6: DescriptionStep,
    7: ProsConsStep,
    8: TagsFiltersStep,
    9: ProgramMaintenanceStep,
    10: MediaUploadStep,
    11: VerificationStep,
    12: PreviewStep,
  }), []);

  const CurrentStepComponent = stepComponents[currentStep as keyof typeof stepComponents];

  const stepProps = useMemo(() => {
    const baseProps = {
      data: listingData,
      onUpdate: updateListingData,
      onNext: nextStep,
      onPrev: prevStep,
      isFirst: currentStep === 1,
      isLast: currentStep === LISTING_STEPS.length,
      onSaveDraft: saveDraft,
    };

    // Add specific props for certain steps
    if (currentStep === 12) { // PreviewStep
      return {
        ...baseProps,
        onNavigateToStep: setCurrentStep,
        currentDraftId,
      };
    }

    return baseProps;
  }, [listingData, updateListingData, nextStep, prevStep, currentStep, saveDraft, setCurrentStep, currentDraftId]);

  return {
    CurrentStepComponent,
    stepProps,
  };
};
