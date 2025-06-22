
import { Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BrowseHeaderProps {
  isVerified: boolean;
  onUpgradePrompt: () => void;
}

const BrowseHeader = ({ isVerified, onUpgradePrompt }: BrowseHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white mb-2">
        Premium Sport Horses
      </h1>
      <p className="text-xl text-white/70">
        Discover exceptional hunter/jumper prospects from verified sellers
      </p>
      
      {!isVerified && (
        <Card className="mt-6 glass-card border-blue-400/30">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-blue-400" />
              <div>
                <p className="font-medium text-white">
                  Unlock full access with verification
                </p>
                <p className="text-sm text-white/70">
                  View pricing, contact info, and medical records
                </p>
              </div>
            </div>
            <Button 
              onClick={onUpgradePrompt}
              className="glass-button text-white"
            >
              Get Verified
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BrowseHeader;
