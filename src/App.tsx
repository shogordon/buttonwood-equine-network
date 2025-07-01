
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Browse from "./pages/Browse";
import Sell from "./pages/Sell";
import NewListing from "./pages/NewListing";
import Verification from "./pages/Verification";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Trust from "./pages/Trust";
import HowItWorks from "./pages/HowItWorks";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import HorseProfile from "./pages/HorseProfile";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/horse/:id",
    element: <HorseProfile />,
  },
  {
    path: "/sell",
    element: <Sell />,
  },
  {
    path: "/sell/new",
    element: <NewListing />,
  },
  {
    path: "/sell/edit/:draftId",
    element: <NewListing />,
  },
  {
    path: "/verification",
    element: <Verification />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/trust",
    element: <Trust />,
  },
  {
    path: "/how-it-works",
    element: <HowItWorks />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
