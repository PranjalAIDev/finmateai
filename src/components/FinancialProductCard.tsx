
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Info } from 'lucide-react';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const popularityColors = {
    high: "bg-green-100 text-green-800 ring-green-600/20",
    medium: "bg-yellow-100 text-yellow-800 ring-yellow-600/20",
    low: "bg-gray-100 text-gray-800 ring-gray-500/20"
  };
  
  return (
    <>
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
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => setIsDialogOpen(true)}
          >
            View Information
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              {title}
            </DialogTitle>
            <DialogDescription>
              Detailed product information and selling points
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <Badge className={popularityColors[popularity]}>
                {popularity} demand
              </Badge>
              <span className="font-medium text-gromo-blue">{commission} commission</span>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Product Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Type:</span>
                <span>{type}</span>
                <span className="text-muted-foreground">Target Audience:</span>
                <span>{popularity === 'high' ? 'Mass market' : popularity === 'medium' ? 'Middle-income' : 'Premium customers'}</span>
                <span className="text-muted-foreground">Processing Time:</span>
                <span>{type === 'Insurance' ? '24-48 hours' : '3-5 working days'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Description</h4>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Selling Points</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Highly competitive rates in the market</li>
                <li>Fast approval process with minimal documentation</li>
                <li>24/7 customer support for queries and claims</li>
                <li>Digital-first experience with paperless process</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Customer Testimonial</h4>
              <blockquote className="text-sm italic text-muted-foreground border-l-2 border-blue-200 pl-3">
                "This product has been a game-changer for my financial planning. The returns are great and the service is exceptional."
              </blockquote>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
            <Button className="bg-blue-500 hover:bg-blue-600">Sell This Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinancialProductCard;
