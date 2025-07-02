import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { ListingData } from "@/types/listing";

interface HorseNamesSectionProps {
  data: Partial<ListingData>;
  onUpdate: (data: Partial<ListingData>) => void;
}

export const HorseNamesSection = ({ data, onUpdate }: HorseNamesSectionProps) => {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Heart className="h-5 w-5" />
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
  );
};