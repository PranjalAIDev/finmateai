
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Tip {
  title: string;
  content: string;
}

const tips: Tip[] = [
  {
    title: "Understanding Term Insurance",
    content: "Term insurance provides coverage for a specific period. It's the most affordable type of life insurance."
  },
  {
    title: "Mutual Funds vs. Direct Equity",
    content: "Mutual funds offer professional management and diversification, while direct equity gives you more control."
  },
  {
    title: "Emergency Fund Importance",
    content: "An emergency fund should cover 3-6 months of expenses and be easily accessible."
  }
];

const FinancialEducationTips = () => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-gromo-blue" />
          Financial Education Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <h3 className="font-medium mb-1">{tip.title}</h3>
              <p className="text-sm text-muted-foreground">{tip.content}</p>
            </div>
          ))}
          
          <Button variant="link" className="w-full flex items-center justify-center text-gromo-blue gap-1 p-0">
            <span>View more financial tips</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialEducationTips;
