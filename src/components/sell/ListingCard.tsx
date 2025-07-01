
import { Eye, Edit, Trash2, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  isDraft?: boolean;
}

const ListingCard = ({ horse, isDraft = false }: ListingCardProps) => {
  const handleDeleteDraft = async () => {
    if (!isDraft) return;
    
    try {
      const { error } = await supabase
        .from('horse_profiles')
        .delete()
        .eq('id', horse.id);

      if (error) throw error;
      
      toast.success('Draft deleted successfully');
      // Refresh the page to update the listings
      window.location.reload();
    } catch (error) {
      console.error('Error deleting draft:', error);
      toast.error('Failed to delete draft');
    }
  };

  const ImageContent = () => (
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
  );

  return (
    <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
      {/* Make the image clickable based on listing type */}
      {isDraft ? (
        <Link to={`/sell/edit/${horse.id}`} className="cursor-pointer">
          <ImageContent />
        </Link>
      ) : (
        <Link to={`/horse/${horse.id}`} className="cursor-pointer">
          <ImageContent />
        </Link>
      )}
      
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
          {isDraft ? (
            <>
              <Link to={`/sell/edit/${horse.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30">
                  <PlayCircle className="h-4 w-4 mr-1" />
                  Continue Editing
                </Button>
              </Link>
              <Button 
                onClick={handleDeleteDraft}
                variant="outline" 
                size="sm" 
                className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to={`/sell/edit/${horse.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </Link>
              <Link to={`/horse/${horse.id}`}>
                <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30">
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ListingCard;
