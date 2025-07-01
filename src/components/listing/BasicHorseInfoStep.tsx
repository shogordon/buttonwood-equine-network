
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

const BasicHorseInfoStep = ({ data, onUpdate }: StepProps) => {
  const [formData, setFormData] = useState({
    horseName: data.horseName || data.horse_name || '',
    sex: data.sex || '',
    breed: data.breed || '',
    height: data.height || '',
    yearOfBirth: data.yearOfBirth || '',
    location: data.location || '',
    color: data.color || '',
  });

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    
    // Update both horseName and horse_name for compatibility
    const updateData = { ...updated };
    if (field === 'horseName') {
      updateData.horse_name = value;
    }
    
    onUpdate(updateData);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Basic Horse Information</h2>
        <p className="text-white/60">Tell us about your horse's basic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="horseName" className="text-white mb-2 block">Horse Name *</Label>
          <Input
            id="horseName"
            value={formData.horseName}
            onChange={(e) => handleChange('horseName', e.target.value)}
            placeholder="Enter horse's name"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
            required
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
    </div>
  );
};

export default BasicHorseInfoStep;
