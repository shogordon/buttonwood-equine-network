import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle, ArrowRight, User, Users, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface LocationState {
  userType?: 'buying' | 'selling' | 'browsing';
  prompt?: string;
}

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | 'both'>('buyer');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const state = location.state as LocationState;

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (profile?.onboarding_completed) {
      navigate('/browse');
    }

    // Set initial role based on state
    if (state?.userType === 'selling') {
      setSelectedRole('seller');
    } else if (state?.userType === 'buying') {
      setSelectedRole('buyer');
    }
  }, [user, profile, navigate, state]);

  const handleCompleteOnboarding = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Update user profile with the fields that exist in the database
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          email: user.email!,
          role: selectedRole,
          onboarding_completed: true,
          first_name: user.user_metadata.first_name,
          last_name: user.user_metadata.last_name,
          phone: user.user_metadata.phone,
        });

      if (profileError) throw profileError;

      // Track onboarding completion using onboarding_responses table
      const { error: stepError } = await supabase
        .from('onboarding_responses')
        .insert({
          user_id: user.id,
          question: 'What brings you to Buttonwood Bluebook?',
          answer: selectedRole,
          step_number: 1,
        });

      if (stepError) {
        console.warn('Error tracking onboarding step:', stepError);
        // Don't throw error here as the main profile update succeeded
      }

      await refreshProfile();

      toast({
        title: "Welcome to Buttonwood Bluebook!",
        description: "Your account is set up and ready to go.",
      });

      navigate('/browse');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCompleteOnboarding();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">What brings you to Buttonwood Bluebook?</h2>
              <p className="text-slate-gray-600">Tell us your primary interest to personalize your experience</p>
            </div>
            
            <div className="grid gap-4">
              <Card 
                className={`cursor-pointer transition-all duration-200 ${selectedRole === 'buyer' ? 'ring-2 ring-french-blue-500 bg-french-blue-50' : 'hover:shadow-md'}`}
                onClick={() => setSelectedRole('buyer')}
              >
                <CardContent className="p-6 flex items-center space-x-4">
                  <ShoppingCart className="h-8 w-8 text-french-blue-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">I'm looking to buy horses</h3>
                    <p className="text-slate-gray-600">Find the perfect horse for your needs</p>
                  </div>
                  {selectedRole === 'buyer' && <CheckCircle className="h-6 w-6 text-french-blue-600" />}
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all duration-200 ${selectedRole === 'seller' ? 'ring-2 ring-burnt-orange-500 bg-burnt-orange-50' : 'hover:shadow-md'}`}
                onClick={() => setSelectedRole('seller')}
              >
                <CardContent className="p-6 flex items-center space-x-4">
                  <User className="h-8 w-8 text-burnt-orange-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">I want to sell horses</h3>
                    <p className="text-slate-gray-600">List your horses and find qualified buyers</p>
                  </div>
                  {selectedRole === 'seller' && <CheckCircle className="h-6 w-6 text-burnt-orange-600" />}
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all duration-200 ${selectedRole === 'both' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'}`}
                onClick={() => setSelectedRole('both')}
              >
                <CardContent className="p-6 flex items-center space-x-4">
                  <Users className="h-8 w-8 text-green-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Both buying and selling</h3>
                    <p className="text-slate-gray-600">Full access to all platform features</p>
                  </div>
                  {selectedRole === 'both' && <CheckCircle className="h-6 w-6 text-green-600" />}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Verification unlocks premium features</h2>
            <p className="text-slate-gray-600 mb-6">
              Verified members get access to pricing, contact information, and medical records
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-slate-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Basic Access</h3>
                  <Badge variant="secondary" className="mb-4">Current Status</Badge>
                  <ul className="text-left space-y-2 text-sm">
                    <li>• View horse photos</li>
                    <li>• Basic descriptions</li>
                    <li>• General location</li>
                    <li className="text-slate-400">• No pricing information</li>
                    <li className="text-slate-400">• No contact details</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-french-blue-200 bg-french-blue-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Verified Access</h3>
                  <Badge className="mb-4 bg-french-blue-600">Verification Required</Badge>
                  <ul className="text-left space-y-2 text-sm">
                    <li>• Full horse profiles</li>
                    <li>• Pricing information</li>
                    <li>• Seller contact details</li>
                    <li>• Medical records access</li>
                    <li>• Priority support</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold mb-2">You're all set!</h2>
            <p className="text-slate-gray-600 mb-6">
              Your account is ready. You can start browsing horses right away and upgrade to verified status anytime.
            </p>
            
            {state?.prompt && (
              <Card className="bg-soft-ivory-50 border-french-blue-200">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-gray-600 mb-2">Your initial search:</p>
                  <p className="italic">"{state.prompt}"</p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!user || profile?.onboarding_completed) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-ivory-50 to-french-blue-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-xl font-semibold text-slate-gray-800">
                Buttonwood Bluebook
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-slate-gray-600 hover:text-slate-gray-800 transition-colors">
                About
              </Link>
              <Link to="/pricing" className="text-slate-gray-600 hover:text-slate-gray-800 transition-colors">
                Pricing
              </Link>
              <Link to="/trust" className="text-slate-gray-600 hover:text-slate-gray-800 transition-colors">
                How It Works
              </Link>
              <Link to="/trust" className="text-slate-gray-600 hover:text-slate-gray-800 transition-colors">
                Trust & Safety
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center p-6 pt-32">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-sm text-slate-gray-600">Step {currentStep} of {totalSteps}</span>
              <Progress value={progress} className="w-32" />
            </div>
          </div>

          <Card className="glass-card shadow-2xl">
            <CardContent className="p-8">
              {renderStep()}
              
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                <Button
                  onClick={nextStep}
                  disabled={loading}
                  className="bg-french-blue-600 hover:bg-french-blue-700"
                >
                  {currentStep === totalSteps ? 'Complete Setup' : 'Next Step'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
