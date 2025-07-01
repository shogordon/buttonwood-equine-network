
import { Plus, Filter, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ListingCard from "./ListingCard";
import DraftCleanup from "./DraftCleanup";
import { useListingAnalytics } from "@/hooks/useListingAnalytics";

interface HorseProfile {
  id: string;
  horse_name: string;
  price: number | null;
  listing_status: string;
  is_available: boolean;
  images: string[] | null;
  created_at: string;
  breed: string | null;
  age: number;
  location?: string | null;
  description?: string | null;
  user_role?: string | null;
  listing_type?: string[] | null;
  height?: number | null;
  color?: string | null;
  updated_at?: string;
}

interface UserListingsGridProps {
  horses: HorseProfile[] | undefined;
}

const UserListingsGrid = ({ horses }: UserListingsGridProps) => {
  const { analytics } = useListingAnalytics();
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'performance'>('date');
  const [filterBy, setFilterBy] = useState<'all' | 'published' | 'drafts'>('all');

  // Filter horses
  let filteredHorses = horses || [];
  if (filterBy === 'published') {
    filteredHorses = horses?.filter(horse => horse.listing_status === 'published') || [];
  } else if (filterBy === 'drafts') {
    filteredHorses = horses?.filter(horse => horse.listing_status === 'draft') || [];
  }

  // Sort horses
  const sortedHorses = [...filteredHorses].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.horse_name.localeCompare(b.horse_name);
      case 'performance':
        const aAnalytics = analytics.listingAnalytics.find(la => la.horseId === a.id);
        const bAnalytics = analytics.listingAnalytics.find(la => la.horseId === b.id);
        const aScore = (aAnalytics?.views || 0) + (aAnalytics?.inquiries || 0) * 10;
        const bScore = (bAnalytics?.views || 0) + (bAnalytics?.inquiries || 0) * 10;
        return bScore - aScore;
      case 'date':
      default:
        return new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime();
    }
  });

  const publishedHorses = sortedHorses.filter(horse => horse.listing_status === 'published');
  const draftHorses = sortedHorses.filter(horse => horse.listing_status === 'draft');

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your Listings</h2>
        
        {/* Filter and Sort Controls */}
        {horses && horses.length > 0 && (
          <div className="flex items-center gap-3">
            <Select value={filterBy} onValueChange={(value: any) => setFilterBy(value)}>
              <SelectTrigger className="w-32 bg-white/5 border-white/20 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="drafts">Drafts</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-36 bg-white/5 border-white/20 text-white">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Latest</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      {/* Draft Cleanup Section - Show only if there are drafts */}
      {draftHorses.length > 0 && (
        <div className="mb-8">
          <DraftCleanup />
        </div>
      )}
      
      {/* Draft Listings Section */}
      {draftHorses.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold text-white">Draft Listings</h3>
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
              {draftHorses.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {draftHorses.map((horse) => (
              <ListingCard 
                key={horse.id} 
                horse={horse} 
                isDraft={true} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Published Listings Section */}
      {publishedHorses.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold text-white">Published Listings</h3>
            <Badge variant="default" className="bg-green-500/20 text-green-400">
              {publishedHorses.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedHorses.map((horse) => {
              const horseAnalytics = analytics.listingAnalytics.find(la => la.horseId === horse.id);
              return (
                <ListingCard 
                  key={horse.id} 
                  horse={horse} 
                  isDraft={false} 
                  analytics={horseAnalytics}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* No listings state */}
      {(!horses || horses.length === 0) && (
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center">
          <div className="text-white/60 mb-6">
            <Plus className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No listings yet</h3>
            <p>Create your first horse listing to get started selling.</p>
          </div>
          <Link to="/sell/new">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl">
              Create Your First Listing
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
};

export default UserListingsGrid;
