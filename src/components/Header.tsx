
import React from 'react';
import { Search, User, Bell, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white shadow-sm animate-fade-in">
      <div className="flex items-center">
        <div className="flex items-center mr-10">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gromo-blue text-white mr-2">
            <span className="font-bold text-lg">G</span>
          </div>
          <h1 className="text-xl font-semibold">GroMo Partner</h1>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="hidden md:flex items-center max-w-md w-full relative">
        <div className="relative w-full">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="text-muted-foreground mr-2">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
