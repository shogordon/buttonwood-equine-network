
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin, Calendar, Eye, EyeOff, Phone, Mail, Shield, Award, Heart, AlertTriangle } from "lucide-react";
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
  description?: string;
  pros?: string[];
  cons?: string[];
  show_price_to?: string;
  show_contact_to?: string;
  temperament?: string[];
  experience_level?: string;
  health_records?: string;
  training_level?: string;
  trial_available?: boolean;
  xrays_available?: boolean;
  height?: number;
  color?: string;
  pedigree?: string;
  show_record?: string;
}

interface HorseProfileCardProps {
  horse: Horse;
  profile: any;
}

export const HorseProfileCard = ({ horse, profile }: HorseProfileCardProps) => {
  const { canViewPrice, canViewContact } = useHorsePermissions(profile);

  const handleContactClick = () => {
    // In a real app, this would open a contact form or show contact details
    console.log('Contact seller clicked for horse:', horse.id);
  };

  return (
    <div className="container mx-auto px-6 space-y-8">
      {/* Hero Section with Image Gallery */}
      <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="aspect-square lg:aspect-auto">
            {horse.images && horse.images.length > 0 ? (
              <Carousel className="w-full h-full">
                <CarouselContent>
                  {horse.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square lg:h-96 overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${horse.horse_name} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {horse.images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </>
                )}
              </Carousel>
            ) : (
              <div className="aspect-square lg:h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-white/60 text-center">
                  <Eye className="h-16 w-16 mx-auto mb-4" />
                  <p>No Images Available</p>
                </div>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="p-8 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">{horse.horse_name}</h1>
              <div className="grid grid-cols-2 gap-4 text-white/80">
                {horse.breed && <div><span className="text-white/60">Breed:</span> {horse.breed}</div>}
                {horse.sex && <div><span className="text-white/60">Sex:</span> {horse.sex}</div>}
                {horse.age && <div><span className="text-white/60">Age:</span> {horse.age} years</div>}
                {horse.height && <div><span className="text-white/60">Height:</span> {horse.height} hands</div>}
                {horse.color && <div><span className="text-white/60">Color:</span> {horse.color}</div>}
                {horse.experience_level && <div><span className="text-white/60">Level:</span> {horse.experience_level}</div>}
              </div>
            </div>

            {horse.location && (
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>{horse.location}</span>
              </div>
            )}

            {/* Price */}
            <div className="border-t border-white/10 pt-6">
              {canViewPrice(horse) ? (
                <div className="text-3xl font-bold text-white">
                  {horse.price ? `$${horse.price.toLocaleString()}` : 'Price on request'}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-white/60 text-lg">
                  <EyeOff className="h-5 w-5" />
                  <span>Price restricted - Upgrade to view</span>
                </div>
              )}
            </div>

            {/* Contact Button */}
            <Button 
              onClick={handleContactClick}
              className={`w-full ${
                canViewContact(horse) 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                  : 'bg-gray-600 cursor-not-allowed'
              } text-white font-semibold py-4 rounded-xl transition-all duration-300`}
              disabled={!canViewContact(horse)}
            >
              {canViewContact(horse) ? (
                <>
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Seller
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Upgrade to Contact
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Disciplines and Tags */}
      {(horse.disciplines?.length > 0 || horse.temperament?.length > 0) && (
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Disciplines & Temperament</h3>
          <div className="flex flex-wrap gap-2">
            {horse.disciplines?.map((discipline) => (
              <Badge key={discipline} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Award className="h-3 w-3 mr-1" />
                {discipline}
              </Badge>
            ))}
            {horse.temperament?.map((trait) => (
              <Badge key={trait} className="bg-green-500/20 text-green-400 border-green-500/30">
                <Heart className="h-3 w-3 mr-1" />
                {trait}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Description */}
      {horse.description && (
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Description</h3>
          <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
            {horse.description}
          </p>
        </Card>
      )}

      {/* Pros & Cons */}
      {(horse.pros?.length > 0 || horse.cons?.length > 0) && (
        <div className="grid md:grid-cols-2 gap-6">
          {horse.pros?.length > 0 && (
            <Card className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
              <h4 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Strengths
              </h4>
              <ul className="text-white/80 space-y-2">
                {horse.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
          
          {horse.cons?.length > 0 && (
            <Card className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
              <h4 className="text-orange-400 font-bold text-lg mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Considerations
              </h4>
              <ul className="text-white/80 space-y-2">
                {horse.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}

      {/* Additional Information */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Health & Records */}
        {(horse.health_records || horse.xrays_available || horse.trial_available) && (
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Health & Availability</h3>
            <div className="space-y-3 text-white/80">
              {horse.health_records && (
                <div>
                  <span className="text-white/60">Health Records:</span>
                  <p className="mt-1">{horse.health_records}</p>
                </div>
              )}
              {horse.xrays_available && (
                <div className="flex items-center gap-2 text-green-400">
                  <Shield className="h-4 w-4" />
                  <span>X-rays available</span>
                </div>
              )}
              {horse.trial_available && (
                <div className="flex items-center gap-2 text-blue-400">
                  <Calendar className="h-4 w-4" />
                  <span>Trial available</span>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Performance & Training */}
        {(horse.training_level || horse.show_record || horse.pedigree) && (
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Performance & Background</h3>
            <div className="space-y-3 text-white/80">
              {horse.training_level && (
                <div>
                  <span className="text-white/60">Training Level:</span>
                  <p className="mt-1">{horse.training_level}</p>
                </div>
              )}
              {horse.show_record && (
                <div>
                  <span className="text-white/60">Show Record:</span>
                  <p className="mt-1">{horse.show_record}</p>
                </div>
              )}
              {horse.pedigree && (
                <div>
                  <span className="text-white/60">Pedigree:</span>
                  <p className="mt-1">{horse.pedigree}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
