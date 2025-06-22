
import BrowseBackground from "@/components/browse/BrowseBackground";
import BrowseNavigation from "@/components/browse/BrowseNavigation";
import BrowseHeader from "@/components/browse/BrowseHeader";
import HorseGrid from "@/components/browse/HorseGrid";
import LoadingState from "@/components/browse/LoadingState";
import { useBrowseData } from "@/hooks/useBrowseData";

const Browse = () => {
  const { user, profile, horses, loading, handleSignOut, handleGetVerified } = useBrowseData();

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 50%, #1e3a8a 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <BrowseBackground />
      
      <BrowseNavigation 
        user={user}
        profile={profile}
        onSignOut={handleSignOut}
      />
      
      <BrowseHeader 
        profile={profile}
        onGetVerified={handleGetVerified}
      />
      
      <HorseGrid 
        horses={horses}
        profile={profile}
      />
    </div>
  );
};

export default Browse;
