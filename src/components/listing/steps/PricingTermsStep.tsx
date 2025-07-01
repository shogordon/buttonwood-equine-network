import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CreditCard, Clock, Lightbulb } from "lucide-react";
import { ListingData } from "@/types/listing";

interface PricingTermsStepProps {
  data: Partial<ListingData>;
  onUpdate: (data: Partial<ListingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSaveDraft: () => void;
}

const PricingTermsStep = ({ data, onUpdate, onNext, onPrev }: PricingTermsStepProps) => {
  const formatPrice = (value: string) => {
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const paymentOptions = [
    { value: 'cash', label: 'Cash Only', description: 'Full payment upfront' },
    { value: 'financing', label: 'Financing Available', description: 'Payment plans accepted' },
    { value: 'trade', label: 'Trade Considered', description: 'Open to horse/equipment trades' },
    { value: 'lease_to_own', label: 'Lease-to-Own', description: 'Monthly payments with ownership transfer' },
  ];

  const handlePaymentOptionChange = (option: string, checked: boolean) => {
    const current = data.paymentOptions || [];
    const updated = checked 
      ? [...current, option]
      : current.filter(p => p !== option);
    onUpdate({ paymentOptions: updated });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Pricing & Terms</h2>
        <p className="text-white/70">Set your price and define the sale terms</p>
      </div>

      {/* Best Practice Tip */}
      <Card className="bg-blue-500/10 border-blue-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-blue-400 font-semibold mb-1">Pricing Strategy</h4>
              <p className="text-white/80 text-sm">
                Research comparable horses in your area. Horses priced competitively sell 60% faster. Consider offering payment options to attract more buyers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Pricing */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Sale Price
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-white">
                Asking Price <span className="text-red-400">*</span>
              </Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">$</span>
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  value={data.price || ''}
                  onChange={(e) => onUpdate({ price: parseFloat(e.target.value) || null })}
                  className="pl-8 bg-white/5 border-white/20 text-white placeholder-white/40"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="priceNegotiable"
                  checked={data.priceNegotiable || false}
                  onCheckedChange={(checked) => onUpdate({ priceNegotiable: checked as boolean })}
                />
                <Label htmlFor="priceNegotiable" className="text-white cursor-pointer">
                  Price is negotiable
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="priceInquire"
                  checked={data.priceInquire || false}
                  onCheckedChange={(checked) => onUpdate({ priceInquire: checked as boolean })}
                />
                <Label htmlFor="priceInquire" className="text-white cursor-pointer">
                  Price available upon inquiry
                </Label>
              </div>
            </div>
          </div>

          {data.priceInquire && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <p className="text-yellow-400 text-sm">
                Note: Listings without visible prices typically receive 40% fewer inquiries. Consider showing a price range.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Options */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentOptions.map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Checkbox
                id={option.value}
                checked={data.paymentOptions?.includes(option.value) || false}
                onCheckedChange={(checked) => handlePaymentOptionChange(option.value, checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor={option.value} className="text-white font-medium cursor-pointer">
                  {option.label}
                </Label>
                <p className="text-white/60 text-sm mt-1">{option.description}</p>
              </div>
            </div>
          ))}

          {(data.paymentOptions?.includes('financing') || data.paymentOptions?.includes('lease_to_own')) && (
            <div>
              <Label htmlFor="paymentTerms" className="text-white">
                Payment Terms Details
              </Label>
              <Textarea
                id="paymentTerms"
                placeholder="Describe your payment plans, financing options, or lease-to-own terms"
                value={data.paymentTerms || ''}
                onChange={(e) => onUpdate({ paymentTerms: e.target.value })}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
                rows={3}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lease Considerations */}
      {data.listingType?.includes('lease') && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Lease Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="leasePrice" className="text-white">
                  Monthly Lease Amount
                </Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">$</span>
                  <Input
                    id="leasePrice"
                    type="number"
                    placeholder="0"
                    value={data.leasePrice || ''}
                    onChange={(e) => onUpdate({ leasePrice: parseFloat(e.target.value) || null })}
                    className="pl-8 bg-white/5 border-white/20 text-white placeholder-white/40"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="leaseDuration" className="text-white">
                  Lease Duration
                </Label>
                <Input
                  id="leaseDuration"
                  placeholder="e.g., 6 months, 1 year"
                  value={data.leaseDuration || ''}
                  onChange={(e) => onUpdate({ leaseDuration: e.target.value })}
                  className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="leaseConsidered"
                  checked={data.leaseConsidered || false}
                  onCheckedChange={(checked) => onUpdate({ leaseConsidered: checked as boolean })}
                />
                <Label htmlFor="leaseConsidered" className="text-white cursor-pointer">
                  Open to lease instead of sale
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="halfLease"
                  checked={data.halfLease || false}
                  onCheckedChange={(checked) => onUpdate({ halfLease: checked as boolean })}
                />
                <Label htmlFor="halfLease" className="text-white cursor-pointer">
                  Half lease available
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="leaseTerms" className="text-white">
                Lease Terms & Conditions
              </Label>
              <Textarea
                id="leaseTerms"
                placeholder="Insurance requirements, care expectations, riding restrictions, etc."
                value={data.leaseTerms || ''}
                onChange={(e) => onUpdate({ leaseTerms: e.target.value })}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button 
          onClick={onPrev}
          variant="outline"
          className="bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          Previous
        </Button>
        <Button 
          onClick={onNext}
          disabled={!data.price && !data.priceInquire}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white disabled:opacity-50"
        >
          Continue to Horse Profile
        </Button>
      </div>
    </div>
  );
};

export default PricingTermsStep;