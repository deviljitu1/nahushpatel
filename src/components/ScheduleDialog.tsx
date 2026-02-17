import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import emailjs from "@emailjs/browser";

interface ScheduleDialogProps {
    children: React.ReactNode;
}

export function ScheduleDialog({ children }: ScheduleDialogProps) {
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState<string>("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSchedule = async () => {
        if (!date || !time || !email || !phone) {
            toast({
                title: "Missing Details",
                description: "Please fill in all fields (Date, Time, Email, Phone).",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // EmailJS Configuration
            const SERVICE_ID = 'service_sn3a5ge';
            const TEMPLATE_ID = 'template_thpk97o'; // IMPORTANT: Ensure this matches your EmailJS Template ID
            const PUBLIC_KEY = 'qGG6dTm9vd4dN-yxW';

            const templateParams = {
                to_name: "Nahush",
                from_name: email,
                message: `Meeting requested for ${format(date, "PPP")} at ${time}. Phone: ${phone}`,
                date: format(date, "PPP"),
                time: time,
                email: email,
                phone: phone,
                reply_to: email,
            };

            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            );

            toast({
                title: "Request Sent Successfully! 🎉",
                description: `Thanks! I'll confirm via email shortly.`,
            });

            setOpen(false);

            // Reset form
            setDate(undefined);
            setTime("");
            setEmail("");
            setPhone("");

        } catch (error) {
            console.error("EmailJS Error:", error);
            const errorMessage = (error as any)?.text || "Something went wrong. Please try again.";
            toast({
                title: "Failed to send request",
                description: `Error: ${errorMessage}. Check console for details.`,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
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
            <DialogContent className="sm:max-w-[425px] md:max-w-[700px] max-h-[90vh] overflow-y-auto w-full">
                <DialogHeader>
                    <DialogTitle>Schedule a Meeting</DialogTitle>
                    <DialogDescription>
                        Enter your details and pick a time.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+91 99999 99999"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2 items-center md:items-start">
                            <Label className="w-full text-left">Select Date</Label>
                            <div className="rounded-md border p-2 flex justify-center bg-background w-fit">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                    className="rounded-md border shadow"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Select Time</Label>
                            <Select onValueChange={setTime} value={time}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Time" />
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

                </div>
                <DialogFooter>
                    <Button
                        onClick={handleSchedule}
                        disabled={isSubmitting}
                        className="w-full gradient-bg text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                        {isSubmitting ? "Sending Request..." : "Confirm Booking"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

