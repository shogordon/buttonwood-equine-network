
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
</tml-write>

<lov-write file_path="src/components/listing/agent/PermissionCheckbox.tsx">
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PermissionCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const PermissionCheckbox = ({ checked, onChange }: PermissionCheckboxProps) => {
  return (
    <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
      <div className="flex items-center space-x-3">
        <Checkbox
          id="hasPermissionToList"
          checked={checked}
          onCheckedChange={(checked) => onChange(!!checked)}
          className="h-5 w-5 border-2 border-white/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
        />
        <Label htmlFor="hasPermissionToList" className="text-white cursor-pointer">
          I have permission to list this horse
        </Label>
      </div>
    </div>
  );
};
