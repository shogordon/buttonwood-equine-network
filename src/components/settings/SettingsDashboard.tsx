
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, CreditCard, Horse, Search, Bell, BarChart3 } from "lucide-react";
import PersonalInfoSection from "./PersonalInfoSection";
import VerificationSection from "./VerificationSection";
import SubscriptionSection from "./SubscriptionSection";
import SalesListingsSection from "./SalesListingsSection";
import ISOListingsSection from "./ISOListingsSection";
import ActivitySection from "./ActivitySection";
import NotificationSection from "./NotificationSection";

const SettingsDashboard = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-8 bg-black/20 backdrop-blur-lg border border-white/10">
          <TabsTrigger value="personal" className="flex items-center gap-2 text-white data-[state=active]:bg-blue-500/20">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex items-center gap-2 text-white data-[state=active]:bg-blue-500/20">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Verification</span>
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2 text-white data-[state=active]:bg-blue-500/20">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-2 text-white data-[state=active]:bg-blue-500/20">
            <Horse className="h-4 w-4" />
            <span className="hidden md:inline">Sales</span>
          </TabsTrigger>
          <TabsTrigger value="iso" className="flex items-center gap-2 text-white data-[state=active]:bg-blue-500/20">
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">ISO</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2 text-white data-[state=active]:bg-blue-500/20">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden md:inline">Activity</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 text-white data-[state=active]:bg-blue-500/20">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Alerts</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoSection />
        </TabsContent>
        
        <TabsContent value="verification">
          <VerificationSection />
        </TabsContent>
        
        <TabsContent value="subscription">
          <SubscriptionSection />
        </TabsContent>
        
        <TabsContent value="sales">
          <SalesListingsSection />
        </TabsContent>
        
        <TabsContent value="iso">
          <ISOListingsSection />
        </TabsContent>
        
        <TabsContent value="activity">
          <ActivitySection />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsDashboard;
