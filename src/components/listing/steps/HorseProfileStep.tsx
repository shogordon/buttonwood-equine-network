import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageCircle, Sparkles, Lightbulb, Loader2, AlertCircle } from "lucide-react";
import { ListingData } from "@/types/listing";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { VoiceInput } from "@/components/listing/VoiceInput";

interface HorseProfileStepProps {
  data: Partial<ListingData>;
  onUpdate: (data: Partial<ListingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSaveDraft: () => void;
}

const HorseProfileStep = ({ data, onUpdate, onNext, onPrev }: HorseProfileStepProps) => {
  const [interviewMode, setInterviewMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const interviewQuestions = [
    `What makes ${data.horseName || 'your horse'} special as a riding horse?`,
    `What type of rider would be ideal for ${data.horseName || 'this horse'}?`,
    `Any quirks or special considerations buyers should know about?`,
    `What are ${data.horseName || 'your horse'}'s strongest disciplines?`,
    `How would you describe ${data.horseName || 'your horse'}'s personality?`,
  ];

  const handleNextQuestion = () => {
    if (currentResponse.trim()) {
      const newResponses = [...responses];
      newResponses[currentQuestion] = currentResponse;
      setResponses(newResponses);
      setCurrentResponse('');

      if (currentQuestion < interviewQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Generate profile from responses
        generateProfile(newResponses);
      }
    }
  };

  const generateProfile = async (answers: string[]) => {
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const { data: result, error } = await supabase.functions.invoke('generate-horse-profile', {
        body: {
          responses: answers,
          horseName: data.horseName || data.barnName || 'this horse',
          interviewType: 'full'
        }
      });

      if (error) {
        throw error;
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to generate profile');
      }

      const profile = result.profile;

      // Update the form with AI-generated content
      onUpdate({
        pros: profile.pros || [],
        cons: profile.cons || [],
        keyStrengths: profile.keyStrengths || [],
        bestFor: profile.bestFor || [],
        description: profile.description || '',
        disciplines: profile.disciplines || [],
        experienceLevel: profile.experienceLevel || '',
      });

      toast.success("Profile Generated Successfully", {
        description: "AI has created a detailed profile based on your responses. You can edit any section."
      });

      setInterviewMode(false);

    } catch (error) {
      console.error('Profile generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate profile';
      setGenerationError(errorMessage);
      
      toast.error("Generation Failed", {
        description: "There was an issue generating your profile. Please try again or continue manually."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (interviewMode) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">AI Interview</h2>
          <p className="text-white/70">Let's create your horse's profile together</p>
          <Badge className="mt-4 bg-blue-500/20 text-blue-400">
            Question {currentQuestion + 1} of {interviewQuestions.length}
          </Badge>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-8 text-center">
            {isGenerating ? (
              <div className="space-y-6">
                <Loader2 className="h-12 w-12 mx-auto mb-4 text-blue-400 animate-spin" />
                <h3 className="text-xl font-semibold text-white mb-4">
                  Generating Your Horse's Profile...
                </h3>
                <p className="text-white/60">
                  Our AI is analyzing your responses to create a compelling profile that will attract the right buyers.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <Bot className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {interviewQuestions[currentQuestion]}
                  </h3>
                </div>

                {generationError && (
                  <Alert className="mb-4 bg-red-500/10 border-red-500/30">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-400">
                      {generationError}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={currentResponse}
                    onChange={(e) => setCurrentResponse(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder-white/40 min-h-[120px]"
                    rows={4}
                    disabled={isGenerating}
                  />
                  
                  <div className="flex justify-center">
                    <VoiceInput
                      onTranscript={(text) => setCurrentResponse(prev => prev + (prev ? ' ' : '') + text)}
                      disabled={isGenerating}
                      className="w-auto"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    onClick={() => {
                      if (currentQuestion > 0) {
                        setCurrentQuestion(currentQuestion - 1);
                        setCurrentResponse(responses[currentQuestion - 1] || '');
                      } else {
                        setInterviewMode(false);
                      }
                    }}
                    variant="outline"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                    disabled={isGenerating}
                  >
                    {currentQuestion === 0 ? 'Back to Manual' : 'Previous Question'}
                  </Button>

                  <Button
                    onClick={handleNextQuestion}
                    disabled={!currentResponse.trim() || isGenerating}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      currentQuestion === interviewQuestions.length - 1 ? 'Generate Profile' : 'Next Question'
                    )}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Horse Profile</h2>
        <p className="text-white/70">Create a compelling profile through guided conversation</p>
      </div>

      {/* AI vs Manual Toggle */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
        <CardContent className="p-6">
          <div className="text-center">
            <Sparkles className="h-8 w-8 mx-auto mb-3 text-blue-400" />
            <h3 className="text-xl font-semibold text-white mb-2">AI-Assisted Profile Creation</h3>
            <p className="text-white/80 mb-4">
              Let our AI interview you about your horse to create a compelling, detailed profile that attracts the right buyers.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => setInterviewMode(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                <Bot className="h-4 w-4 mr-2" />
                Start AI Interview
              </Button>
              <Button
                variant="outline"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                Continue Manually
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manual Profile Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Key Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="List the horse's main strengths and positive qualities..."
              value={data.keyStrengths?.join('\n') || ''}
              onChange={(e) => onUpdate({ keyStrengths: e.target.value.split('\n').filter(s => s.trim()) })}
              className="bg-white/5 border-white/20 text-white placeholder-white/40"
              rows={4}
            />
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Best Suited For</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe the ideal rider and use for this horse..."
              value={data.bestFor?.join('\n') || ''}
              onChange={(e) => onUpdate({ bestFor: e.target.value.split('\n').filter(s => s.trim()) })}
              className="bg-white/5 border-white/20 text-white placeholder-white/40"
              rows={4}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Pros</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="List positive traits and advantages..."
              value={data.pros?.join('\n') || ''}
              onChange={(e) => onUpdate({ pros: e.target.value.split('\n').filter(s => s.trim()) })}
              className="bg-white/5 border-white/20 text-white placeholder-white/40"
              rows={4}
            />
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Considerations</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Any special considerations or requirements..."
              value={data.cons?.join('\n') || ''}
              onChange={(e) => onUpdate({ cons: e.target.value.split('\n').filter(s => s.trim()) })}
              className="bg-white/5 border-white/20 text-white placeholder-white/40"
              rows={4}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Detailed Description</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Write a detailed description of your horse's personality, training, and characteristics..."
            value={data.description || ''}
            onChange={(e) => onUpdate({ description: e.target.value })}
            className="bg-white/5 border-white/20 text-white placeholder-white/40"
            rows={6}
          />
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
          Continue to Media Upload
        </Button>
      </div>
    </div>
  );
};

export default HorseProfileStep;