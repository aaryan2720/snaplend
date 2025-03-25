
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatHeaderProps {
  conversation: {
    otherUser: {
      name: string;
      avatar: string;
    };
    listing: {
      id: string;
      title: string;
    };
  } | null;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ conversation }) => {
  if (!conversation) return null;
  
  return (
    <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
      <div className="flex items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage 
            src={conversation.otherUser.avatar} 
            alt={conversation.otherUser.name} 
          />
          <AvatarFallback>
            {conversation.otherUser.name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">
            {conversation.otherUser.name}
          </h3>
          <p className="text-xs text-gray-500">
            Re: {conversation.listing.title}
          </p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm"
        asChild
      >
        <Link to={`/item/${conversation.listing.id}`}>
          View Listing
        </Link>
      </Button>
    </div>
  );
};

export default ChatHeader;
