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

  return (
    <div className="px-5 pt-14 max-w-lg lg:max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-1"
      >
        My <span className="gradient-text">Services</span>
      </motion.h1>
      <p className="text-sm text-muted-foreground mb-8 text-center">Tap to explore specialized services</p>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-5 px-2 pb-8">
        {services.map((service, i) => {
          const Icon = service.icon;
          const isExpanded = expandedIndex === i;
          return (
            <motion.div
              layout
              key={service.title}
              variants={cardAnim}
              onClick={() => setExpandedIndex(isExpanded ? null : i)}
              className={`soft-card p-4 flex flex-col items-center text-center cursor-pointer relative overflow-hidden ${isExpanded ? "col-span-2 row-span-2 z-10" : ""}`}
            >
              <div className={`soft-icon-box mb-3 transition-all duration-300 ${isExpanded ? "scale-110 bg-primary/10" : "group-hover:scale-105"}`}>
                <Icon className={`w-6 h-6 ${isExpanded ? "text-primary" : "text-muted-foreground"}`} />
              </div>

              <h3 className="font-bold text-sm mb-1 leading-tight">{service.title}</h3>
              {!isExpanded && <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">{service.short}</p>}

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full text-left mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{service.details}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary">{service.pricing}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate("contact");
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-black text-xs font-bold shadow-lg"
                      >
                        Start Project
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isExpanded && (
                <ChevronDown className="w-4 h-4 text-muted-foreground/30 absolute bottom-2 right-2" />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Book a Call */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex items-center justify-center gap-4"
      >
        <ScheduleDialog>
          <button className="relative group">
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping duration-[2000ms]" />
            <div className="relative p-4 rounded-full gradient-bg shadow-xl glow-primary animate-ring group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6 text-white" />
            </div>
          </button>
        </ScheduleDialog>

        <ScheduleDialog>
          <button
            className="text-foreground text-lg font-bold hover:opacity-80 transition-opacity"
          >
            Book a Call
          </button>
        </ScheduleDialog>
      </motion.div>
    </div>
  );
};

export default ServicesPage;
