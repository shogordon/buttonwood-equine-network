
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Calendar, Ruler, Eye, MapPin, Lock, Heart } from 'lucide-react';

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

interface HorseCardProps {
  horse: Horse;
  canViewPrice: boolean;
  canViewContact: boolean;
}

const HorseCard = ({ horse, canViewPrice, canViewContact }: HorseCardProps) => {
  return (
    <Card className="glass-card hover:glass-medium transition-all duration-300 overflow-hidden">
      <div className="relative">
        {horse.images && horse.images.length > 0 ? (
          <img
            src={horse.images[0]}
            alt={horse.horse_name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
            <Heart className="h-12 w-12 text-white/40" />
          </div>
        )}
        {horse.featured && (
          <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white mb-2">
            {horse.horse_name}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {horse.disciplines?.map((discipline) => (
              <Badge key={discipline} variant="secondary" className="text-xs bg-white/20 text-white">
                {discipline}
              </Badge>
            ))}
          </div>
          
          <div className="space-y-2 text-sm text-white/70">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {horse.age} years old
            </div>
            {horse.height && (
              <div className="flex items-center">
                <Ruler className="h-4 w-4 mr-2" />
                {horse.height}" hands
              </div>
            )}
            {horse.breed && (
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                {horse.breed}
              </div>
            )}
            {horse.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {horse.location}
              </div>
            )}
          </div>
        </div>

        {horse.description && (
          <p className="text-sm text-white/70 mb-4 line-clamp-3">
            {horse.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          {canViewPrice && horse.price ? (
            <span className="text-lg font-semibold text-blue-400">
              ${horse.price.toLocaleString()}
            </span>
          ) : (
            <div className="flex items-center text-white/40">
              <Lock className="h-4 w-4 mr-1" />
              <span className="text-sm">Price hidden</span>
            </div>
          )}
          
          <Button
            size="sm"
            className="glass-button text-white"
            disabled={!canViewContact}
          >
            {canViewContact ? 'Contact Seller' : 'Verify to Contact'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HorseCard;
