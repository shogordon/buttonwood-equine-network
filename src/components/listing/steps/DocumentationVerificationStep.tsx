import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Award, Zap, Lightbulb, Shield, Plus, Trash2 } from "lucide-react";
import { ListingData } from "@/types/listing";

interface DocumentationVerificationStepProps {
  data: Partial<ListingData>;
  onUpdate: (data: Partial<ListingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSaveDraft: () => void;
}

const DocumentationVerificationStep = ({ data, onUpdate, onNext, onPrev }: DocumentationVerificationStepProps) => {
  const handleMicrochipChange = (field: string, value: string | boolean) => {
    const currentMicrochip = data.microchip || { number: '', required: false };
    onUpdate({ 
      microchip: { ...currentMicrochip, [field]: value }
    });
  };

  const handleSportRegistryChange = (index: number, field: string, value: string) => {
    const currentRegistries = data.sportRegistries || [];
    const updatedRegistries = [...currentRegistries];
    if (!updatedRegistries[index]) {
      updatedRegistries[index] = { registry: '', number: '', other: '' };
    }
    updatedRegistries[index] = { ...updatedRegistries[index], [field]: value };
    onUpdate({ sportRegistries: updatedRegistries });
  };

  const addSportRegistry = () => {
    const currentRegistries = data.sportRegistries || [];
    onUpdate({ 
      sportRegistries: [...currentRegistries, { registry: '', number: '', other: '' }]
    });
  };

  const removeSportRegistry = (index: number) => {
    const currentRegistries = data.sportRegistries || [];
    const updatedRegistries = currentRegistries.filter((_, i) => i !== index);
    onUpdate({ sportRegistries: updatedRegistries });
  };

  const handleBreedRegistryChange = (index: number, field: string, value: string) => {
    const currentRegistries = data.breedRegistries || [];
    const updatedRegistries = [...currentRegistries];
    if (!updatedRegistries[index]) {
      updatedRegistries[index] = { registry: '', number: '', other: '' };
    }
    updatedRegistries[index] = { ...updatedRegistries[index], [field]: value };
    onUpdate({ breedRegistries: updatedRegistries });
  };

  const addBreedRegistry = () => {
    const currentRegistries = data.breedRegistries || [];
    onUpdate({ 
      breedRegistries: [...currentRegistries, { registry: '', number: '', other: '' }]
    });
  };

  const removeBreedRegistry = (index: number) => {
    const currentRegistries = data.breedRegistries || [];
    const updatedRegistries = currentRegistries.filter((_, i) => i !== index);
    onUpdate({ breedRegistries: updatedRegistries });
  };

  const handleMedicalRecordsChange = (field: string, value: any) => {
    const currentMedical = data.medicalRecords || {
      surveyRadiographs: { hasRads: false, files: [], report: '', date: '' },
      medicalHistory: '',
      currentlyInsured: false,
      insuranceCompany: '',
      specialShoeing: '',
      dietRestrictions: '',
      visibility: '',
    };
    
    if (field.startsWith('surveyRadiographs.')) {
      const subField = field.replace('surveyRadiographs.', '');
      onUpdate({ 
        medicalRecords: { 
          ...currentMedical, 
          surveyRadiographs: { ...currentMedical.surveyRadiographs, [subField]: value }
        }
      });
    } else {
      onUpdate({ 
        medicalRecords: { ...currentMedical, [field]: value }
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Documentation & Verification</h2>
        <p className="text-white/70">Complete documentation builds buyer confidence</p>
      </div>

      {/* Best Practice Tip */}
      <Card className="bg-blue-500/10 border-blue-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-blue-400 font-semibold mb-1">Documentation Matters</h4>
              <p className="text-white/80 text-sm">
                Complete documentation increases buyer confidence and can add 15-25% to your horse's value. Microchipping is required for verified listings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Microchip - Mandatory for Verified Listings */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Microchip Information
            <Badge variant="destructive" className="ml-2">Required for Verification</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="microchipNumber" className="text-white">
              Microchip Number <span className="text-red-400">*</span>
            </Label>
            <Input
              id="microchipNumber"
              placeholder="Enter 15-digit microchip number"
              value={data.microchip?.number || ''}
              onChange={(e) => handleMicrochipChange('number', e.target.value)}
              className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="microchipRequired"
              checked={data.microchip?.required || false}
              onCheckedChange={(checked) => handleMicrochipChange('required', checked as boolean)}
            />
            <Label htmlFor="microchipRequired" className="text-white cursor-pointer">
              This microchip is verified and required for listing verification
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Sport Registries Table */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="h-5 w-5" />
            Sport Registries
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-white/60 text-sm">Add sport registrations and membership numbers</p>
            <Button
              type="button"
              onClick={addSportRegistry}
              variant="outline"
              size="sm"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Registry
            </Button>
          </div>
          
          {data.sportRegistries?.map((registry, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-lg bg-white/5">
              <Select
                value={registry.registry}
                onValueChange={(value) => handleSportRegistryChange(index, 'registry', value)}
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select registry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USEF">USEF</SelectItem>
                  <SelectItem value="FEI">FEI</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              
              {registry.registry === 'Other' && (
                <Input
                  placeholder="Registry name"
                  value={registry.other || ''}
                  onChange={(e) => handleSportRegistryChange(index, 'other', e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-white/40"
                />
              )}
              
              <Input
                placeholder="Registration number"
                value={registry.number}
                onChange={(e) => handleSportRegistryChange(index, 'number', e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder-white/40"
              />
              
              <Button
                type="button"
                onClick={() => removeSportRegistry(index)}
                variant="outline"
                size="sm"
                className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {(!data.sportRegistries || data.sportRegistries.length === 0) && (
            <div className="text-center py-6 text-white/40">
              No sport registries added yet. Click "Add Registry" to get started.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Breed Registries Table */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Breed Registries
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-white/60 text-sm">Add breed registration papers and numbers</p>
            <Button
              type="button"
              onClick={addBreedRegistry}
              variant="outline"
              size="sm"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Registry
            </Button>
          </div>
          
          {data.breedRegistries?.map((registry, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-lg bg-white/5">
              <Select
                value={registry.registry}
                onValueChange={(value) => handleBreedRegistryChange(index, 'registry', value)}
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select registry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AQHA">AQHA</SelectItem>
                  <SelectItem value="Jockey Club">Jockey Club</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              
              {registry.registry === 'Other' && (
                <Input
                  placeholder="Registry name"
                  value={registry.other || ''}
                  onChange={(e) => handleBreedRegistryChange(index, 'other', e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-white/40"
                />
              )}
              
              <Input
                placeholder="Registration number"
                value={registry.number}
                onChange={(e) => handleBreedRegistryChange(index, 'number', e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder-white/40"
              />
              
              <Button
                type="button"
                onClick={() => removeBreedRegistry(index)}
                variant="outline"
                size="sm"
                className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {(!data.breedRegistries || data.breedRegistries.length === 0) && (
            <div className="text-center py-6 text-white/40">
              No breed registries added yet. Click "Add Registry" to get started.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Medical Records */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Medical Records
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Survey Radiographs */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Survey Radiographs (X-rays)</h4>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="hasRads"
                checked={data.medicalRecords?.surveyRadiographs?.hasRads || false}
                onCheckedChange={(checked) => handleMedicalRecordsChange('surveyRadiographs.hasRads', checked as boolean)}
              />
              <Label htmlFor="hasRads" className="text-white cursor-pointer">
                Survey radiographs available
              </Label>
            </div>
            
            {data.medicalRecords?.surveyRadiographs?.hasRads && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                <div>
                  <Label htmlFor="radsDate" className="text-white">Date of X-rays</Label>
                  <Input
                    id="radsDate"
                    type="date"
                    value={data.medicalRecords?.surveyRadiographs?.date || ''}
                    onChange={(e) => handleMedicalRecordsChange('surveyRadiographs.date', e.target.value)}
                    className="mt-2 bg-white/5 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Upload Files</Label>
                  <p className="text-white/60 text-sm mt-1">Upload X-ray images and reports</p>
                </div>
              </div>
            )}
          </div>

          {/* Medical History */}
          <div>
            <Label htmlFor="medicalHistory" className="text-white">Medical History</Label>
            <Textarea
              id="medicalHistory"
              placeholder="Describe any injuries, surgeries, ongoing conditions, or special care needs"
              value={data.medicalRecords?.medicalHistory || ''}
              onChange={(e) => handleMedicalRecordsChange('medicalHistory', e.target.value)}
              className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              rows={3}
            />
          </div>

          {/* Insurance */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="currentlyInsured"
                checked={data.medicalRecords?.currentlyInsured || false}
                onCheckedChange={(checked) => handleMedicalRecordsChange('currentlyInsured', checked as boolean)}
              />
              <Label htmlFor="currentlyInsured" className="text-white cursor-pointer">
                Currently insured
              </Label>
            </div>
            
            {data.medicalRecords?.currentlyInsured && (
              <Input
                placeholder="Insurance company name"
                value={data.medicalRecords?.insuranceCompany || ''}
                onChange={(e) => handleMedicalRecordsChange('insuranceCompany', e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            )}
          </div>

          {/* Special Care */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="specialShoeing" className="text-white">Special Shoeing Requirements</Label>
              <Input
                id="specialShoeing"
                placeholder="e.g., bar shoes, therapeutic shoeing"
                value={data.medicalRecords?.specialShoeing || ''}
                onChange={(e) => handleMedicalRecordsChange('specialShoeing', e.target.value)}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            </div>
            <div>
              <Label htmlFor="dietRestrictions" className="text-white">Diet Restrictions</Label>
              <Input
                id="dietRestrictions"
                placeholder="e.g., no alfalfa, grain-free"
                value={data.medicalRecords?.dietRestrictions || ''}
                onChange={(e) => handleMedicalRecordsChange('dietRestrictions', e.target.value)}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            </div>
          </div>

          {/* Visibility Controls */}
          <div>
            <Label className="text-white">Medical Record Visibility</Label>
            <RadioGroup
              value={data.medicalRecords?.visibility || ''}
              onValueChange={(value) => handleMedicalRecordsChange('visibility', value)}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public-medical" />
                <Label htmlFor="public-medical" className="text-white">Public - visible to all</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="on_request" id="request-medical" />
                <Label htmlFor="request-medical" className="text-white">On request - shared with serious buyers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hidden" id="hidden-medical" />
                <Label htmlFor="hidden-medical" className="text-white">Hidden - not shared</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Competition Records */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Competition & Show Records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="showRecord" className="text-white">Competition History</Label>
            <Textarea
              id="showRecord"
              placeholder="List significant wins, placements, or competitive achievements with dates and venues"
              value={data.showRecord || ''}
              onChange={(e) => onUpdate({ showRecord: e.target.value })}
              className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="earnings" className="text-white">Lifetime Earnings (if applicable)</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">$</span>
              <Input
                id="earnings"
                type="number"
                placeholder="Total prize money earned"
                value={data.earnings || ''}
                onChange={(e) => onUpdate({ earnings: parseFloat(e.target.value) || null })}
                className="pl-8 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            </div>
          </div>

          <div>
            <Label className="text-white">Upload Competition Files</Label>
            <p className="text-white/60 text-sm mt-1">
              Upload show records, awards, or other competition documentation
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationVerificationStep;