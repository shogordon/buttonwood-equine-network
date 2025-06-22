
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ProsConsStep = ({ data, onUpdate }: StepProps) => {
  const [formData, setFormData] = useState({
    pros: data.pros || [''],
    cons: data.cons || [''],
  });

  const handleChange = (field: 'pros' | 'cons', index: number, value: string) => {
    const updated = { ...formData };
    updated[field][index] = value;
    setFormData(updated);
    onUpdate(updated);
  };

  const addItem = (field: 'pros' | 'cons') => {
    const updated = { ...formData };
    updated[field].push('');
    setFormData(updated);
    onUpdate(updated);
  };

  const removeItem = (field: 'pros' | 'cons', index: number) => {
    const updated = { ...formData };
    updated[field].splice(index, 1);
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Pros & Cons</h2>
        <p className="text-white/60">Provide honest insights about your horse's strengths and considerations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pros Section */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-400">✅ Strengths & Pros</h3>
            <Button
              onClick={() => addItem('pros')}
              size="sm"
              className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {formData.pros.map((pro, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={pro}
                  onChange={(e) => handleChange('pros', index, e.target.value)}
                  placeholder={`Pro #${index + 1} - e.g., Excellent ground manners`}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[60px] flex-1"
                />
                {formData.pros.length > 1 && (
                  <Button
                    onClick={() => removeItem('pros', index)}
                    size="sm"
                    variant="outline"
                    className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 self-start"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cons Section */}
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-orange-400">⚠️ Considerations & Challenges</h3>
            <Button
              onClick={() => addItem('cons')}
              size="sm"
              className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-500/30"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {formData.cons.map((con, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={con}
                  onChange={(e) => handleChange('cons', index, e.target.value)}
                  placeholder={`Consideration #${index + 1} - e.g., Needs experienced rider`}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[60px] flex-1"
                />
                {formData.cons.length > 1 && (
                  <Button
                    onClick={() => removeItem('cons', index)}
                    size="sm"
                    variant="outline"
                    className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 self-start"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-white/60 text-sm">
        <p>Being honest about pros and cons builds trust with potential buyers and leads to better matches.</p>
      </div>
    </div>
  );
};

export default ProsConsStep;
