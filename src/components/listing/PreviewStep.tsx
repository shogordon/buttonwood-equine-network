
import { useState } from "react";
import { PreviewControls } from "./preview/PreviewControls";
import { HorsePreviewCard } from "./preview/HorsePreviewCard";
import { PublishActions } from "./preview/PublishActions";
import { usePreviewValidation } from "./preview/usePreviewValidation";
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
}

const PreviewStep = ({ data, onSaveDraft }: StepProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const { validateListing } = usePreviewValidation();
  const { publishListing, publishing } = usePreviewPublish();

  const missingFields = validateListing(data);

  const handlePublish = () => {
    publishListing(data, missingFields);
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

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Preview & Publish</h2>
        <p className="text-white/60">Review your listing before making it live</p>
      </div>

      <PreviewControls 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        missingFields={missingFields}
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
        missingFields={missingFields}
      />
    </div>
  );
};

export default PreviewStep;
