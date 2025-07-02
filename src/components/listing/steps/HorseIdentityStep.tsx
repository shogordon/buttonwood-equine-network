import { ListingData } from "@/types/listing";
import { BestPracticeCard } from "./horse-identity/BestPracticeCard";
import { HorseNamesSection } from "./horse-identity/HorseNamesSection";
import { BreedAndTypeSection } from "./horse-identity/BreedAndTypeSection";
import { PhysicalStatsSection } from "./horse-identity/PhysicalStatsSection";
import { LocationSection } from "./horse-identity/LocationSection";

interface HorseIdentityStepProps {
  data: Partial<ListingData>;
  onUpdate: (data: Partial<ListingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSaveDraft: () => void;
}

const HorseIdentityStep = ({ data, onUpdate }: HorseIdentityStepProps) => {

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Horse Identity</h2>
        <p className="text-white/70">Essential details that identify your horse</p>
      </div>

      <BestPracticeCard />
      
      <HorseNamesSection data={data} onUpdate={onUpdate} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BreedAndTypeSection data={data} onUpdate={onUpdate} />
        <PhysicalStatsSection data={data} onUpdate={onUpdate} />
      </div>
      
      <LocationSection data={data} onUpdate={onUpdate} />
    </div>
  );
};

export default HorseIdentityStep;