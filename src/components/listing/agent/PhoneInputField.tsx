
import { Label } from "@/components/ui/label";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface PhoneInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export const PhoneInputField = ({ 
  label, 
  value, 
  onChange, 
  placeholder = "Phone number", 
  required = false 
}: PhoneInputFieldProps) => {
  const phoneInputStyles = {
    '--PhoneInput-color--focus': 'rgba(255, 255, 255, 0.8)',
    '--PhoneInputInternationalIconPhone-opacity': '0.8',
    '--PhoneInputInternationalIconGlobe-opacity': '0.65',
    '--PhoneInputCountrySelect-marginRight': '0.35em',
    '--PhoneInputCountrySelectArrow-width': '0.3em',
    '--PhoneInputCountrySelectArrow-marginLeft': 'var(--PhoneInputCountrySelect-marginRight)',
    '--PhoneInputCountryFlag-aspectRatio': '1.5',
    '--PhoneInputCountryFlag-height': '1em',
    '--PhoneInputCountryFlag-borderWidth': '1px',
    '--PhoneInputCountryFlag-borderColor': 'rgba(255, 255, 255, 0.5)',
    '--PhoneInputCountryFlag-borderColor--focus': 'rgba(255, 255, 255, 0.8)',
    '--PhoneInputCountryFlag-backgroundColor--focus': 'rgba(255, 255, 255, 0.03)',
  } as React.CSSProperties;

  return (
    <div>
      <Label htmlFor="agentPhone" className="text-white mb-2 block">
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      <div className="phone-input-container" style={phoneInputStyles}>
        <PhoneInput
          placeholder={placeholder}
          value={value}
          onChange={(value) => onChange(value || '')}
          international
          defaultCountry="US"
          className="phone-input"
        />
      </div>
      
      <style>{`
        .phone-input-container .PhoneInput {
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          color: white;
          display: flex;
          align-items: center;
          padding: 0 12px;
        }
        
        .phone-input-container .PhoneInputInput {
          background: transparent;
          border: none;
          color: white;
          flex: 1;
          font-size: 14px;
          height: 100%;
          outline: none;
          padding: 0;
          margin-left: 8px;
        }
        
        .phone-input-container .PhoneInputInput::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        
        .phone-input-container .PhoneInputCountrySelect {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          outline: none;
        }
        
        .phone-input-container .PhoneInputCountrySelectArrow {
          border-top-color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
};
