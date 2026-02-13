
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ScheduleDialogProps {
    children: React.ReactNode;
}

export function ScheduleDialog({ children }: ScheduleDialogProps) {
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState<string>("");
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const handleSchedule = () => {
        if (!date || !time) {
            toast({
                title: "Please select both date and time",
                description: "We need both to schedule your meeting.",
                variant: "destructive",
            });
            return;
        }

        // Simulate scheduling
        setTimeout(() => {
            setOpen(false);
            toast({
                title: "Meeting Request Sent! 📅",
                description: `Requested for ${format(date, "PPP")} at ${time}. I'll confirm shortly via email.`,
            });
            setDate(undefined);
            setTime("");
        }, 500);
    };

    const timeSlots = [
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
        "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
    ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Schedule a Meeting</DialogTitle>
                    <DialogDescription>
                        Select a date and time for our call.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium">Select Date</span>
                        <div className="rounded-md border flex justify-center p-2">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium">Select Time</span>
                        <Select onValueChange={setTime} value={time}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                                {timeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot}>
                                        {slot}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSchedule} className="w-full gradient-bg text-primary-foreground hover:opacity-90 transition-opacity">
                        Confirm Booking
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
