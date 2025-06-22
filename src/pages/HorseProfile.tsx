
import { useParams, useNavigate } from "react-router-dom";
import { useHorseProfile } from "@/hooks/useHorseProfile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { HorseProfileCard } from "@/components/horse/HorseProfileCard";
import LoadingState from "@/components/browse/LoadingState";

const HorseProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { horse, profile, loading, error } = useHorseProfile(id!);

  console.log('HorseProfile render', { id, horse: !!horse, profile: !!profile, loading, error });

  if (loading) {
    return <LoadingState />;
  }

  if (error || !horse) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 50%, #1e3a8a 75%, #0f172a 100%)',
        backgroundAttachment: 'fixed'
      }}>
        <div className="container mx-auto px-6 py-20">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Horse Not Found</h1>
            <p className="text-white/60 mb-6">
              The horse you're looking for doesn't exist or is no longer available.
            </p>
            <Button 
              onClick={() => navigate('/browse')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 50%, #1e3a8a 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4">
          <Button 
            onClick={() => navigate('/browse')}
            variant="outline"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-10">
        <HorseProfileCard horse={horse} profile={profile} />
      </div>
    </div>
  );
};

export default HorseProfile;
