import { useMemo } from 'react';
import React from 'react';
import { NEW_LISTING_STEPS } from '@/config/newListingSteps';

// Import consolidated step components
const AboutYouGoalsStep = React.lazy(() => import('@/components/listing/WhoFillingOutStep'));
const ListingStrategyStep = React.lazy(() => import('@/components/listing/steps/ListingStrategyStep'));
const HorseIdentityStep = React.lazy(() => import('@/components/listing/steps/HorseIdentityStep'));
const DocumentationVerificationStep = React.lazy(() => import('@/components/listing/steps/DocumentationVerificationStep'));
const PricingTermsStep = React.lazy(() => import('@/components/listing/steps/PricingTermsStep'));
const HorseProfileStep = React.lazy(() => import('@/components/listing/steps/HorseProfileStep'));
const MediaUploadStep = React.lazy(() => import('@/components/listing/MediaUploadStep'));
const PreviewStep = React.lazy(() => import('@/components/listing/PreviewStep'));

interface UseNewStepComponentProps {
  currentStep: number;
  listingData: any;
  updateListingData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  saveDraft: () => void;
  setCurrentStep: (step: number) => void;
  currentDraftId?: string | null;
}

export const useNewStepComponent = ({
  currentStep,
  listingData,
  updateListingData,
  nextStep,
  prevStep,
  saveDraft,
  setCurrentStep,
  currentDraftId,
}: UseNewStepComponentProps) => {
  const stepComponents = useMemo(() => ({
    1: AboutYouGoalsStep,
    2: ListingStrategyStep,
    3: HorseIdentityStep,
    4: DocumentationVerificationStep,
    5: PricingTermsStep,
    6: HorseProfileStep,
    7: MediaUploadStep,
    8: PreviewStep,
  }), []);

  // Add validation to ensure currentStep is valid
  const validCurrentStep = currentStep >= 1 && currentStep <= NEW_LISTING_STEPS.length ? currentStep : 1;
  
  const CurrentStepComponent = stepComponents[validCurrentStep as keyof typeof stepComponents];

  const stepProps = useMemo(() => {
    const baseProps = {
      data: listingData,
      onUpdate: updateListingData,
      onNext: nextStep,
      onPrev: prevStep,
      isFirst: validCurrentStep === 1,
      isLast: validCurrentStep === NEW_LISTING_STEPS.length,
      onSaveDraft: saveDraft,
    };

    // Add specific props for certain steps
    if (validCurrentStep === 8) { // PreviewStep
      return {
        ...baseProps,
        onNavigateToStep: setCurrentStep,
        currentDraftId,
      };
    }

    return baseProps;
  }, [listingData, updateListingData, nextStep, prevStep, validCurrentStep, saveDraft, setCurrentStep, currentDraftId]);

  console.log('useNewStepComponent - Current step:', validCurrentStep, 'Component exists:', !!CurrentStepComponent);

  return {
    CurrentStepComponent,
    stepProps,
  };
};