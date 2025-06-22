
import { HorseCard } from "./HorseCard";

interface HorseGridProps {
  horses: any[];
  profile: any;
}

export const HorseGrid = ({ horses, profile }: HorseGridProps) => {
  if (horses.length === 0) {
    return (
      <section className="py-20 px-6 relative">
        <div className="container mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">No horses available yet</h3>
            <p className="text-white/60 mb-6">Be the first to list your horse on our platform!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 relative">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {horses.map((horse) => (
            <HorseCard 
              key={horse.id} 
              horse={horse} 
              profile={profile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorseGrid;
