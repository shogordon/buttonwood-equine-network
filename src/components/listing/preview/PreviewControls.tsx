
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Monitor, Smartphone } from "lucide-react";

interface PreviewControlsProps {
  viewMode: 'desktop' | 'mobile';
  onViewModeChange: (mode: 'desktop' | 'mobile') => void;
  missingFields: string[];
}

export const PreviewControls = ({ viewMode, onViewModeChange, missingFields }: PreviewControlsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onViewModeChange('desktop')}
          variant={viewMode === 'desktop' ? 'default' : 'outline'}
          size="sm"
          className={viewMode === 'desktop' ? 'bg-blue-500' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
        >
          <Monitor className="h-4 w-4 mr-2" />
          Desktop
        </Button>
        <Button
          onClick={() => onViewModeChange('mobile')}
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
  );
};
