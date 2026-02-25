import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Search, Megaphone, Zap, GitBranch,
  FileText, ChevronDown, Phone, CheckCircle2
} from "lucide-react";
import { ScheduleDialog } from "@/components/ScheduleDialog";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    short: "Custom React & WordPress sites",
    badge: "Popular",
    details: "High-performance, mobile-first websites built with modern tech. Landing pages, e-commerce, SaaS dashboards — optimised for speed & conversions.",
    highlights: ["React / Next.js / WordPress", "SEO-optimised & mobile-first", "Integrated with your tools"],
    pricing: "Starting ₹15,000",
  },
  {
    icon: Search,
    title: "SEO Optimisation",
    short: "Rank #1 on Google",
    badge: null,
    details: "Full technical audits, keyword research, content strategy & link building. Data-driven approach to dominate organic search results.",
    highlights: ["Technical SEO audit", "Keyword & competitor research", "Monthly ranking reports"],
    pricing: "Starting ₹10,000 / mo",
  },
  {
    icon: Megaphone,
    title: "Google Ads & Meta Ads",
    short: "High ROAS paid campaigns",
    badge: "High ROI",
    details: "Strategic paid campaigns on Google, Facebook & Instagram. Full funnel setup with retargeting, lookalike audiences, and conversion tracking.",
    highlights: ["Average 4.2x ROAS delivered", "Full funnel & retargeting", "Weekly performance reports"],
    pricing: "Starting ₹8,000 / mo + ad spend",
  },
  {
    icon: Zap,
    title: "Marketing Automation",
    short: "n8n & AI workflows",
    badge: "Time Saver",
    details: "Automate lead capture, nurture sequences, CRM updates, and reporting. Save 20+ hours/week with intelligent automation workflows.",
    highlights: ["n8n automation workflows", "CRM & email automation", "AI-powered pipelines"],
    pricing: "Starting ₹12,000",
  },
  {
    icon: GitBranch,
    title: "Funnel Building",
    short: "Convert visitors to customers",
    badge: null,
    details: "End-to-end sales funnels — lead magnets, webinar funnels, tripwire offers, and upsell sequences designed to maximise customer lifetime value.",
    highlights: ["Lead magnet & landing pages", "Email nurture sequences", "Upsell & checkout pages"],
    pricing: "Starting ₹20,000",
  },
  {
    icon: FileText,
    title: "Content Strategy",
    short: "Content that drives growth",
    badge: null,
    details: "Social media calendars, blog strategies, video content plans, and copywriting — built around your audience's intent and buying journey.",
    highlights: ["Content calendar & scripts", "SEO blog strategy", "Social media copy"],
    pricing: "Starting ₹8,000 / mo",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const cardAnim = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const ServiceCard = ({ service, onNavigate }: { service: typeof services[number]; onNavigate: (tab: string) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      variants={cardAnim}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`soft-card p-5 cursor-pointer transition-all ${isExpanded ? "border-primary/20 ring-1 ring-primary/10" : ""}`}
    >
      <div className="flex items-start gap-4">
        <div className={`soft-icon-box !w-12 !h-12 !rounded-xl shrink-0 transition-colors ${isExpanded ? "!bg-primary/10" : ""}`}>
          <Icon className={`w-5 h-5 ${isExpanded ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <h3 className="font-bold text-sm">{service.title}</h3>
            {service.badge && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full gradient-bg text-primary-foreground">
                {service.badge}
              </span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">{service.short}</p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 shrink-0 mt-1 ${isExpanded ? "rotate-180 text-primary" : ""}`}
        />
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
              <p className="text-[12px] text-muted-foreground mb-3 leading-relaxed">{service.details}</p>

              {/* Highlights */}
              <ul className="space-y-1.5 mb-4">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-[11px] text-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold gradient-text">{service.pricing}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); onNavigate("contact"); }}
                  className="px-5 py-2 rounded-xl gradient-bg text-primary-foreground text-xs font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Get Started →
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-1 tracking-tight"
      >
        My <span className="text-shimmer">Services</span>
      </motion.h1>
      <p className="text-sm text-muted-foreground mb-8">Tap any card to see full details &amp; pricing</p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-col gap-4 pb-6 lg:grid lg:grid-cols-2"
      >
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} onNavigate={onNavigate} />
        ))}
      </motion.div>

      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6 soft-card p-6 text-center relative overflow-hidden"
      >
        {/* BG glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none rounded-3xl" />
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest font-semibold">Not sure where to start?</p>
        <h3 className="text-lg font-bold mb-3">Let's talk &amp; figure it out together</h3>

        <div className="flex items-center justify-center gap-4">
          <ScheduleDialog>
            <button className="relative group">
              <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
              <div className="relative p-3.5 rounded-full gradient-bg shadow-xl animate-ring group-hover:scale-110 transition-transform"
                style={{ boxShadow: "0 8px 24px hsl(24 95% 53% / 0.3)" }}>
                <Phone className="w-5 h-5 text-primary-foreground" />
              </div>
            </button>
          </ScheduleDialog>
          <ScheduleDialog>
            <button className="text-foreground text-base font-bold hover:text-primary transition-colors">
              Book a Free Call →
            </button>
          </ScheduleDialog>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesPage;
