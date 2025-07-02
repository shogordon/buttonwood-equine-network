import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ruler } from "lucide-react";
import { ListingData } from "@/types/listing";

interface PhysicalStatsSectionProps {
  data: Partial<ListingData>;
  onUpdate: (data: Partial<ListingData>) => void;
}

export const PhysicalStatsSection = ({ data, onUpdate }: PhysicalStatsSectionProps) => {
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
  );
};