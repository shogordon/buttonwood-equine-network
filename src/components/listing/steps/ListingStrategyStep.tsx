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
    { key: 'sale', label: 'For Sale', description: 'Permanent ownership transfer' },
    { key: 'lease', label: 'Full Lease', description: 'Complete care and use agreement' },
    { key: 'partialLease', label: 'Partial Lease', description: 'On-site shared use arrangement' },
    { key: 'showLease', label: 'Show Lease', description: 'Weekly show leases for competitions' },
    { key: 'breeding', label: 'Breeding', description: 'Stud services or broodmare' },
  ];

  const handleListingTypeChange = (typeKey: string, checked: boolean) => {
    const currentTypes = data.listingTypes || {
      sale: false,
      lease: false,
      partialLease: false,
      showLease: false,
      breeding: false,
    };
    onUpdate({ 
      listingTypes: { ...currentTypes, [typeKey]: checked }
    });
  };

  const handleTrialOptionChange = (optionKey: string, value: boolean | string) => {
    const currentOptions = data.trialOptions || {
      onSiteTrials: false,
      offSiteTrials: '',
      vetCheckWelcome: false,
    };
    onUpdate({ 
      trialOptions: { ...currentOptions, [optionKey]: value }
    });
  };

  const handleLocationChange = (field: string, value: string) => {
    const currentLocations = data.locations || {
      summerStable: '',
      winterStable: '',
      upcomingShows: [],
    };
    onUpdate({ 
      locations: { ...currentLocations, [field]: value }
    });
  };

  const handleShowChange = (index: number, field: string, value: string) => {
    const currentLocations = data.locations || {
      summerStable: '',
      winterStable: '',
      upcomingShows: [],
    };
    const updatedShows = [...currentLocations.upcomingShows];
    if (!updatedShows[index]) {
      updatedShows[index] = { show: '', dates: '', location: '' };
    }
    updatedShows[index] = { ...updatedShows[index], [field]: value };
    onUpdate({ 
      locations: { ...currentLocations, upcomingShows: updatedShows }
    });
  };

  const addShow = () => {
    const currentLocations = data.locations || {
      summerStable: '',
      winterStable: '',
      upcomingShows: [],
    };
    onUpdate({ 
      locations: { 
        ...currentLocations, 
        upcomingShows: [...currentLocations.upcomingShows, { show: '', dates: '', location: '' }]
      }
    });
  };

  const removeShow = (index: number) => {
    const currentLocations = data.locations || {
      summerStable: '',
      winterStable: '',
      upcomingShows: [],
    };
    const updatedShows = currentLocations.upcomingShows.filter((_, i) => i !== index);
    onUpdate({ 
      locations: { ...currentLocations, upcomingShows: updatedShows }
    });
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
            <div key={type.key} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Checkbox
                id={type.key}
                checked={data.listingTypes?.[type.key as keyof typeof data.listingTypes] || false}
                onCheckedChange={(checked) => handleListingTypeChange(type.key, checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor={type.key} className="text-white font-medium cursor-pointer">
                  {type.label}
                </Label>
                <p className="text-white/60 text-sm mt-1">{type.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trial Options */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Trial Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="onSiteTrials"
              checked={data.trialOptions?.onSiteTrials || false}
              onCheckedChange={(checked) => handleTrialOptionChange('onSiteTrials', checked as boolean)}
            />
            <Label htmlFor="onSiteTrials" className="text-white cursor-pointer">
              On-site trials available
            </Label>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Off-site trials</Label>
            <RadioGroup
              value={data.trialOptions?.offSiteTrials || ''}
              onValueChange={(value) => handleTrialOptionChange('offSiteTrials', value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no-offsite" />
                <Label htmlFor="no-offsite" className="text-white">No off-site trials</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes-offsite" />
                <Label htmlFor="yes-offsite" className="text-white">Yes, off-site trials allowed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="for_fee" id="fee-offsite" />
                <Label htmlFor="fee-offsite" className="text-white">For a fee</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="vetCheckWelcome"
              checked={data.trialOptions?.vetCheckWelcome || false}
              onCheckedChange={(checked) => handleTrialOptionChange('vetCheckWelcome', checked as boolean)}
            />
            <Label htmlFor="vetCheckWelcome" className="text-white cursor-pointer">
              Vet check welcome
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Location Information */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Stable & Show Locations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="summerStable" className="text-white">
                Summer Stable ZIP Code <span className="text-red-400">*</span>
              </Label>
              <Input
                id="summerStable"
                placeholder="e.g., 12345"
                value={data.locations?.summerStable || ''}
                onChange={(e) => handleLocationChange('summerStable', e.target.value)}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            </div>
            <div>
              <Label htmlFor="winterStable" className="text-white">
                Winter Stable ZIP Code (Optional)
              </Label>
              <Input
                id="winterStable"
                placeholder="e.g., 54321"
                value={data.locations?.winterStable || ''}
                onChange={(e) => handleLocationChange('winterStable', e.target.value)}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-white">Upcoming Shows</Label>
              <Button
                type="button"
                onClick={addShow}
                variant="outline"
                size="sm"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                Add Show
              </Button>
            </div>
            {data.locations?.upcomingShows?.map((show, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3 p-3 rounded-lg bg-white/5">
                <Input
                  placeholder="Show name"
                  value={show.show}
                  onChange={(e) => handleShowChange(index, 'show', e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-white/40"
                />
                <Input
                  placeholder="Dates"
                  value={show.dates}
                  onChange={(e) => handleShowChange(index, 'dates', e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-white/40"
                />
                <Input
                  placeholder="Location"
                  value={show.location}
                  onChange={(e) => handleShowChange(index, 'location', e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-white/40"
                />
                <Button
                  type="button"
                  onClick={() => removeShow(index)}
                  variant="outline"
                  size="sm"
                  className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Terms */}
      {(data.trialOptions?.onSiteTrials || data.trialOptions?.offSiteTrials === 'yes' || data.trialOptions?.offSiteTrials === 'for_fee' || data.listingTypes?.lease || data.listingTypes?.partialLease || data.listingTypes?.showLease) && (
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