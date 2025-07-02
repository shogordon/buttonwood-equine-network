
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

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
    ownerInfo: data.ownerInfo || {
      displayName: '',
      contactMethod: 'show',
      businessName: ''
    },
    agentInfo: data.agentInfo || {
      agentContact: '',
      ownerName: '',
      authorizationConfirmed: false
    }
  });

  // Sync with incoming data changes
  useEffect(() => {
    console.log('WhoFillingOutStep: Syncing with incoming data:', data);
    const newFormData = {
      userRole: data.userRole || '',
      listingType: data.listingType || [],
      ownerInfo: data.ownerInfo || {
        displayName: '',
        contactMethod: 'show',
        businessName: ''
      },
      agentInfo: data.agentInfo || {
        agentContact: '',
        ownerName: '',
        authorizationConfirmed: false
      }
    };
    
    // Only update if data has actually changed
    if (JSON.stringify(newFormData) !== JSON.stringify(formData)) {
      console.log('WhoFillingOutStep: Data changed, updating form state');
      setFormData(newFormData);
    }
  }, [data.userRole, data.listingType, data.ownerInfo, data.agentInfo]);

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

      {/* Owner Contact Information */}
      {formData.userRole === 'owner' && (
        <Card className="bg-white/5 border-white/10 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">Contact Information</h3>
            <p className="text-sm text-white/60 mb-4">How should buyers contact you?</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="displayName" className="text-white">Display Name</Label>
              <Input
                id="displayName"
                placeholder="Name to show on listing"
                value={formData.ownerInfo.displayName}
                onChange={(e) => {
                  const updated = { 
                    ...formData, 
                    ownerInfo: { ...formData.ownerInfo, displayName: e.target.value }
                  };
                  setFormData(updated);
                  onUpdate(updated);
                }}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            </div>
            
            <div>
              <Label htmlFor="businessName" className="text-white">Business/Farm Name (Optional)</Label>
              <Input
                id="businessName"
                placeholder="Farm or business name"
                value={formData.ownerInfo.businessName}
                onChange={(e) => {
                  const updated = { 
                    ...formData, 
                    ownerInfo: { ...formData.ownerInfo, businessName: e.target.value }
                  };
                  setFormData(updated);
                  onUpdate(updated);
                }}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            </div>
            
            <div>
              <Label className="text-white mb-3 block">Contact Visibility</Label>
              <RadioGroup 
                value={formData.ownerInfo.contactMethod} 
                onValueChange={(value) => {
                  const updated = { 
                    ...formData, 
                    ownerInfo: { ...formData.ownerInfo, contactMethod: value }
                  };
                  setFormData(updated);
                  onUpdate(updated);
                }}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="show" id="show" className="border-white/50 text-blue-400" />
                  <Label htmlFor="show" className="text-white text-sm">Show contact info to all users</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="verified_only" id="verified_only" className="border-white/50 text-blue-400" />
                  <Label htmlFor="verified_only" className="text-white text-sm">Show only to verified users</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hide" id="hide" className="border-white/50 text-blue-400" />
                  <Label htmlFor="hide" className="text-white text-sm">Hide contact info (inquiries only)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </Card>
      )}

      {/* Agent Information */}
      {formData.userRole === 'agent' && (
        <Card className="bg-white/5 border-white/10 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">Agent & Owner Information</h3>
            <p className="text-sm text-white/60 mb-4">Provide details about representation</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="ownerName" className="text-white">
                Owner's Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="ownerName"
                placeholder="Name of horse owner"
                value={formData.agentInfo.ownerName}
                onChange={(e) => {
                  const updated = { 
                    ...formData, 
                    agentInfo: { ...formData.agentInfo, ownerName: e.target.value }
                  };
                  setFormData(updated);
                  onUpdate(updated);
                }}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            </div>
            
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <Checkbox
                id="authorization"
                checked={formData.agentInfo.authorizationConfirmed}
                onCheckedChange={(checked) => {
                  const updated = { 
                    ...formData, 
                    agentInfo: { ...formData.agentInfo, authorizationConfirmed: checked as boolean }
                  };
                  setFormData(updated);
                  onUpdate(updated);
                }}
                className="h-5 w-5 border-2 border-yellow-500/50 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
              />
              <Label htmlFor="authorization" className="text-white font-medium cursor-pointer">
                I confirm I am authorized by the owner to list this horse for sale/lease
                <span className="text-red-400 ml-1">*</span>
              </Label>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default WhoFillingOutStep;
