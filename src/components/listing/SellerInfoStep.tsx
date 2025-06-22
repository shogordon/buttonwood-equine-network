
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const SellerInfoStep = ({ data, onUpdate }: StepProps) => {
  const [formData, setFormData] = useState({
    sellerName: data.sellerName || '',
    sellerRole: data.sellerRole || '',
    commissionType: data.commissionType || 'none',
    commissionAmount: data.commissionAmount || 0,
    commissionDisclosure: data.commissionDisclosure || '',
    agreeToTerms: data.agreeToTerms || false,
  });

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Seller Information</h2>
        <p className="text-white/60">Tell us about yourself and any commission arrangements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="sellerName" className="text-white mb-2 block">Your Name</Label>
          <Input
            id="sellerName"
            value={formData.sellerName}
            onChange={(e) => handleChange('sellerName', e.target.value)}
            placeholder="Enter your full name"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div>
          <Label htmlFor="sellerRole" className="text-white mb-2 block">Your Role</Label>
          <Select value={formData.sellerRole} onValueChange={(value) => handleChange('sellerRole', value)}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="owner">Horse Owner</SelectItem>
              <SelectItem value="trainer">Trainer</SelectItem>
              <SelectItem value="agent">Sales Agent</SelectItem>
              <SelectItem value="barn">Barn/Farm</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="bg-white/5 border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Commission Disclosure</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="commissionType" className="text-white mb-2 block">Commission Type</Label>
            <Select value={formData.commissionType} onValueChange={(value) => handleChange('commissionType', value)}>
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Commission</SelectItem>
                <SelectItem value="buyer_agent">Buyer's Agent Commission</SelectItem>
                <SelectItem value="seller_agent">Seller's Agent Commission</SelectItem>
                <SelectItem value="both">Both Buyer and Seller Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.commissionType !== 'none' && (
            <div>
              <Label htmlFor="commissionAmount" className="text-white mb-2 block">Commission Amount (%)</Label>
              <Input
                id="commissionAmount"
                type="number"
                min="0"
                max="50"
                step="0.5"
                value={formData.commissionAmount}
                onChange={(e) => handleChange('commissionAmount', parseFloat(e.target.value) || 0)}
                placeholder="e.g., 5.0"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
          )}

          <div>
            <Label htmlFor="commissionDisclosure" className="text-white mb-2 block">Additional Disclosure (Optional)</Label>
            <Textarea
              id="commissionDisclosure"
              value={formData.commissionDisclosure}
              onChange={(e) => handleChange('commissionDisclosure', e.target.value)}
              placeholder="Any additional information about commissions or fees"
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
            />
          </div>
        </div>
      </Card>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="agreeToTerms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => handleChange('agreeToTerms', checked)}
        />
        <Label htmlFor="agreeToTerms" className="text-white text-sm">
          I agree to the Terms of Service and Privacy Policy, and confirm that all information provided is accurate
        </Label>
      </div>
    </div>
  );
};

export default SellerInfoStep;
