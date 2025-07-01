import { ListingData } from "@/types/listing";

interface CompletionCheck {
  percentage: number;
  missingFields: string[];
  completedSections: string[];
  nextAction: string;
}

export const useListingCompletion = () => {
  const calculateCompletion = (listingData: Partial<ListingData>): CompletionCheck => {
    const requiredFields = [
      { key: 'horseName', name: 'Horse Name', section: 'Horse Identity' },
      { key: 'breed', name: 'Breed', section: 'Horse Identity' },
      { key: 'age', name: 'Age', section: 'Horse Identity' },
      { key: 'location', name: 'Location', section: 'Horse Identity' },
      { key: 'price', name: 'Price', section: 'Pricing & Terms' },
      { key: 'userRole', name: 'Your Role', section: 'About You' },
      { key: 'listingType', name: 'Listing Type', section: 'Listing Strategy' },
      { key: 'description', name: 'Description', section: 'Horse Profile' },
    ];

    const optionalButImportantFields = [
      { key: 'images', name: 'Photos', section: 'Media & Showcase' },
      { key: 'keyStrengths', name: 'Key Strengths', section: 'Horse Profile' },
      { key: 'bestFor', name: 'Best For', section: 'Horse Profile' },
      { key: 'height', name: 'Height', section: 'Horse Identity' },
      { key: 'color', name: 'Color', section: 'Horse Identity' },
    ];

    const allFields = [...requiredFields, ...optionalButImportantFields];
    
    const completedFields = allFields.filter(field => {
      const value = listingData[field.key as keyof ListingData];
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'string') return value.trim().length > 0;
      return value !== null && value !== undefined;
    });

    const missingRequired = requiredFields.filter(field => {
      const value = listingData[field.key as keyof ListingData];
      if (Array.isArray(value)) return value.length === 0;
      if (typeof value === 'string') return value.trim().length === 0;
      return value === null || value === undefined;
    });

    const percentage = Math.round((completedFields.length / allFields.length) * 100);
    
    const completedSections = Array.from(new Set(completedFields.map(f => f.section)));
    const missingFields = missingRequired.map(f => f.name);
    
    let nextAction = 'Continue editing';
    if (missingRequired.length === 0) {
      nextAction = 'Add photos and videos';
    } else if (missingRequired.length === 1) {
      nextAction = `Add ${missingRequired[0].name}`;
    } else {
      nextAction = `Complete ${missingRequired.length} required fields`;
    }

    return {
      percentage,
      missingFields,
      completedSections,
      nextAction,
    };
  };

  return { calculateCompletion };
};