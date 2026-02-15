import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const marketingSkills = [
  { name: "SEO", level: 92 },
  { name: "Google Ads", level: 88 },
  { name: "Meta Ads", level: 85 },
  { name: "Analytics", level: 90 },
];

const techSkills = [
  { name: "React", level: 87 },
  { name: "WordPress", level: 82 },
  { name: "Python", level: 75 },
  { name: "n8n / Automation", level: 90 },
  { name: "APIs & Integrations", level: 85 },
];

const tools = [
  "Google Ads", "Meta Ads", "Ahrefs", "GA4", "React", "WordPress",
  "Python", "n8n", "Zapier", "Figma", "Canva", "Hotjar",
  "GSC", "Semrush", "ClickFunnels", "Notion",
];

const timeline = [
  { year: "2024", title: "Freelance Growth Partner", description: "Full-stack marketing & dev for 20+ clients" },
  { year: "2023", title: "Marketing Automation Lead", description: "Built automated lead gen systems at scale" },
  { year: "2022", title: "SEO & Ads Specialist", description: "Managed ₹50L+ in ad spend across verticals" },
  { year: "2021", title: "Web Developer", description: "Started building custom websites for local businesses" },
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
    <div ref={ref} className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full gradient-bg"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const SkillsPage = () => {
  return (
    <div className="px-5 pt-8 max-w-lg lg:max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-1"
      >
        My <span className="gradient-text">Skills</span>
      </motion.h1>
      <p className="text-xs text-muted-foreground mb-6">Expertise & experience</p>

      {/* Skills in soft cards - side by side on desktop */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-5">
        {/* Marketing Skills */}
        <motion.div variants={container} initial="hidden" animate="show" className="mb-5">
          <motion.h2 variants={item} className="text-[10px] font-bold mb-3 text-muted-foreground/60 uppercase tracking-widest">
            Marketing
          </motion.h2>
          <motion.div variants={item} className="soft-card p-4">
            {marketingSkills.map((s) => (
              <AnimatedBar key={s.name} {...s} />
            ))}
          </motion.div>
        </motion.div>

        {/* Tech Skills */}
        <motion.div variants={container} initial="hidden" animate="show" className="mb-5">
          <motion.h2 variants={item} className="text-[10px] font-bold mb-3 text-muted-foreground/60 uppercase tracking-widest">
            Tech
          </motion.h2>
          <motion.div variants={item} className="soft-card p-4">
            {techSkills.map((s) => (
              <AnimatedBar key={s.name} {...s} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Tools Grid - 3 col pill tags */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-5">
        <motion.h2 variants={item} className="text-[10px] font-bold mb-3 text-muted-foreground/60 uppercase tracking-widest">
          Tools I Use
        </motion.h2>
        <motion.div variants={item} className="flex flex-wrap gap-3">
          {tools.map((tool) => (
            <span key={tool} className="soft-card text-[10px] px-3 py-1.5 font-medium !rounded-xl !shadow-[2px_2px_8px_rgba(0,0,0,0.04),-2px_-2px_8px_rgba(255,255,255,0.4)]">
              {tool}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Timeline */}
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.h2 variants={item} className="text-[10px] font-bold mb-3 text-muted-foreground/60 uppercase tracking-widest">
          Experience
        </motion.h2>
        <div className="relative mt-4 mb-12">
          {/* Timeline Connector Line */}
          {/* Desktop Line */}
          <div className="hidden lg:block absolute top-[18px] left-[5%] right-[5%] h-[2px] bg-slate-200 dark:bg-slate-800">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-primary shadow-[0_0_10px_rgba(253,161,54,0.5)]"
            />
          </div>

          {/* Mobile Line */}
          <div className="lg:hidden absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-200 dark:bg-slate-800">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-primary shadow-[0_0_10px_rgba(253,161,54,0.5)]"
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
                <div className="absolute left-2 lg:left-1/2 lg:-translate-x-1/2 top-1 lg:top-2 w-6 h-6 rounded-full bg-background border-2 border-primary z-10 flex items-center justify-center shadow-[0_0_15px_rgba(253,161,54,0.4)] group-hover:scale-110 transition-transform duration-300">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>

                {/* Content Card */}
                <div className="glass p-4 rounded-2xl relative group-hover:-translate-y-1 transition-transform duration-300 lg:min-h-[140px] flex flex-col justify-center">
                  {/* Year Badge */}
                  <span className="absolute -top-3 left-4 lg:left-1/2 lg:-translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    {t.year}
                  </span>

                  <h3 className="text-sm font-bold mt-2">{t.title}</h3>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{t.description}</p>
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
