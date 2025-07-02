import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ListingData } from "@/types/listing";
import { useState } from "react";

interface BreedAndTypeSectionProps {
  data: Partial<ListingData>;
  onUpdate: (data: Partial<ListingData>) => void;
}

const commonBreeds = [
  'Thoroughbred', 'Quarter Horse', 'Warmblood', 'Arabian', 'Paint Horse',
  'Andalusian', 'Friesian', 'Clydesdale', 'Standardbred', 'Appaloosa',
  'Morgan', 'Tennessee Walking Horse', 'Mustang', 'Shire', 'Percheron'
];

export const BreedAndTypeSection = ({ data, onUpdate }: BreedAndTypeSectionProps) => {
  const [customBreed, setCustomBreed] = useState('');
  const [showCustomBreed, setShowCustomBreed] = useState(false);

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

  return (
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
  );
};