
import React from "react";

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

interface MessageItemProps {
  message: Message;
  formatTime: (date: Date) => string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, formatTime }) => {
  const isCurrentUser = message.senderId === 'currentUser';
  
  return (
    <div 
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          isCurrentUser 
            ? 'bg-primary text-white rounded-br-none' 
            : 'bg-white border rounded-bl-none'
        }`}
      >
        <p>{message.text}</p>
        <p className={`text-xs mt-1 text-right ${
          isCurrentUser ? 'text-primary-foreground/80' : 'text-gray-500'
        }`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
