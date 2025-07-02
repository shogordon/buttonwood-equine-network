import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { ListingData } from "@/types/listing";
import { useState, useEffect } from "react";

interface LocationSectionProps {
  data: Partial<ListingData>;
  onUpdate: (data: Partial<ListingData>) => void;
}

export const LocationSection = ({ data, onUpdate }: LocationSectionProps) => {
  const [zipCode, setZipCode] = useState(data.zipCode || '');

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

  return (
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
  );
};