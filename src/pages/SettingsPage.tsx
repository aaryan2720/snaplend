
import React from "react";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, User, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem logging you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Container className="py-12 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Settings className="text-snaplend-500 mr-2" />
          <h1 className="text-2xl font-bold text-snaplend-900">Settings</h1>
        </div>

        <Separator className="mb-8" />

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Account Settings
              </CardTitle>
              <CardDescription>
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Email</h3>
                  <p className="text-sm text-snaplend-600">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">User ID</h3>
                  <p className="text-sm text-snaplend-600">{user?.id}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default SettingsPage;
