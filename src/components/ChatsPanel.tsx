
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Chat {
  name: string;
  message: string;
  time: string;
  unread: boolean;
}

const chats: Chat[] = [
  { name: 'Ravi Sharma', message: 'What are the benefits of this policy?', time: '10m', unread: true },
  { name: 'Priya Singh', message: 'Thanks for the information!', time: '1h', unread: true },
  { name: 'Amit Kumar', message: 'When can we schedule a call?', time: '3h', unread: false },
  { name: 'Neha Patel', message: 'I\'m interested in the health plan', time: '1d', unread: false },
];

const ChatsPanel = () => {
  return (
    <div className="hidden lg:block w-full max-w-xs animate-slide-in">
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-gromo-blue" />
              Chats
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chats.map((chat, index) => (
              <div key={index} className={`flex items-start p-3 rounded-lg ${chat.unread ? 'bg-primary/5' : 'hover:bg-muted/50'} cursor-pointer transition-colors`}>
                <Avatar className="h-9 w-9 flex-shrink-0">
                  <AvatarFallback className="bg-gromo-light-blue text-white">{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-grow min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-sm truncate max-w-[120px]">{chat.name}</div>
                    <div className="text-xs text-muted-foreground flex-shrink-0">{chat.time}</div>
                  </div>
                  <div className="text-xs text-muted-foreground truncate mt-1">{chat.message}</div>
                </div>
                {chat.unread && <Badge className="ml-1 bg-gromo-blue text-white h-2 w-2 rounded-full p-0 flex-shrink-0" />}
              </div>
            ))}
            
            <Button variant="outline" className="w-full text-sm mt-2">
              View All Chats
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatsPanel;
