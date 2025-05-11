
import React from 'react';
import Header from '@/components/Header';
import GreetingHeader from '@/components/GreetingHeader';
import FinancialProductCard from '@/components/FinancialProductCard';
import CallingGraph from '@/components/CallingGraph';
import FollowUpTable from '@/components/FollowUpTable';
import PotentialBuyers from '@/components/PotentialBuyers';
import SalesTips from '@/components/SalesTips';
import FinancialEducationTips from '@/components/FinancialEducationTips';
import StatsCard from '@/components/StatsCard';
import ChatsPanel from '@/components/ChatsPanel';
import { Phone, TrendingUp, Users, CalendarCheck } from 'lucide-react';

// Sample data for financial products
const financialProducts = [
  {
    title: "Health Insurance Premium",
    type: "Insurance",
    commission: "₹2,500 - ₹5,000",
    description: "Comprehensive health coverage with cashless claims at 5000+ hospitals",
    popularity: "high" as const
  },
  {
    title: "Tax Saver Fixed Deposit",
    type: "Investment",
    commission: "₹1,200 - ₹2,800",
    description: "Lock-in period of 5 years with tax benefits under Section 80C",
    popularity: "medium" as const
  },
  {
    title: "Car Insurance",
    type: "Insurance",
    commission: "₹1,800 - ₹3,500",
    description: "Comprehensive coverage with roadside assistance and zero depreciation",
    popularity: "high" as const
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="flex-1">
            <GreetingHeader />
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard 
                title="Total Calls" 
                value="28" 
                icon={<Phone className="h-5 w-5" />}
                trend={{ value: "12%", positive: true }}
              />
              <StatsCard 
                title="Conversion Rate" 
                value="24.5%" 
                icon={<TrendingUp className="h-5 w-5" />}
                trend={{ value: "5.3%", positive: true }}
              />
              <StatsCard 
                title="Active Leads" 
                value="42" 
                icon={<Users className="h-5 w-5" />}
              />
              <StatsCard 
                title="Meetings Scheduled" 
                value="8" 
                icon={<CalendarCheck className="h-5 w-5" />}
                trend={{ value: "2", positive: true }}
              />
            </div>
            
            {/* Financial Products Row */}
            <h2 className="text-xl font-semibold mb-4">Financial Products to Sell</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {financialProducts.map((product, index) => (
                <FinancialProductCard key={index} {...product} />
              ))}
            </div>
            
            {/* Calling Graph and Follow Ups */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <CallingGraph />
              <PotentialBuyers />
            </div>
            
            {/* Follow-up Table */}
            <div className="mb-6">
              <FollowUpTable />
            </div>
            
            {/* Tips Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <SalesTips />
              <FinancialEducationTips />
            </div>
          </div>
          
          {/* Chats Panel */}
          <ChatsPanel />
        </div>
      </main>
    </div>
  );
};

export default Index;
