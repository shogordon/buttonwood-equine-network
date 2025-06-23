
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Shield, Copy } from "lucide-react";
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

  const handleOwnerTypeChange = (type: string) => {
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
                  <PhoneInput
                    placeholder="Phone number"
                    value={formData.ownerPhone}
                    onChange={(value) => handleChange('ownerPhone', value || '')}
                    className="bg-white/5 border border-white/20 rounded-md text-white h-10 px-3"
                    international
                    defaultCountry="US"
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
                  <PhoneInput
                    placeholder="Business phone (optional)"
                    value={formData.businessPhone}
                    onChange={(value) => handleChange('businessPhone', value || '')}
                    className="bg-white/5 border border-white/20 rounded-md text-white h-10 px-3"
                    international
                    defaultCountry="US"
                  />
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
                      className="text-white border-white/30 hover:bg-white/10"
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
                    <PhoneInput
                      placeholder="Agent phone number"
                      value={formData.authorizedAgentPhone}
                      onChange={(value) => handleChange('authorizedAgentPhone', value || '')}
                      className="bg-white/5 border border-white/20 rounded-md text-white h-10 px-3"
                      international
                      defaultCountry="US"
                    />
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
                  className="border-white/30"
                />
                <Label htmlFor="displayBusinessName" className="text-white text-sm cursor-pointer">
                  Authorize display of business name publicly
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
