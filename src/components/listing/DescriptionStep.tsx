
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const DescriptionStep = ({ data, onUpdate }: StepProps) => {
  const [formData, setFormData] = useState({
    description: data.description || '',
  });

  const handleChange = (value: string) => {
    const updated = { description: value };
    setFormData(updated);
    onUpdate(updated);
  };

  const generateAIDescription = () => {
    // Placeholder for AI-generated description
    const sampleDescription = `This exceptional horse combines athletic ability with a wonderful temperament, making them suitable for a variety of disciplines. Well-trained and responsive, they demonstrate excellent ground manners and are a pleasure to work with. Their balanced conformation and natural movement make them a standout prospect for any serious rider looking for their next partner.

Currently in a comprehensive training program, this horse shows great potential and continues to develop their skills. They are healthy, well-maintained, and ready to continue their journey with the right partner.

Perfect for someone looking for [specific discipline/level] and seeking a horse with both talent and character.`;
    
    handleChange(sampleDescription);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Description</h2>
        <p className="text-white/60">Tell the story of your horse - what makes them special?</p>
      </div>

      <Card className="bg-white/5 border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <Label htmlFor="description" className="text-white text-lg font-semibold">
            Horse Description
          </Label>
          <Button
            onClick={generateAIDescription}
            variant="outline"
            size="sm"
            className="bg-purple-500/20 border-purple-500/30 text-purple-400 hover:bg-purple-500/30"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Assist
          </Button>
        </div>

        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write a compelling description of your horse. Include their personality, training level, accomplishments, and what makes them special. Be honest and detailed to attract the right buyers."
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[200px]"
        />

        <div className="mt-4 text-sm text-white/60">
          <p className="mb-2">💡 <strong>Tips for a great description:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Start with what makes your horse unique</li>
            <li>Include their training level and accomplishments</li>
            <li>Describe their personality and temperament</li>
            <li>Mention their ideal rider or home</li>
            <li>Be honest about any challenges or considerations</li>
            <li>Keep it engaging and easy to read</li>
          </ul>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <Card className="bg-green-500/10 border-green-500/20 p-4">
          <h4 className="text-green-400 font-semibold mb-2">Personality</h4>
          <p className="text-white/60 text-sm">Describe their character and temperament</p>
        </Card>
        <Card className="bg-blue-500/10 border-blue-500/20 p-4">
          <h4 className="text-blue-400 font-semibold mb-2">Abilities</h4>
          <p className="text-white/60 text-sm">Highlight their skills and training</p>
        </Card>
        <Card className="bg-purple-500/10 border-purple-500/20 p-4">
          <h4 className="text-purple-400 font-semibold mb-2">Future</h4>
          <p className="text-white/60 text-sm">What they could achieve with the right rider</p>
        </Card>
      </div>
    </div>
  );
};

export default DescriptionStep;
