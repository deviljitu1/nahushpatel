import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Award, Heart, ExternalLink } from "lucide-react";

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
    year: "Oct 2025",
    title: "Digital Marketing Executive",
    company: "Orgalife Food · Full-time",
    description: "Driving SEO, social media strategy & digital campaigns for a health food brand. Managing end-to-end online presence and growth.",
    current: true,
  },
  {
    year: "Apr 2024",
    title: "Medical Coder",
    company: "Omega Healthcare Management Services · Full-time",
    description: "Performed accurate medical coding & billing at one of India's leading healthcare BPOs. Developed strong attention to detail and data accuracy.",
    current: false,
  },
  {
    year: "Aug 2023",
    title: "Customer Service Executive",
    company: "Sutherland · Full-time",
    description: "Delivered exceptional customer support in a fast-paced BPO environment. Sharpened communication and problem-solving skills.",
    current: false,
  },
];

const certifications = [
  {
    title: "Digital Marketing",
    issuer: "Webfame Digital Marketing Academy",
    date: "Nov 2025",
    skills: "SEO · Google Ads · Social Media Marketing",
    color: "from-orange-400 to-rose-500",
  },
  {
    title: "Google Hackathon",
    issuer: "Google",
    date: "Sep 2025",
    skills: "React.js · Tailwind CSS · AI · API",
    color: "from-blue-400 to-indigo-500",
  },
  {
    title: "The Complete Digital Marketing Guide",
    issuer: "Udemy",
    date: "Aug 2025",
    skills: "SEO · Google Ads · Meta Ads · Email Marketing · CRO",
    color: "from-purple-400 to-violet-600",
  },
  {
    title: "Full-Stack Web Development Bootcamp",
    issuer: "Udemy",
    date: "Jul 2025",
    skills: "HTML · CSS · JavaScript · React.js · Node.js",
    color: "from-emerald-400 to-teal-600",
  },
  {
    title: "Work Smarter with AI",
    issuer: "Canva",
    date: "Nov 2025",
    skills: "AI Tools · Productivity · Design",
    color: "from-cyan-400 to-sky-600",
  },
];

const volunteering = [
  {
    org: "FlyHigher - FHI",
    role: "Volunteer",
    period: "May 2023 – Present",
    cause: "Children",
    emoji: "👧",
  },
  {
    org: "Bhumi",
    role: "Volunteer",
    period: "Jun 2023 – Present",
    cause: "Children",
    emoji: "📚",
  },
  {
    org: "Blue Cross of India",
    role: "Volunteer",
    period: "Jun 2023 – Present",
    cause: "Animal Welfare",
    emoji: "🐾",
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

      {/* Work Experience Timeline */}
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="mb-10">
        <motion.h2 variants={item} className="section-label">Work Experience</motion.h2>
        <div className="relative mt-4 flex flex-col gap-4">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-border">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full gradient-bg"
            />
          </div>
          {timeline.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative pl-12 group"
            >
              {/* Node */}
              <div className="absolute left-2 top-3 w-6 h-6 rounded-full bg-background border-2 border-primary z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ boxShadow: '0 0 12px hsl(24 95% 53% / 0.3)' }}>
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div className="soft-card p-4 group-hover:-translate-y-0.5 transition-transform duration-300">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold">{t.title}</h3>
                  {t.current && (
                    <span className="shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">● Current</span>
                  )}
                </div>
                <p className="text-[10px] font-semibold text-primary/80 mb-0.5">{t.company}</p>
                <p className="text-[10px] text-muted-foreground mb-2">{t.year}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{t.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="mb-10">
        <motion.h2 variants={item} className="section-label flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" /> Licenses &amp; Certifications
        </motion.h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              variants={item}
              whileHover={{ y: -3 }}
              className="soft-card p-4 flex items-start gap-3 group"
            >
              <div className={`w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-sm`}>
                <Award className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold leading-tight mb-0.5 truncate">{cert.title}</h3>
                <p className="text-[10px] font-semibold text-primary/80">{cert.issuer}</p>
                <p className="text-[10px] text-muted-foreground mb-1">Issued {cert.date}</p>
                <p className="text-[10px] text-muted-foreground/70 leading-relaxed">{cert.skills}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Volunteering */}
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="mb-12">
        <motion.h2 variants={item} className="section-label flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500" /> Volunteering
        </motion.h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {volunteering.map((v, i) => (
            <motion.div
              key={v.org}
              variants={item}
              whileHover={{ y: -3 }}
              className="soft-card p-4 flex flex-col gap-2"
            >
              <span className="text-2xl">{v.emoji}</span>
              <div>
                <h3 className="text-xs font-bold mb-0.5">{v.org}</h3>
                <p className="text-[10px] font-semibold text-primary/80">{v.role}</p>
                <p className="text-[10px] text-muted-foreground">{v.period}</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 w-fit">{v.cause}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsPage;
