import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Search, Megaphone, Zap, GitBranch, FileText, ChevronDown, Phone } from "lucide-react";
import { ScheduleDialog } from "@/components/ScheduleDialog";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    short: "Custom React & WordPress sites",
    details: "High-performance, mobile-first websites built with modern tech. Landing pages, e-commerce, SaaS dashboards — optimized for speed and conversions.",
    pricing: "Starting from ₹15,000",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    short: "Rank #1 on Google",
    details: "Full technical audits, keyword research, content strategy, and link building. Data-driven approach to dominate organic search results.",
    pricing: "Starting from ₹10,000/mo",
  },
  {
    icon: Megaphone,
    title: "Google Ads & Meta Ads",
    short: "High ROAS campaigns",
    details: "Strategic paid campaigns on Google, Facebook, and Instagram. Full funnel setup with retargeting, lookalike audiences, and conversion tracking.",
    pricing: "Starting from ₹8,000/mo + ad spend",
  },
  {
    icon: Zap,
    title: "Marketing Automation",
    short: "n8n, Zapier & workflows",
    details: "Automate lead capture, nurture sequences, CRM updates, and reporting. Save 20+ hours/week with intelligent automation workflows.",
    pricing: "Starting from ₹12,000",
  },
  {
    icon: GitBranch,
    title: "Funnel Building",
    short: "Convert visitors to customers",
    details: "End-to-end sales funnels — lead magnets, webinar funnels, tripwire offers, and upsell sequences designed to maximize customer lifetime value.",
    pricing: "Starting from ₹20,000",
  },
  {
    icon: FileText,
    title: "Content Strategy",
    short: "Content that drives growth",
    details: "Social media calendars, blog strategies, video content plans, and copywriting. Built around your audience's intent and buying journey.",
    pricing: "Starting from ₹8,000/mo",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ServiceCard = ({ service, onNavigate }: { service: any; onNavigate: (tab: string) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      variants={cardAnim}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 border-b-[4px] ${isExpanded ? 'border-b-primary' : 'border-b-slate-200 dark:border-b-slate-800'} rounded-2xl p-5 cursor-pointer hover:border-b-primary/50 transition-all active:border-b-0 active:translate-y-[4px]`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl transition-colors ${isExpanded ? "bg-primary/10 text-primary" : "bg-slate-100 dark:bg-slate-800 text-muted-foreground"}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-sm mb-1">{service.title}</h3>
          <p className="text-[11px] text-muted-foreground leading-relaxed">{service.short}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.details}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-primary">{service.pricing}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate("contact");
                  }}
                  className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Start Project
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface ServicesPageProps {
  onNavigate: (tab: string) => void;
}

const ServicesPage = ({ onNavigate }: ServicesPageProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="px-5 pt-8 max-w-lg lg:max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-1"
      >
        My <span className="gradient-text">Services</span>
      </motion.h1>
      <p className="text-xs text-muted-foreground mb-6">Tap to explore specialized services</p>

      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-4 pb-24">
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} onNavigate={onNavigate} />
        ))}
      </motion.div>

      {/* Book a Call */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex items-center justify-center gap-4"
      >
        <ScheduleDialog>
          <button className="relative group">
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping duration-[2000ms]" />
            <div className="relative p-3.5 rounded-full gradient-bg shadow-xl glow-primary animate-ring group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5 text-white" />
            </div>
          </button>
        </ScheduleDialog>

        <ScheduleDialog>
          <button className="text-foreground text-base font-bold hover:opacity-80 transition-opacity">
            Book a Call
          </button>
        </ScheduleDialog>
      </motion.div>
    </div>
  );
};

export default ServicesPage;
