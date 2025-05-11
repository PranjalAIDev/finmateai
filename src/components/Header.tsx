
import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-3 px-6 bg-white border-b shadow-sm animate-fade-in">
      <div className="flex items-center flex-grow">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600 mr-4">GP Assistant</h1>
        </div>
        <div className="relative w-full max-w-xl">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="text-muted-foreground mr-2 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarFallback className="bg-blue-500 text-white">GP</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
