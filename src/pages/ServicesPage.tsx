import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Search, Megaphone, Zap, GitBranch, FileText, ChevronDown, Phone } from "lucide-react";

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
    short: "High ROAS ad campaigns",
    details: "Strategic paid campaigns on Google, Facebook, and Instagram. Full funnel setup with retargeting, lookalike audiences, and conversion tracking.",
    pricing: "Starting from ₹8,000/mo + ad spend",
  },
  {
    icon: Zap,
    title: "Marketing Automation",
    short: "n8n, Zapier & workflow magic",
    details: "Automate lead capture, nurture sequences, CRM updates, and reporting. Save 20+ hours/week with intelligent automation workflows.",
    pricing: "Starting from ₹12,000",
  },
  {
    icon: GitBranch,
    title: "Funnel Building",
    short: "Convert visitors into customers",
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

interface ServicesPageProps {
  onNavigate: (tab: string) => void;
}

const ServicesPage = ({ onNavigate }: ServicesPageProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleBookCall = () => {
    window.open("https://calendly.com", "_blank");
  };

  return (
    <div className="px-5 pt-14 max-w-lg mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-1"
      >
        My <span className="gradient-text">Services</span>
      </motion.h1>
      <p className="text-sm text-muted-foreground mb-6">What I can do for you</p>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        {services.map((service, i) => {
          const Icon = service.icon;
          const isExpanded = expandedIndex === i;
          return (
            <motion.div
              key={service.title}
              variants={cardAnim}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className="w-full p-4 flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{service.title}</h3>
                  <p className="text-xs text-muted-foreground">{service.short}</p>
                </div>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-3">{service.details}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold gradient-text">{service.pricing}</span>
                        <button
                          onClick={() => onNavigate("contact")}
                          className="text-xs gradient-bg text-primary-foreground px-4 py-1.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Book a Call */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <button
          onClick={handleBookCall}
          className="gradient-bg text-primary-foreground px-8 py-3 rounded-2xl font-semibold text-sm flex items-center gap-2 mx-auto glow-primary hover:opacity-90 transition-opacity"
        >
          <Phone className="w-4 h-4" /> Book a Call
        </button>
      </motion.div>
    </div>
  );
};

export default ServicesPage;
