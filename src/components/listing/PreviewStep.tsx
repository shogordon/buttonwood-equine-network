
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Smartphone, Monitor, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

type HorseDiscipline = Database['public']['Enums']['horse_discipline'];
type HorseExperienceLevel = Database['public']['Enums']['horse_experience_level'];

const PreviewStep = ({ data }: StepProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [publishing, setPublishing] = useState(false);

  const validateListing = () => {
    const required = ['horseName', 'sex', 'location'];
    const missing = required.filter(field => !data[field]);
    return missing;
  };

  const publishListing = async () => {
    if (!user) return;
    
    const missingFields = validateListing();
    if (missingFields.length > 0) {
      toast.error(`Please complete required fields: ${missingFields.join(', ')}`);
      return;
    }

    setPublishing(true);
    try {
      const age = data.yearOfBirth ? new Date().getFullYear() - data.yearOfBirth : 0;
      
      // Convert disciplines to proper enum values
      const validDisciplines = (data.disciplines || [])
        .filter((discipline): discipline is HorseDiscipline => 
          ['dressage', 'jumping', 'eventing', 'western', 'racing', 'trail', 'other'].includes(discipline)
        );

      // Convert experience level to proper enum
      const validExperienceLevel = ['beginner', 'intermediate', 'advanced', 'professional'].includes(data.experienceLevel || '') 
        ? data.experienceLevel as HorseExperienceLevel 
        : undefined;
      
      const horseData = {
        user_id: user.id,
        horse_name: data.horseName,
        sex: data.sex,
        breed: data.breed,
        color: data.color,
        height: data.height,
        year_of_birth: data.yearOfBirth,
        age: age,
        location: data.location,
        price: data.price,
        sale_type: data.saleType || 'for_sale',
        trial_available: data.trialAvailable || false,
        xrays_available: data.xraysAvailable || false,
        pros: data.pros?.filter((p: string) => p.trim()) || [],
        cons: data.cons?.filter((c: string) => c.trim()) || [],
        disciplines: validDisciplines,
        experience_level: validExperienceLevel,
        temperament: data.temperament || [],
        rideability: data.rideability || [],
        program_details: data.programDetails || [],
        maintenance_details: data.maintenanceDetails || [],
        images: data.images || [],
        videos: data.videos || [],
        description: data.description,
        show_record: data.showRecord,
        pedigree: data.pedigree,
        health_records: data.healthRecords,
        listing_status: 'published',
        is_available: true,
        verification_status: data.verificationRequested ? 'pending' : 'none',
      };

      const { data: insertedHorse, error } = await supabase
        .from('horse_profiles')
        .insert(horseData)
        .select()
        .single();

      if (error) throw error;

      // Create commission disclosure if applicable
      if (data.commissionType && data.commissionType !== 'none') {
        await supabase
          .from('commission_disclosures')
          .insert({
            horse_profile_id: insertedHorse.id,
            seller_id: user.id,
            commission_type: data.commissionType,
            commission_amount: data.commissionAmount,
            disclosure_text: data.commissionDisclosure,
          });
      }
      
      toast.success('Listing published successfully!');
      navigate('/sell');
    } catch (error) {
      console.error('Error publishing listing:', error);
      toast.error('Failed to publish listing');
    } finally {
      setPublishing(false);
    }
  };

  const missingFields = validateListing();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Preview & Publish</h2>
        <p className="text-white/60">Review your listing before making it live</p>
      </div>

      {/* Preview Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setViewMode('desktop')}
            variant={viewMode === 'desktop' ? 'default' : 'outline'}
            size="sm"
            className={viewMode === 'desktop' ? 'bg-blue-500' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
          >
            <Monitor className="h-4 w-4 mr-2" />
            Desktop
          </Button>
          <Button
            onClick={() => setViewMode('mobile')}
            variant={viewMode === 'mobile' ? 'default' : 'outline'}
            size="sm"
            className={viewMode === 'mobile' ? 'bg-blue-500' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          {missingFields.length === 0 ? (
            <div className="flex items-center gap-1 text-green-400">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Ready to publish</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-orange-400">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{missingFields.length} field(s) missing</span>
            </div>
          )}
        </div>
      </div>

      {/* Preview Container */}
      <div className={`mx-auto transition-all duration-300 ${
        viewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'
      }`}>
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
          {/* Hero Section */}
          <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            {data.images && data.images.length > 0 ? (
              <img 
                src={data.images[0]} 
                alt={data.horseName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-white/60 text-center">
                <Eye className="h-16 w-16 mx-auto mb-4" />
                <p>No Image Added</p>
              </div>
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  {data.horseName || 'Horse Name'}
                </h1>
                <p className="text-white/60">
                  {data.breed && `${data.breed} • `}
                  {data.sex || 'Sex not specified'} • 
                  {data.yearOfBirth ? ` ${new Date().getFullYear() - data.yearOfBirth} years old` : ' Age not specified'}
                </p>
                <p className="text-white/60">📍 {data.location || 'Location not specified'}</p>
              </div>
              {data.price && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">${data.price.toLocaleString()}</p>
                  <p className="text-white/60 text-sm">{data.saleType || 'For Sale'}</p>
                </div>
              )}
            </div>

            {/* Tags */}
            {(data.disciplines?.length > 0 || data.temperament?.length > 0) && (
              <div className="flex flex-wrap gap-2">
                {data.disciplines?.map((discipline: string) => (
                  <Badge key={discipline} className="bg-blue-500/20 text-blue-400">
                    {discipline}
                  </Badge>
                ))}
                {data.temperament?.slice(0, 3).map((trait: string) => (
                  <Badge key={trait} className="bg-green-500/20 text-green-400">
                    {trait}
                  </Badge>
                ))}
              </div>
            )}

            {/* Description Preview */}
            {data.description && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-white/80 leading-relaxed">
                  {data.description.substring(0, 200)}
                  {data.description.length > 200 && '...'}
                </p>
              </div>
            )}

            {/* Pros & Cons Preview */}
            {(data.pros?.length > 0 || data.cons?.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.pros?.length > 0 && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2">✅ Strengths</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      {data.pros.slice(0, 3).map((pro: string, index: number) => (
                        <li key={index}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {data.cons?.length > 0 && (
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                    <h4 className="text-orange-400 font-semibold mb-2">⚠️ Considerations</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      {data.cons.slice(0, 3).map((con: string, index: number) => (
                        <li key={index}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Publish Actions */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={publishListing}
          disabled={publishing || missingFields.length > 0}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 text-lg font-semibold hover:scale-105 transition-all duration-300"
        >
          {publishing ? 'Publishing...' : 'Publish Listing'}
        </Button>
        
        <Button
          variant="outline"
          className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-3"
        >
          Save as Draft
        </Button>
      </div>

      {missingFields.length > 0 && (
        <Card className="bg-orange-500/10 border-orange-500/20 p-4">
          <h4 className="text-orange-400 font-semibold mb-2">Complete these required fields:</h4>
          <ul className="text-white/80 text-sm space-y-1">
            {missingFields.map((field) => (
              <li key={field}>• {field}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default PreviewStep;
