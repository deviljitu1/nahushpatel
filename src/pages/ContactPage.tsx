import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Linkedin, Github, Download, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ScheduleDialog } from "@/components/ScheduleDialog";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent! 🎉", description: "I'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="px-5 pt-8 max-w-lg lg:max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-1"
      >
        Get in <span className="gradient-text">Touch</span>
      </motion.h1>
      <p className="text-xs text-muted-foreground mb-6">Let's build something great together</p>

      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <motion.form
          variants={container}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <motion.div variants={item}>
            <Input
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="soft-card !rounded-2xl border-0 h-12 px-4 text-sm"
              required
            />
          </motion.div>
          <motion.div variants={item}>
            <Input
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="soft-card !rounded-2xl border-0 h-12 px-4 text-sm"
              required
            />
          </motion.div>
          <motion.div variants={item}>
            <Textarea
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="soft-card !rounded-2xl border-0 min-h-[120px] resize-none px-4 py-3 text-sm"
              required
            />
          </motion.div>
          <motion.div variants={item}>
            <button
              type="submit"
              className="w-full gradient-bg text-primary-foreground py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
            >
              <Send className="w-4 h-4" /> Send Message
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
            <motion.h2 variants={item} className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-3">
              Connect
            </motion.h2>
            <motion.div variants={item} className="grid grid-cols-2 gap-3">
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="soft-card p-3 flex items-center gap-2 text-xs font-medium hover:-translate-y-0.5 transition-all">
                <div className="soft-icon-box !w-9 !h-9 !rounded-xl">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                </div>
                WhatsApp
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="soft-card p-3 flex items-center gap-2 text-xs font-medium hover:-translate-y-0.5 transition-all">
                <div className="soft-icon-box !w-9 !h-9 !rounded-xl">
                  <Linkedin className="w-4 h-4 text-blue-500" />
                </div>
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="soft-card p-3 flex items-center gap-2 text-xs font-medium hover:-translate-y-0.5 transition-all">
                <div className="soft-icon-box !w-9 !h-9 !rounded-xl">
                  <Github className="w-4 h-4 text-foreground" />
                </div>
                GitHub
              </a>
              <button className="soft-card p-3 flex items-center gap-2 text-xs font-medium hover:-translate-y-0.5 transition-all text-left">
                <div className="soft-icon-box !w-9 !h-9 !rounded-xl">
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
            <motion.div variants={item} className="soft-card p-5 text-center">
              <div className="soft-icon-box mx-auto mb-3">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1">Schedule a Meeting</h3>
              <p className="text-[10px] text-muted-foreground mb-3">Pick a time that works for you</p>
              <ScheduleDialog>
                <button className="text-xs gradient-bg text-primary-foreground px-5 py-2 rounded-xl font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all">
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
