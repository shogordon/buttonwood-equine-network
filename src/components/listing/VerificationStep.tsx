
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Shield, Award, FileText } from "lucide-react";

interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const VerificationStep = ({ data, onUpdate }: StepProps) => {
  const [formData, setFormData] = useState({
    showRecord: data.showRecord || '',
    pedigree: data.pedigree || '',
    healthRecords: data.healthRecords || '',
    hasRegistrationPapers: data.hasRegistrationPapers || false,
    hasCoggins: data.hasCoggins || false,
    hasHealthCertificate: data.hasHealthCertificate || false,
    hasInsurance: data.hasInsurance || false,
    verificationRequested: data.verificationRequested || false,
  });

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Verification & Records</h2>
        <p className="text-white/60">Provide additional details that build buyer confidence</p>
      </div>

      <Card className="bg-white/5 border-white/10 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Show Record & Accomplishments</h3>
        </div>
        <Textarea
          value={formData.showRecord}
          onChange={(e) => handleChange('showRecord', e.target.value)}
          placeholder="List any show results, awards, or competitive accomplishments. Include dates, venues, and placing if available."
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
        />
      </Card>

      <Card className="bg-white/5 border-white/10 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Pedigree Information</h3>
        </div>
        <Textarea
          value={formData.pedigree}
          onChange={(e) => handleChange('pedigree', e.target.value)}
          placeholder="Provide pedigree details including sire, dam, and notable bloodlines if known."
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
        />
      </Card>

      <Card className="bg-white/5 border-white/10 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Health Records</h3>
        </div>
        <Textarea
          value={formData.healthRecords}
          onChange={(e) => handleChange('healthRecords', e.target.value)}
          placeholder="Describe vaccination history, recent vet work, any ongoing health considerations, or special care needs."
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
        />
      </Card>

      <Card className="bg-white/5 border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Documentation Available</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasRegistrationPapers"
              checked={formData.hasRegistrationPapers}
              onCheckedChange={(checked) => handleChange('hasRegistrationPapers', checked)}
            />
            <Label htmlFor="hasRegistrationPapers" className="text-white">
              Registration papers available
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasCoggins"
              checked={formData.hasCoggins}
              onCheckedChange={(checked) => handleChange('hasCoggins', checked)}
            />
            <Label htmlFor="hasCoggins" className="text-white">
              Current Coggins test
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasHealthCertificate"
              checked={formData.hasHealthCertificate}
              onCheckedChange={(checked) => handleChange('hasHealthCertificate', checked)}
            />
            <Label htmlFor="hasHealthCertificate" className="text-white">
              Health certificate available
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasInsurance"
              checked={formData.hasInsurance}
              onCheckedChange={(checked) => handleChange('hasInsurance', checked)}
            />
            <Label htmlFor="hasInsurance" className="text-white">
              Insurance coverage current
            </Label>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/20 p-6">
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox
            id="verificationRequested"
            checked={formData.verificationRequested}
            onCheckedChange={(checked) => handleChange('verificationRequested', checked)}
          />
          <Label htmlFor="verificationRequested" className="text-white font-semibold">
            Request Bluebook Verification Badge
          </Label>
        </div>
        <p className="text-white/60 text-sm ml-6">
          Our team will review your listing and documentation to award a verification badge, 
          increasing buyer confidence and visibility.
        </p>
      </Card>
    </div>
  );
};

export default VerificationStep;
