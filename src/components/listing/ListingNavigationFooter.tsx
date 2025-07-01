
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface ListingNavigationFooterProps {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  saving?: boolean;
}

export const ListingNavigationFooter = ({ 
  currentStep, 
  totalSteps, 
  onPrevStep, 
  onNextStep,
  saving = false
}: ListingNavigationFooterProps) => {
  return (
    <div className="flex justify-between mt-8">
      <Button 
        onClick={onPrevStep}
        disabled={currentStep === 1 || saving}
        variant="outline"
        className="bg-white/5 border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      
      <Button 
        onClick={onNextStep}
        disabled={currentStep === totalSteps || saving}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white disabled:opacity-50"
      >
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
};
