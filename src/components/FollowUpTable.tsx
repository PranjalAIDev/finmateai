
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from 'lucide-react';

interface FollowUp {
  name: string;
  company: string;
  product: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

const followUps: FollowUp[] = [
  { name: 'Rajesh Kumar', company: 'Tata Motors', product: 'Car Insurance', date: '23 May', priority: 'high' },
  { name: 'Priya Singh', company: 'Infosys', product: 'Health Insurance', date: '24 May', priority: 'medium' },
  { name: 'Amit Patel', company: 'TCS', product: 'Term Insurance', date: '25 May', priority: 'low' },
  { name: 'Neha Sharma', company: 'Wipro', product: 'Mutual Fund', date: '27 May', priority: 'high' },
];

const FollowUpTable = () => {
  const priorityColors = {
    high: "bg-red-100 text-red-800 ring-red-600/20",
    medium: "bg-yellow-100 text-yellow-800 ring-yellow-600/20",
    low: "bg-green-100 text-green-800 ring-green-600/20"
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <span>Follow Up Chats/Names from CSV File</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="py-2 px-3 text-left font-medium text-muted-foreground">Product</th>
                <th className="py-2 px-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="py-2 px-3 text-left font-medium text-muted-foreground">Priority</th>
                <th className="py-2 px-3 text-right font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {followUps.map((followUp, index) => (
                <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-3">
                    <div>
                      <div className="font-medium">{followUp.name}</div>
                      <div className="text-xs text-muted-foreground">{followUp.company}</div>
                    </div>
                  </td>
                  <td className="py-3 px-3">{followUp.product}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                      {followUp.date}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <Badge className={priorityColors[followUp.priority]}>
                      {followUp.priority}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowUpTable;
