import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Save, ArrowRight } from "lucide-react";
import { SaveStatus } from "./SaveStatus";

interface Step {
  id: number;
  title: string;
}

interface ListingProgressHeaderProps {
  currentStep: number;
  steps: Step[];
  onSaveDraft: () => void;
  saving: boolean;
  saveStatus?: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved?: Date | null;
  onStepClick?: (step: number) => void;
  highestCompletedStep?: number;
  horseName?: string;
}

export const ListingProgressHeader = ({ 
  currentStep, 
  steps, 
  onSaveDraft, 
  saving,
  saveStatus = 'idle',
  lastSaved,
  onStepClick,
  highestCompletedStep = currentStep,
  horseName
}: ListingProgressHeaderProps) => {
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-white">
          {horseName ? `Create Listing: ${horseName}` : 'Create New Listing'}
        </h1>
        <div className="flex items-center gap-3">
          <SaveStatus 
            status={saveStatus} 
            lastSaved={lastSaved || undefined}
          />
          <Button 
            onClick={onSaveDraft} 
            disabled={saving}
            variant="outline" 
            className="bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Draft'}
          </Button>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-white/60 mb-2">
          <span>Step {currentStep} of {steps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {steps.map((step, index) => {
          const isClickable = step.id <= highestCompletedStep && onStepClick;
          return (
            <div
              key={step.id}
              className={`flex items-center space-x-2 whitespace-nowrap ${
                step.id === currentStep 
                  ? 'text-blue-400 font-semibold' 
                  : step.id < currentStep 
                    ? 'text-purple-400' 
                    : 'text-white/40'
              } ${isClickable ? 'cursor-pointer hover:opacity-80' : ''}`}
              onClick={isClickable ? () => onStepClick(step.id) : undefined}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                  step.id === currentStep 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30' 
                    : step.id < currentStep 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30' 
                      : 'bg-white/10 border border-white/20'
                } ${isClickable ? 'hover:scale-105' : ''}`}
              >
                {step.id}
              </div>
              <span className="text-sm">{step.title}</span>
              {index < steps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-white/20" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
