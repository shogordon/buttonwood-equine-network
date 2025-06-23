
import { useState } from "react";
import { Input } from "@/components/ui/input";
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

const OwnerInfoStep = ({ data, onUpdate }: StepProps) => {
  const [formData, setFormData] = useState({
    ownerType: data.ownerType || '',
    ownerName: data.ownerName || '',
    ownerEmail: data.ownerEmail || '',
    ownerPhone: data.ownerPhone || '',
    ownerZip: data.ownerZip || '',
    displayOwnerName: data.displayOwnerName || false,
    businessName: data.businessName || '',
    businessType: data.businessType || '',
    businessEmail: data.businessEmail || '',
    businessPhone: data.businessPhone || '',
    authorizedAgentName: data.authorizedAgentName || '',
    authorizedAgentRole: data.authorizedAgentRole || '',
    displayBusinessName: data.displayBusinessName || false,
  });

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  const handleOwnerTypeChange = (type: string) => {
    const updated = { ...formData, ownerType: type };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Owner Information</h2>
        <p className="text-white/60">Private unless authorized to display</p>
      </div>

      <Card className="bg-white/5 border-white/10 p-6">
        <div className="space-y-4">
          <div className="mb-4">
            <p className="text-sm text-white/60 mb-4">Choose one:</p>
          </div>
          
          <RadioGroup value={formData.ownerType} onValueChange={handleOwnerTypeChange} className="space-y-3">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="person" id="person" className="border-white/30 text-blue-400" />
              <Label htmlFor="person" className="text-white cursor-pointer">A person owns the horse</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="business" id="business" className="border-white/30 text-blue-400" />
              <Label htmlFor="business" className="text-white cursor-pointer">A business or syndicate owns it</Label>
            </div>
          </RadioGroup>

          {formData.ownerType === 'person' && (
            <div className="space-y-4 mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ownerName" className="text-white mb-2 block">Name</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => handleChange('ownerName', e.target.value)}
                    placeholder="Full name"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerEmail" className="text-white mb-2 block">Email</Label>
                  <Input
                    id="ownerEmail"
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) => handleChange('ownerEmail', e.target.value)}
                    placeholder="Email address"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerPhone" className="text-white mb-2 block">Phone</Label>
                  <Input
                    id="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={(e) => handleChange('ownerPhone', e.target.value)}
                    placeholder="Phone number"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerZip" className="text-white mb-2 block">Zip</Label>
                  <Input
                    id="ownerZip"
                    value={formData.ownerZip}
                    onChange={(e) => handleChange('ownerZip', e.target.value)}
                    placeholder="Zip code"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-4">
                <Checkbox
                  id="displayOwnerName"
                  checked={formData.displayOwnerName}
                  onCheckedChange={(checked) => handleChange('displayOwnerName', checked)}
                  className="border-white/30"
                />
                <Label htmlFor="displayOwnerName" className="text-white text-sm cursor-pointer">
                  Okay to display name
                </Label>
              </div>
            </div>
          )}

          {formData.ownerType === 'business' && (
            <div className="space-y-4 mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName" className="text-white mb-2 block">Business name</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    placeholder="Business or syndicate name"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="businessType" className="text-white mb-2 block">Type</Label>
                  <Input
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => handleChange('businessType', e.target.value)}
                    placeholder="LLC, Partnership, Syndicate, etc."
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="businessEmail" className="text-white mb-2 block">Contact email</Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    value={formData.businessEmail}
                    onChange={(e) => handleChange('businessEmail', e.target.value)}
                    placeholder="Contact email"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="businessPhone" className="text-white mb-2 block">Phone</Label>
                  <Input
                    id="businessPhone"
                    value={formData.businessPhone}
                    onChange={(e) => handleChange('businessPhone', e.target.value)}
                    placeholder="Contact phone"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="authorizedAgentName" className="text-white mb-2 block">Authorized agent name</Label>
                  <Input
                    id="authorizedAgentName"
                    value={formData.authorizedAgentName}
                    onChange={(e) => handleChange('authorizedAgentName', e.target.value)}
                    placeholder="Name of authorized representative"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="authorizedAgentRole" className="text-white mb-2 block">Role</Label>
                  <Input
                    id="authorizedAgentRole"
                    value={formData.authorizedAgentRole}
                    onChange={(e) => handleChange('authorizedAgentRole', e.target.value)}
                    placeholder="Title or role"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-4">
                <Checkbox
                  id="displayBusinessName"
                  checked={formData.displayBusinessName}
                  onCheckedChange={(checked) => handleChange('displayBusinessName', checked)}
                  className="border-white/30"
                />
                <Label htmlFor="displayBusinessName" className="text-white text-sm cursor-pointer">
                  Okay to display business name
                </Label>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default OwnerInfoStep;
