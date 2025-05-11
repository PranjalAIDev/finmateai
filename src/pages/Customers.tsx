
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Search, Filter, Plus, Eye, Edit, Trash2, Check, X, MoreHorizontal } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  interestedProducts: string[];
  status: 'active' | 'inactive' | 'lead';
}

const initialCustomers: Customer[] = [
  { 
    id: '1', 
    name: 'Raj Mehta', 
    email: 'raj.mehta@example.com', 
    phone: '+91 9876543210', 
    city: 'Mumbai', 
    interestedProducts: ['Home Loan', 'Credit Card'],
    status: 'active'
  },
  { 
    id: '2', 
    name: 'Priya Singh', 
    email: 'priya.singh@example.com', 
    phone: '+91 9876543211', 
    city: 'Delhi', 
    interestedProducts: ['Credit Card', 'Health Insurance'],
    status: 'active'
  },
  { 
    id: '3', 
    name: 'Amit Sharma', 
    email: 'amit.sharma@example.com', 
    phone: '+91 9876543212', 
    city: 'Bangalore', 
    interestedProducts: ['Health Insurance', 'Car Insurance'],
    status: 'lead'
  },
  { 
    id: '4', 
    name: 'Neha Patel', 
    email: 'neha.patel@example.com', 
    phone: '+91 9876543213', 
    city: 'Ahmedabad', 
    interestedProducts: ['Home Loan', 'Life Insurance'],
    status: 'inactive'
  },
  { 
    id: '5', 
    name: 'Vikram Rathod', 
    email: 'vikram.r@example.com', 
    phone: '+91 9876543214', 
    city: 'Chennai', 
    interestedProducts: ['Mutual Funds', 'Tax Saving FD'],
    status: 'active'
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState<Omit<Customer, 'id'>>({
    name: '',
    email: '',
    phone: '',
    city: '',
    interestedProducts: [],
    status: 'lead'
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );
  
  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (isEditing && selectedCustomer) {
      // Update existing customer
      setCustomers(prev => prev.map(c => 
        c.id === selectedCustomer.id ? {...newCustomer, id: selectedCustomer.id} : c
      ));
      toast.success("Customer updated successfully");
    } else {
      // Add new customer
      const id = Math.random().toString(36).substr(2, 9);
      setCustomers(prev => [...prev, {...newCustomer, id}]);
      toast.success("Customer added successfully");
    }
    
    setIsAddDialogOpen(false);
    resetForm();
  };
  
  const handleDeleteCustomer = () => {
    if (selectedCustomer) {
      setCustomers(prev => prev.filter(c => c.id !== selectedCustomer.id));
      setIsDeleteDialogOpen(false);
      setSelectedCustomer(null);
      toast.success("Customer deleted successfully");
    }
  };
  
  const openEditDialog = (customer: Customer) => {
    setSelectedCustomer(customer);
    setNewCustomer({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      city: customer.city,
      interestedProducts: customer.interestedProducts,
      status: customer.status
    });
    setIsEditing(true);
    setIsAddDialogOpen(true);
  };
  
  const openDeleteDialog = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };
  
  const resetForm = () => {
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      city: '',
      interestedProducts: [],
      status: 'lead'
    });
    setIsEditing(false);
    setSelectedCustomer(null);
  };
  
  const statusColors = {
    'active': 'bg-green-100 text-green-800 ring-green-600/20',
    'inactive': 'bg-gray-100 text-gray-800 ring-gray-500/20',
    'lead': 'bg-blue-100 text-blue-800 ring-blue-600/20'
  };
  
  const products = [
    'Home Loan', 'Credit Card', 'Health Insurance', 
    'Life Insurance', 'Car Insurance', 'Mutual Funds', 
    'Tax Saving FD'
  ];
  
  const handleProductSelect = (product: string) => {
    if (newCustomer.interestedProducts.includes(product)) {
      setNewCustomer({
        ...newCustomer,
        interestedProducts: newCustomer.interestedProducts.filter(p => p !== product)
      });
    } else {
      setNewCustomer({
        ...newCustomer,
        interestedProducts: [...newCustomer.interestedProducts, product]
      });
    }
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Customer Management</h1>
        <p className="text-muted-foreground">Manage your customers and potential buyers</p>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input 
                placeholder="Search customers..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                Add Customer
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="animate-scale-in">
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarFallback className="bg-blue-500 text-white">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{customer.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{customer.email}</div>
                          <div className="text-muted-foreground">{customer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.city}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {customer.interestedProducts.map((product, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[customer.status]}>
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(customer)}>
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDeleteDialog(customer)}>
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
                      <User className="h-10 w-10 mx-auto mb-2 opacity-30" />
                      <p>No customers found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Update customer information in your database.'
                : 'Add a new customer to your database.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name*</label>
                <Input
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  placeholder="Full Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Input
                  value={newCustomer.city}
                  onChange={(e) => setNewCustomer({...newCustomer, city: e.target.value})}
                  placeholder="City"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email*</label>
              <Input
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                placeholder="Email Address"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone*</label>
              <Input
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                placeholder="Phone Number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select 
                value={newCustomer.status} 
                onValueChange={(value) => setNewCustomer({
                  ...newCustomer, 
                  status: value as 'active' | 'inactive' | 'lead'
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Interested Products</label>
              <div className="flex flex-wrap gap-2">
                {products.map((product) => (
                  <Badge 
                    key={product} 
                    variant={newCustomer.interestedProducts.includes(product) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleProductSelect(product)}
                  >
                    {newCustomer.interestedProducts.includes(product) && (
                      <Check className="h-3 w-3 mr-1" />
                    )}
                    {product}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCustomer}>{isEditing ? 'Save Changes' : 'Add Customer'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedCustomer?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteCustomer}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
