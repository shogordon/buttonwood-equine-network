import { toast } from "sonner";

// Re-export from sonner for consistency
export { toast };

// Keep useToast for backward compatibility but recommend using toast directly
export const useToast = () => ({
  toast,
});
