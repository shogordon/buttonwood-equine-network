
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Verification = () => {
  const [uploading, setUploading] = useState(false);
  const { profile } = useAuth();
  const navigate = useNavigate();

  const verificationSteps = [
    {
      title: 'Identity Verification',
      description: 'Upload a government-issued ID',
      status: 'pending',
      required: true
    },
    {
      title: 'Insurance Documentation',
      description: 'Provide proof of equestrian insurance',
      status: 'pending',
      required: true
    },
    {
      title: 'Experience Letter',
      description: 'Letter from trainer or veterinarian',
      status: 'pending',
      required: false
    },
    {
      title: 'References',
      description: 'Contact information for equestrian references',
      status: 'pending',
      required: false
    }
  ];

  const handleUpload = async (documentType: string) => {
    setUploading(true);
    // Placeholder for file upload functionality
    setTimeout(() => {
      setUploading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="floating-element top-20 left-20 w-64 h-64 animate-float opacity-20" />
        <div className="floating-element top-40 right-32 w-32 h-32 animate-float opacity-15" style={{ animationDelay: '2s' }} />
        <div className="floating-element bottom-32 left-40 w-48 h-48 animate-float opacity-10" style={{ animationDelay: '4s' }} />
        <div className="floating-element bottom-20 right-20 w-40 h-40 animate-float opacity-12" style={{ animationDelay: '6s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/lovable-uploads/the-aisle-logo.png" alt="The Aisle" className="h-8 w-8" />
              <span className="text-xl font-semibold text-white">
                The Aisle
              </span>
            </div>
            <Link to="/browse" className="flex items-center text-blue-400 hover:text-blue-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 pt-32 relative">
        <div className="glass-overlay"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 text-shadow">
              Account Verification
            </h1>
            <p className="text-xl text-white/80 mb-4">
              Unlock full access to premium features
            </p>
            <Badge 
              variant={profile?.verification_status === 'verified' ? 'default' : 'secondary'}
              className={`text-sm ${profile?.verification_status === 'verified' ? 'bg-green-500' : 'bg-white/10 text-white'}`}
            >
              {profile?.verification_status === 'verified' ? '✓ Verified' : 'Verification Pending'}
            </Badge>
          </div>

          {profile?.verification_status !== 'verified' && (
            <Card className="mb-8 bg-blue-500/10 border-blue-400/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">
                  Why verify your account?
                </h3>
                <ul className="space-y-2 text-blue-200">
                  <li>• Access to full horse pricing information</li>
                  <li>• Direct contact with sellers</li>
                  <li>• View medical records and veterinary reports</li>
                  <li>• Priority customer support</li>
                  <li>• Trust badge on your profile</li>
                </ul>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {verificationSteps.map((step, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-md border border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center text-white">
                      {step.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                      ) : (
                        <Clock className="h-5 w-5 text-white/60 mr-2" />
                      )}
                      {step.title}
                    </span>
                    {step.required && (
                      <Badge variant="outline" className="text-xs border-white/20 text-white/80">
                        Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4">
                    {step.description}
                  </p>
                  <Button
                    onClick={() => handleUpload(step.title)}
                    disabled={uploading || step.status === 'completed'}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {step.status === 'completed' ? 'Uploaded' : 'Upload Document'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 text-center bg-white/5 backdrop-blur-md border border-white/10">
            <CardContent className="p-8">
              <Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Verification Process
              </h3>
              <p className="text-white/80 mb-4">
                Our team typically reviews verification documents within 24-48 hours. 
                You'll receive an email notification once your account is verified.
              </p>
              <p className="text-sm text-white/60">
                All documents are securely stored and used only for verification purposes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Verification;
