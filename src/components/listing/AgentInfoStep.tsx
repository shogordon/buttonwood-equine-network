
import { useState } from "react";
import { Input } from "@/components/ui/input";
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

const AgentInfoStep = ({ data, onUpdate }: StepProps) => {
  const [formData, setFormData] = useState({
    agentName: data.agentName || '',
    agentBusinessName: data.agentBusinessName || '',
    agentPhone: data.agentPhone || '',
    agentEmail: data.agentEmail || '',
    agentWebsite: data.agentWebsite || '',
    agentSocials: data.agentSocials || '',
    hasPermissionToList: data.hasPermissionToList || false,
  });

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  // Only show this step if user selected 'agent' role
  if (data.userRole !== 'agent') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Agent or Rep Info</h2>
        <p className="text-white/60">Tell us about yourself as the agent or representative</p>
      </div>

      <Card className="bg-white/5 border-white/10 p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="agentName" className="text-white mb-2 block">Name</Label>
              <Input
                id="agentName"
                value={formData.agentName}
                onChange={(e) => handleChange('agentName', e.target.value)}
                placeholder="Your full name"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            <div>
              <Label htmlFor="agentBusinessName" className="text-white mb-2 block">Business/farm name</Label>
              <Input
                id="agentBusinessName"
                value={formData.agentBusinessName}
                onChange={(e) => handleChange('agentBusinessName', e.target.value)}
                placeholder="Business or farm name"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            <div>
              <Label htmlFor="agentPhone" className="text-white mb-2 block">Phone</Label>
              <Input
                id="agentPhone"
                value={formData.agentPhone}
                onChange={(e) => handleChange('agentPhone', e.target.value)}
                placeholder="Your phone number"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            <div>
              <Label htmlFor="agentEmail" className="text-white mb-2 block">Email</Label>
              <Input
                id="agentEmail"
                type="email"
                value={formData.agentEmail}
                onChange={(e) => handleChange('agentEmail', e.target.value)}
                placeholder="Your email address"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            <div>
              <Label htmlFor="agentWebsite" className="text-white mb-2 block">Website</Label>
              <Input
                id="agentWebsite"
                value={formData.agentWebsite}
                onChange={(e) => handleChange('agentWebsite', e.target.value)}
                placeholder="Your website URL"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            <div>
              <Label htmlFor="agentSocials" className="text-white mb-2 block">Social media</Label>
              <Input
                id="agentSocials"
                value={formData.agentSocials}
                onChange={(e) => handleChange('agentSocials', e.target.value)}
                placeholder="Instagram, Facebook, etc."
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasPermissionToList"
                checked={formData.hasPermissionToList}
                onCheckedChange={(checked) => handleChange('hasPermissionToList', checked)}
              />
              <Label htmlFor="hasPermissionToList" className="text-white">
                I have permission to list this horse
              </Label>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AgentInfoStep;
