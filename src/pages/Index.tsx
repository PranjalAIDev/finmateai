
import React from 'react';
import GreetingHeader from '@/components/GreetingHeader';
import FinancialProductCard from '@/components/FinancialProductCard';
import CallingGraph from '@/components/CallingGraph';
import FollowUpTable from '@/components/FollowUpTable';
import PotentialBuyers from '@/components/PotentialBuyers';
import SalesTips from '@/components/SalesTips';
import FinancialEducationTips from '@/components/FinancialEducationTips';
import StatsCard from '@/components/StatsCard';
import SmartSuggestions from '@/components/SmartSuggestions';
import { Phone, TrendingUp, Users, CalendarCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="container mx-auto">
      <GreetingHeader />
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Calls" 
          value="32" 
          icon={<Phone className="h-5 w-5" />}
          trend={{ value: "12%", positive: true }}
        />
        <StatsCard 
          title="Conversion Rate" 
          value="24%" 
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: "5.3%", positive: true }}
        />
        <StatsCard 
          title="Active Customers" 
          value="87" 
          icon={<Users className="h-5 w-5" />}
          trend={{ value: "3%", positive: false }}
        />
        <StatsCard 
          title="Meetings Scheduled" 
          value="8" 
          icon={<CalendarCheck className="h-5 w-5" />}
          trend={{ value: "2", positive: true }}
        />
      </div>
      
      {/* AI Suggestions */}
      <Card className="mb-6 border-blue-200 bg-blue-50/30 animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-blue-700">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-5 w-5 mr-2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            AI-Powered Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SmartSuggestions />
        </CardContent>
      </Card>
      
      {/* Financial Products Row */}
      <h2 className="text-xl font-semibold mb-4">Financial Products to Sell</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {financialProducts.map((product, index) => (
          <FinancialProductCard key={index} {...product} />
        ))}
      </div>
      
      {/* Calling Graph and Potential Buyers */}
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
  );
};

export default Index;
