
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { PhoneInputField } from "./agent/PhoneInputField";
import { ContactVisibilitySection } from "./agent/ContactVisibilitySection";
import { PrivacyNotice } from "./agent/PrivacyNotice";
import { PermissionCheckbox } from "./agent/PermissionCheckbox";
import { useAgentFormData } from "./agent/useAgentFormData";

interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const AgentInfoStep = ({ data, onUpdate }: StepProps) => {
  const {
    formData,
    validationErrors,
    handleChange,
    handleEmailValidation,
  } = useAgentFormData({ data, onUpdate });

  // Only show this step if user selected 'agent' role or 'owner' role
  if (data.userRole !== 'agent' && data.userRole !== 'owner') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Agent or Representative Info</h2>
        <p className="text-white/60">Information about the agent or representative handling this listing</p>
        <PrivacyNotice />
      </div>

      <Card className="bg-white/5 border-white/10 p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="agentName" className="text-white mb-2 block">
                Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="agentName"
                value={formData.agentName}
                onChange={(e) => handleChange('agentName', e.target.value)}
                placeholder="Full name"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
              />
            </div>
            <div>
              <Label htmlFor="agentBusinessName" className="text-white mb-2 block">Business/farm name</Label>
              <Input
                id="agentBusinessName"
                value={formData.agentBusinessName}
                onChange={(e) => handleChange('agentBusinessName', e.target.value)}
                placeholder="Business or farm name (optional)"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
              />
            </div>
            <div>
              <PhoneInputField
                label="Phone"
                value={formData.agentPhone}
                onChange={(value) => handleChange('agentPhone', value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="agentEmail" className="text-white mb-2 block">
                Email <span className="text-red-400">*</span>
              </Label>
              <Input
                id="agentEmail"
                type="email"
                value={formData.agentEmail}
                onChange={(e) => handleChange('agentEmail', e.target.value)}
                onBlur={(e) => handleEmailValidation('agentEmail', e.target.value)}
                placeholder="Email address"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
              />
              {validationErrors.agentEmail && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.agentEmail}</p>
              )}
            </div>
            <div>
              <Label htmlFor="agentWebsite" className="text-white mb-2 block">Website</Label>
              <Input
                id="agentWebsite"
                value={formData.agentWebsite}
                onChange={(e) => handleChange('agentWebsite', e.target.value)}
                placeholder="Website URL (optional)"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
              />
            </div>
            <div>
              <Label htmlFor="agentSocials" className="text-white mb-2 block">Social media</Label>
              <Input
                id="agentSocials"
                value={formData.agentSocials}
                onChange={(e) => handleChange('agentSocials', e.target.value)}
                placeholder="Instagram, Facebook, etc. (optional)"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
              />
            </div>
          </div>

          <ContactVisibilitySection
            value={formData.agentContactVisibility}
            onChange={(value) => handleChange('agentContactVisibility', value)}
          />

          <PermissionCheckbox
            checked={formData.hasPermissionToList}
            onChange={(checked) => handleChange('hasPermissionToList', checked)}
          />
        </div>
      </Card>
    </div>
  );
};

export default AgentInfoStep;
