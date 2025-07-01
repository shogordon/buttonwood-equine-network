
import { Shield } from "lucide-react";

export const PrivacyNotice = () => {
  return (
    <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4 mb-6 mt-4">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <Shield className="h-5 w-5 text-blue-400" />
        <span className="text-blue-400 font-semibold">Privacy Protected</span>
      </div>
      <p className="text-white/80 text-sm">
        Representative contact information will only be visible to registered users, with additional privacy controls available below.
      </p>
    </div>
  );
};
