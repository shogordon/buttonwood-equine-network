
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
