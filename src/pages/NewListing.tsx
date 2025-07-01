
import { useEffect, useMemo, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useListingForm } from "@/hooks/useListingForm";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useNavigationProtection } from "@/hooks/useNavigationProtection";
import { useListingNavigation } from "@/hooks/useListingNavigation";
import { useStepComponent } from "@/hooks/useStepComponent";
import { LISTING_STEPS } from "@/config/listingSteps";

// Import UI components
import { ListingProgressHeader } from "@/components/listing/ListingProgressHeader";
import { ListingNavigationFooter } from "@/components/listing/ListingNavigationFooter";
import { NavigationBlockerDialog } from "@/components/listing/NavigationBlockerDialog";
import { ListingNavBar } from "@/components/listing/ListingNavBar";

// Loading component for step components
const StepLoadingFallback = () => (
  <div className="flex items-center justify-center py-12">
    <div className="text-white/60 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/60 mx-auto mb-4"></div>
      <p>Loading form step...</p>
    </div>
  </div>
);

const NewListing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { draftId } = useParams();
  
  const { 
    listingData, 
    updateListingData, 
    saveDraft, 
    autoSave,
    saving, 
    saveStatus,
    lastSaved,
    loadDraft,
    hasUnsavedChanges,
    currentDraftId,
    loading: formLoading
  } = useListingForm(draftId);

  // Memoize the unsaved changes value to prevent function calls during render
  const hasChanges = useMemo(() => {
    return hasUnsavedChanges();
  }, [hasUnsavedChanges]);

  const { currentStep, nextStep, prevStep, setCurrentStep } = useListingNavigation({
    userRole: listingData.userRole || 'owner',
    hasUnsavedChanges: hasChanges,
    autoSave,
  });

  const { CurrentStepComponent, stepProps } = useStepComponent({
    currentStep,
    listingData,
    updateListingData,
    nextStep,
    prevStep,
    saveDraft,
    setCurrentStep,
    currentDraftId,
  });

  // Auto-save functionality
  useAutoSave({
    data: listingData,
    saveFunction: autoSave,
    delay: 3000,
    enabled: true,
  });

  // Navigation protection (simplified for now)
  const { navigateWithSave } = useNavigationProtection({
    hasUnsavedChanges: hasChanges,
    onSave: autoSave,
  });

  // Periodic auto-save every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasChanges) {
        autoSave();
      }
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, [hasChanges, autoSave]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Load draft only once when component mounts with draftId
  useEffect(() => {
    if (draftId && loadDraft && user) {
      console.log('Loading draft with ID:', draftId);
      loadDraft();
    }
  }, [draftId, user]); // Removed loadDraft from dependencies to prevent multiple calls

  if (loading || formLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/60 mx-auto mb-4"></div>
          <p>Loading listing...</p>
        </div>
      </div>
    );
  }

  // Show error state if we have a draftId but no CurrentStepComponent
  if (draftId && !CurrentStepComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4">Unable to Load Listing</h2>
          <p className="text-white/60 mb-6">
            There was an issue loading this listing. Please try again or return to your listings.
          </p>
          <button
            onClick={() => navigate('/sell')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Return to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Navigation Blocker Dialog - temporarily disabled */}
      <NavigationBlockerDialog
        isOpen={false}
        onSaveAndContinue={async () => {
          await autoSave();
        }}
        onLeaveWithoutSaving={() => {}}
        onCancel={() => {}}
      />

      {/* Navigation */}
      <ListingNavBar onBackClick={() => navigateWithSave('/sell')} />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Progress Header */}
          <ListingProgressHeader 
            currentStep={currentStep}
            steps={LISTING_STEPS}
            onSaveDraft={() => saveDraft(true)}
            saving={saving}
            saveStatus={saveStatus}
            lastSaved={lastSaved}
          />

          {/* Step Content */}
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <Suspense fallback={<StepLoadingFallback />}>
              {CurrentStepComponent && (
                <CurrentStepComponent {...stepProps} />
              )}
            </Suspense>
          </Card>

          {/* Navigation Footer */}
          <ListingNavigationFooter 
            currentStep={currentStep}
            totalSteps={LISTING_STEPS.length}
            onPrevStep={prevStep}
            onNextStep={nextStep}
            saving={saving}
          />
        </div>
      </div>
    </div>
  );
};

export default NewListing;
