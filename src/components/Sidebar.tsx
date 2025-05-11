
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, MessageSquare, User, Calendar, Grid, ChevronLeft } from 'lucide-react';
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Customers', path: '/customers' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: Grid, label: 'Products', path: '/products' },
  ];

  return (
    <div className={cn(
      "h-screen bg-white border-r flex-shrink-0 transition-all duration-300 animate-slide-in relative",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-4 flex items-center border-b">
        {!collapsed && (
          <>
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-blue-500 text-white mr-2">
              <span className="font-bold text-lg">G</span>
            </div>
            <h1 className="text-xl font-semibold text-blue-600">GroMo AI</h1>
          </>
        )}
        {collapsed && (
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-blue-500 text-white mx-auto">
            <span className="font-bold text-lg">G</span>
          </div>
        )}
      </div>
      
      <button 
        onClick={() => setCollapsed(!collapsed)} 
        className="absolute -right-3 top-16 bg-white border rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors z-10"
      >
        <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed ? "rotate-180" : "")} />
      </button>
      
      <div className="py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex items-center gap-x-2 rounded-md px-3 py-2.5 text-sm font-medium transition-all hover:bg-blue-50",
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-blue-700" : "text-gray-500")} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={cn("absolute bottom-4 w-full px-6", collapsed ? "px-2" : "")}>
        <div className="p-3 bg-blue-50 rounded-lg">
          {!collapsed && (
            <div className="text-xs font-medium text-blue-800">GP Assistant</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
