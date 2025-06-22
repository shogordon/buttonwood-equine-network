
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useListingForm } from "@/hooks/useListingForm";

// Import step components
import SellerInfoStep from "@/components/listing/SellerInfoStep";
import BasicHorseInfoStep from "@/components/listing/BasicHorseInfoStep";
import SaleInfoStep from "@/components/listing/SaleInfoStep";
import ProsConsStep from "@/components/listing/ProsConsStep";
import TagsFiltersStep from "@/components/listing/TagsFiltersStep";
import ProgramMaintenanceStep from "@/components/listing/ProgramMaintenanceStep";
import MediaUploadStep from "@/components/listing/MediaUploadStep";
import DescriptionStep from "@/components/listing/DescriptionStep";
import VerificationStep from "@/components/listing/VerificationStep";
import PreviewStep from "@/components/listing/PreviewStep";

// Import new components
import { ListingProgressHeader } from "@/components/listing/ListingProgressHeader";
import { ListingNavigationFooter } from "@/components/listing/ListingNavigationFooter";

const STEPS = [
  { id: 1, title: "Seller Info", component: SellerInfoStep },
  { id: 2, title: "Basic Horse Info", component: BasicHorseInfoStep },
  { id: 3, title: "Sale Info", component: SaleInfoStep },
  { id: 4, title: "Pros & Cons", component: ProsConsStep },
  { id: 5, title: "Tags & Filters", component: TagsFiltersStep },
  { id: 6, title: "Program & Maintenance", component: ProgramMaintenanceStep },
  { id: 7, title: "Media Upload", component: MediaUploadStep },
  { id: 8, title: "Description", component: DescriptionStep },
  { id: 9, title: "Verification", component: VerificationStep },
  { id: 10, title: "Preview & Publish", component: PreviewStep },
];

const NewListing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { listingData, updateListingData, saveDraft, saving } = useListingForm();

  const CurrentStepComponent = STEPS.find(step => step.id === currentStep)?.component;

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center">
                <img src="/lovable-uploads/the-aisle-logo.png" alt="The Aisle" className="h-6 w-6" />
              </div>
              <span className="text-xl font-semibold text-white">
                The Aisle
              </span>
            </Link>
            <Link to="/sell" className="text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5 inline mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Progress Header */}
          <ListingProgressHeader 
            currentStep={currentStep}
            steps={STEPS}
            onSaveDraft={saveDraft}
            saving={saving}
          />

          {/* Step Content */}
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            {CurrentStepComponent && (
              <CurrentStepComponent 
                data={listingData} 
                onUpdate={updateListingData}
                onNext={nextStep}
                onPrev={prevStep}
                isFirst={currentStep === 1}
                isLast={currentStep === STEPS.length}
              />
            )}
          </Card>

          {/* Navigation Footer */}
          <ListingNavigationFooter 
            currentStep={currentStep}
            totalSteps={STEPS.length}
            onPrevStep={prevStep}
            onNextStep={nextStep}
          />
        </div>
      </div>
    </div>
  );
};

export default NewListing;
