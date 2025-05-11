
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, Filter, Plus, Eye, Edit, Trash2, Check, X, 
  Percent, CreditCard, Home, Car, Heart, TrendingUp 
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  type: 'insurance' | 'loan' | 'investment' | 'card';
  commission: string;
  commission_range: [number, number];
  description: string;
  popularity: 'high' | 'medium' | 'low';
  salesCount: number;
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Health Insurance Premium',
    type: 'insurance',
    commission: '₹2,500 - ₹5,000',
    commission_range: [2500, 5000],
    description: 'Comprehensive health coverage with cashless claims at 5000+ hospitals',
    popularity: 'high',
    salesCount: 175
  },
  {
    id: '2',
    name: 'Tax Saver Fixed Deposit',
    type: 'investment',
    commission: '₹1,200 - ₹2,800',
    commission_range: [1200, 2800],
    description: 'Lock-in period of 5 years with tax benefits under Section 80C',
    popularity: 'medium',
    salesCount: 120
  },
  {
    id: '3',
    name: 'Car Insurance',
    type: 'insurance',
    commission: '₹1,800 - ₹3,500',
    commission_range: [1800, 3500],
    description: 'Comprehensive coverage with roadside assistance and zero depreciation',
    popularity: 'high',
    salesCount: 150
  },
  {
    id: '4',
    name: 'Home Loan',
    type: 'loan',
    commission: '0.5% - 1%',
    commission_range: [5000, 10000],
    description: 'Affordable home loans with competitive interest rates and flexible tenure',
    popularity: 'high',
    salesCount: 95
  },
  {
    id: '5',
    name: 'Credit Card Gold',
    type: 'card',
    commission: '₹500 - ₹1,200',
    commission_range: [500, 1200],
    description: 'Cashback rewards, lounge access, and exclusive dining benefits',
    popularity: 'medium',
    salesCount: 210
  },
  {
    id: '6',
    name: 'Mutual Fund SIP',
    type: 'investment',
    commission: '1% - 2.5%',
    commission_range: [1000, 2500],
    description: 'Diversified equity funds with consistent historical returns',
    popularity: 'medium',
    salesCount: 145
  },
  {
    id: '7',
    name: 'Term Life Insurance',
    type: 'insurance',
    commission: '₹3,000 - ₹8,000',
    commission_range: [3000, 8000],
    description: 'High coverage at affordable premiums with tax benefits',
    popularity: 'medium',
    salesCount: 110
  }
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'salesCount'>>({
    name: '',
    type: 'insurance',
    commission: '',
    commission_range: [0, 0],
    description: '',
    popularity: 'medium'
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.commission || !newProduct.description) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (isEditing && selectedProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.id === selectedProduct.id ? {...newProduct, id: selectedProduct.id, salesCount: selectedProduct.salesCount} : p
      ));
      toast.success("Product updated successfully");
    } else {
      // Add new product
      const id = Math.random().toString(36).substr(2, 9);
      setProducts(prev => [...prev, {...newProduct, id, salesCount: 0}]);
      toast.success("Product added successfully");
    }
    
    setIsAddDialogOpen(false);
    resetForm();
  };
  
  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
      toast.success("Product deleted successfully");
    }
  };
  
  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      type: product.type,
      commission: product.commission,
      commission_range: product.commission_range,
      description: product.description,
      popularity: product.popularity
    });
    setIsEditing(true);
    setIsAddDialogOpen(true);
  };
  
  const openDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };
  
  const resetForm = () => {
    setNewProduct({
      name: '',
      type: 'insurance',
      commission: '',
      commission_range: [0, 0],
      description: '',
      popularity: 'medium'
    });
    setIsEditing(false);
    setSelectedProduct(null);
  };
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || product.type === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  const popularityColors = {
    high: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-gray-100 text-gray-800"
  };
  
  const typeIcons = {
    insurance: <Heart className="h-5 w-5 text-red-500" />,
    loan: <Home className="h-5 w-5 text-blue-500" />,
    investment: <TrendingUp className="h-5 w-5 text-green-500" />,
    card: <CreditCard className="h-5 w-5 text-purple-500" />
  };
  
  const typeLabels = {
    insurance: 'Insurance',
    loan: 'Loan',
    investment: 'Investment',
    card: 'Card'
  };
  
  // Calculate statistics for the top section
  const totalProducts = products.length;
  const totalSales = products.reduce((sum, product) => sum + product.salesCount, 0);
  const totalCommission = products.reduce((sum, product) => sum + product.commission_range[1], 0);
  
  // Find top performer
  const topPerformer = [...products].sort((a, b) => b.salesCount - a.salesCount)[0];

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Financial Products</h1>
        <p className="text-muted-foreground">Browse and manage all available financial products</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <h3 className="text-3xl font-bold mt-1">{totalProducts}</h3>
                <p className="text-xs mt-1 text-green-600">
                  +2 new this month
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
                  <path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"></path>
                  <path d="M21 12H8"></path>
                  <path d="m16 16 5-5-5-5"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sales This Month</p>
                <h3 className="text-3xl font-bold mt-1">142</h3>
                <p className="text-xs mt-1 text-green-600">
                  +12% from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Commission Earned</p>
                <h3 className="text-3xl font-bold mt-1">₹24,500</h3>
                <p className="text-xs mt-1 text-green-600">
                  +8% from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Percent className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Top Performer</p>
                <h3 className="text-xl font-bold mt-1">{topPerformer?.name || 'None'}</h3>
                <p className="text-xs mt-1 text-green-600">
                  45 sales this month
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-yellow-600">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow max-w-md">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Tabs 
                defaultValue="all" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full sm:w-auto"
              >
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="insurance">Insurance</TabsTrigger>
                  <TabsTrigger value="investment">Investment</TabsTrigger>
                  <TabsTrigger value="loan">Loan</TabsTrigger>
                  <TabsTrigger value="card">Card</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button 
                className="flex gap-2 bg-blue-600 hover:bg-blue-700" 
                onClick={() => {
                  resetForm();
                  setIsAddDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                Product Request
              </Button>
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Popularity</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="animate-scale-in">
                      <TableCell>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[300px]">{product.description}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {typeIcons[product.type]}
                          <span className="ml-2">{typeLabels[product.type]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-blue-600">{product.commission}</TableCell>
                      <TableCell>
                        <Badge className={popularityColors[product.popularity]}>
                          {product.popularity}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.salesCount}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(product)}>
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDeleteDialog(product)}>
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mx-auto mb-2 opacity-30">
                        <path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"></path>
                        <path d="M21 12H8"></path>
                        <path d="m16 16 5-5-5-5"></path>
                      </svg>
                      <p>No products found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Product' : 'Request New Product'}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Update product information in your database.'
                : 'Submit a request for a new product to be added to your portfolio.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Name*</label>
              <Input
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                placeholder="Product Name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type*</label>
              <Tabs 
                defaultValue={newProduct.type} 
                value={newProduct.type}
                onValueChange={(value) => setNewProduct({
                  ...newProduct, 
                  type: value as 'insurance' | 'loan' | 'investment' | 'card'
                })}
                className="w-full"
              >
                <TabsList className="w-full">
                  <TabsTrigger value="insurance" className="flex-1">Insurance</TabsTrigger>
                  <TabsTrigger value="loan" className="flex-1">Loan</TabsTrigger>
                  <TabsTrigger value="investment" className="flex-1">Investment</TabsTrigger>
                  <TabsTrigger value="card" className="flex-1">Card</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Commission Range*</label>
              <Input
                value={newProduct.commission}
                onChange={(e) => setNewProduct({...newProduct, commission: e.target.value})}
                placeholder="e.g. ₹1,000 - ₹2,500 or 1% - 2%"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description*</label>
              <Input
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                placeholder="Product description"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Popularity</label>
              <Tabs 
                defaultValue={newProduct.popularity} 
                value={newProduct.popularity}
                onValueChange={(value) => setNewProduct({
                  ...newProduct, 
                  popularity: value as 'high' | 'medium' | 'low'
                })}
                className="w-full"
              >
                <TabsList className="w-full">
                  <TabsTrigger value="high" className="flex-1">High</TabsTrigger>
                  <TabsTrigger value="medium" className="flex-1">Medium</TabsTrigger>
                  <TabsTrigger value="low" className="flex-1">Low</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProduct}>
              {isEditing ? 'Save Changes' : 'Submit Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedProduct?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
