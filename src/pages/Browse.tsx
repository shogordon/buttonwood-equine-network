
import { useNavigate } from 'react-router-dom';
import BrowseBackground from '@/components/browse/BrowseBackground';
import BrowseNavigation from '@/components/browse/BrowseNavigation';
import BrowseHeader from '@/components/browse/BrowseHeader';
import HorseGrid from '@/components/browse/HorseGrid';
import LoadingState from '@/components/browse/LoadingState';
import { useBrowseData } from '@/hooks/useBrowseData';
import { useHorsePermissions } from '@/hooks/useHorsePermissions';

const Browse = () => {
  const { horses, loading, profile, signOut, handleUpgradePrompt } = useBrowseData();
  const { canViewPrice, canViewContact } = useHorsePermissions(profile);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-slate-900" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 50%, #1e3a8a 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <BrowseBackground />

      <BrowseNavigation profile={profile} onSignOut={signOut} />

      <div className="container mx-auto px-6 py-8 relative z-10">
        <BrowseHeader 
          isVerified={profile?.verification_status === 'verified'}
          onUpgradePrompt={handleUpgradePrompt}
        />

        <HorseGrid 
          horses={horses}
          canViewPrice={canViewPrice}
          canViewContact={canViewContact}
        />
      </div>
    </div>
  );
};

export default Browse;
