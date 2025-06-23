
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const WhoFillingOutStep = ({ data, onUpdate }: StepProps) => {
  const [formData, setFormData] = useState({
    userRole: data.userRole || '',
    listingType: data.listingType || [],
  });

  const handleRoleChange = (role: string) => {
    const updated = { ...formData, userRole: role };
    setFormData(updated);
    onUpdate(updated);
  };

  const handleListingTypeChange = (type: string, checked: boolean) => {
    const updated = { ...formData };
    if (checked) {
      updated.listingType = [...updated.listingType, type];
    } else {
      updated.listingType = updated.listingType.filter((t: string) => t !== type);
    }
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Who's Filling This Out?</h2>
        <p className="text-white/60">Let us know your role and what type of listing this is</p>
      </div>

      <Card className="bg-white/5 border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">What's your role?</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="owner"
              name="userRole"
              value="owner"
              checked={formData.userRole === 'owner'}
              onChange={() => handleRoleChange('owner')}
              className="text-blue-400"
            />
            <Label htmlFor="owner" className="text-white">I'm the owner</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="agent"
              name="userRole"
              value="agent"
              checked={formData.userRole === 'agent'}
              onChange={() => handleRoleChange('agent')}
              className="text-blue-400"
            />
            <Label htmlFor="agent" className="text-white">I'm an agent / trainer / rep</Label>
          </div>
        </div>
      </Card>

      <Card className="bg-white/5 border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Listing type:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'For Sale',
            'For Lease', 
            'Lease-to-Own',
            'Trade Considered',
            'Open to Offers'
          ].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={formData.listingType.includes(type)}
                onCheckedChange={(checked) => handleListingTypeChange(type, checked as boolean)}
              />
              <Label htmlFor={type} className="text-white text-sm">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default WhoFillingOutStep;
