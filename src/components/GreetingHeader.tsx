
import React, { useEffect, useState } from 'react';

const GreetingHeader = () => {
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);
  
  return (
    <div className="mb-6 animate-slide-in">
      <h2 className="text-2xl font-bold mb-1">{greeting}, Partner</h2>
      <p className="text-muted-foreground">
        Here's your sales and performance overview for today
      </p>
    </div>
  );
};

export default GreetingHeader;
