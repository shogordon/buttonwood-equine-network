
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface LocationState {
  userType?: 'buying' | 'selling' | 'browsing';
  prompt?: string;
}

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const state = location.state as LocationState;

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate('/browse');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/browse`,
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
              phone: formData.phone,
              user_type: state?.userType || 'buying',
              initial_prompt: state?.prompt || ''
            }
          }
        });

        if (error) throw error;

        if (data.user) {
          toast({
            title: "Account created successfully!",
            description: "Please check your email to verify your account.",
          });
          navigate('/onboarding', { 
            state: { 
              userType: state?.userType,
              prompt: state?.prompt 
            } 
          });
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        if (data.user) {
          toast({
            title: "Welcome back!",
            description: "You've been signed in successfully.",
          });
          navigate('/browse');
        }
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 50%, #1e3a8a 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Background overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div style={{
          background: 'radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(ellipse at bottom center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)'
        }} className="absolute inset-0" />
      </div>

      {/* Floating Elements */}
      <div className="floating-element w-96 h-96 -top-48 -left-48 animate-float" />
      <div className="floating-element w-64 h-64 top-1/4 -right-32 animate-float" style={{ animationDelay: '2s' }} />
      <div className="floating-element w-48 h-48 bottom-1/4 left-1/4 animate-float" style={{ animationDelay: '4s' }} />

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl glass-light flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-xl font-semibold text-white">
                Buttonwood Bluebook
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/pricing" className="text-white/70 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/trust" className="text-white/70 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link to="/trust" className="text-white/70 hover:text-white transition-colors">
                Trust & Safety
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center p-6 pt-32 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            {state?.userType && (
              <p className="text-white/70">
                {state.userType === 'buying' && "Ready to find your perfect horse?"}
                {state.userType === 'selling' && "Let's get your horses listed!"}
                {state.userType === 'browsing' && "Explore our premium horse listings"}
              </p>
            )}
          </div>

          {/* Custom Glass Card - Replacing shadcn Card component */}
          <div 
            className="rounded-lg shadow-2xl border border-white/10 backdrop-blur-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 255, 255, 0.05)'
            }}
          >
            {/* Header */}
            <div className="flex flex-col space-y-1.5 p-6 text-center">
              <h3 className="text-2xl font-bold text-white">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h3>
            </div>
            
            {/* Content */}
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white/90">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white/90">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="email" className="text-white/90">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                  />
                </div>

                {isSignUp && (
                  <div>
                    <Label htmlFor="phone" className="text-white/90">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="password" className="text-white/90">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      minLength={6}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-white/70"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600/80 hover:bg-blue-600 text-white font-medium backdrop-blur-xl border border-blue-400/30 shadow-lg transition-all duration-300 hover:shadow-blue-500/25"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Button
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
