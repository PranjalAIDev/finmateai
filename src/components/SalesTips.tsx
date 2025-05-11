
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from 'lucide-react';

const tips = [
  "Always identify the customer's specific needs before recommending products",
  "Use simple language to explain complex financial products",
  "Share success stories of similar customers who benefited from the product",
  "Address objections proactively with clear, factual information",
  "Emphasize long-term benefits over short-term costs"
];

const SalesTips = () => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">Sales Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gromo-blue flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <p className="ml-3 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesTips;
