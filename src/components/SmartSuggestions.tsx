
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Suggestion {
  id: string;
  text: string;
}

const SmartSuggestions = () => {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([
    { id: '1', text: 'Call Sanjay Reddy who recently inquired about health insurance.' },
    { id: '2', text: 'Follow up with Meera Patel about her pending credit card application.' },
    { id: '3', text: 'Your conversion rate is 15% higher when you call between 10-11 AM.' },
  ]);

  const refreshSuggestions = () => {
    // In a real app, this would fetch new suggestions from an API
    const newSuggestions = [
      { id: '4', text: 'Raj Mehta is interested in home loans. Contact him today for higher chances of conversion.' },
      { id: '5', text: 'Your mutual fund products have seen a 12% increase in interest this week.' },
      { id: '6', text: 'Schedule a follow-up with Amit Sharma about his insurance options.' },
    ];
    setSuggestions(newSuggestions);
  };

  return (
    <Card className="mb-6 border-blue-100 animate-scale-in">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg mr-3">
              AI
            </span>
            <h3 className="text-xl font-semibold text-blue-700">Smart Suggestions</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshSuggestions}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
        </div>
        
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-blue-50 transition-colors">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 border-2 border-blue-400 flex items-center justify-center text-blue-600 mt-0.5">
                ✓
              </div>
              <p className="text-sm text-gray-700">{suggestion.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestions;
