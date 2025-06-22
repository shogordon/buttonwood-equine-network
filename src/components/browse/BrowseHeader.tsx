
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface BrowseHeaderProps {
  profile: any;
  onGetVerified: () => void;
}

const BrowseHeader = ({ profile, onGetVerified }: BrowseHeaderProps) => {
  return (
    <section className="pt-32 pb-16 px-6 relative">
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white text-shadow">
          Premium <span className="gradient-text">Sporthorses</span>
        </h1>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Discover exceptional hunter/jumper horses from verified sellers. 
          No commissions, no confusion.
        </p>

        {profile?.verification_status !== 'verified' && (
          <div className="max-w-2xl mx-auto glass-card p-6 mb-12 rounded-2xl">
            <div className="flex items-center justify-center gap-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <div className="text-left">
                <h3 className="text-white font-semibold mb-1">Get Verified for Full Access</h3>
                <p className="text-white/70 text-sm">Unlock contact details and exclusive listings</p>
              </div>
              <Button 
                onClick={onGetVerified}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300"
              >
                Get Verified
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseHeader;
