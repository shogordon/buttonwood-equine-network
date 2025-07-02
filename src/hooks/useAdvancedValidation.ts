import { useMemo } from 'react';
import { ListingData } from '@/types/listing';
import { NEW_LISTING_STEPS } from '@/config/newListingSteps';

export interface ValidationRule {
  field: string;
  stepId: number;
  displayName: string;
  isRequired: boolean;
  validator: (data: Partial<ListingData>) => boolean;
  errorMessage: string;
  helpText?: string;
}

export interface ValidationResult {
  field: string;
  stepId: number;
  stepTitle: string;
  displayName: string;
  errorMessage: string;
  helpText?: string;
  isRequired: boolean;
}

export interface StepValidation {
  stepId: number;
  stepTitle: string;
  isValid: boolean;
  completionPercentage: number;
  errors: ValidationResult[];
  warnings: ValidationResult[];
}

export const useAdvancedValidation = () => {
  // Comprehensive validation rules
  const validationRules: ValidationRule[] = useMemo(() => [
    // Step 1: User Role
    {
      field: 'userRole',
      stepId: 1,
      displayName: 'User Role',
      isRequired: true,
      validator: (data) => !!data.userRole,
      errorMessage: 'Please select if you are the owner or an agent',
      helpText: 'This helps us show the right forms for your situation'
    },

    // Step 2: Listing Strategy
    {
      field: 'listingTypes',
      stepId: 2,
      displayName: 'Listing Purpose',
      isRequired: true,
      validator: (data) => {
        const types = data.listingTypes;
        return !!(types && (types.sale || types.lease || types.partialLease || types.showLease || types.breeding));
      },
      errorMessage: 'Please select at least one listing purpose (sale, lease, etc.)',
      helpText: 'You can select multiple options'
    },

    // Step 3: Pricing & Terms  
    {
      field: 'price',
      stepId: 3,
      displayName: 'Price',
      isRequired: true,
      validator: (data) => {
        if (data.priceInquire) return true; // If "Price on Inquiry" is selected
        return !!(data.price && data.price > 0);
      },
      errorMessage: 'Please enter a price or select "Price on Inquiry"',
      helpText: 'Enter the asking price or check "Price on Inquiry" for privacy'
    },

    // Step 4: Horse Identity
    {
      field: 'horseName',
      stepId: 4,
      displayName: 'Horse Name',
      isRequired: true,
      validator: (data) => !!(data.horseName?.trim() || data.barnName?.trim()),
      errorMessage: 'Please provide either a registered name or barn name',
      helpText: 'The name buyers will see in your listing'
    },
    {
      field: 'sex',
      stepId: 4,
      displayName: 'Sex',
      isRequired: true,
      validator: (data) => !!data.sex,
      errorMessage: 'Please select the horse\'s sex',
      helpText: 'Mare, Stallion, Gelding, etc.'
    },
    {
      field: 'age',
      stepId: 4,
      displayName: 'Age',
      isRequired: true,
      validator: (data) => !!(data.age && data.age > 0 && data.age < 50),
      errorMessage: 'Please enter a valid age (1-49 years)',
      helpText: 'Current age of the horse'
    },
    {
      field: 'breed',
      stepId: 4,
      displayName: 'Breed',
      isRequired: true,
      validator: (data) => !!data.breed?.trim(),
      errorMessage: 'Please enter the horse\'s breed',
      helpText: 'e.g., Thoroughbred, Quarter Horse, Warmblood'
    },
    {
      field: 'location',
      stepId: 4,
      displayName: 'Location',
      isRequired: true,
      validator: (data) => !!(data.location?.trim() || data.currentLocation?.trim()),
      errorMessage: 'Please provide the horse\'s location',
      helpText: 'City, State or general area where the horse is located'
    },

    // Step 5: Horse Profile & AI
    {
      field: 'description',
      stepId: 5,
      displayName: 'Description',
      isRequired: true,
      validator: (data) => !!(data.description?.trim() && data.description.length >= 50),
      errorMessage: 'Please provide a description (at least 50 characters)',
      helpText: 'Describe the horse\'s temperament, training, and suitability'
    },
    {
      field: 'disciplines',
      stepId: 5,
      displayName: 'Disciplines',
      isRequired: true,
      validator: (data) => !!(data.disciplines && data.disciplines.length > 0),
      errorMessage: 'Please select at least one discipline',
      helpText: 'What disciplines is this horse trained for?'
    },
    {
      field: 'experienceLevel',
      stepId: 5,
      displayName: 'Rider Experience Level',
      isRequired: true,
      validator: (data) => !!data.experienceLevel,
      errorMessage: 'Please select the appropriate rider experience level',
      helpText: 'What level of rider would be best suited for this horse?'
    },

    // Step 6: Media Upload
    {
      field: 'images',
      stepId: 6,
      displayName: 'Photos',
      isRequired: true,
      validator: (data) => !!(data.images && data.images.length >= 3),
      errorMessage: 'Please upload at least 3 photos',
      helpText: 'Quality photos help attract serious buyers'
    },

    // Step 7: Documentation & Verification
    {
      field: 'medicalRecords',
      stepId: 7,
      displayName: 'Medical Information',
      isRequired: false,
      validator: (data) => {
        if (!data.medicalRecords) return true; // Optional
        return !!(data.medicalRecords.medicalHistory?.trim());
      },
      errorMessage: 'Please provide medical history details',
      helpText: 'Information about health, maintenance, and veterinary records'
    }
  ], []);

  // Validate specific field
  const validateField = (field: string, data: Partial<ListingData>): ValidationResult | null => {
    const rule = validationRules.find(r => r.field === field);
    if (!rule) return null;

    const isValid = rule.validator(data);
    if (isValid) return null;

    const step = NEW_LISTING_STEPS.find(s => s.id === rule.stepId);
    
    return {
      field: rule.field,
      stepId: rule.stepId,
      stepTitle: step?.title || `Step ${rule.stepId}`,
      displayName: rule.displayName,
      errorMessage: rule.errorMessage,
      helpText: rule.helpText,
      isRequired: rule.isRequired
    };
  };

  // Validate entire form
  const validateForm = (data: Partial<ListingData>): ValidationResult[] => {
    const errors: ValidationResult[] = [];
    
    validationRules.forEach(rule => {
      const error = validateField(rule.field, data);
      if (error) {
        errors.push(error);
      }
    });

    return errors;
  };

  // Validate by step
  const validateStep = (stepId: number, data: Partial<ListingData>): StepValidation => {
    const stepRules = validationRules.filter(rule => rule.stepId === stepId);
    const step = NEW_LISTING_STEPS.find(s => s.id === stepId);
    
    const errors: ValidationResult[] = [];
    const warnings: ValidationResult[] = [];
    let validFields = 0;

    stepRules.forEach(rule => {
      const error = validateField(rule.field, data);
      if (error) {
        if (rule.isRequired) {
          errors.push(error);
        } else {
          warnings.push(error);
        }
      } else {
        validFields++;
      }
    });

    const totalFields = stepRules.length;
    const completionPercentage = totalFields > 0 ? (validFields / totalFields) * 100 : 100;
    const isValid = errors.length === 0;

    return {
      stepId,
      stepTitle: step?.title || `Step ${stepId}`,
      isValid,
      completionPercentage,
      errors,
      warnings
    };
  };

  // Get overall form completion percentage
  const getFormCompletionPercentage = (data: Partial<ListingData>): number => {
    const stepValidations = NEW_LISTING_STEPS.map(step => validateStep(step.id, data));
    const totalCompletion = stepValidations.reduce((sum, validation) => sum + validation.completionPercentage, 0);
    return stepValidations.length > 0 ? totalCompletion / stepValidations.length : 0;
  };

  // Get form readiness for publishing
  const getPublishingReadiness = (data: Partial<ListingData>) => {
    const requiredErrors = validateForm(data).filter(error => error.isRequired);
    const canPublish = requiredErrors.length === 0;
    
    return {
      canPublish,
      requiredErrors,
      missingRequiredFields: requiredErrors.length,
      completionPercentage: getFormCompletionPercentage(data)
    };
  };

  return {
    validateField,
    validateForm,
    validateStep,
    getFormCompletionPercentage,
    getPublishingReadiness,
    validationRules
  };
};