
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ListingCard from "./ListingCard";

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
}

interface UserListingsGridProps {
  horses: HorseProfile[] | undefined;
}

const UserListingsGrid = ({ horses }: UserListingsGridProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Your Listings</h2>
      
      {horses && horses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {horses.map((horse) => (
            <ListingCard key={horse.id} horse={horse} />
          ))}
        </div>
      ) : (
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
