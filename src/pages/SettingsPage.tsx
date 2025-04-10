
import React from "react";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, User, LogOut, Home, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SettingsPage = () => {
  const { user, profile, signOut } = useAuth();
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
    <>
      <Navbar />
      <Container className="py-12 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Settings className="text-primary mr-2" />
              <h1 className="text-2xl font-bold">Settings</h1>
            </div>
            <Button variant="outline" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </div>

          <Separator className="mb-8" />

          <div className="space-y-8">
            <Card className="overflow-hidden">
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
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">User ID</h3>
                    <p className="text-sm text-gray-600">{user?.id}</p>
                  </div>
                  {profile && (
                    <div>
                      <h3 className="text-sm font-medium">Profile Name</h3>
                      <p className="text-sm text-gray-600">{profile.full_name || 'Not set'}</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-4">
                <Button 
                  variant="outline"
                  onClick={() => navigate("/profile")}
                >
                  View Full Profile
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
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
      <Footer />
    </>
  );
};

export default SettingsPage;
