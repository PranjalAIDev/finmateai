
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface FinancialProductProps {
  title: string;
  type: string;
  commission: string;
  description: string;
  popularity: 'high' | 'medium' | 'low';
}

const FinancialProductCard: React.FC<FinancialProductProps> = ({
  title,
  type,
  commission,
  description,
  popularity
}) => {
  const popularityColors = {
    high: "bg-green-100 text-green-800 ring-green-600/20",
    medium: "bg-yellow-100 text-yellow-800 ring-yellow-600/20",
    low: "bg-gray-100 text-gray-800 ring-gray-500/20"
  };
  
  return (
    <Card className="card-hover animate-scale-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge className={popularityColors[popularity]}>
            {popularity} demand
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium">{type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Commission:</span>
            <span className="font-medium text-gromo-blue">{commission}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-gromo-blue hover:bg-gromo-dark-blue">Sell This Product</Button>
      </CardFooter>
    </Card>
  );
};

export default FinancialProductCard;
