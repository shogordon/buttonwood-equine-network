
import { Eye, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HorseProfile {
  id: string;
  horse_name: string;
  price: number | null;
  listing_status: string;
  is_available: boolean;
  images: string[] | null;
  created_at: string;
  breed: string | null;
  age: number;
}

interface ListingCardProps {
  horse: HorseProfile;
}

const ListingCard = ({ horse }: ListingCardProps) => {
  return (
    <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
      <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
        {horse.images && horse.images.length > 0 ? (
          <img 
            src={horse.images[0]} 
            alt={horse.horse_name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="text-white/60 text-center">
            <Eye className="h-12 w-12 mx-auto mb-2" />
            <p>No Image</p>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">
              {horse.horse_name}
            </h3>
            <p className="text-white/60">
              {horse.breed} • {horse.age} years old
            </p>
          </div>
          <Badge 
            variant={horse.listing_status === 'published' ? 'default' : 'secondary'}
            className={horse.listing_status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}
          >
            {horse.listing_status}
          </Badge>
        </div>
        
        {horse.price && (
          <p className="text-2xl font-bold text-white mb-4">
            ${horse.price.toLocaleString()}
          </p>
        )}
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ListingCard;
