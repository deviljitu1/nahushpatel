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
      className={`soft-card p-5 cursor-pointer transition-all ${isExpanded ? 'border-primary/20' : ''}`}
    >
      <div className="flex items-start gap-4">
        <div className={`soft-icon-box !w-12 !h-12 !rounded-xl transition-colors ${isExpanded ? "!bg-primary/10" : ""}`}>
          <Icon className={`w-5 h-5 ${isExpanded ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm mb-0.5">{service.title}</h3>
          <p className="text-[11px] text-muted-foreground leading-relaxed">{service.short}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 shrink-0 mt-1 ${isExpanded ? "rotate-180 text-primary" : ""}`} />
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.details}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold gradient-text">{service.pricing}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate("contact");
                  }}
                  className="px-5 py-2 rounded-xl gradient-bg text-primary-foreground text-xs font-bold shadow-lg hover:shadow-xl transition-shadow"
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
  return (
    <div className="px-6 pt-10 max-w-lg lg:max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-1 tracking-tight"
      >
        My <span className="gradient-text">Services</span>
      </motion.h1>
      <p className="text-sm text-muted-foreground mb-8">Tap to explore specialized services</p>

      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-4 pb-8 lg:grid lg:grid-cols-2">
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} onNavigate={onNavigate} />
        ))}
      </motion.div>

      {/* Book a Call */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="py-10 flex items-center justify-center gap-4"
      >
        <ScheduleDialog>
          <button className="relative group">
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
            <div className="relative p-3.5 rounded-full gradient-bg shadow-xl animate-ring group-hover:scale-110 transition-transform" style={{ boxShadow: '0 8px 24px hsl(24 95% 53% / 0.3)' }}>
              <Phone className="w-5 h-5 text-primary-foreground" />
            </div>
          </button>
        </ScheduleDialog>

        <ScheduleDialog>
          <button className="text-foreground text-base font-bold hover:text-primary transition-colors">
            Book a Call
          </button>
        </ScheduleDialog>
      </motion.div>
    </div>
  );
};

export default ServicesPage;
