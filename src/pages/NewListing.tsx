
import { useEffect } from "react";
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
    hasUnsavedChanges
  } = useListingForm(draftId);

  const { currentStep, nextStep, prevStep } = useListingNavigation({
    userRole: listingData.userRole || '',
    hasUnsavedChanges: hasUnsavedChanges(),
    autoSave,
  });

  const { CurrentStepComponent, stepProps } = useStepComponent({
    currentStep,
    listingData,
    updateListingData,
    nextStep,
    prevStep,
    saveDraft,
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
    hasUnsavedChanges: hasUnsavedChanges(),
    onSave: autoSave,
  });

  // Periodic auto-save every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasUnsavedChanges()) {
        autoSave();
      }
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, [hasUnsavedChanges, autoSave]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Load draft only once when component mounts with draftId
  useEffect(() => {
    if (draftId && loadDraft && user) {
      loadDraft();
    }
  }, [draftId, user]); // Removed loadDraft from dependencies to prevent multiple calls

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
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
            {CurrentStepComponent && (
              <CurrentStepComponent {...stepProps} />
            )}
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
