
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ListingNavigationFooterProps {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const ListingNavigationFooter = ({ 
  currentStep, 
  totalSteps, 
  onPrevStep, 
  onNextStep 
}: ListingNavigationFooterProps) => {
  return (
    <div className="flex justify-between mt-8">
      <Button 
        onClick={onPrevStep}
        disabled={currentStep === 1}
        variant="outline"
        className="bg-white/5 border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      
      <Button 
        onClick={onNextStep}
        disabled={currentStep === totalSteps}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
      >
        Next
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
