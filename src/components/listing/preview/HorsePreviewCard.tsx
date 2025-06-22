
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface HorsePreviewCardProps {
  data: any;
}

export const HorsePreviewCard = ({ data }: HorsePreviewCardProps) => {
  return (
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
  );
};
