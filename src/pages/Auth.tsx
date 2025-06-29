
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import AuthBackground from '@/components/auth/AuthBackground';
import AppNavigation from '@/components/navigation/AppNavigation';
import AuthCard from '@/components/auth/AuthCard';
import AuthForm from '@/components/auth/AuthForm';

interface LocationState {
  userType?: 'buying' | 'selling' | 'browsing';
  prompt?: string;
}

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          navigate('/browse');
          return;
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, [navigate]);

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 50%, #1e3a8a 75%, #0f172a 100%)',
        backgroundAttachment: 'fixed'
      }}>
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
          <p className="text-white/70">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 50%, #1e3a8a 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <AuthBackground />
      <AppNavigation />

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

          <AuthCard isSignUp={isSignUp}>
            <AuthForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
          </AuthCard>
        </div>
      </div>
    </div>
  );
};

export default Auth;
