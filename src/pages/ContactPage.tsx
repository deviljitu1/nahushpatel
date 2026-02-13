import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Linkedin, Github, Download, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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
    <div className="px-5 pt-14 max-w-lg mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-1"
      >
        Get in <span className="gradient-text">Touch</span>
      </motion.h1>
      <p className="text-sm text-muted-foreground mb-6">Let's build something great together</p>

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
            className="glass rounded-xl border-0 h-12"
            required
          />
        </motion.div>
        <motion.div variants={item}>
          <Input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="glass rounded-xl border-0 h-12"
            required
          />
        </motion.div>
        <motion.div variants={item}>
          <Textarea
            placeholder="Your message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="glass rounded-xl border-0 min-h-[120px] resize-none"
            required
          />
        </motion.div>
        <motion.div variants={item}>
          <button
            type="submit"
            className="w-full gradient-bg text-primary-foreground py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 glow-primary hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" /> Send Message
          </button>
        </motion.div>
      </motion.form>

      {/* Social Links */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-8"
      >
        <motion.h2 variants={item} className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Connect
        </motion.h2>
        <motion.div variants={item} className="grid grid-cols-2 gap-2">
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-3 flex items-center gap-2 text-sm font-medium hover:scale-[1.02] transition-transform">
            <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-3 flex items-center gap-2 text-sm font-medium hover:scale-[1.02] transition-transform">
            <Linkedin className="w-4 h-4 text-blue-500" /> LinkedIn
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-3 flex items-center gap-2 text-sm font-medium hover:scale-[1.02] transition-transform">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <button className="glass rounded-xl p-3 flex items-center gap-2 text-sm font-medium hover:scale-[1.02] transition-transform">
            <Download className="w-4 h-4 text-primary" /> Resume
          </button>
        </motion.div>
      </motion.div>

      {/* Calendly Placeholder */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-6"
      >
        <motion.div variants={item} className="glass rounded-2xl p-6 text-center">
          <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold text-sm mb-1">Schedule a Meeting</h3>
          <p className="text-xs text-muted-foreground mb-3">Pick a time that works for you</p>
          <button
            onClick={() => window.open("https://calendly.com", "_blank")}
            className="text-xs gradient-bg text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Open Calendar
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
