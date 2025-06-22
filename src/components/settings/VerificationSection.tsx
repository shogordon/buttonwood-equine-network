
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Shield, CheckCircle, Clock, XCircle, Upload } from "lucide-react";

const VerificationSection = () => {
  const { profile } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <XCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(profile?.verification_status || 'unverified')}
              <div>
                <h3 className="text-white font-medium">Current Status</h3>
                <p className="text-white/70 text-sm">Account verification level</p>
              </div>
            </div>
            <Badge className={`${getStatusColor(profile?.verification_status || 'unverified')} text-white`}>
              {(profile?.verification_status || 'unverified').charAt(0).toUpperCase() + 
               (profile?.verification_status || 'unverified').slice(1)}
            </Badge>
          </div>

          {profile?.verification_status !== 'verified' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="text-white font-medium mb-2">Get Verified</h3>
                <p className="text-white/70 text-sm mb-4">
                  Verification gives you access to premium features and builds trust with other users.
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Start Verification
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">Basic</div>
                <div className="text-white/70 text-sm">Email Verified</div>
                <div className="mt-2">
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    Completed
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">Premium</div>
                <div className="text-white/70 text-sm">ID Verification</div>
                <div className="mt-2">
                  <Badge variant="outline" className="border-gray-500 text-gray-400">
                    Pending
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">Professional</div>
                <div className="text-white/70 text-sm">Business License</div>
                <div className="mt-2">
                  <Badge variant="outline" className="border-gray-500 text-gray-400">
                    Not Started
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationSection;
