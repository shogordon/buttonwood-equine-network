
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AuthBackground from '@/components/auth/AuthBackground';
import AuthNavigation from '@/components/auth/AuthNavigation';
import AuthCard from '@/components/auth/AuthCard';
import AuthForm from '@/components/auth/AuthForm';

interface LocationState {
  userType?: 'buying' | 'selling' | 'browsing';
  prompt?: string;
}

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
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

  return (
    <div className="min-h-screen bg-slate-900" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 50%, #1e3a8a 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <AuthBackground />
      <AuthNavigation />

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
