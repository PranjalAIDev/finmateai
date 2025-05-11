
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar as CalendarIcon, Clock, User, Trash2, Check, X } from 'lucide-react';
import { format, isBefore, isToday, isSameDay, addDays, isAfter } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  customer: string;
  notes?: string;
  type: 'meeting' | 'call' | 'follow-up';
  completed?: boolean;
}

const initialAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Discuss Home Loan Options',
    date: new Date(2025, 4, 15), // May 15, 2025
    time: '10:00 AM',
    customer: 'Raj Mehta',
    notes: 'Prepare loan comparison charts',
    type: 'meeting'
  },
  {
    id: '2',
    title: 'Insurance Policy Review',
    date: new Date(2025, 4, 16), // May 16, 2025
    time: '2:30 PM',
    customer: 'Priya Singh',
    type: 'call'
  },
  {
    id: '3',
    title: 'Credit Card Application Follow-up',
    date: new Date(2025, 4, 20), // May 20, 2025
    time: '11:15 AM',
    customer: 'Amit Sharma',
    notes: 'Check application status before call',
    type: 'follow-up'
  },
  // Add a few past appointments
  {
    id: '4',
    title: 'Mutual Fund Discussion',
    date: new Date(2025, 3, 5), // April 5, 2025 (past)
    time: '3:00 PM',
    customer: 'Vikram Rathod',
    type: 'meeting',
    completed: true
  },
  {
    id: '5',
    title: 'Health Insurance Follow-up',
    date: new Date(2025, 3, 12), // April 12, 2025 (past)
    time: '11:30 AM',
    customer: 'Neha Patel',
    type: 'call',
    completed: true
  }
];

