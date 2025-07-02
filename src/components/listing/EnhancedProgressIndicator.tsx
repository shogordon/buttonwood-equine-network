import { useMemo } from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Circle } from 'lucide-react';
import { useAdvancedValidation } from '@/hooks/useAdvancedValidation';
import { ListingData } from '@/types/listing';
import { NEW_LISTING_STEPS } from '@/config/newListingSteps';
import { cn } from '@/lib/utils';

interface EnhancedProgressIndicatorProps {
  currentStep: number;
  listingData: Partial<ListingData>;
  onStepClick?: (step: number) => void;
  highestCompletedStep?: number;
}

export const EnhancedProgressIndicator = ({ 
  currentStep, 
  listingData, 
  onStepClick,
  highestCompletedStep = currentStep 
}: EnhancedProgressIndicatorProps) => {
  const { validateStep, getFormCompletionPercentage } = useAdvancedValidation();

  const stepValidations = useMemo(() => {
    return NEW_LISTING_STEPS.map(step => ({
      ...step,
      validation: validateStep(step.id, listingData)
    }));
  }, [listingData, validateStep]);

  const overallCompletion = useMemo(() => {
    return getFormCompletionPercentage(listingData);
  }, [listingData, getFormCompletionPercentage]);

  const getStepIcon = (step: any) => {
    const { validation } = step;
    
    if (validation.isValid && validation.completionPercentage === 100) {
      return <CheckCircle className="h-5 w-5 text-green-400" />;
    }
    
    if (validation.errors.length > 0) {
      return <AlertCircle className="h-5 w-5 text-red-400" />;
    }
    
    return <Circle className="h-5 w-5 text-white/40" />;
  };

  const getStepStatus = (step: any) => {
    const { validation } = step;
    
    if (validation.isValid && validation.completionPercentage === 100) {
      return 'complete';
    }
    
    if (validation.errors.length > 0) {
      return 'error';
    }
    
    if (validation.completionPercentage > 0) {
      return 'partial';
    }
    
    return 'empty';
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div>
        <div className="flex items-center justify-between text-sm text-white/80 mb-2">
          <span>Overall Completion</span>
          <span>{Math.round(overallCompletion)}%</span>
        </div>
        <Progress 
          value={overallCompletion} 
          className="h-3"
        />
      </div>

      {/* Step Progress */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white/90">Step Progress</h3>
        <div className="space-y-2">
          {stepValidations.map((step, index) => {
            const status = getStepStatus(step);
            const isClickable = step.id <= highestCompletedStep && onStepClick;
            const isCurrent = step.id === currentStep;
            
            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all",
                  "bg-white/5 border border-white/10",
                  isCurrent && "border-blue-400/50 bg-blue-500/10",
                  isClickable && "cursor-pointer hover:bg-white/10 hover:border-white/20",
                  status === 'error' && "border-red-500/30 bg-red-500/5"
                )}
                onClick={isClickable ? () => onStepClick(step.id) : undefined}
              >
                {getStepIcon(step)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={cn(
                      "text-sm font-medium truncate",
                      isCurrent && "text-blue-400",
                      status === 'complete' && "text-green-400",
                      status === 'error' && "text-red-400"
                    )}>
                      {step.title}
                    </h4>
                    <span className={cn(
                      "text-xs",
                      isCurrent && "text-blue-400",
                      status === 'complete' && "text-green-400",
                      status === 'error' && "text-red-400",
                      status === 'partial' && "text-yellow-400",
                      status === 'empty' && "text-white/40"
                    )}>
                      {Math.round(step.validation.completionPercentage)}%
                    </span>
                  </div>
                  
                  {step.validation.completionPercentage > 0 && step.validation.completionPercentage < 100 && (
                    <Progress 
                      value={step.validation.completionPercentage} 
                      className="h-1.5 mt-2"
                    />
                  )}
                  
                  {step.validation.errors.length > 0 && (
                    <div className="text-xs text-red-400 mt-1">
                      {step.validation.errors.length} issue{step.validation.errors.length !== 1 ? 's' : ''} remaining
                    </div>
                  )}
                  
                  {step.validation.warnings.length > 0 && (
                    <div className="text-xs text-yellow-400 mt-1">
                      {step.validation.warnings.length} optional item{step.validation.warnings.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};