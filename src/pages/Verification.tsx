
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Upload, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-soft-ivory-50 to-french-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-french-blue-600" />
              <span className="text-xl font-semibold text-slate-gray-800">
                Buttonwood Bluebook
              </span>
            </div>
            <Link to="/browse" className="flex items-center text-french-blue-600 hover:text-french-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-gray-800 mb-2">
              Account Verification
            </h1>
            <p className="text-xl text-slate-gray-600 mb-4">
              Unlock full access to premium features
            </p>
            <Badge 
              variant={profile?.verification_status === 'verified' ? 'default' : 'secondary'}
              className={`text-sm ${profile?.verification_status === 'verified' ? 'bg-green-500' : ''}`}
            >
              {profile?.verification_status === 'verified' ? '✓ Verified' : 'Verification Pending'}
            </Badge>
          </div>

          {profile?.verification_status !== 'verified' && (
            <Card className="mb-8 border-french-blue-200 bg-french-blue-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-french-blue-800 mb-2">
                  Why verify your account?
                </h3>
                <ul className="space-y-2 text-french-blue-700">
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
              <Card key={index} className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      {step.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <Clock className="h-5 w-5 text-slate-400 mr-2" />
                      )}
                      {step.title}
                    </span>
                    {step.required && (
                      <Badge variant="outline" className="text-xs">
                        Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-gray-600 mb-4">
                    {step.description}
                  </p>
                  <Button
                    onClick={() => handleUpload(step.title)}
                    disabled={uploading || step.status === 'completed'}
                    className="w-full bg-french-blue-600 hover:bg-french-blue-700"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {step.status === 'completed' ? 'Uploaded' : 'Upload Document'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 text-center">
            <CardContent className="p-8">
              <Shield className="h-16 w-16 text-french-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-gray-800 mb-2">
                Verification Process
              </h3>
              <p className="text-slate-gray-600 mb-4">
                Our team typically reviews verification documents within 24-48 hours. 
                You'll receive an email notification once your account is verified.
              </p>
              <p className="text-sm text-slate-gray-500">
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
