
import WhoFillingOutStep from "@/components/listing/WhoFillingOutStep";
import OwnerInfoStep from "@/components/listing/OwnerInfoStep";
import AgentInfoStep from "@/components/listing/AgentInfoStep";
import EnhancedHorseDetailsStep from "@/components/listing/EnhancedHorseDetailsStep";
import SaleInfoStep from "@/components/listing/SaleInfoStep";
import ProsConsStep from "@/components/listing/ProsConsStep";
import TagsFiltersStep from "@/components/listing/TagsFiltersStep";
import ProgramMaintenanceStep from "@/components/listing/ProgramMaintenanceStep";
import MediaUploadStep from "@/components/listing/MediaUploadStep";
import DescriptionStep from "@/components/listing/DescriptionStep";
import VerificationStep from "@/components/listing/VerificationStep";
import PreviewStep from "@/components/listing/PreviewStep";

export interface ListingStep {
  id: number;
  title: string;
  component: React.ComponentType<any>;
}

export const LISTING_STEPS: ListingStep[] = [
  { id: 1, title: "Who's Filling This Out?", component: WhoFillingOutStep },
  { id: 2, title: "Owner Info", component: OwnerInfoStep },
  { id: 3, title: "Agent Info", component: AgentInfoStep },
  { id: 4, title: "Horse Details", component: EnhancedHorseDetailsStep },
  { id: 5, title: "Sale Info", component: SaleInfoStep },
  { id: 6, title: "Pros & Cons", component: ProsConsStep },
  { id: 7, title: "Tags & Filters", component: TagsFiltersStep },
  { id: 8, title: "Program & Maintenance", component: ProgramMaintenanceStep },
  { id: 9, title: "Media Upload", component: MediaUploadStep },
  { id: 10, title: "Description", component: DescriptionStep },
  { id: 11, title: "Verification", component: VerificationStep },
  { id: 12, title: "Preview & Publish", component: PreviewStep },
];
