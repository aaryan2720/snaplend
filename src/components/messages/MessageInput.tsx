
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  newMessage, 
  setNewMessage, 
  handleSendMessage 
}) => {
  return (
    <form onSubmit={handleSendMessage} className="p-3 border-t bg-white">
      <div className="flex space-x-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send size={18} />
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
