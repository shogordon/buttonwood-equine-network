
import { useState } from "react";
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

const disciplineOptions = [
  { value: 'dressage', label: 'Dressage' },
  { value: 'jumping', label: 'Show Jumping' },
  { value: 'eventing', label: 'Eventing' },
  { value: 'western', label: 'Western' },
  { value: 'trail', label: 'Trail Riding' },
  { value: 'racing', label: 'Racing' },
  { value: 'other', label: 'Other' },
];

const temperamentOptions = [
  'Calm', 'Energetic', 'Gentle', 'Spirited', 'Willing', 'Sensitive', 'Bold', 'Quiet', 'Forward', 'Steady'
];

const rideabilityOptions = [
  'Point and shoot', 'Push ride', 'Sensitive', 'Forgiving', 'Requires leg', 'Responds to seat', 'Hot', 'Lazy', 'Balanced', 'Athletic'
];

const TagsFiltersStep = ({ data, onUpdate }: StepProps) => {
  const [formData, setFormData] = useState({
    disciplines: data.disciplines || [],
    experienceLevel: data.experienceLevel || '',
    temperament: data.temperament || [],
    rideability: data.rideability || [],
  });

  const handleDisciplineChange = (discipline: string, checked: boolean) => {
    const updated = { ...formData };
    if (checked) {
      updated.disciplines = [...updated.disciplines, discipline];
    } else {
      updated.disciplines = updated.disciplines.filter((d: string) => d !== discipline);
    }
    setFormData(updated);
    onUpdate(updated);
  };

  const handleTagChange = (field: 'temperament' | 'rideability', tag: string, checked: boolean) => {
    const updated = { ...formData };
    if (checked) {
      updated[field] = [...updated[field], tag];
    } else {
      updated[field] = updated[field].filter((t: string) => t !== tag);
    }
    setFormData(updated);
    onUpdate(updated);
  };

  const handleExperienceLevelChange = (value: string) => {
    const updated = { ...formData, experienceLevel: value };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Tags & Suitability</h2>
        <p className="text-white/60">Help buyers find your horse with relevant tags and experience requirements</p>
      </div>

      <Card className="bg-white/5 border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Disciplines</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {disciplineOptions.map((discipline) => (
            <div key={discipline.value} className="flex items-center space-x-2">
              <Checkbox
                id={discipline.value}
                checked={formData.disciplines.includes(discipline.value)}
                onCheckedChange={(checked) => handleDisciplineChange(discipline.value, checked as boolean)}
              />
              <Label htmlFor={discipline.value} className="text-white text-sm">
                {discipline.label}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-white/5 border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Rider Experience Level</h3>
        <Select value={formData.experienceLevel} onValueChange={handleExperienceLevelChange}>
          <SelectTrigger className="bg-white/5 border-white/20 text-white">
            <SelectValue placeholder="Select suitable experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      <Card className="bg-white/5 border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Temperament</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {temperamentOptions.map((temperament) => (
            <div key={temperament} className="flex items-center space-x-2">
              <Checkbox
                id={`temperament-${temperament}`}
                checked={formData.temperament.includes(temperament)}
                onCheckedChange={(checked) => handleTagChange('temperament', temperament, checked as boolean)}
              />
              <Label htmlFor={`temperament-${temperament}`} className="text-white text-sm">
                {temperament}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-white/5 border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Rideability</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {rideabilityOptions.map((rideability) => (
            <div key={rideability} className="flex items-center space-x-2">
              <Checkbox
                id={`rideability-${rideability}`}
                checked={formData.rideability.includes(rideability)}
                onCheckedChange={(checked) => handleTagChange('rideability', rideability, checked as boolean)}
              />
              <Label htmlFor={`rideability-${rideability}`} className="text-white text-sm">
                {rideability}
              </Label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TagsFiltersStep;