const Schedule = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    title: '',
    date: new Date(),
    time: '',
    customer: '',
    notes: '',
    type: 'meeting'
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isPastAppointmentDialogOpen, setIsPastAppointmentDialogOpen] = useState<boolean>(false);
  
  const customers = [
    'Raj Mehta', 'Priya Singh', 'Amit Sharma', 'Neha Patel', 'Vikram Rathod'
  ];
  
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];
  
  const appointmentTypes = [
    { value: 'meeting', label: 'Meeting' },
    { value: 'call', label: 'Call' },
    { value: 'follow-up', label: 'Follow-up' }
  ];
  
  const handleAddAppointment = () => {
    if (!newAppointment.title || !newAppointment.date || !newAppointment.time || !newAppointment.customer) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const id = Math.random().toString(36).substr(2, 9);
    setAppointments(prev => [...prev, {...newAppointment, id}]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("Appointment added successfully");
  };
  
  const handleDeleteAppointment = () => {
    if (selectedAppointment) {
      setAppointments(prev => prev.filter(a => a.id !== selectedAppointment.id));
      setIsDeleteDialogOpen(false);
      setSelectedAppointment(null);
      toast.success("Appointment deleted successfully");
    }
  };
  
  const resetForm = () => {
    setNewAppointment({
      title: '',
      date: new Date(),
      time: '',
      customer: '',
      notes: '',
      type: 'meeting'
    });
  };
  
  const openDeleteDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteDialogOpen(true);
  };
  
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(appointment => 
      isSameDay(appointment.date, date)
    );
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const appsForDay = getAppointmentsForDate(date);
      
      // Check if this is a past date with incomplete appointments
      if (isBefore(date, new Date()) && appsForDay.some(app => !app.completed)) {
        setIsPastAppointmentDialogOpen(true);
      }
    }
  };
  
  const markAppointmentsAsCompleted = () => {
    if (selectedDate) {
      setAppointments(prev => prev.map(app => 
        isSameDay(app.date, selectedDate) && !app.completed 
          ? {...app, completed: true} 
          : app
      ));
      setIsPastAppointmentDialogOpen(false);
      toast.success("Appointments marked as completed");
    }
  };
  
  const currentAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];
  
  const typeColors = {
    'meeting': 'bg-blue-100 text-blue-800 border-blue-300',
    'call': 'bg-green-100 text-green-800 border-green-300',
    'follow-up': 'bg-amber-100 text-amber-800 border-amber-300'
  };
  
  const typeIcons = {
    'meeting': <User className="h-4 w-4" />,
    'call': <Phone className="h-4 w-4" />,
    'follow-up': <Check className="h-4 w-4" />
  };

  // Enhanced function to add appointment indicators on calendar days
  const renderAppointmentIndicators = (day: Date) => {
    const appsForDay = getAppointmentsForDate(day);
    if (appsForDay.length === 0) return null;
    
    const isPastDay = isBefore(day, new Date()) && !isToday(day);
    const isUpcomingDay = isAfter(day, addDays(new Date(), -1)); // Today or future
    
    // Group by type
    const meetingCount = appsForDay.filter(app => app.type === 'meeting').length;
    const callCount = appsForDay.filter(app => app.type === 'call').length;
    const followUpCount = appsForDay.filter(app => app.type === 'follow-up').length;
    
    return (
      <div className="absolute -right-2 -top-2 flex flex-col gap-1 z-10">
        {meetingCount > 0 && (
          <span className={cn(
            "inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium rounded-full border",
            isPastDay ? "bg-gray-100 text-gray-500 border-gray-300" : "bg-blue-100 text-blue-800 border-blue-300"
          )}>
            {isUpcomingDay && <User className="h-2.5 w-2.5 mr-0.5" />}
            {meetingCount}
          </span>
        )}
        {callCount > 0 && (
          <span className={cn(
            "inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium rounded-full border",
            isPastDay ? "bg-gray-100 text-gray-500 border-gray-300" : "bg-green-100 text-green-800 border-green-300"
          )}>
            {isUpcomingDay && <Phone className="h-2.5 w-2.5 mr-0.5" />}
            {callCount}
          </span>
        )}
        {followUpCount > 0 && (
          <span className={cn(
            "inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium rounded-full border",
            isPastDay ? "bg-gray-100 text-gray-500 border-gray-300" : "bg-amber-100 text-amber-800 border-amber-300"
          )}>
            {isUpcomingDay && <Check className="h-2.5 w-2.5 mr-0.5" />}
            {followUpCount}
          </span>
        )}
      </div>
    );
  };
  
  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Schedule</h1>
          <p className="text-muted-foreground">
            {selectedDate ? format(selectedDate, 'EEEE, d MMMM yyyy') : 'Select a date'}
          </p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          New Appointment
        </Button>
      </div>
      
      <div className="mb-6">
        <Card className="animate-scale-in">
          <CardContent className="p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border w-full h-full pointer-events-auto"
              modifiers={{
                hasAppointment: (date) => getAppointmentsForDate(date).length > 0,
                isToday: (date) => isToday(date),
                isPast: (date) => isBefore(date, new Date()) && !isToday(date),
                hasPastAppointment: (date) => 
                  getAppointmentsForDate(date).some(app => app.completed),
                hasUpcomingAppointment: (date) =>
                  isAfter(date, addDays(new Date(), -1)) && getAppointmentsForDate(date).length > 0,
                hasPastIncompleteAppointment: (date) =>
                  isBefore(date, new Date()) && !isToday(date) && getAppointmentsForDate(date).some(app => !app.completed),
              }}
              modifiersClassNames={{
                hasAppointment: "bg-blue-50 font-semibold relative",
                isToday: "bg-blue-100 text-blue-900 font-bold relative",
                isPast: "text-gray-400 relative",
                hasPastAppointment: "bg-gray-100 text-gray-600 relative",
                hasUpcomingAppointment: "bg-blue-50 text-blue-800 font-semibold relative",
                hasPastIncompleteAppointment: "bg-amber-50 text-amber-800 relative",
              }}
              components={{
                DayContent: (props) => {
                  return (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div>{props.date.getDate()}</div>
                      {renderAppointmentIndicators(props.date)}
                    </div>
                  );
                }
              }}
              classNames={{
                month: "space-y-4 w-full",
                table: "w-full border-collapse space-y-1",
                head_row: "flex w-full",
                head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] p-2",
                row: "flex w-full mt-2",
                cell: "h-14 w-full text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn(
                  "h-12 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-blue-50 rounded-md"
                ),
                day_selected: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white",
                day_today: "bg-blue-100 text-blue-800 font-bold",
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Appointment events for selected date */}
      <Card className="mb-6 animate-scale-in">
        <CardHeader className="pb-3">
          <CardTitle>
            Appointments for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Selected Date'}
            {selectedDate && isBefore(selectedDate, new Date()) && !isToday(selectedDate) && (
              <span className="ml-2 text-sm bg-gray-200 text-gray-800 py-1 px-2 rounded-full">Past Date</span>
            )}
            {selectedDate && isToday(selectedDate) && (
              <span className="ml-2 text-sm bg-green-200 text-green-800 py-1 px-2 rounded-full">Today</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentAppointments.length > 0 ? (
            <div className="space-y-4">
              {currentAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className={cn(
                    "flex items-start p-4 border rounded-lg transition-colors animate-scale-in",
                    appointment.completed 
                      ? "border-gray-200 bg-gray-50" 
                      : isBefore(appointment.date, new Date()) && !isToday(appointment.date)
                        ? "border-amber-200 bg-amber-50/40"
                        : isToday(appointment.date)
                          ? "border-blue-300 bg-blue-50/60 shadow-sm"
                          : "border-blue-200 bg-white hover:bg-blue-50/40"
                  )}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${
                    appointment.completed 
                      ? 'bg-gray-200 text-gray-600' 
                      : typeColors[appointment.type]
                  } flex items-center justify-center mr-4`}>
                    {appointment.completed ? <Check className="h-5 w-5" /> : typeIcons[appointment.type]}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={cn(
                          "font-medium",
                          appointment.completed ? "text-gray-600" : ""
                        )}>
                          {appointment.title}
                          {appointment.completed && (
                            <span className="ml-2 text-xs bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full">
                              Completed
                            </span>
                          )}
                          {!appointment.completed && isBefore(appointment.date, new Date()) && !isToday(appointment.date) && (
                            <span className="ml-2 text-xs bg-amber-200 text-amber-800 py-0.5 px-2 rounded-full">
                              Overdue
                            </span>
                          )}
                          {!appointment.completed && isToday(appointment.date) && (
                            <span className="ml-2 text-xs bg-blue-200 text-blue-800 py-0.5 px-2 rounded-full">
                              Today
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {appointment.time}
                          <span className="mx-2">•</span>
                          <User className="h-4 w-4 mr-1" />
                          {appointment.customer}
                        </div>
                      </div>
                      {!appointment.completed && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openDeleteDialog(appointment)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                    {appointment.notes && (
                      <p className="mt-2 text-sm text-muted-foreground">{appointment.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No appointments for this date</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedDate
                  ? `There are no appointments scheduled for ${format(selectedDate, 'MMMM d, yyyy')}`
                  : 'Select a date to view appointments'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add Appointment Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title*</label>
              <Input
                value={newAppointment.title}
                onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                placeholder="Appointment Title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date*</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newAppointment.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newAppointment.date ? format(newAppointment.date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newAppointment.date}
                      onSelect={(date) => date && setNewAppointment({...newAppointment, date})}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time*</label>
                <Select 
                  value={newAppointment.time} 
                  onValueChange={(time) => setNewAppointment({...newAppointment, time})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer*</label>
              <Select 
                value={newAppointment.customer} 
                onValueChange={(customer) => setNewAppointment({...newAppointment, customer})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer} value={customer}>{customer}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type*</label>
              <Select 
                value={newAppointment.type} 
                onValueChange={(type) => setNewAppointment({
                  ...newAppointment, 
                  type: type as 'meeting' | 'call' | 'follow-up'
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes (optional)</label>
              <Input
                value={newAppointment.notes || ''}
                onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                placeholder="Add notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddAppointment}>Add Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to cancel this appointment?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              No, Keep It
            </Button>
            <Button variant="destructive" onClick={handleDeleteAppointment}>
              <Trash2 className="h-4 w-4 mr-2" />
              Yes, Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Past Appointment Dialog */}
      <Dialog open={isPastAppointmentDialogOpen} onOpenChange={setIsPastAppointmentDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Past Appointments</DialogTitle>
          </DialogHeader>
          <p>This date has passed. Would you like to mark all appointments as completed?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPastAppointmentDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              No
            </Button>
            <Button onClick={markAppointmentsAsCompleted}>
              <Check className="h-4 w-4 mr-2" />
              Yes, Mark as Completed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Add this to make Phone icon available
const Phone = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
    strokeLinejoin="round" {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export default Schedule;
