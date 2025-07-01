
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ContactVisibilitySectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const ContactVisibilitySection = ({ value, onChange }: ContactVisibilitySectionProps) => {
  return (
    <Card className="bg-white/5 border-white/10 p-4">
      <h4 className="text-white font-medium mb-4">Contact Information Visibility</h4>
      <p className="text-white/60 text-sm mb-4">Choose who can see your contact information:</p>
      
      <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
        <div className="flex items-center space-x-4">
          <RadioGroupItem 
            value="registered_users" 
            id="registered_users" 
            className="h-5 w-5 border-2 border-white/50 text-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
          />
          <div className="flex-1">
            <Label htmlFor="registered_users" className="text-white cursor-pointer text-sm font-medium">
              Visible to all registered users
            </Label>
            <p className="text-white/50 text-xs">Anyone with an account can see your contact information</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <RadioGroupItem 
            value="verified_buyers" 
            id="verified_buyers" 
            className="h-5 w-5 border-2 border-white/50 text-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
          />
          <div className="flex-1">
            <Label htmlFor="verified_buyers" className="text-white cursor-pointer text-sm font-medium">
              Only visible to verified buyers
            </Label>
            <p className="text-white/50 text-xs">Only buyers who have completed verification can see your contact info</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <RadioGroupItem 
            value="on_request" 
            id="on_request" 
            className="h-5 w-5 border-2 border-white/50 text-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
          />
          <div className="flex-1">
            <Label htmlFor="on_request" className="text-white cursor-pointer text-sm font-medium">
              Disclosed on request through messaging
            </Label>
            <p className="text-white/50 text-xs">Contact information shared only when you choose to share it in messages</p>
          </div>
        </div>
      </RadioGroup>
    </Card>
  );
};
