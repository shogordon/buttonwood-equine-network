
import { Shield } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 50%, #1e3a8a 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <div className="text-center">
        <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-spin" />
        <p className="text-white/70">Loading horses...</p>
      </div>
    </div>
  );
};

export default LoadingState;
