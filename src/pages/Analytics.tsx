
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, TrendingUp, ArrowRight, Calendar, Users } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const performanceData = [
  { month: 'Jan', sales: 65, target: 50 },
  { month: 'Feb', sales: 59, target: 55 },
  { month: 'Mar', sales: 80, target: 60 },
  { month: 'Apr', sales: 81, target: 65 },
  { month: 'May', sales: 56, target: 70 },
  { month: 'Jun', sales: 55, target: 75 },
  { month: 'Jul', sales: 40, target: 80 },
];

const conversionData = [
  { name: 'Health Insurance', value: 65 },
  { name: 'Mutual Funds', value: 48 },
  { name: 'Car Insurance', value: 35 },
  { name: 'Life Insurance', value: 59 },
  { name: 'Credit Cards', value: 80 },
  { name: 'Home Loans', value: 42 },
];

const timeSeriesData = [
  { date: '2025-04-01', customers: 34, revenue: 42000 },
  { date: '2025-04-08', customers: 42, revenue: 53000 },
  { date: '2025-04-15', customers: 51, revenue: 64000 },
  { date: '2025-04-22', customers: 63, revenue: 79000 },
  { date: '2025-04-29', customers: 75, revenue: 82000 },
  { date: '2025-05-06', customers: 87, revenue: 97000 },
];

const Analytics = () => {
  return (
    <div className="container mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Detailed metrics and performance analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="animate-scale-in">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                Sales Performance vs Target
              </CardTitle>
              <span className="text-sm text-muted-foreground">Last 7 months</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" name="Sales" fill="#3b82f6" />
                  <Bar dataKey="target" name="Target" fill="#93c5fd" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
                Product Conversion Rates
              </CardTitle>
              <span className="text-sm text-muted-foreground">Current month</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={conversionData}
                  margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Conversion %" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 animate-scale-in">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-500" />
              Customer Growth & Revenue Trend
            </CardTitle>
            <span className="text-sm text-muted-foreground">Last 6 weeks</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeSeriesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="customers" name="New Customers" stroke="#3b82f6" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Deal Size</p>
                <h3 className="text-3xl font-bold mt-1">₹42,500</h3>
                <p className="text-xs mt-1 text-green-600">
                  ↑ 18% from last week
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Products per Customer</p>
                <h3 className="text-3xl font-bold mt-1">1.7</h3>
                <p className="text-xs mt-1 text-green-600">
                  ↑ 0.3 from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer Retention</p>
                <h3 className="text-3xl font-bold mt-1">89%</h3>
                <p className="text-xs mt-1 text-green-600">
                  ↑ 4% from last quarter
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
