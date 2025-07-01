
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SalesListingsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Sales Listings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Heart className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">Manage Your Horse Listings</h3>
            <p className="text-white/70 text-sm mb-6">
              Your horse listings are now managed from the dedicated seller dashboard where you can create, edit, and track all your listings in one place.
            </p>
            <Button 
              onClick={() => navigate('/sell')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Go to Seller Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesListingsSection;
