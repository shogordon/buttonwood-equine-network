
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const AgentInfoStep = ({ data, onUpdate }: StepProps) => {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    agentName: data.agentName || '',
    agentBusinessName: data.agentBusinessName || '',
    agentPhone: data.agentPhone || '',
    agentEmail: data.agentEmail || '',
    agentWebsite: data.agentWebsite || '',
    agentSocials: data.agentSocials || '',
    hasPermissionToList: data.hasPermissionToList || false,
    agentContactVisibility: data.agentContactVisibility || 'registered_users',
  });

  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  // Auto-populate agent data when user role is "owner"
  useEffect(() => {
    if (data.userRole === 'owner' && user && profile) {
      const autoPopulatedData = {
        ...formData,
        agentName: profile.first_name && profile.last_name 
          ? `${profile.first_name} ${profile.last_name}` 
          : formData.agentName,
        agentEmail: user.email || formData.agentEmail,
        agentPhone: profile.phone || formData.agentPhone,
      };
      
      setFormData(autoPopulatedData);
      onUpdate(autoPopulatedData);
    }
  }, [data.userRole, user, profile]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleEmailValidation = (field: string, email: string) => {
    if (email && !validateEmail(email)) {
      setValidationErrors(prev => ({ ...prev, [field]: 'Please enter a valid email address' }));
    } else {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleVisibilityChange = (value: string) => {
    handleChange('agentContactVisibility', value);
  };

  // Only show this step if user selected 'agent' role or 'owner' role
  if (data.userRole !== 'agent' && data.userRole !== 'owner') {
    return null;
  }

  // CSS styles for phone input (same as OwnerInfoStep)
  const phoneInputStyles = {
    '--PhoneInput-color--focus': 'rgba(255, 255, 255, 0.8)',
    '--PhoneInputInternationalIconPhone-opacity': '0.8',
    '--PhoneInputInternationalIconGlobe-opacity': '0.65',
    '--PhoneInputCountrySelect-marginRight': '0.35em',
    '--PhoneInputCountrySelectArrow-width': '0.3em',
    '--PhoneInputCountrySelectArrow-marginLeft': 'var(--PhoneInputCountrySelect-marginRight)',
    '--PhoneInputCountryFlag-aspectRatio': '1.5',
    '--PhoneInputCountryFlag-height': '1em',
    '--PhoneInputCountryFlag-borderWidth': '1px',
    '--PhoneInputCountryFlag-borderColor': 'rgba(255, 255, 255, 0.5)',
    '--PhoneInputCountryFlag-borderColor--focus': 'rgba(255, 255, 255, 0.8)',
    '--PhoneInputCountryFlag-backgroundColor--focus': 'rgba(255, 255, 255, 0.03)',
  } as React.CSSProperties;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Agent or Representative Info</h2>
        <p className="text-white/60">Information about the agent or representative handling this listing</p>
        
        <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4 mb-6 mt-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="h-5 w-5 text-blue-400" />
            <span className="text-blue-400 font-semibold">Privacy Protected</span>
          </div>
          <p className="text-white/80 text-sm">
            Representative contact information will only be visible to registered users, with additional privacy controls available below.
          </p>
        </div>
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
              <Label htmlFor="agentPhone" className="text-white mb-2 block">
                Phone <span className="text-red-400">*</span>
              </Label>
              <div className="phone-input-container" style={phoneInputStyles}>
                <PhoneInput
                  placeholder="Phone number"
                  value={formData.agentPhone}
                  onChange={(value) => handleChange('agentPhone', value || '')}
                  international
                  defaultCountry="US"
                  className="phone-input"
                />
              </div>
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

          <Card className="bg-white/5 border-white/10 p-4">
            <h4 className="text-white font-medium mb-4">Contact Information Visibility</h4>
            <p className="text-white/60 text-sm mb-4">Choose who can see your contact information:</p>
            
            <RadioGroup value={formData.agentContactVisibility} onValueChange={handleVisibilityChange} className="space-y-3">
              <div className="flex items-center space-x-4">
                <RadioGroupItem 
                  value="registered_users" 
                  id="registered_users" 
                  className="h-5 w-5 border-2 border-white/50 text-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
                />
                <div className="flex-1">
                  <Label htmlFor="registered_users" className="text-white cursor-pointer text-sm font-medium">
                    Visible to all registered users
                  </Label>
                  <p className="text-white/50 text-xs">Anyone with an account can see your contact information</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <RadioGroupItem 
                  value="verified_buyers" 
                  id="verified_buyers" 
                  className="h-5 w-5 border-2 border-white/50 text-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
                />
                <div className="flex-1">
                  <Label htmlFor="verified_buyers" className="text-white cursor-pointer text-sm font-medium">
                    Only visible to verified buyers
                  </Label>
                  <p className="text-white/50 text-xs">Only buyers who have completed verification can see your contact info</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <RadioGroupItem 
                  value="on_request" 
                  id="on_request" 
                  className="h-5 w-5 border-2 border-white/50 text-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
                />
                <div className="flex-1">
                  <Label htmlFor="on_request" className="text-white cursor-pointer text-sm font-medium">
                    Disclosed on request through messaging
                  </Label>
                  <p className="text-white/50 text-xs">Contact information shared only when you choose to share it in messages</p>
                </div>
              </div>
            </RadioGroup>
          </Card>

          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="hasPermissionToList"
                checked={formData.hasPermissionToList}
                onCheckedChange={(checked) => handleChange('hasPermissionToList', checked)}
                className="h-5 w-5 border-2 border-white/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
              <Label htmlFor="hasPermissionToList" className="text-white cursor-pointer">
                I have permission to list this horse
              </Label>
            </div>
          </div>
        </div>
      </Card>

      <div style={phoneInputStyles}>
        <style>{`
          .phone-input-container .PhoneInput {
            height: 40px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            color: white;
            display: flex;
            align-items: center;
            padding: 0 12px;
          }
          
          .phone-input-container .PhoneInputInput {
            background: transparent;
            border: none;
            color: white;
            flex: 1;
            font-size: 14px;
            height: 100%;
            outline: none;
            padding: 0;
            margin-left: 8px;
          }
          
          .phone-input-container .PhoneInputInput::placeholder {
            color: rgba(255, 255, 255, 0.4);
          }
          
          .phone-input-container .PhoneInputCountrySelect {
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.8);
            outline: none;
          }
          
          .phone-input-container .PhoneInputCountrySelectArrow {
            border-top-color: rgba(255, 255, 255, 0.4);
          }
        `}</style>
      </div>
    </div>
  );
};

export default AgentInfoStep;
