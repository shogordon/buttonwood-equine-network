
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Browse from "./pages/Browse";
import Verification from "./pages/Verification";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/verification" element={<Verification />} />
            {/* Placeholder routes for navigation links */}
            <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">About Page - Coming Soon</h1></div>} />
            <Route path="/pricing" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Pricing Page - Coming Soon</h1></div>} />
            <Route path="/trust" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Trust & Safety - Coming Soon</h1></div>} />
            <Route path="/privacy" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Privacy Policy - Coming Soon</h1></div>} />
            <Route path="/terms" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Terms of Service - Coming Soon</h1></div>} />
            <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Contact Us - Coming Soon</h1></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
