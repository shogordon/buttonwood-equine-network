
import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ValidationResult } from "@/hooks/useEnhancedValidation";

interface RequiredFieldsChecklistProps {
  missingFields: ValidationResult[];
  onNavigateToStep: (stepId: number) => void;
}

export const RequiredFieldsChecklist = ({ missingFields, onNavigateToStep }: RequiredFieldsChecklistProps) => {
  if (missingFields.length === 0) {
    return (
      <Card className="bg-green-500/10 border-green-500/20 p-4">
        <div className="flex items-center gap-2 text-green-400">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold">All required fields completed!</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-orange-500/10 border-orange-500/20 p-4">
      <div className="flex items-center gap-2 text-orange-400 mb-3">
        <AlertCircle className="h-5 w-5" />
        <span className="font-semibold">Complete these required fields:</span>
      </div>
      
      <div className="space-y-2">
        {missingFields.map((field) => (
          <div key={field.field} className="flex items-center justify-between">
            <span className="text-white/80 text-sm">
              {field.displayName} (in {field.stepTitle})
            </span>
            <Button
              onClick={() => onNavigateToStep(field.stepId)}
              size="sm"
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 text-xs"
            >
              Go to Step
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
