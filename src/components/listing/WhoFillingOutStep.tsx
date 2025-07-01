
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

  // Sync local state with incoming data changes (including loaded drafts)
  useEffect(() => {
    console.log('WhoFillingOutStep: Syncing state with data:', data);
    setFormData({
      userRole: data.userRole || '',
      listingType: data.listingType || [],
    });
  }, [data.userRole, data.listingType]);

  const handleRoleChange = (role: string) => {
    console.log('WhoFillingOutStep: Role changed to:', role);
    const updated = { ...formData, userRole: role };
    setFormData(updated);
    onUpdate(updated);
  };

  const handleListingTypeChange = (type: string, checked: boolean) => {
    console.log('WhoFillingOutStep: Listing type changed:', type, checked);
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
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">What's your role?</h3>
          <p className="text-sm text-white/60 mb-4">Choose one:</p>
        </div>
        
        <RadioGroup value={formData.userRole} onValueChange={handleRoleChange} className="space-y-4">
          <div className="flex items-center space-x-4">
            <RadioGroupItem 
              value="owner" 
              id="owner" 
              className="h-5 w-5 border-2 border-white/50 text-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
            />
            <Label htmlFor="owner" className="text-white cursor-pointer text-base">I'm the owner</Label>
          </div>
          <div className="flex items-center space-x-4">
            <RadioGroupItem 
              value="agent" 
              id="agent" 
              className="h-5 w-5 border-2 border-white/50 text-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
            />
            <Label htmlFor="agent" className="text-white cursor-pointer text-base">I'm an agent / trainer / rep</Label>
          </div>
        </RadioGroup>
      </Card>

      <Card className="bg-white/5 border-white/10 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Listing type:</h3>
          <p className="text-sm text-white/60 mb-4">Select all that apply:</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            'For sale',
            'For lease', 
            'Lease-to-purchase',
            'Payment plan',
            'Trade considered',
            'Special situation'
          ].map((type) => (
            <div key={type} className="flex items-center space-x-3">
              <Checkbox
                id={type}
                checked={formData.listingType.includes(type)}
                onCheckedChange={(checked) => handleListingTypeChange(type, checked as boolean)}
                className="h-5 w-5 border-2 border-white/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
              <Label htmlFor={type} className="text-white text-sm cursor-pointer">
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
