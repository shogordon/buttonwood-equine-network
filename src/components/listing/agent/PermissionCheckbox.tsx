
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
