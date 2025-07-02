import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, Clock } from "lucide-react";
import { ListingData } from "@/types/listing";

interface ListingStrategyStepProps {
  data: Partial<ListingData>;
  onUpdate: (data: Partial<ListingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSaveDraft: () => void;
}

const ListingStrategyStep = ({ data, onUpdate, onNext, onPrev, isFirst }: ListingStrategyStepProps) => {
  const listingTypes = [
    { value: 'for_sale', label: 'For Sale', description: 'Permanent ownership transfer' },
    { value: 'lease', label: 'Lease', description: 'Temporary use agreement' },
    { value: 'partial_lease', label: 'Partial Lease', description: 'Shared use arrangement' },
    { value: 'breeding', label: 'Breeding', description: 'Stud services or broodmare' },
  ];

  const trialOptions = [
    { value: 'trial_available', label: 'Trial Available', description: 'Allow buyers to try before purchasing' },
    { value: 'vet_check', label: 'Vet Check Welcome', description: 'Buyer can arrange pre-purchase exam' },
    { value: 'return_policy', label: 'Return Policy', description: 'Offer return window after sale' },
  ];

  const handleListingTypeChange = (typeValue: string, checked: boolean) => {
    const currentTypes = data.listingType || [];
    const updatedTypes = checked 
      ? [...currentTypes, typeValue]
      : currentTypes.filter(t => t !== typeValue);
    onUpdate({ listingType: updatedTypes });
  };

  const handleTrialOptionChange = (optionValue: string, checked: boolean) => {
    const currentOptions = data.trialOptions || [];
    const updatedOptions = checked 
      ? [...currentOptions, optionValue]
      : currentOptions.filter(o => o !== optionValue);
    onUpdate({ trialOptions: updatedOptions });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Listing Strategy</h2>
        <p className="text-white/70">Define how you want to market and sell your horse</p>
      </div>

      {/* Best Practice Tip */}
      <Card className="bg-blue-500/10 border-blue-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-blue-400 font-semibold mb-1">Pro Tip</h4>
              <p className="text-white/80 text-sm">
                Listings with multiple sale options (lease + sale) get 40% more inquiries. Consider offering trials to serious buyers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Listing Types */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5" />
            How do you want to list this horse?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {listingTypes.map((type) => (
            <div key={type.value} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Checkbox
                id={type.value}
                checked={data.listingType?.includes(type.value) || false}
                onCheckedChange={(checked) => handleListingTypeChange(type.value, checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor={type.value} className="text-white font-medium cursor-pointer">
                  {type.label}
                </Label>
                <p className="text-white/60 text-sm mt-1">{type.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trial and Guarantee Options */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Trial & Guarantee Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trialOptions.map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Checkbox
                id={option.value}
                checked={data.trialOptions?.includes(option.value) || false}
                onCheckedChange={(checked) => handleTrialOptionChange(option.value, checked as boolean)}
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
        </CardContent>
      </Card>

      {/* Special Terms */}
      {(data.trialOptions?.length > 0 || data.listingType?.includes('lease')) && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Special Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="specialTerms" className="text-white">
                Additional terms, restrictions, or requirements
              </Label>
              <Textarea
                id="specialTerms"
                placeholder="e.g., Trial period length, lease duration, insurance requirements..."
                value={data.specialTerms || ''}
                onChange={(e) => onUpdate({ specialTerms: e.target.value })}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
};

export default ListingStrategyStep;