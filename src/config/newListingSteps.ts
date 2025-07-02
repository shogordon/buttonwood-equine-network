export interface NewListingStep {
  id: number;
  title: string;
  description: string;
  sections: string[];
  originalSteps: number[];
}

export const NEW_LISTING_STEPS: NewListingStep[] = [
  {
    id: 1,
    title: "About You & Goals",
    description: "Tell us about your role and objectives for this listing",
    sections: ["Who's listing", "Contact info", "Authorization"],
    originalSteps: [1] // Maps to current step 1
  },
  {
    id: 2,
    title: "Horse Identity", 
    description: "Essential details that identify your horse",
    sections: ["Names", "Breed", "Basic stats", "Location"],
    originalSteps: [4] // Current horse details
  },
  {
    id: 3, 
    title: "Listing Strategy",
    description: "Define how you want to market and sell your horse",
    sections: ["Listing type", "Trial options", "Special terms"],
    originalSteps: [1, 5] // Combine listing type + sale info
  },
  {
    id: 4,
    title: "Documentation & Verification",
    description: "Papers, registrations, and official records",
    sections: ["Papers", "Registrations", "Microchip", "Competition records"],
    originalSteps: [4, 11] // Combine horse details + verification
  },
  {
    id: 5,
    title: "Pricing & Terms",
    description: "Set your price and define the sale terms",
    sections: ["Price", "Payment options", "Trial arrangements"],
    originalSteps: [5] // Current sale info
  },
  {
    id: 6,
    title: "Horse Profile (AI-Assisted)",
    description: "Create a compelling profile through guided conversation",
    sections: ["Conversational interview", "Pros/cons", "Suitability tags"],
    originalSteps: [6, 7, 10] // Combine pros/cons + tags + description
  },
  {
    id: 7,
    title: "Media & Showcase",
    description: "Upload photos, videos and create a visual story",
    sections: ["Photos", "Videos", "Social links", "Show highlights"],
    originalSteps: [9] // Current media upload
  },
  {
    id: 8,
    title: "Review & Launch",
    description: "Preview your listing and choose how to publish",
    sections: ["Preview", "Publish options", "Scheduling"],
    originalSteps: [12] // Current preview & publish
  }
];

// Legacy step mapping for backward compatibility
export const LISTING_STEPS = [
  { id: 1, title: "Who's Filling This Out?" },
  { id: 2, title: "Owner Info" },
  { id: 3, title: "Agent Info" },
  { id: 4, title: "Horse Details" },
  { id: 5, title: "Sale Info" },
  { id: 6, title: "Pros & Cons" },
  { id: 7, title: "Tags & Filters" },
  { id: 8, title: "Program & Maintenance" },
  { id: 9, title: "Media Upload" },
  { id: 10, title: "Description" },
  { id: 11, title: "Verification" },
  { id: 12, title: "Preview & Publish" },
];