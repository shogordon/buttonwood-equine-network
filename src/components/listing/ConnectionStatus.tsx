import { useOfflineDetection } from '@/hooks/useOfflineDetection';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const ConnectionStatus = () => {
  const { isOnline, wasOffline } = useOfflineDetection();

  if (isOnline && !wasOffline) {
    return null; // Don't show anything when everything is normal
  }

  if (!isOnline) {
    return (
      <Alert className="bg-amber-500/10 border-amber-500/20 mb-4">
        <WifiOff className="h-4 w-4 text-amber-400" />
        <AlertDescription className="text-amber-200">
          <strong>You're offline.</strong> Your changes are being saved locally and will sync when connection is restored.
        </AlertDescription>
      </Alert>
    );
  }

  if (isOnline && wasOffline) {
    return (
      <Alert className="bg-green-500/10 border-green-500/20 mb-4">
        <Wifi className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          <strong>Connection restored!</strong> Your data is now syncing.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};