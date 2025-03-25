
import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { Loader2, MessageSquare, Send, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

// Mock data for messages
const mockConversations = [
  {
    id: '1',
    otherUser: {
      id: 'user1',
      name: 'Arjun Patel',
      avatar: 'https://i.pravatar.cc/150?img=59'
    },
    lastMessage: {
      text: "I'll be available tomorrow for the pickup. Is 2 PM okay with you?",
      timestamp: new Date(Date.now() - 3600000 * 2),
      unread: true
    },
    listing: {
      id: 'l1',
      title: 'Mountain Bike Trek X-Caliber 8'
    }
  },
  {
    id: '2',
    otherUser: {
      id: 'user2',
      name: 'Priya Sharma',
      avatar: 'https://i.pravatar.cc/150?img=32'
    },
    lastMessage: {
      text: 'Thank you for returning the drone in perfect condition!',
      timestamp: new Date(Date.now() - 3600000 * 24),
      unread: false
    },
    listing: {
      id: 'l2',
      title: 'DJI Mini 2 Drone'
    }
  },
  {
    id: '3',
    otherUser: {
      id: 'user3',
      name: 'Vikram Singh',
      avatar: 'https://i.pravatar.cc/150?img=67'
    },
    lastMessage: {
      text: 'Is the camera still available for next weekend?',
      timestamp: new Date(Date.now() - 3600000 * 48),
      unread: false
    },
    listing: {
      id: 'l3',
      title: 'Canon EOS 5D Mark IV'
    }
  }
];

// Mock individual conversation messages
const mockMessages = [
  {
    id: 'm1',
    senderId: 'user1',
    text: "Hi, I'm interested in renting your mountain bike. Is it still available for this weekend?",
    timestamp: new Date(Date.now() - 3600000 * 5),
  },
  {
    id: 'm2',
    senderId: 'currentUser',
    text: "Yes, it's available! When would you like to pick it up?",
    timestamp: new Date(Date.now() - 3600000 * 4),
  },
  {
    id: 'm3',
    senderId: 'user1',
    text: 'I was thinking Saturday morning, around 10 AM. Would that work for you?',
    timestamp: new Date(Date.now() - 3600000 * 3),
  },
  {
    id: 'm4',
    senderId: 'currentUser',
    text: 'That works for me. Do you need any accessories with it?',
    timestamp: new Date(Date.now() - 3600000 * 2.5),
  },
  {
    id: 'm5',
    senderId: 'user1',
    text: "I'll be available tomorrow for the pickup. Is 2 PM okay with you?",
    timestamp: new Date(Date.now() - 3600000 * 2),
  }
];

const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

const formatDate = (date) => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === now.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  }
};

const MessagesPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading conversations
    const loadConversations = () => {
      setTimeout(() => {
        setConversations(mockConversations);
        setLoading(false);
      }, 1000);
    };
    
    loadConversations();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      // Simulate loading messages for the active conversation
      setMessages(mockMessages);
      
      // Scroll to bottom of messages
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeConversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add the new message
    const newMessageObj = {
      id: `m${Date.now()}`,
      senderId: 'currentUser',
      text: newMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
    
    // Scroll to the new message
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (loading) {
    return (
      <Container className="min-h-screen flex items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-snaplend-600" />
          <p className="mt-4 text-snaplend-600">Loading your messages...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <MessageSquare className="text-snaplend-500 mr-2" />
          <h1 className="text-2xl font-bold text-snaplend-900">Messages</h1>
        </div>

        <Separator className="mb-8" />

        {conversations.length === 0 ? (
          <div className="text-center py-12 bg-snaplend-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No messages yet</h2>
            <p className="text-snaplend-600 mb-6">
              Start browsing items and message owners to arrange rentals.
            </p>
            <Button asChild>
              <Link to="/explore">Explore Listings</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
            {/* Conversations List */}
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
                    onClick={() => setActiveConversation(convo.id)}
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

            {/* Chat Area */}
            <div className="md:col-span-2 border rounded-lg flex flex-col">
              {activeConversation ? (
                <>
                  <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage 
                          src={conversations.find(c => c.id === activeConversation)?.otherUser.avatar} 
                          alt={conversations.find(c => c.id === activeConversation)?.otherUser.name} 
                        />
                        <AvatarFallback>
                          {conversations.find(c => c.id === activeConversation)?.otherUser.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">
                          {conversations.find(c => c.id === activeConversation)?.otherUser.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Re: {conversations.find(c => c.id === activeConversation)?.listing.title}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      asChild
                    >
                      <Link to={`/item/${conversations.find(c => c.id === activeConversation)?.listing.id}`}>
                        View Listing
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.senderId === 'currentUser' 
                              ? 'bg-primary text-white rounded-br-none' 
                              : 'bg-white border rounded-bl-none'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className={`text-xs mt-1 text-right ${
                            message.senderId === 'currentUser' ? 'text-primary-foreground/80' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  
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
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                    <p className="text-gray-500">
                      Select a conversation from the list to view messages
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default MessagesPage;
