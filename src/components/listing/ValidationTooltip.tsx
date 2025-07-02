import { useState } from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ValidationTooltipProps {
  isValid?: boolean;
  errorMessage?: string;
  helpText?: string;
  isRequired?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const ValidationTooltip = ({ 
  isValid = true, 
  errorMessage, 
  helpText, 
  isRequired = false,
  children,
  className 
}: ValidationTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = () => {
    if (!isValid && errorMessage) {
      return <AlertCircle className="h-4 w-4 text-red-400" />;
    }
    if (isValid) {
      return <CheckCircle className="h-4 w-4 text-green-400" />;
    }
    if (helpText) {
      return <Info className="h-4 w-4 text-blue-400" />;
    }
    return null;
  };

  const getTooltipContent = () => {
    if (!isValid && errorMessage) {
      return (
        <div className="text-red-200">
          <div className="font-medium">Error</div>
          <div className="text-sm">{errorMessage}</div>
        </div>
      );
    }
    
    if (helpText) {
      return (
        <div className="text-white/90">
          <div className="text-sm">{helpText}</div>
          {isRequired && (
            <div className="text-xs text-white/60 mt-1">* Required field</div>
          )}
        </div>
      );
    }
    
    return null;
  };

  const tooltipContent = getTooltipContent();
  const icon = getIcon();

  if (!tooltipContent && !icon) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <div className={cn("relative", className)}>
          {children}
          <TooltipTrigger asChild>
            <button
              type="button"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2",
                "hover:scale-110 transition-transform",
                !isValid && "animate-pulse"
              )}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              onClick={() => setIsOpen(!isOpen)}
            >
              {icon}
            </button>
          </TooltipTrigger>
          {tooltipContent && (
            <TooltipContent 
              side="right" 
              className={cn(
                "max-w-xs",
                !isValid ? "bg-red-900/90 border-red-500/50" : "bg-slate-800/90 border-white/20"
              )}
            >
              {tooltipContent}
            </TooltipContent>
          )}
        </div>
      </Tooltip>
    </TooltipProvider>
  );
};