import React from 'react';

const GreetingHeader = () => {
  return (
    <div className="mb-6 animate-slide-in">
      <h2 className="text-2xl font-bold mb-1">Welcome Back, GP Partner</h2>
      <p className="text-muted-foreground">
        Here's your sales and performance overview for today
      </p>
    </div>
  );
};

export default GreetingHeader;
