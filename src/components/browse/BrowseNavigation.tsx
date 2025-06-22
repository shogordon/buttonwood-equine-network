
import { Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface UserProfile {
  first_name?: string;
  verification_status?: string;
}

interface BrowseNavigationProps {
  profile: UserProfile | null;
  onSignOut: () => void;
}

const BrowseNavigation = ({ profile, onSignOut }: BrowseNavigationProps) => {
  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-semibold text-white">
              Buttonwood Bluebook
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {profile && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/70">
                  Welcome, {profile.first_name || 'User'}
                </span>
                <Badge 
                  variant={profile.verification_status === 'verified' ? 'default' : 'secondary'}
                  className={profile.verification_status === 'verified' ? 'bg-green-500 text-white' : 'bg-white/20 text-white'}
                >
                  {profile.verification_status === 'verified' ? '✓ Verified' : 'Unverified'}
                </Badge>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={onSignOut} className="glass-button text-white border-white/20">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BrowseNavigation;
