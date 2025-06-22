
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  user_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'buyer' | 'seller' | 'both';
  verification_status?: 'unverified' | 'pending' | 'verified';
  account_type?: 'basic' | 'premium' | 'professional';
  subscription_status?: 'inactive' | 'active' | 'cancelled' | 'past_due';
  subscription_plan?: 'free' | 'basic' | 'premium' | 'professional';
  subscription_start_date?: string;
  subscription_end_date?: string;
  billing_email?: string;
  notification_preferences?: any;
  onboarding_completed: boolean;
  phone?: string;
  location?: string;
  bio?: string;
  profile_image_url?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile({
          user_id: data.user_id,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          role: data.role,
          verification_status: (data.verification_status as 'unverified' | 'pending' | 'verified') || 'unverified',
          account_type: (data.account_type as 'basic' | 'premium' | 'professional') || 'basic',
          subscription_status: (data.subscription_status as 'inactive' | 'active' | 'cancelled' | 'past_due') || 'inactive',
          subscription_plan: (data.subscription_plan as 'free' | 'basic' | 'premium' | 'professional') || 'free',
          subscription_start_date: data.subscription_start_date,
          subscription_end_date: data.subscription_end_date,
          billing_email: data.billing_email,
          notification_preferences: data.notification_preferences,
          onboarding_completed: data.onboarding_completed || false,
          phone: data.phone,
          location: data.location,
          bio: data.bio,
          profile_image_url: data.profile_image_url,
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signOut,
      handleSignOut,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
