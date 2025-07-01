
import { Check, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SaveStatusProps {
  status: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved?: Date;
  error?: string;
}

export const SaveStatus = ({ status, lastSaved, error }: SaveStatusProps) => {
  const getStatusContent = () => {
    switch (status) {
      case 'saving':
        return {
          icon: <Loader2 className="h-3 w-3 animate-spin" />,
          text: 'Saving...',
          variant: 'secondary' as const,
        };
      case 'saved':
        return {
          icon: <Check className="h-3 w-3" />,
          text: lastSaved ? 
            `Saved ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 
            'All changes saved',
          variant: 'default' as const,
        };
      case 'error':
        return {
          icon: <AlertCircle className="h-3 w-3" />,
          text: error || 'Save failed',
          variant: 'destructive' as const,
        };
      default:
        return {
          icon: <Clock className="h-3 w-3" />,
          text: 'Unsaved changes',
          variant: 'outline' as const,
        };
    }
  };

  const { icon, text, variant } = getStatusContent();

  return (
    <Badge 
      variant={variant} 
      className="flex items-center gap-1 text-xs bg-white/5 border-white/20 text-white"
    >
      {icon}
      {text}
    </Badge>
  );
};
