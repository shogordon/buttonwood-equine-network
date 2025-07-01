import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Award, Zap, Lightbulb } from "lucide-react";
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
  const paperTypes = [
    { value: 'full', label: 'Full Registration Papers', description: 'Complete breeding and ownership documentation' },
    { value: 'partial', label: 'Partial Papers', description: 'Limited registration or some documentation missing' },
    { value: 'none', label: 'No Papers', description: 'Grade horse or papers unavailable' },
    { value: 'pending', label: 'Transfer Pending', description: 'Papers exist but transfer in process' },
  ];

  const registrationBodies = [
    'AQHA (American Quarter Horse Association)',
    'USEF (United States Equestrian Federation)',
    'FEI (Fédération Equestre Internationale)',
    'USDF (United States Dressage Federation)',
    'APHA (American Paint Horse Association)',
    'AHA (Arabian Horse Association)',
    'Other',
  ];

  const handleRegistrationChange = (body: string, checked: boolean) => {
    const current = data.registrationBodies || [];
    const updated = checked 
      ? [...current, body]
      : current.filter(r => r !== body);
    onUpdate({ registrationBodies: updated });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Documentation & Verification</h2>
        <p className="text-white/70">Papers, registrations, and official records</p>
      </div>

      {/* Best Practice Tip */}
      <Card className="bg-blue-500/10 border-blue-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-blue-400 font-semibold mb-1">Documentation Matters</h4>
              <p className="text-white/80 text-sm">
                Complete documentation increases buyer confidence and can add 15-25% to your horse's value. Be transparent about what you have.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Papers Status */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Registration Papers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.papersStatus || ''}
            onValueChange={(value: "full" | "partial" | "none" | "pending") => onUpdate({ papersStatus: value })}
            className="space-y-4"
          >
            {paperTypes.map((type) => (
              <div key={type.value} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <RadioGroupItem value={type.value} id={type.value} className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor={type.value} className="text-white font-medium cursor-pointer">
                    {type.label}
                  </Label>
                  <p className="text-white/60 text-sm mt-1">{type.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>

          {data.papersStatus === 'partial' && (
            <div className="mt-4">
              <Label htmlFor="papersDetails" className="text-white">
                Explain what documentation you have
              </Label>
              <Textarea
                id="papersDetails"
                placeholder="e.g., Have breeding records but no ownership transfer, etc."
                value={data.papersDetails || ''}
                onChange={(e) => onUpdate({ papersDetails: e.target.value })}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
                rows={2}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Registration Bodies */}
      {data.papersStatus && data.papersStatus !== 'none' && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="h-5 w-5" />
              Registration Bodies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {registrationBodies.map((body) => (
              <div key={body} className="flex items-center space-x-3">
                <Checkbox
                  id={body}
                  checked={data.registrationBodies?.includes(body) || false}
                  onCheckedChange={(checked) => handleRegistrationChange(body, checked as boolean)}
                />
                <Label htmlFor={body} className="text-white cursor-pointer">
                  {body}
                </Label>
              </div>
            ))}
            
            {data.registrationBodies?.includes('Other') && (
              <Input
                placeholder="Specify other registration body"
                value={data.otherRegistration || ''}
                onChange={(e) => onUpdate({ otherRegistration: e.target.value })}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Microchip & Identification */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Identification & Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="microchipped"
              checked={data.microchipped || false}
              onCheckedChange={(checked) => onUpdate({ microchipped: checked as boolean })}
            />
            <Label htmlFor="microchipped" className="text-white cursor-pointer">
              Horse is microchipped
            </Label>
          </div>

          {data.microchipped && (
            <div>
              <Label htmlFor="microchipNumber" className="text-white">
                Microchip Number
              </Label>
              <Input
                id="microchipNumber"
                placeholder="Enter microchip number"
                value={data.microchipNumber || ''}
                onChange={(e) => onUpdate({ microchipNumber: e.target.value })}
                className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              />
            </div>
          )}

          <div>
            <Label htmlFor="markings" className="text-white">
              Identifying Markings
            </Label>
            <Textarea
              id="markings"
              placeholder="Describe unique markings, scars, or identifying features"
              value={data.markings || ''}
              onChange={(e) => onUpdate({ markings: e.target.value })}
              className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              rows={2}
            />
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
            <Label htmlFor="showRecord" className="text-white">
              Competition History
            </Label>
            <Textarea
              id="showRecord"
              placeholder="List significant wins, placements, or competitive achievements"
              value={data.showRecord || ''}
              onChange={(e) => onUpdate({ showRecord: e.target.value })}
              className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="earnings" className="text-white">
              Lifetime Earnings (if applicable)
            </Label>
            <Input
              id="earnings"
              type="number"
              placeholder="Total prize money earned"
              value={data.earnings || ''}
              onChange={(e) => onUpdate({ earnings: parseFloat(e.target.value) || null })}
              className="mt-2 bg-white/5 border-white/20 text-white placeholder-white/40"
            />
          </div>
        </CardContent>
      </Card>

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
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        >
          Continue to Pricing
        </Button>
      </div>
    </div>
  );
};

export default DocumentationVerificationStep;