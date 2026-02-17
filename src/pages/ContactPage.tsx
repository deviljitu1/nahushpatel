import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Linkedin, Github, Download, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ScheduleDialog } from "@/components/ScheduleDialog";
import emailjs from "@emailjs/browser";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.send(
        'service_sn3a5ge',
        'template_thpk97o',
        {
          to_name: "Nahush",
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          reply_to: form.email,
        },
        'qGG6dTm9vd4dN-yxW'
      );

      toast({ title: "Message sent! 🎉", description: "I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="px-6 pt-10 max-w-lg lg:max-w-4xl mx-auto pb-8">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-1 tracking-tight"
      >
        Get in <span className="gradient-text">Touch</span>
      </motion.h1>
      <p className="text-sm text-muted-foreground mb-8">Let's build something great together</p>

      <div className="lg:grid lg:grid-cols-2 lg:gap-10">
        <motion.form
          variants={container}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit}
          className="space-y-3.5"
        >
          <motion.div variants={item}>
            <Input
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="soft-card !rounded-2xl border-0 h-12 px-4 text-sm focus-visible:ring-primary/30"
              required
            />
          </motion.div>
          <motion.div variants={item}>
            <Input
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="soft-card !rounded-2xl border-0 h-12 px-4 text-sm focus-visible:ring-primary/30"
              required
            />
          </motion.div>
          <motion.div variants={item}>
            <Textarea
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="soft-card !rounded-2xl border-0 min-h-[130px] resize-none px-4 py-3 text-sm focus-visible:ring-primary/30"
              required
            />
          </motion.div>
          <motion.div variants={item}>
            <button
              type="submit"
              disabled={isSending}
              className="w-full gradient-bg text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
              style={{ boxShadow: '0 8px 24px hsl(24 95% 53% / 0.3)' }}
            >
              <Send className="w-4 h-4" /> {isSending ? "Sending..." : "Send Message"}
            </button>
          </motion.div>
        </motion.form>

        <div>
          {/* Social Links */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:mt-0 mt-8"
          >
            <h2 className="section-label">Connect</h2>
            <motion.div variants={item} className="grid grid-cols-2 gap-3">
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="soft-card p-3.5 flex items-center gap-3 text-xs font-semibold">
                <div className="soft-icon-box !w-10 !h-10 !rounded-xl">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                </div>
                WhatsApp
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="soft-card p-3.5 flex items-center gap-3 text-xs font-semibold">
                <div className="soft-icon-box !w-10 !h-10 !rounded-xl">
                  <Linkedin className="w-4 h-4 text-blue-500" />
                </div>
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="soft-card p-3.5 flex items-center gap-3 text-xs font-semibold">
                <div className="soft-icon-box !w-10 !h-10 !rounded-xl">
                  <Github className="w-4 h-4 text-foreground" />
                </div>
                GitHub
              </a>
              <button className="soft-card p-3.5 flex items-center gap-3 text-xs font-semibold text-left">
                <div className="soft-icon-box !w-10 !h-10 !rounded-xl">
                  <Download className="w-4 h-4 text-primary" />
                </div>
                Resume
              </button>
            </motion.div>
          </motion.div>

          {/* Calendar Card */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-5"
          >
            <motion.div variants={item} className="soft-card p-6 text-center">
              <div className="soft-icon-box mx-auto mb-3">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-sm mb-1">Schedule a Meeting</h3>
              <p className="text-[11px] text-muted-foreground mb-4">Pick a time that works for you</p>
              <ScheduleDialog>
                <button className="text-xs gradient-bg text-primary-foreground px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Schedule Meeting
                </button>
              </ScheduleDialog>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
