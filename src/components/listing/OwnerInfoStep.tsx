import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Shield, Copy } from "lucide-react";
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

const OwnerInfoStep = ({ data, onUpdate }: StepProps) => {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    ownerType: data.ownerType || '',
    ownerName: data.ownerName || '',
    ownerEmail: data.ownerEmail || '',
    ownerPhone: data.ownerPhone || '',
    ownerZip: data.ownerZip || '',
    displayOwnerName: data.displayOwnerName || false,
    businessName: data.businessName || '',
    businessEmail: data.businessEmail || '',
    businessPhone: data.businessPhone || '',
    authorizedAgentName: data.authorizedAgentName || '',
    authorizedAgentEmail: data.authorizedAgentEmail || '',
    authorizedAgentPhone: data.authorizedAgentPhone || '',
    displayBusinessName: data.displayBusinessName || false,
  });

  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  // Sync local state with incoming data changes (including loaded drafts)
  useEffect(() => {
    console.log('OwnerInfoStep: Syncing state with data:', data);
    const newFormData = {
      ownerType: data.ownerType || '',
      ownerName: data.ownerName || '',
      ownerEmail: data.ownerEmail || '',
      ownerPhone: data.ownerPhone || '',
      ownerZip: data.ownerZip || '',
      displayOwnerName: data.displayOwnerName || false,
      businessName: data.businessName || '',
      businessEmail: data.businessEmail || '',
      businessPhone: data.businessPhone || '',
      authorizedAgentName: data.authorizedAgentName || '',
      authorizedAgentEmail: data.authorizedAgentEmail || '',
      authorizedAgentPhone: data.authorizedAgentPhone || '',
      displayBusinessName: data.displayBusinessName || false,
    };
    
    // Only update if data has actually changed
    if (JSON.stringify(newFormData) !== JSON.stringify(formData)) {
      console.log('OwnerInfoStep: Data changed, updating form state');
      setFormData(newFormData);
    }
  }, [data]);

  // Auto-populate owner data when user role is "owner"
  useEffect(() => {
    if (data.userRole === 'owner' && user && profile && !formData.ownerName) {
      const autoPopulatedData = {
        ...formData,
        ownerName: profile.first_name && profile.last_name 
          ? `${profile.first_name} ${profile.last_name}` 
          : formData.ownerName,
        ownerEmail: user.email || formData.ownerEmail,
        ownerPhone: profile.phone || formData.ownerPhone,
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
    console.log('OwnerInfoStep: Field changed:', field, value);
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleOwnerTypeChange = (type: string) => {
    console.log('OwnerInfoStep: Owner type changed to:', type);
    const updated = { ...formData, ownerType: type };
    setFormData(updated);
    onUpdate(updated);
  };

  const handleEmailValidation = (field: string, email: string) => {
    if (email && !validateEmail(email)) {
      setValidationErrors(prev => ({ ...prev, [field]: 'Please enter a valid email address' }));
    } else {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const copyBusinessToAgent = () => {
    const updated = {
      ...formData,
      authorizedAgentEmail: formData.businessEmail,
      authorizedAgentPhone: formData.businessPhone,
    };
    setFormData(updated);
    onUpdate(updated);
  };

  // CSS styles for phone input
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
        <h2 className="text-2xl font-bold text-white mb-2">Owner Information</h2>
        <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="h-5 w-5 text-blue-400" />
            <span className="text-blue-400 font-semibold">Privacy Protected</span>
          </div>
          <p className="text-white/80 text-sm">
            All information on this page will remain completely private unless you explicitly authorize it to be displayed publicly or released upon request.
          </p>
        </div>
      </div>

      <Card className="bg-white/5 border-white/10 p-6">
        <div className="space-y-4">
          <div className="mb-4">
            <p className="text-sm text-white/60 mb-4">Choose one:</p>
          </div>
          
          <RadioGroup value={formData.ownerType} onValueChange={handleOwnerTypeChange} className="space-y-4">
            <div className="flex items-center space-x-4">
              <RadioGroupItem 
                value="person" 
                id="person" 
                className="h-6 w-6 border-2 border-white/50 text-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
              />
              <Label htmlFor="person" className="text-white cursor-pointer text-base">A person owns the horse</Label>
            </div>
            <div className="flex items-center space-x-4">
              <RadioGroupItem 
                value="business" 
                id="business" 
                className="h-6 w-6 border-2 border-white/50 text-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
              />
              <Label htmlFor="business" className="text-white cursor-pointer text-base">A business or syndicate owns it</Label>
            </div>
          </RadioGroup>

          {formData.ownerType === 'person' && (
            <div className="space-y-4 mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ownerName" className="text-white mb-2 block">
                    Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => handleChange('ownerName', e.target.value)}
                    placeholder="Full name"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerEmail" className="text-white mb-2 block">
                    Email <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="ownerEmail"
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) => handleChange('ownerEmail', e.target.value)}
                    onBlur={(e) => handleEmailValidation('ownerEmail', e.target.value)}
                    placeholder="Email address"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                  {validationErrors.ownerEmail && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.ownerEmail}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="ownerPhone" className="text-white mb-2 block">
                    Phone <span className="text-red-400">*</span>
                  </Label>
                  <div className="phone-input-container" style={phoneInputStyles}>
                    <PhoneInput
                      placeholder="Phone number"
                      value={formData.ownerPhone}
                      onChange={(value) => handleChange('ownerPhone', value || '')}
                      international
                      defaultCountry="US"
                      className="phone-input"
                    />
                  </div>
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
                  className="h-5 w-5 border-2 border-white/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label htmlFor="displayOwnerName" className="text-white text-sm cursor-pointer">
                  Authorize display of name publicly
                </Label>
              </div>
            </div>
          )}

          {formData.ownerType === 'business' && (
            <div className="space-y-4 mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName" className="text-white mb-2 block">
                    Business name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    placeholder="Business or syndicate name"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="businessEmail" className="text-white mb-2 block">Business contact email</Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    value={formData.businessEmail}
                    onChange={(e) => handleChange('businessEmail', e.target.value)}
                    onBlur={(e) => handleEmailValidation('businessEmail', e.target.value)}
                    placeholder="Business email (optional)"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                  />
                  {validationErrors.businessEmail && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.businessEmail}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="businessPhone" className="text-white mb-2 block">Business contact phone</Label>
                  <div className="phone-input-container" style={phoneInputStyles}>
                    <PhoneInput
                      placeholder="Business phone (optional)"
                      value={formData.businessPhone}
                      onChange={(value) => handleChange('businessPhone', value || '')}
                      international
                      defaultCountry="US"
                      className="phone-input"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">Authorized Agent Information</h4>
                  {(formData.businessEmail || formData.businessPhone) && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={copyBusinessToAgent}
                      className="text-blue-400 border-blue-400/50 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400 transition-colors"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy from business info
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="authorizedAgentName" className="text-white mb-2 block">
                      Authorized agent name <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="authorizedAgentName"
                      value={formData.authorizedAgentName}
                      onChange={(e) => handleChange('authorizedAgentName', e.target.value)}
                      placeholder="Name of authorized representative"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="authorizedAgentEmail" className="text-white mb-2 block">
                      Agent email <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="authorizedAgentEmail"
                      type="email"
                      value={formData.authorizedAgentEmail}
                      onChange={(e) => handleChange('authorizedAgentEmail', e.target.value)}
                      onBlur={(e) => handleEmailValidation('authorizedAgentEmail', e.target.value)}
                      placeholder="Agent email address"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-10"
                    />
                    {validationErrors.authorizedAgentEmail && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.authorizedAgentEmail}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="authorizedAgentPhone" className="text-white mb-2 block">
                      Agent phone <span className="text-red-400">*</span>
                    </Label>
                    <div className="phone-input-container" style={phoneInputStyles}>
                      <PhoneInput
                        placeholder="Agent phone number"
                        value={formData.authorizedAgentPhone}
                        onChange={(value) => handleChange('authorizedAgentPhone', value || '')}
                        international
                        defaultCountry="US"
                        className="phone-input"
                      />
                    </div>
                  </div>
                </div>
                
                <p className="text-white/60 text-xs mt-2">
                  * At least one contact method (email or phone) required for authorized agent
                </p>
              </div>

              <div className="flex items-center space-x-3 mt-4">
                <Checkbox
                  id="displayBusinessName"
                  checked={formData.displayBusinessName}
                  onCheckedChange={(checked) => handleChange('displayBusinessName', checked)}
                  className="h-5 w-5 border-2 border-white/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label htmlFor="displayBusinessName" className="text-white text-sm cursor-pointer">
                  Authorize display of business name publicly
                </Label>
              </div>
            </div>
          )}
        </div>
      </Card>

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
  );
};

export default OwnerInfoStep;
