
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define types
export interface ConversationUser {
  id: string;
  name: string;
  avatar: string;
}

export interface ConversationMessage {
  text: string;
  timestamp: Date;
  unread: boolean;
}

export interface ConversationListing {
  id: string;
  title: string;
}

export interface Conversation {
  id: string;
  otherUser: ConversationUser;
  lastMessage: ConversationMessage;
  listing: ConversationListing;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: string | null;
  onSelectConversation: (id: string) => void;
  formatDate: (date: Date) => string;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  conversations,
  activeConversation,
  onSelectConversation,
  formatDate
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="font-medium">Conversations</h2>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-16rem)]">
        {conversations.map((convo) => (
          <div
            key={convo.id}
            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
              activeConversation === convo.id ? 'bg-gray-100' : ''
            }`}
            onClick={() => onSelectConversation(convo.id)}
          >
            <div className="flex items-start space-x-3">
              <Avatar>
                <AvatarImage src={convo.otherUser.avatar} alt={convo.otherUser.name} />
                <AvatarFallback>{convo.otherUser.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="font-medium truncate">{convo.otherUser.name}</p>
                  <span className="text-xs text-gray-500">
                    {formatDate(convo.lastMessage.timestamp)}
                  </span>
                </div>
                <p className={`text-sm truncate ${convo.lastMessage.unread ? 'font-medium' : 'text-gray-500'}`}>
                  {convo.lastMessage.text}
                </p>
                <p className="text-xs text-primary mt-1 truncate">
                  Re: {convo.listing.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
