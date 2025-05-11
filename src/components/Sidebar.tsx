import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, MessageSquare, User, Calendar, Grid, ChevronRight } from 'lucide-react';
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
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">Finmate AI</h1>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "rounded-full p-1 transition-colors",
            "hover:bg-blue-500 hover:text-white",
            !collapsed && "bg-transparent text-blue-600"
          )}
          style={{ background: 'none' }}
        >
          <ChevronRight className={cn("h-4 w-4 transition-transform", collapsed ? "rotate-180" : "")}/>
        </button>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-3 py-2 rounded-lg transition-colors",
              location.pathname === item.path
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && <span className="ml-3">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
