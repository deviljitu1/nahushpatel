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
        <motion.div variants={item} className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span key={tool} className="soft-card text-[10px] px-3 py-1.5 font-medium !rounded-xl !shadow-[3px_3px_8px_rgba(0,0,0,0.06),-3px_-3px_8px_rgba(255,255,255,0.8)]">
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
        <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
          {timeline.map((t) => (
            <motion.div key={t.year} variants={item} className="soft-card p-4 flex gap-3">
              <div className="gradient-bg text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-xl h-fit shadow-md">
                {t.year}
              </div>
              <div>
                <h3 className="text-sm font-semibold">{t.title}</h3>
                <p className="text-[10px] text-muted-foreground">{t.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsPage;
