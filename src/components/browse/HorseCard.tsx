
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Ruler, Eye, EyeOff } from "lucide-react";
import { useHorsePermissions } from "@/hooks/useHorsePermissions";

interface Horse {
  id: string;
  horse_name: string;
  breed?: string;
  sex?: string;
  age?: number;
  location?: string;
  price?: number;
  images?: string[];
  disciplines?: string[];
  show_price_to?: string;
  show_contact_to?: string;
  profiles?: {
    display_name?: string;
    verification_status?: string;
  };
}

interface HorseCardProps {
  horse: Horse;
  profile: any;
}

export const HorseCard = ({ horse, profile }: HorseCardProps) => {
  const { canViewPrice, canViewContact } = useHorsePermissions(profile);

  return (
    <Card className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105">
      {/* Image */}
      <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
        {horse.images && horse.images.length > 0 ? (
          <img 
            src={horse.images[0]} 
            alt={horse.horse_name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Eye className="h-12 w-12 text-white/30" />
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {horse.horse_name}
          </h3>
          <div className="flex items-center gap-4 text-sm text-white/60">
            {horse.breed && (
              <span>{horse.breed}</span>
            )}
            {horse.sex && (
              <span>{horse.sex}</span>
            )}
            {horse.age && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{horse.age} years</span>
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        {horse.location && (
          <div className="flex items-center gap-2 text-white/60">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{horse.location}</span>
          </div>
        )}

        {/* Disciplines */}
        {horse.disciplines && horse.disciplines.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {horse.disciplines.slice(0, 3).map((discipline) => (
              <Badge key={discipline} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {discipline}
              </Badge>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          {canViewPrice(horse) ? (
            <div className="text-2xl font-bold text-white">
              {horse.price ? `$${horse.price.toLocaleString()}` : 'Price on request'}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-white/60">
              <EyeOff className="h-4 w-4" />
              <span>Price restricted</span>
            </div>
          )}
        </div>

        {/* Contact Button */}
        <Button 
          className={`w-full ${
            canViewContact(horse) 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
              : 'bg-gray-600 cursor-not-allowed'
          } text-white font-semibold py-3 rounded-xl transition-all duration-300`}
          disabled={!canViewContact(horse)}
        >
          {canViewContact(horse) ? 'Contact Seller' : 'Upgrade to Contact'}
        </Button>
      </div>
    </Card>
  );
};

export default HorseCard;
