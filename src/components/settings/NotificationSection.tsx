
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, MessageSquare, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NotificationSection = () => {
  const { profile, refreshProfile } = useAuth();
  const [preferences, setPreferences] = useState({
    email_notifications: true,
    sms_notifications: false,
    marketing_emails: true,
    new_inquiries: true,
    listing_updates: true,
    match_notifications: true,
    price_alerts: false
  });

  useEffect(() => {
    if (profile?.notification_preferences) {
      setPreferences({
        ...preferences,
        ...profile.notification_preferences
      });
    }
  }, [profile]);

  const updatePreferences = async (key: string, value: boolean) => {
    if (!profile) return;

    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ notification_preferences: newPreferences })
        .eq('user_id', profile.user_id);

      if (error) throw error;
      
      await refreshProfile();
      toast.success('Notification preferences updated');
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast.error('Failed to update preferences');
      // Revert on error
      setPreferences(preferences);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Notifications
            </h3>
            
            <div className="space-y-4 pl-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="email_notifications" className="text-white">
                  Email notifications
                </Label>
                <Switch
                  id="email_notifications"
                  checked={preferences.email_notifications}
                  onCheckedChange={(checked) => updatePreferences('email_notifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing_emails" className="text-white">
                  Marketing emails
                </Label>
                <Switch
                  id="marketing_emails"
                  checked={preferences.marketing_emails}
                  onCheckedChange={(checked) => updatePreferences('marketing_emails', checked)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Activity Notifications
            </h3>
            
            <div className="space-y-4 pl-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="new_inquiries" className="text-white">
                  New inquiries
                </Label>
                <Switch
                  id="new_inquiries"
                  checked={preferences.new_inquiries}
                  onCheckedChange={(checked) => updatePreferences('new_inquiries', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="listing_updates" className="text-white">
                  Listing updates
                </Label>
                <Switch
                  id="listing_updates"
                  checked={preferences.listing_updates}
                  onCheckedChange={(checked) => updatePreferences('listing_updates', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="match_notifications" className="text-white">
                  Match notifications
                </Label>
                <Switch
                  id="match_notifications"
                  checked={preferences.match_notifications}
                  onCheckedChange={(checked) => updatePreferences('match_notifications', checked)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Alert Preferences
            </h3>
            
            <div className="space-y-4 pl-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="price_alerts" className="text-white">
                  Price drop alerts
                </Label>
                <Switch
                  id="price_alerts"
                  checked={preferences.price_alerts}
                  onCheckedChange={(checked) => updatePreferences('price_alerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="sms_notifications" className="text-white">
                  SMS notifications
                </Label>
                <Switch
                  id="sms_notifications"
                  checked={preferences.sms_notifications}
                  onCheckedChange={(checked) => updatePreferences('sms_notifications', checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSection;
