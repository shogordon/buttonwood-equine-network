
import BrowseBackground from "@/components/browse/BrowseBackground";
import BrowseHeader from "@/components/browse/BrowseHeader";
import HorseGrid from "@/components/browse/HorseGrid";
import LoadingState from "@/components/browse/LoadingState";
import AppNavigation from "@/components/navigation/AppNavigation";
import { useBrowseData } from "@/hooks/useBrowseData";
import { useSearchFilters } from "@/hooks/useSearchFilters";

const Browse = () => {
  const {
    searchQuery,
    filters,
    showFilters,
    handleSearchChange,
    handleFiltersChange,
    toggleFilters
  } = useSearchFilters();

  const { user, profile, horses, loading, handleSignOut, handleGetVerified } = useBrowseData({
    searchQuery,
    filters
  });

  console.log('Browse component render', { 
    user: !!user, 
    profile: !!profile, 
    horses: horses?.length, 
    loading,
    searchQuery,
    activeFilters: Object.keys(filters).length
  });

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 50%, #1e3a8a 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <BrowseBackground />
      
      <AppNavigation onSignOut={handleSignOut} />
      
      <BrowseHeader 
        profile={profile}
        onGetVerified={handleGetVerified}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        showFilters={showFilters}
        onFilterToggle={toggleFilters}
        resultCount={horses?.length}
      />
      
      <HorseGrid 
        horses={horses || []}
        profile={profile}
      />
    </div>
  );
};

export default Browse;
