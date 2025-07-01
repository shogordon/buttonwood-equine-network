
import { useState } from "react";
import { PreviewControls } from "./preview/PreviewControls";
import { HorsePreviewCard } from "./preview/HorsePreviewCard";
import { PublishActions } from "./preview/PublishActions";
import { RequiredFieldsChecklist } from "./RequiredFieldsChecklist";
import { useEnhancedValidation } from "@/hooks/useEnhancedValidation";
import { usePreviewPublish } from "./preview/usePreviewPublish";
import { toast } from "@/components/ui/sonner";

interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSaveDraft: () => void;
  onNavigateToStep?: (stepId: number) => void;
  currentDraftId?: string | null;
}

const PreviewStep = ({ data, onSaveDraft, onNavigateToStep, currentDraftId }: StepProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const { validateListingWithSteps } = useEnhancedValidation();
  const { publishListing, publishing } = usePreviewPublish();

  const missingFields = validateListingWithSteps(data);
  const missingFieldNames = missingFields.map(f => f.displayName);

  const handlePublish = () => {
    publishListing(data, missingFieldNames, currentDraftId);
  };

  const handleSaveDraft = async () => {
    try {
      await onSaveDraft();
      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error("Failed to save draft. Please try again.");
    }
  };

  const handleNavigateToStep = (stepId: number) => {
    if (onNavigateToStep) {
      onNavigateToStep(stepId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Preview & Publish</h2>
        <p className="text-white/60">Review your listing before making it live</p>
      </div>

      {/* Required Fields Checklist */}
      <RequiredFieldsChecklist 
        missingFields={missingFields}
        onNavigateToStep={handleNavigateToStep}
      />

      <PreviewControls 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        missingFields={missingFieldNames}
      />

      {/* Preview Container */}
      <div className={`mx-auto transition-all duration-300 ${
        viewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'
      }`}>
        <HorsePreviewCard data={data} />
      </div>

      <PublishActions 
        onPublish={handlePublish}
        onSaveDraft={handleSaveDraft}
        publishing={publishing}
        missingFields={missingFieldNames}
      />
    </div>
  );
};

export default PreviewStep;
