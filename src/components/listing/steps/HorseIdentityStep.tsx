import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Ruler, Lightbulb } from "lucide-react";
import { ListingData } from "@/types/listing";
import { useState, useEffect } from "react";

interface HorseIdentityStepProps {
  data: Partial<ListingData>;
  onUpdate: (data: Partial<ListingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSaveDraft: () => void;
}

const commonBreeds = [
  'Thoroughbred', 'Quarter Horse', 'Warmblood', 'Arabian', 'Paint Horse',
  'Andalusian', 'Friesian', 'Clydesdale', 'Standardbred', 'Appaloosa',
  'Morgan', 'Tennessee Walking Horse', 'Mustang', 'Shire', 'Percheron'
];

const HorseIdentityStep = ({ data, onUpdate, onNext, onPrev }: HorseIdentityStepProps) => {
  const [zipCode, setZipCode] = useState(data.zipCode || '');
  const [customBreed, setCustomBreed] = useState('');
  const [showCustomBreed, setShowCustomBreed] = useState(false);

  // Auto-populate city/state from ZIP code (simplified version)
  useEffect(() => {
    if (zipCode && zipCode.length === 5) {
      // This is a simplified version - in real implementation, you'd use a ZIP code API
      const zipToCity: { [key: string]: string } = {
        '90210': 'Beverly Hills, CA',
        '10001': 'New York, NY',
        '33101': 'Miami, FL',
        '78701': 'Austin, TX',
      };
      
      if (zipToCity[zipCode]) {
        onUpdate({ 
          zipCode, 
          location: zipToCity[zipCode],
          currentLocation: zipToCity[zipCode]
        });
      } else {
        onUpdate({ zipCode });
      }
    }
  }, [zipCode, onUpdate]);

  const handleBreedChange = (value: string) => {
    if (value === 'custom') {
      setShowCustomBreed(true);
    } else {
      setShowCustomBreed(false);
      onUpdate({ breed: value });
    }
  };

  const handleCustomBreedSubmit = () => {
    if (customBreed.trim()) {
      onUpdate({ breed: customBreed.trim() });
      setShowCustomBreed(false);
      setCustomBreed('');
    }
  };

  const calculateAge = (yearOfBirth: number) => {
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth;
  };

  const handleYearChange = (year: string) => {
    const yearNum = parseInt(year);
    if (yearNum && yearNum > 1990 && yearNum <= new Date().getFullYear()) {
      const age = calculateAge(yearNum);
      onUpdate({ 
        yearOfBirth: yearNum, 
        age: age 
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Horse Identity</h2>
        <p className="text-white/70">Essential details that identify your horse</p>
      </div>

      {/* Best Practice Tip */}
      <Card className="bg-blue-500/10 border-blue-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-blue-400 font-semibold mb-1">Best Practice</h4>
              <p className="text-white/80 text-sm">
                Use the horse's registered name as the primary name, with barn name as secondary. Include location for local buyers to find you easily.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Horse Names */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Horse className="h-5 w-5" />
            Horse Names
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="horseName" className="text-white">
              Registered Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="horseName"
              placeholder="Official registered name"
              value={data.horseName || ''}
              onChange={(e) => onUpdate({ horseName: e.target.value })}
              className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
            />
          </div>
          
          <div>
            <Label htmlFor="barnName" className="text-white">
              Barn Name / Call Name
            </Label>
            <Input
              id="barnName"
              placeholder="What do you call this horse?"
              value={data.barnName || ''}
              onChange={(e) => onUpdate({ barnName: e.target.value })}
              className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
            />
          </div>
        </CardContent>
      </Card>

      {/* Breed & Basic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Breed & Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="breed" className="text-white">
                Breed <span className="text-red-400">*</span>
              </Label>
              <Select
                value={data.breed || ''}
                onValueChange={handleBreedChange}
              >
                <SelectTrigger className="mt-2 bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select breed" />
                </SelectTrigger>
                <SelectContent>
                  {commonBreeds.map((breed) => (
                    <SelectItem key={breed} value={breed}>
                      {breed}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Other (specify)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {showCustomBreed && (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter breed name"
                  value={customBreed}
                  onChange={(e) => setCustomBreed(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-white/40"
                />
                <Button onClick={handleCustomBreedSubmit} size="sm">
                  Add
                </Button>
              </div>
            )}

            <div>
              <Label htmlFor="color" className="text-white">Color</Label>
              <Input
                id="color"
                placeholder="e.g., Bay, Chestnut, Black"
                value={data.color || ''}
                onChange={(e) => onUpdate({ color: e.target.value })}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            </div>

            <div>
              <Label htmlFor="sex" className="text-white">Sex</Label>
              <Select
                value={data.sex || ''}
                onValueChange={(value) => onUpdate({ sex: value })}
              >
                <SelectTrigger className="mt-2 bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mare">Mare</SelectItem>
                  <SelectItem value="stallion">Stallion</SelectItem>
                  <SelectItem value="gelding">Gelding</SelectItem>
                  <SelectItem value="filly">Filly</SelectItem>
                  <SelectItem value="colt">Colt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              Physical Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="yearOfBirth" className="text-white">
                Year of Birth <span className="text-red-400">*</span>
              </Label>
              <Input
                id="yearOfBirth"
                type="number"
                placeholder="e.g., 2015"
                min="1990"
                max={new Date().getFullYear()}
                value={data.yearOfBirth || ''}
                onChange={(e) => handleYearChange(e.target.value)}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
              {data.age && (
                <p className="text-white/60 text-sm mt-1">Age: {data.age} years old</p>
              )}
            </div>

            <div>
              <Label htmlFor="height" className="text-white">Height (hands)</Label>
              <Input
                id="height"
                type="number"
                placeholder="e.g., 16.2"
                step="0.1"
                min="12"
                max="20"
                value={data.height || ''}
                onChange={(e) => onUpdate({ height: parseFloat(e.target.value) || null })}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipCode" className="text-white">
                ZIP Code <span className="text-red-400">*</span>
              </Label>
              <Input
                id="zipCode"
                placeholder="e.g., 90210"
                maxLength={5}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            </div>
            
            <div>
              <Label htmlFor="location" className="text-white">City, State</Label>
              <Input
                id="location"
                placeholder="Auto-filled from ZIP"
                value={data.location || ''}
                onChange={(e) => onUpdate({ location: e.target.value })}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="facilityName" className="text-white">Facility Name (optional)</Label>
            <Input
              id="facilityName"
              placeholder="Name of barn or facility where horse is located"
              value={data.facilityName || ''}
              onChange={(e) => onUpdate({ facilityName: e.target.value })}
              className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button 
          onClick={onPrev}
          variant="outline"
          className="bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          Previous
        </Button>
        <Button 
          onClick={onNext}
          disabled={!data.horseName || !data.breed || !data.age || !zipCode}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white disabled:opacity-50"
        >
          Continue to Documentation
        </Button>
      </div>
    </div>
  );
};

export default HorseIdentityStep;