
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShieldCheck, Bell, UserCircle, LogOut, Camera } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { updateUserProfile } from "@/services/profileService";
import { useToast } from "@/components/ui/use-toast";

const SettingsPage = () => {
  const { user, profile, logout } = useAuth();
  const { toast } = useToast();
  
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  
  const [notificationsSettings, setNotificationsSettings] = useState({
    messages: true,
    bookings: true,
    reminders: true,
    marketing: false,
  });
  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateUserProfile({
        full_name: fullName,
        phone: phone,
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleToggleNotification = (setting) => {
    setNotificationsSettings({
      ...notificationsSettings,
      [setting]: !notificationsSettings[setting],
    });
  };
  
  return (
    <Container className="py-12 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-snaplend-900 mb-6">Account Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile" className="flex items-center">
              <UserCircle className="mr-2 h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4" /> Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-8">
                  <div className="relative mr-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback>{fullName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 cursor-pointer">
                      <Camera size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{fullName || "Update your name"}</h3>
                    <p className="text-snaplend-600 text-sm">{email}</p>
                  </div>
                </div>
                
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        value={email} 
                        disabled
                        className="bg-gray-100"
                      />
                      <p className="text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Messages</h3>
                      <p className="text-sm text-gray-500">Get notified when you receive new messages</p>
                    </div>
                    <Switch 
                      checked={notificationsSettings.messages} 
                      onCheckedChange={() => handleToggleNotification('messages')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Booking Updates</h3>
                      <p className="text-sm text-gray-500">Get notified about your rental bookings</p>
                    </div>
                    <Switch 
                      checked={notificationsSettings.bookings} 
                      onCheckedChange={() => handleToggleNotification('bookings')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Return Reminders</h3>
                      <p className="text-sm text-gray-500">Get reminders before items are due for return</p>
                    </div>
                    <Switch 
                      checked={notificationsSettings.reminders} 
                      onCheckedChange={() => handleToggleNotification('reminders')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing & Promotions</h3>
                      <p className="text-sm text-gray-500">Receive deals, discounts and product updates</p>
                    </div>
                    <Switch 
                      checked={notificationsSettings.marketing} 
                      onCheckedChange={() => handleToggleNotification('marketing')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Change Password</h3>
                  <Button variant="outline">Change Password</Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500 mb-3">Add an extra layer of security to your account</p>
                  <Button>Enable 2FA</Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2 text-red-600">Danger Zone</h3>
                  <div className="space-y-3">
                    <Button 
                      variant="destructive" 
                      onClick={logout}
                      className="flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default SettingsPage;
