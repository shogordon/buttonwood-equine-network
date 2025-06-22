
import { useState, useEffect } from "react";
import { Shield, ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

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

type HorseDiscipline = Database['public']['Enums']['horse_discipline'];
type HorseExperienceLevel = Database['public']['Enums']['horse_experience_level'];

interface ListingData {
  // Seller info
  sellerName: string;
  sellerRole: string;
  commissionType: string;
  commissionAmount: number;
  
  // Basic horse info
  horseName: string;
  sex: string;
  breed: string;
  color: string;
  height: number;
  yearOfBirth: number;
  location: string;
  
  // Sale info
  price: number;
  saleType: string;
  trialAvailable: boolean;
  xraysAvailable: boolean;
  
  // Pros & cons
  pros: string[];
  cons: string[];
  
  // Tags & filters
  disciplines: string[];
  experienceLevel: string;
  temperament: string[];
  rideability: string[];
  
  // Program & maintenance
  programDetails: string[];
  maintenanceDetails: string[];
  
  // Media
  images: string[];
  videos: string[];
  
  // Description
  description: string;
  
  // Verification
  showRecord: string;
  pedigree: string;
  healthRecords: string;
}

const NewListing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [listingData, setListingData] = useState<Partial<ListingData>>({});
  const [saving, setSaving] = useState(false);

  const progress = (currentStep / STEPS.length) * 100;
  const CurrentStepComponent = STEPS.find(step => step.id === currentStep)?.component;

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const updateListingData = (stepData: Partial<ListingData>) => {
    setListingData(prev => ({ ...prev, ...stepData }));
  };

  const saveDraft = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      // Calculate age from year of birth
      const age = listingData.yearOfBirth ? new Date().getFullYear() - listingData.yearOfBirth : 0;
      
      // Convert disciplines to proper enum values
      const validDisciplines = (listingData.disciplines || [])
        .filter((discipline): discipline is HorseDiscipline => 
          ['dressage', 'jumping', 'eventing', 'western', 'racing', 'trail', 'other'].includes(discipline)
        );

      // Convert experience level to proper enum
      const validExperienceLevel = ['beginner', 'intermediate', 'advanced', 'professional'].includes(listingData.experienceLevel || '') 
        ? listingData.experienceLevel as HorseExperienceLevel 
        : undefined;

      const horseData = {
        user_id: user.id,
        horse_name: listingData.horseName || 'Untitled Horse',
        sex: listingData.sex,
        breed: listingData.breed,
        color: listingData.color,
        height: listingData.height,
        year_of_birth: listingData.yearOfBirth,
        age: age,
        location: listingData.location,
        price: listingData.price,
        sale_type: listingData.saleType || 'for_sale',
        trial_available: listingData.trialAvailable || false,
        xrays_available: listingData.xraysAvailable || false,
        pros: listingData.pros || [],
        cons: listingData.cons || [],
        disciplines: validDisciplines,
        experience_level: validExperienceLevel,
        temperament: listingData.temperament || [],
        rideability: listingData.rideability || [],
        program_details: listingData.programDetails || [],
        maintenance_details: listingData.maintenanceDetails || [],
        images: listingData.images || [],
        videos: listingData.videos || [],
        description: listingData.description,
        show_record: listingData.showRecord,
        pedigree: listingData.pedigree,
        health_records: listingData.healthRecords,
        listing_status: 'draft',
        is_available: true,
      };

      const { error } = await supabase
        .from('horse_profiles')
        .insert(horseData);

      if (error) throw error;
      
      toast.success('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

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
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-xl font-semibold text-white">
                Buttonwood Bluebook
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
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-white">Create New Listing</h1>
              <Button 
                onClick={saveDraft} 
                disabled={saving}
                variant="outline" 
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-white/60 mb-2">
                <span>Step {currentStep} of {STEPS.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 whitespace-nowrap ${
                    step.id === currentStep 
                      ? 'text-blue-400 font-semibold' 
                      : step.id < currentStep 
                        ? 'text-green-400' 
                        : 'text-white/40'
                  }`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step.id === currentStep 
                        ? 'bg-blue-500' 
                        : step.id < currentStep 
                          ? 'bg-green-500' 
                          : 'bg-white/10'
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className="text-sm">{step.title}</span>
                  {index < STEPS.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-white/20" />
                  )}
                </div>
              ))}
            </div>
          </div>

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
          <div className="flex justify-between mt-8">
            <Button 
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button 
              onClick={nextStep}
              disabled={currentStep === STEPS.length}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewListing;
