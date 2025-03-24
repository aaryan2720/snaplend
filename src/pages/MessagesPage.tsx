
import React, { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";

// This is a placeholder component that will be replaced with real functionality later
const MessagesPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeConversation, setActiveConversation] = useState(null);
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  // Mock data for UI prototype
  const conversations = [
    {
      id: "1",
      with: {
        id: "user1",
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      lastMessage: {
        text: "Hi, is this item still available?",
        time: new Date(Date.now() - 1000 * 60 * 5),
        isRead: false,
      },
      messages: [
        {
          id: "msg1",
          sender: "user1",
          text: "Hi, I'm interested in your camera.",
          time: new Date(Date.now() - 1000 * 60 * 30),
        },
        {
          id: "msg2",
          sender: "me",
          text: "Hi there! Yes, it's still available.",
          time: new Date(Date.now() - 1000 * 60 * 25),
        },
        {
          id: "msg3",
          sender: "user1",
          text: "Great! Can I pick it up tomorrow?",
          time: new Date(Date.now() - 1000 * 60 * 20),
        },
        {
          id: "msg4",
          sender: "me",
          text: "Sure, what time works for you?",
          time: new Date(Date.now() - 1000 * 60 * 15),
        },
        {
          id: "msg5",
          sender: "user1",
          text: "How about 3 PM?",
          time: new Date(Date.now() - 1000 * 60 * 10),
        },
        {
          id: "msg6",
          sender: "user1",
          text: "Hi, is this item still available?",
          time: new Date(Date.now() - 1000 * 60 * 5),
        },
      ],
    },
    {
      id: "2",
      with: {
        id: "user2",
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      lastMessage: {
        text: "Thanks for the quick response!",
        time: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isRead: true,
      },
      messages: [
        {
          id: "msg1",
          sender: "user2",
          text: "Hi, I'd like to rent your bike.",
          time: new Date(Date.now() - 1000 * 60 * 60 * 3),
        },
        {
          id: "msg2",
          sender: "me",
          text: "Hello Emma! When do you need it?",
          time: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
        },
        {
          id: "msg3",
          sender: "user2",
          text: "Next weekend, from Friday to Monday.",
          time: new Date(Date.now() - 1000 * 60 * 60 * 2.2),
        },
        {
          id: "msg4",
          sender: "me",
          text: "That should work! Let me check my calendar and confirm.",
          time: new Date(Date.now() - 1000 * 60 * 60 * 2.1),
        },
        {
          id: "msg5",
          sender: "user2",
          text: "Thanks for the quick response!",
          time: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
      ],
    },
  ];

  useEffect(() => {
    // Simulate loading message data
    const timer = setTimeout(() => {
      setLoading(false);
      // Set first conversation as active by default
      if (conversations.length > 0 && !activeConversation) {
        setActiveConversation(conversations[0]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // In a real app, this would send the message to the backend
    toast({
      title: "Message sent",
      description: "This is a demo - in a real app, your message would be sent.",
    });
    
    setMessage("");
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
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <MessageSquare className="text-snaplend-500 mr-2" />
          <h1 className="text-2xl font-bold text-snaplend-900">Messages</h1>
        </div>

        <Separator className="mb-8" />

        {conversations.length === 0 ? (
          <div className="text-center py-12 bg-snaplend-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No messages yet</h2>
            <p className="text-snaplend-600 mb-6">
              When you contact item owners or receive inquiries, they'll appear here.
            </p>
            <Button asChild>
              <Link to="/explore">Explore Listings</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
            <Card className="lg:col-span-1 overflow-hidden">
              <CardContent className="p-0">
                <Tabs defaultValue="all">
                  <TabsList className="w-full rounded-none">
                    <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                    <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                  </TabsList>
                  <ScrollArea className="h-[calc(70vh-54px)]">
                    <div className="divide-y">
                      {conversations.map((convo) => (
                        <div 
                          key={convo.id}
                          className={`p-4 cursor-pointer hover:bg-snaplend-50 transition-colors ${
                            activeConversation?.id === convo.id ? "bg-snaplend-50" : ""
                          }`}
                          onClick={() => setActiveConversation(convo)}
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar>
                              <AvatarImage src={convo.with.avatar} alt={convo.with.name} />
                              <AvatarFallback>{convo.with.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <h3 className="font-medium text-sm">{convo.with.name}</h3>
                                <span className="text-xs text-snaplend-500">
                                  {formatDistanceToNow(convo.lastMessage.time, { addSuffix: true })}
                                </span>
                              </div>
                              <p className="text-sm text-snaplend-600 truncate">
                                {convo.lastMessage.text}
                              </p>
                            </div>
                            {!convo.lastMessage.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 flex flex-col h-full">
              {activeConversation ? (
                <>
                  <div className="p-3 border-b flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={activeConversation.with.avatar} alt={activeConversation.with.name} />
                      <AvatarFallback>{activeConversation.with.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium">{activeConversation.with.name}</h3>
                  </div>
                  
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {activeConversation.messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.sender === 'me' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-snaplend-100 text-snaplend-800'
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                            <p className="text-xs mt-1 opacity-80">
                              {formatDistanceToNow(msg.time, { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <form onSubmit={handleSendMessage} className="p-3 border-t mt-auto">
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="Type a message..." 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <MessageSquare className="h-12 w-12 text-snaplend-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                    <p className="text-sm text-snaplend-500">
                      Select a conversation from the list to view messages
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </Container>
  );
};

export default MessagesPage;
