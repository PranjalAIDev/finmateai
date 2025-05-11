import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Phone, MessageSquare, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Message {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  message: string;
  time: string;
  unread: boolean;
  priority: 'high' | 'medium' | 'low';
  online: boolean;
  favorite: boolean;
}

const initialMessages: Message[] = [
  { 
    id: '1', 
    name: 'Raj Mehta', 
    initials: 'RM', 
    message: 'Hello, I saw your advertisement about home loans and I am interested in knowing more',
    time: '2m',
    unread: true,
    priority: 'high',
    online: true,
    favorite: false
  },
  { 
    id: '2', 
    name: 'Priya Singh', 
    initials: 'PS', 
    message: 'Thank you for your help with the credit card application!', 
    time: '1h',
    unread: true,
    priority: 'medium',
    online: false,
    favorite: false
  },
  { 
    id: '3', 
    name: 'Amit Sharma', 
    initials: 'AS',
    message: 'Can we discuss insurance options?', 
    time: '3h',
    unread: true,
    priority: 'high',
    online: false,
    favorite: false
  },
  { 
    id: '4', 
    name: 'Neha Patel', 
    initials: 'NP', 
    message: 'I need to reschedule our meeting', 
    time: '1d',
    unread: false,
    priority: 'low',
    online: false,
    favorite: false
  },
];

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [activeChat, setActiveChat] = useState<Message | null>(initialMessages[0]);
  const [sortBy, setSortBy] = useState<string>('recent');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [messageText, setMessageText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'user' | 'contact', time: string}[]>([
    { text: 'Hello, I saw your advertisement about home loans and I am interested in knowing more', sender: 'contact', time: '10:30 AM' },
    { text: 'Hi Raj! I would be happy to tell you more about our home loan options. Are you looking for a specific amount or term?', sender: 'user', time: '10:32 AM' },
    { text: 'I was thinking about a 20-25 lakh loan for about 15 years', sender: 'contact', time: '10:34 AM' },
    { text: 'That sounds good. Our current interest rates for that amount range from 8.5% to 9.2% depending on your profile. Would you like me to calculate the approximate EMI for you?', sender: 'user', time: '10:36 AM' },
    { text: 'Yes, please. That would be very helpful', sender: 'contact', time: '10:38 AM' },
  ]);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'unread') return matchesSearch && message.unread;
    if (activeTab === 'favorites') return matchesSearch && message.favorite;
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'recent') {
      return a.time.includes('m') ? -1 : b.time.includes('m') ? 1 : 
             a.time.includes('h') ? -1 : b.time.includes('h') ? 1 : 1;
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'high-priority') {
      return a.priority === 'high' ? -1 : b.priority === 'high' ? 1 : 0;
    } else if (sortBy === 'medium-priority') {
      return a.priority === 'medium' ? -1 : b.priority === 'medium' ? 1 : 0;
    } else if (sortBy === 'low-priority') {
      return a.priority === 'low' ? -1 : b.priority === 'low' ? 1 : 0;
    }
    return 0;
  });

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    
    // Add the new message to the chat
    setChatMessages([...chatMessages, {
      text: messageText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    setMessageText('');
    
    // Simulate a response after 1 second
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        text: "Thank you for the information. I'll look into these options and get back to you soon.",
        sender: 'contact',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const setPriorityAndSort = (messageId: string, newPriority: 'high' | 'medium' | 'low') => {
    setMessages(prev => prev.map(message => 
      message.id === messageId ? {...message, priority: newPriority} : message
    ));
    
    if (sortBy === 'priority') {
      // Re-sort the messages when priority changes
      setMessages(prev => [...prev].sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }));
    }
  };

  const toggleFavorite = (messageId: string) => {
    setMessages(prev => prev.map(message => 
      message.id === messageId ? {...message, favorite: !message.favorite} : message
    ));
  };

  const priorityColors = {
    high: "bg-red-100 text-red-800 hover:bg-red-200",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    low: "bg-green-100 text-green-800 hover:bg-green-200"
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Messages</h1>
        <p className="text-muted-foreground">Manage all your customer conversations</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - contacts list */}
        <Card className="lg:col-span-1 animate-slide-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-grow">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-between mb-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                  <TabsTrigger value="favorites" className="flex-1">Favorites</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm text-muted-foreground">Sort by:</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="high-priority">High Priority</SelectItem>
                  <SelectItem value="medium-priority">Medium Priority</SelectItem>
                  <SelectItem value="low-priority">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              {filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex items-start p-3 rounded-lg cursor-pointer transition-colors ${
                    activeChat?.id === message.id ? 'bg-blue-50' : message.unread ? 'bg-blue-50/40' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setActiveChat(message)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      {message.avatar && <AvatarImage src={message.avatar} alt={message.name} />}
                      <AvatarFallback className="bg-blue-500 text-white">{message.initials}</AvatarFallback>
                    </Avatar>
                    {message.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  
                  <div className="ml-3 flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-sm truncate max-w-[120px]">{message.name}</div>
                      <div className="text-xs text-muted-foreground flex-shrink-0">{message.time}</div>
                    </div>
                    <div className="text-xs text-muted-foreground truncate mt-1">{message.message}</div>
                    <div className="flex items-center mt-1.5">
                      <Select 
                        value={message.priority} 
                        onValueChange={(value) => setPriorityAndSort(message.id, value as 'high' | 'medium' | 'low')}
                      >
                        <SelectTrigger className={`h-6 text-xs px-2 py-0 ${priorityColors[message.priority]}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High priority</SelectItem>
                          <SelectItem value="medium">Medium priority</SelectItem>
                          <SelectItem value="low">Low priority</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`ml-2 h-6 w-6 ${message.favorite ? 'text-yellow-500' : 'text-muted-foreground'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(message.id);
                        }}
                      >
                        <Star className="h-4 w-4" fill={message.favorite ? 'currentColor' : 'none'} />
                      </Button>
                      {message.unread && <Badge className="ml-2 h-2 w-2 p-0 bg-blue-500 rounded-full" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Right side - chat window */}
        <Card className="lg:col-span-2 flex flex-col h-[calc(100vh-200px)] animate-fade-in">
          {activeChat ? (
            <>
              <div className="border-b p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-blue-500 text-white">{activeChat.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeChat.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeChat.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <Button variant="ghost" size="icon" className="text-blue-600">
                    <Phone className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-gray-100 rounded-bl-none'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t p-3">
                <div className="flex items-center">
                  <Input 
                    placeholder="Type a message..." 
                    className="flex-grow" 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    className="ml-2" 
                    onClick={handleSendMessage}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span className="ml-2">Send</span>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="text-sm text-muted-foreground mt-1">Choose a contact to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;
