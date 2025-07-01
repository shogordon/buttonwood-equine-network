
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const EnhancedHorseDetailsStep = ({ data, onUpdate }: StepProps) => {
  const [formData, setFormData] = useState({
    registeredName: data.registeredName || '',
    barnName: data.barnName || data.horseName || '',
    breed: data.breed || '',
    sex: data.sex || '',
    height: data.height || '',
    color: data.color || '',
    yearOfBirth: data.yearOfBirth || '',
    sire: data.sire || '',
    dam: data.dam || '',
    damsire: data.damsire || '',
    papersStatus: data.papersStatus || '',
    location: data.location || data.currentLocation || '',
  });

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Horse Details</h2>
        <p className="text-white/60">Complete information about your horse</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="registeredName" className="text-white mb-2 block">Registered name</Label>
          <Input
            id="registeredName"
            value={formData.registeredName}
            onChange={(e) => handleChange('registeredName', e.target.value)}
            placeholder="Official registered name"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div>
          <Label htmlFor="barnName" className="text-white mb-2 block">Barn name *</Label>
          <Input
            id="barnName"
            value={formData.barnName}
            onChange={(e) => handleChange('barnName', e.target.value)}
            placeholder="What they're called at the barn"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
            required
          />
        </div>

        <div>
          <Label htmlFor="breed" className="text-white mb-2 block">Breed</Label>
          <Input
            id="breed"
            value={formData.breed}
            onChange={(e) => handleChange('breed', e.target.value)}
            placeholder="e.g., Thoroughbred, Warmblood"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div>
          <Label htmlFor="sex" className="text-white mb-2 block">Sex *</Label>
          <Select value={formData.sex} onValueChange={(value) => handleChange('sex', value)}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Select sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mare">Mare</SelectItem>
              <SelectItem value="gelding">Gelding</SelectItem>
              <SelectItem value="stallion">Stallion</SelectItem>
              <SelectItem value="filly">Filly</SelectItem>
              <SelectItem value="colt">Colt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="height" className="text-white mb-2 block">Height (hands)</Label>
          <Input
            id="height"
            type="number"
            step="0.1"
            min="10"
            max="20"
            value={formData.height}
            onChange={(e) => handleChange('height', parseFloat(e.target.value) || '')}
            placeholder="e.g., 16.2"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div>
          <Label htmlFor="color" className="text-white mb-2 block">Color</Label>
          <Input
            id="color"
            value={formData.color}
            onChange={(e) => handleChange('color', e.target.value)}
            placeholder="e.g., Bay, Chestnut, Gray"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div>
          <Label htmlFor="yearOfBirth" className="text-white mb-2 block">Year of Birth</Label>
          <Select value={formData.yearOfBirth?.toString()} onValueChange={(value) => handleChange('yearOfBirth', parseInt(value))}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="papersStatus" className="text-white mb-2 block">Papers</Label>
          <Select value={formData.papersStatus} onValueChange={(value) => handleChange('papersStatus', value)}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Papers status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="location" className="text-white mb-2 block">Location *</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="City, State or general area"
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="sire" className="text-white mb-2 block">Sire (optional)</Label>
          <Input
            id="sire"
            value={formData.sire}
            onChange={(e) => handleChange('sire', e.target.value)}
            placeholder="Sire's name"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div>
          <Label htmlFor="dam" className="text-white mb-2 block">Dam (optional)</Label>
          <Input
            id="dam"
            value={formData.dam}
            onChange={(e) => handleChange('dam', e.target.value)}
            placeholder="Dam's name"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div>
          <Label htmlFor="damsire" className="text-white mb-2 block">Damsire (optional)</Label>
          <Input
            id="damsire"
            value={formData.damsire}
            onChange={(e) => handleChange('damsire', e.target.value)}
            placeholder="Damsire's name"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>
      </div>
    </div>
  );
};

export default EnhancedHorseDetailsStep;
