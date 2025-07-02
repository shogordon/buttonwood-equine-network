import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const paymentMethods = [
    { key: 'cash', label: 'Cash', description: 'Full payment upfront' },
    { key: 'cashiersCheck', label: 'Cashier\'s Check', description: 'Bank-guaranteed check' },
    { key: 'wireTransfer', label: 'Wire Transfer', description: 'Electronic bank transfer' },
    { key: 'creditCard', label: 'Credit Card', description: 'Card payment accepted' },
    { key: 'bitcoin', label: 'Bitcoin', description: 'Cryptocurrency payment' },
    { key: 'ethereum', label: 'Ethereum', description: 'Cryptocurrency payment' },
    { key: 'ownerFinancing', label: 'Owner Financing', description: 'Payment plans available' },
    { key: 'tradeConsidered', label: 'Trade Considered', description: 'Horse/equipment trades' },
  ];

  const currencies = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' },
  ];

  const priceDisplayOptions = [
    { value: 'show_price', label: 'Show Price', description: 'Price visible to everyone' },
    { value: 'price_range', label: 'Show Price Range', description: 'Display as a range' },
    { value: 'verified_users_only', label: 'Verified Users Only', description: 'Price visible to verified buyers' },
  ];

  const handlePaymentMethodChange = (methodKey: string, checked: boolean) => {
    const currentMethods = data.paymentMethods || {
      cash: false,
      cashiersCheck: false,
      wireTransfer: false,
      creditCard: false,
      bitcoin: false,
      ethereum: false,
      ownerFinancing: false,
      tradeConsidered: false,
    };
    onUpdate({ 
      paymentMethods: { ...currentMethods, [methodKey]: checked }
    });
  };

  const selectedCurrency = currencies.find(c => c.value === data.currency) || currencies[0];

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
                Research comparable horses in your area. Horses priced competitively sell 60% faster. Multiple payment options increase buyer inquiries by 35%.
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
            Asking Price
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="askingPrice" className="text-white">
                Asking Price <span className="text-red-400">*</span>
              </Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
                  {selectedCurrency.symbol}
                </span>
                <Input
                  id="askingPrice"
                  type="number"
                  placeholder="0"
                  value={data.askingPrice || ''}
                  onChange={(e) => onUpdate({ askingPrice: parseFloat(e.target.value) || null })}
                  className="pl-8 bg-white/5 border-white/20 text-white placeholder-white/40"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="currency" className="text-white">Currency</Label>
              <Select
                value={data.currency || 'USD'}
                onValueChange={(value) => onUpdate({ currency: value as 'USD' | 'EUR' | 'GBP' })}
              >
                <SelectTrigger className="mt-2 bg-white/5 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price Display Options */}
          <div>
            <Label className="text-white">Price Visibility</Label>
            <RadioGroup
              value={data.priceDisplay || 'show_price'}
              onValueChange={(value) => onUpdate({ priceDisplay: value as 'show_price' | 'price_range' | 'verified_users_only' })}
              className="mt-2 space-y-2"
            >
              {priceDisplayOptions.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="text-white font-medium cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-white/60 text-sm mt-1">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {data.priceDisplay === 'verified_users_only' && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-400 text-sm">
                Price will only be visible to verified buyers. This may reduce overall inquiries but increases quality leads.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Accepted Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div key={method.key} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Checkbox
                  id={method.key}
                  checked={data.paymentMethods?.[method.key as keyof typeof data.paymentMethods] || false}
                  onCheckedChange={(checked) => handlePaymentMethodChange(method.key, checked as boolean)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label htmlFor={method.key} className="text-white font-medium cursor-pointer">
                    {method.label}
                  </Label>
                  <p className="text-white/60 text-sm mt-1">{method.description}</p>
                </div>
              </div>
            ))}
          </div>

          {data.paymentMethods?.ownerFinancing && (
            <div>
              <Label htmlFor="paymentTerms" className="text-white">
                Owner Financing Terms
              </Label>
              <Textarea
                id="paymentTerms"
                placeholder="Describe your financing terms, down payment requirements, interest rates, etc."
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
          disabled={!data.askingPrice && data.priceDisplay !== 'verified_users_only'}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white disabled:opacity-50"
        >
          Continue to Horse Profile
        </Button>
      </div>
    </div>
  );
};

export default PricingTermsStep;