
import { Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import HorseCard from './HorseCard';

interface Horse {
  id: string;
  horse_name: string;
  age: number;
  breed?: string;
  height?: number;
  location?: string;
  price?: number;
  description?: string;
  images?: string[];
  disciplines?: string[];
  featured: boolean;
}

interface HorseGridProps {
  horses: Horse[];
  canViewPrice: (horse: Horse) => boolean;
  canViewContact: (horse: Horse) => boolean;
}

const HorseGrid = ({ horses, canViewPrice, canViewContact }: HorseGridProps) => {
  if (horses.length === 0) {
    return (
      <Card className="text-center p-12 glass-card">
        <Heart className="h-16 w-16 text-white/40 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          No horses available yet
        </h3>
        <p className="text-white/70">
          Check back soon for new listings from our verified sellers.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {horses.map((horse) => (
        <HorseCard
          key={horse.id}
          horse={horse}
          canViewPrice={canViewPrice(horse)}
          canViewContact={canViewContact(horse)}
        />
      ))}
    </div>
  );
};

export default HorseGrid;
