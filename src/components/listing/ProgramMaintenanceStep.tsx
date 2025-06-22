
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const programOptions = [
  'Daily turnout', 'Stall board', 'Pasture board', 'Training program', 'Regular lessons', 
  'Show schedule', 'Trail access', 'Indoor arena', 'Outdoor arena', 'Round pen'
];

const maintenanceOptions = [
  'Easy keeper', 'Hard keeper', 'Requires blanketing', 'Shoes regularly', 'Barefoot', 
  'Special diet', 'Joint supplements', 'Regular vet care', 'Dental care', 'Worming schedule'
];

const ProgramMaintenanceStep = ({ data, onUpdate }: StepProps) => {
  const [formData, setFormData] = useState({
    programDetails: data.programDetails || [],
    programNotes: data.programNotes || '',
    maintenanceDetails: data.maintenanceDetails || [],
    maintenanceNotes: data.maintenanceNotes || '',
  });

  const handleProgramChange = (program: string, checked: boolean) => {
    const updated = { ...formData };
    if (checked) {
      updated.programDetails = [...updated.programDetails, program];
    } else {
      updated.programDetails = updated.programDetails.filter((p: string) => p !== program);
    }
    setFormData(updated);
    onUpdate(updated);
  };

  const handleMaintenanceChange = (maintenance: string, checked: boolean) => {
    const updated = { ...formData };
    if (checked) {
      updated.maintenanceDetails = [...updated.maintenanceDetails, maintenance];
    } else {
      updated.maintenanceDetails = updated.maintenanceDetails.filter((m: string) => m !== maintenance);
    }
    setFormData(updated);
    onUpdate(updated);
  };

  const handleNotesChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Program & Maintenance</h2>
        <p className="text-white/60">Share details about your horse's current program and care requirements</p>
      </div>

      <Card className="bg-white/5 border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Current Program</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {programOptions.map((program) => (
            <div key={program} className="flex items-center space-x-2">
              <Checkbox
                id={`program-${program}`}
                checked={formData.programDetails.includes(program)}
                onCheckedChange={(checked) => handleProgramChange(program, checked as boolean)}
              />
              <Label htmlFor={`program-${program}`} className="text-white text-sm">
                {program}
              </Label>
            </div>
          ))}
        </div>
        
        <div>
          <Label htmlFor="programNotes" className="text-white mb-2 block">Additional Program Details</Label>
          <Textarea
            id="programNotes"
            value={formData.programNotes}
            onChange={(e) => handleNotesChange('programNotes', e.target.value)}
            placeholder="Describe the horse's current training program, schedule, or any special arrangements"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
          />
        </div>
      </Card>

      <Card className="bg-white/5 border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Care & Maintenance</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {maintenanceOptions.map((maintenance) => (
            <div key={maintenance} className="flex items-center space-x-2">
              <Checkbox
                id={`maintenance-${maintenance}`}
                checked={formData.maintenanceDetails.includes(maintenance)}
                onCheckedChange={(checked) => handleMaintenanceChange(maintenance, checked as boolean)}
              />
              <Label htmlFor={`maintenance-${maintenance}`} className="text-white text-sm">
                {maintenance}
              </Label>
            </div>
          ))}
        </div>
        
        <div>
          <Label htmlFor="maintenanceNotes" className="text-white mb-2 block">Additional Care Requirements</Label>
          <Textarea
            id="maintenanceNotes"
            value={formData.maintenanceNotes}
            onChange={(e) => handleNotesChange('maintenanceNotes', e.target.value)}
            placeholder="Describe any special care requirements, feeding needs, or maintenance considerations"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
          />
        </div>
      </Card>
    </div>
  );
};

export default ProgramMaintenanceStep;
