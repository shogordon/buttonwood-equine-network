
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

interface AgentFormData {
  agentName: string;
  agentBusinessName: string;
  agentPhone: string;
  agentEmail: string;
  agentWebsite: string;
  agentSocials: string;
  hasPermissionToList: boolean;
  agentContactVisibility: string;
}

interface UseAgentFormDataProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const useAgentFormData = ({ data, onUpdate }: UseAgentFormDataProps) => {
  const { user, profile } = useAuth();
  
  const [formData, setFormData] = useState<AgentFormData>({
    agentName: data.agentName || '',
    agentBusinessName: data.agentBusinessName || '',
    agentPhone: data.agentPhone || '',
    agentEmail: data.agentEmail || '',
    agentWebsite: data.agentWebsite || '',
    agentSocials: data.agentSocials || '',
    hasPermissionToList: data.hasPermissionToList || false,
    agentContactVisibility: data.agentContactVisibility || 'registered_users',
  });

  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  // Auto-populate agent data when user role is "owner"
  useEffect(() => {
    if (data.userRole === 'owner' && user && profile) {
      const autoPopulatedData = {
        ...formData,
        agentName: profile.first_name && profile.last_name 
          ? `${profile.first_name} ${profile.last_name}` 
          : formData.agentName,
        agentEmail: user.email || formData.agentEmail,
        agentPhone: profile.phone || formData.agentPhone,
      };
      
      setFormData(autoPopulatedData);
      onUpdate(autoPopulatedData);
    }
  }, [data.userRole, user, profile]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleEmailValidation = (field: string, email: string) => {
    if (email && !validateEmail(email)) {
      setValidationErrors(prev => ({ ...prev, [field]: 'Please enter a valid email address' }));
    } else {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return {
    formData,
    validationErrors,
    handleChange,
    handleEmailValidation,
  };
};
