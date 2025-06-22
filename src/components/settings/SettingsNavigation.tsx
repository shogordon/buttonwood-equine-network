
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const SettingsNavigation = () => {
  const navigate = useNavigate();
  const { handleSignOut } = useAuth();

  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/browse')}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
            <div className="flex items-center gap-2">
              <Settings className="h-6 w-6 text-blue-400" />
              <h1 className="text-xl font-semibold text-white">Account Settings</h1>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default SettingsNavigation;
