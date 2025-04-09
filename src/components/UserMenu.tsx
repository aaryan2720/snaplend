
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LogOut, 
  User as UserIcon, 
  Settings, 
  ShoppingBag, 
  PlusCircle,
  Heart,
  MessageSquare,
  ChevronDown
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { getDefaultAvatar } from "@/services/profileService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu = () => {
  const { user, profile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link to="/login">
          <Button variant="outline" className="rounded-lg font-medium">
            Sign in
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="rounded-lg font-medium">
            Sign up
          </Button>
        </Link>
      </div>
    );
  }

  // Get appropriate avatar based on profile
  const avatarSrc = profile?.avatar_url || getDefaultAvatar(profile?.gender);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center p-1.5 bg-white rounded-full border border-snaplend-200 hover:bg-snaplend-50"
        >
          <div className="flex items-center pr-1">
            <div className="w-8 h-8 rounded-full bg-snaplend-200 flex items-center justify-center overflow-hidden">
              {avatarSrc ? (
                <img 
                  src={avatarSrc} 
                  alt={profile?.full_name || user.email || "User"} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon size={16} className="text-snaplend-400" />
              )}
            </div>
            <ChevronDown size={14} className="ml-1 text-snaplend-400" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{profile?.full_name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/create-listing" className="cursor-pointer flex w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Create a listing</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/listings" className="cursor-pointer flex w-full">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>My listings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/bookings" className="cursor-pointer flex w-full">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>My bookings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/favorites" className="cursor-pointer flex w-full">
              <Heart className="mr-2 h-4 w-4" />
              <span>Saved items</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/messages" className="cursor-pointer flex w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Messages</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer flex w-full">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="cursor-pointer flex w-full">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
