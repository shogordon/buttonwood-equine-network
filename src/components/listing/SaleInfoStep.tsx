
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const SaleInfoStep = ({ data, onUpdate }: StepProps) => {
  const [formData, setFormData] = useState({
    price: data.price || '',
    priceNegotiable: data.priceNegotiable || false,
    saleType: data.saleType || 'for_sale',
    trialAvailable: data.trialAvailable || false,
    trialDuration: data.trialDuration || '',
    xraysAvailable: data.xraysAvailable || false,
    prePurchaseExam: data.prePurchaseExam || false,
    reasonForSelling: data.reasonForSelling || '',
  });

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Sale Information</h2>
        <p className="text-white/60">Set your price and sale terms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="price" className="text-white mb-2 block">Asking Price ($)</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="1000"
            value={formData.price}
            onChange={(e) => handleChange('price', parseInt(e.target.value) || '')}
            placeholder="e.g., 25000"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div>
          <Label htmlFor="saleType" className="text-white mb-2 block">Sale Type</Label>
          <Select value={formData.saleType} onValueChange={(value) => handleChange('saleType', value)}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="for_sale">For Sale</SelectItem>
              <SelectItem value="lease">Lease</SelectItem>
              <SelectItem value="half_lease">Half Lease</SelectItem>
              <SelectItem value="free_lease">Free Lease</SelectItem>
              <SelectItem value="loan">Loan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="priceNegotiable"
          checked={formData.priceNegotiable}
          onCheckedChange={(checked) => handleChange('priceNegotiable', checked)}
        />
        <Label htmlFor="priceNegotiable" className="text-white">
          Price is negotiable
        </Label>
      </div>

      <Card className="bg-white/5 border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Trial & Examination Options</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="trialAvailable"
              checked={formData.trialAvailable}
              onCheckedChange={(checked) => handleChange('trialAvailable', checked)}
            />
            <Label htmlFor="trialAvailable" className="text-white">
              Trial period available
            </Label>
          </div>

          {formData.trialAvailable && (
            <div>
              <Label htmlFor="trialDuration" className="text-white mb-2 block">Trial Duration</Label>
              <Select value={formData.trialDuration} onValueChange={(value) => handleChange('trialDuration', value)}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1_week">1 Week</SelectItem>
                  <SelectItem value="2_weeks">2 Weeks</SelectItem>
                  <SelectItem value="1_month">1 Month</SelectItem>
                  <SelectItem value="negotiable">Negotiable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="xraysAvailable"
              checked={formData.xraysAvailable}
              onCheckedChange={(checked) => handleChange('xraysAvailable', checked)}
            />
            <Label htmlFor="xraysAvailable" className="text-white">
              X-rays available
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="prePurchaseExam"
              checked={formData.prePurchaseExam}
              onCheckedChange={(checked) => handleChange('prePurchaseExam', checked)}
            />
            <Label htmlFor="prePurchaseExam" className="text-white">
              Pre-purchase exam welcome
            </Label>
          </div>
        </div>
      </Card>

      <div>
        <Label htmlFor="reasonForSelling" className="text-white mb-2 block">Reason for Selling (Optional)</Label>
        <Select value={formData.reasonForSelling} onValueChange={(value) => handleChange('reasonForSelling', value)}>
          <SelectTrigger className="bg-white/5 border-white/20 text-white">
            <SelectValue placeholder="Select reason (optional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outgrown">Horse outgrown by rider</SelectItem>
            <SelectItem value="downsizing">Downsizing stable</SelectItem>
            <SelectItem value="career_change">Career change</SelectItem>
            <SelectItem value="health_reasons">Health reasons</SelectItem>
            <SelectItem value="moving">Moving/relocating</SelectItem>
            <SelectItem value="financial">Financial reasons</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SaleInfoStep;
