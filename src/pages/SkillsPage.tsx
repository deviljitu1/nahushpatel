import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const marketingSkills = [
  { name: "SEO & SEM", level: 92 },
  { name: "Google Ads", level: 88 },
  { name: "Meta Ads (Facebook / Instagram)", level: 85 },
  { name: "Analytics (GA4 / GSC)", level: 90 },
  { name: "Email Marketing", level: 80 },
];

const techSkills = [
  { name: "React / Next.js", level: 87 },
  { name: "WordPress & WooCommerce", level: 84 },
  { name: "HTML / CSS", level: 90 },
  { name: "n8n / Zapier Automation", level: 90 },
  { name: "REST APIs & Integrations", level: 85 },
];

const tools = [
  "Google Ads", "Meta Ads Manager", "Ahrefs", "SEMrush", "GA4",
  "Google Search Console", "React", "WordPress", "HTML / CSS", "n8n",
  "Zapier", "Figma", "Canva", "Hotjar", "ClickFunnels",
  "Notion", "Webflow", "Mailchimp",
];

const timeline = [
  {
    year: "2025",
    title: "Freelance Growth Partner",
    company: "Self-Employed",
    description: "Full-stack digital marketing & web development for 30+ clients across India. Delivered ₹2M+ in revenue growth.",
  },
  {
    year: "2024",
    title: "Marketing Automation Lead",
    company: "Freelance",
    description: "Architected automated lead generation systems using n8n & Zapier. Saved clients 20+ hours/week on manual tasks.",
  },
  {
    year: "2023",
    title: "SEO & Paid Ads Specialist",
    company: "Freelance",
    description: "Managed ₹50L+ in ad spend across Google & Meta. Achieved average ROAS of 4.2x for e-commerce clients.",
  },
  {
    year: "2022",
    title: "Web Developer",
    company: "Freelance",
    description: "Built high-performance websites & landing pages for local businesses in Raipur. Focused on speed & conversions.",
  },
];

function AnimatedBar({ level, name }: { level: number; name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setWidth(level); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="mb-5 last:mb-0">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="font-semibold text-foreground">{name}</span>
        <span className="text-muted-foreground font-medium">{level}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full gradient-bg"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const SkillsPage = () => {
  return (
    <div className="px-6 pt-10 max-w-lg lg:max-w-4xl mx-auto pb-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-1 tracking-tight"
      >
        Skills &amp; <span className="text-shimmer">Experience</span>
      </motion.h1>
      <p className="text-sm text-muted-foreground mb-8">4+ years of hands-on expertise in marketing &amp; development</p>

      {/* Skills in soft cards */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mb-6 lg:mb-0">
          <motion.h2 variants={item} className="section-label">Marketing &amp; Growth</motion.h2>
          <motion.div variants={item} className="soft-card p-5">
            {marketingSkills.map((s) => (
              <AnimatedBar key={s.name} {...s} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mb-6 lg:mb-0">
          <motion.h2 variants={item} className="section-label">Tech &amp; Development</motion.h2>
          <motion.div variants={item} className="soft-card p-5">
            {techSkills.map((s) => (
              <AnimatedBar key={s.name} {...s} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Tools Grid */}
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-8 mb-8">
        <motion.h2 variants={item} className="section-label">Tools &amp; Platforms</motion.h2>
        <motion.div variants={item} className="flex flex-wrap gap-2.5">
          {tools.map((tool) => (
            <motion.span key={tool} variants={item} className="soft-card !rounded-xl px-4 py-2 text-[11px] font-bold text-muted-foreground hover:text-primary hover:border-primary/20 cursor-default transition-colors"
              whileHover={{ scale: 1.08, y: -2 }}
            >
              {tool}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Timeline */}
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
        <motion.h2 variants={item} className="section-label">Work Experience</motion.h2>
        <div className="relative mt-4 mb-12">
          {/* Desktop Line */}
          <div className="hidden lg:block absolute top-[18px] left-[5%] right-[5%] h-[2px] bg-border">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full gradient-bg"
            />
          </div>

          {/* Mobile Line */}
          <div className="lg:hidden absolute left-[19px] top-4 bottom-4 w-[2px] bg-border">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full gradient-bg"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {[...timeline].reverse().map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="relative pl-12 lg:pl-0 lg:pt-12 lg:text-center group"
              >
                {/* Node Dot */}
                <div className="absolute left-2 lg:left-1/2 lg:-translate-x-1/2 top-1 lg:top-2 w-6 h-6 rounded-full bg-background border-2 border-primary z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ boxShadow: '0 0 12px hsl(24 95% 53% / 0.3)' }}>
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>

                {/* Content Card */}
                <div className="soft-card p-4 relative group-hover:-translate-y-1 transition-transform duration-300 lg:min-h-[160px] flex flex-col justify-center">
                  <span className="absolute -top-3 left-4 lg:left-1/2 lg:-translate-x-1/2 gradient-bg text-primary-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                    {t.year}
                  </span>
                  <h3 className="text-sm font-bold mt-2">{t.title}</h3>
                  <p className="text-[10px] font-semibold text-primary/80 mb-1">{t.company}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{t.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsPage;
