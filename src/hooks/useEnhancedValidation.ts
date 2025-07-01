
import { LISTING_STEPS } from "@/config/listingSteps";

export interface ValidationResult {
  field: string;
  stepId: number;
  stepTitle: string;
  displayName: string;
}

export const useEnhancedValidation = () => {
  const validateListingWithSteps = (data: any): ValidationResult[] => {
    const validationRules = [
      { 
        field: 'horseName', 
        stepId: 4, 
        displayName: 'Horse Name',
        check: (data: any) => !data.horseName?.trim() && !data.barnName?.trim()
      },
      { 
        field: 'sex', 
        stepId: 4, 
        displayName: 'Sex',
        check: (data: any) => !data.sex
      },
      { 
        field: 'location', 
        stepId: 4, 
        displayName: 'Location',
        check: (data: any) => !data.location?.trim() && !data.currentLocation?.trim()
      }
    ];

    const missingFields: ValidationResult[] = [];

    validationRules.forEach(rule => {
      if (rule.check(data)) {
        const step = LISTING_STEPS.find(s => s.id === rule.stepId);
        missingFields.push({
          field: rule.field,
          stepId: rule.stepId,
          stepTitle: step?.title || `Step ${rule.stepId}`,
          displayName: rule.displayName
        });
      }
    });

    return missingFields;
  };

  return { validateListingWithSteps };
};
