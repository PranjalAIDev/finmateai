
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

interface Buyer {
  name: string;
  location: string;
  product: string;
  score: number;
}

const buyers: Buyer[] = [
  { name: 'Sanjay Mehta', location: 'Mumbai', product: 'Health Insurance', score: 85 },
  { name: 'Ananya Desai', location: 'Delhi', product: 'Term Insurance', score: 78 },
  { name: 'Vikram Singh', location: 'Bangalore', product: 'Car Insurance', score: 92 },
  { name: 'Pooja Patel', location: 'Ahmedabad', product: 'Home Loan', score: 68 },
];

const PotentialBuyers = () => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return `${parts[0][0]}${parts.length > 1 ? parts[1][0] : ''}`;
  };

  const getRandomColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">Potential Buyers from Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {buyers.map((buyer, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className={getRandomColor(buyer.name)}>
                    {getInitials(buyer.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{buyer.name}</div>
                  <div className="text-xs text-muted-foreground">{buyer.location}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-medium text-sm ${getScoreColor(buyer.score)}`}>
                  Score: {buyer.score}%
                </div>
                <div className="text-xs text-muted-foreground">{buyer.product}</div>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full flex items-center justify-center gap-2 mt-2">
            <span>View All Potential Buyers</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PotentialBuyers;
