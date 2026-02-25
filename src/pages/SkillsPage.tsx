import { motion } from "framer-motion";
import { Award, Heart, ExternalLink } from "lucide-react";

const allSkills = [
  // Marketing
  { name: "SEO & SEM", emoji: "🔍", tier: "Expert", cat: "Marketing" },
  { name: "Google Ads", emoji: "📢", tier: "Expert", cat: "Marketing" },
  { name: "Meta Ads", emoji: "📱", tier: "Expert", cat: "Marketing" },
  { name: "Analytics (GA4)", emoji: "📊", tier: "Expert", cat: "Marketing" },
  { name: "Email Marketing", emoji: "📧", tier: "Proficient", cat: "Marketing" },
  { name: "Content Strategy", emoji: "✍️", tier: "Proficient", cat: "Marketing" },
  { name: "Funnel Building", emoji: "🎯", tier: "Proficient", cat: "Marketing" },
  { name: "CRO", emoji: "📈", tier: "Skilled", cat: "Marketing" },
  // Tech
  { name: "React / Next.js", emoji: "⚛️", tier: "Expert", cat: "Tech" },
  { name: "WordPress", emoji: "🌐", tier: "Expert", cat: "Tech" },
  { name: "HTML / CSS", emoji: "🎨", tier: "Expert", cat: "Tech" },
  { name: "n8n Automation", emoji: "⚡", tier: "Expert", cat: "Tech" },
  { name: "REST APIs", emoji: "🔗", tier: "Proficient", cat: "Tech" },
  { name: "Figma / UI Design", emoji: "🖌️", tier: "Proficient", cat: "Tech" },
  { name: "Node.js", emoji: "🟢", tier: "Skilled", cat: "Tech" },
  { name: "Webflow", emoji: "💻", tier: "Skilled", cat: "Tech" },
];

const tierBadge: Record<string, string> = {
  Expert: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  Proficient: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
  Skilled: "bg-orange-500/10 text-orange-500 border border-orange-400/20",
};


const tools = [
  "Google Ads", "Meta Ads Manager", "Ahrefs", "SEMrush", "GA4",
  "Google Search Console", "React", "WordPress", "HTML / CSS", "n8n",
  "Figma", "Canva", "Hotjar", "ClickFunnels",
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
    logo: "/brands/1764514156604.jpg",
    link: "/brands/1764514156604.jpg",
  },
  {
    title: "Google Hackathon",
    issuer: "Google",
    date: "Sep 2025",
    skills: "React.js · Tailwind CSS · AI · API",
    color: "from-blue-400 to-indigo-500",
    link: "https://certificate.hack2skill.com/user/aidayideasubmission/2025H2S06AID-I05626",
  },
  {
    title: "The Complete Digital Marketing Guide",
    issuer: "Udemy",
    date: "Aug 2025",
    skills: "SEO · Google Ads · Meta Ads · Email Marketing · CRO",
    color: "from-purple-400 to-violet-600",
    link: "https://www.udemy.com/certificate/UC-dd31c43b-66db-45a7-b097-3cb097d471be/",
  },
  {
    title: "Full-Stack Web Development Bootcamp",
    issuer: "Udemy",
    date: "Jul 2025",
    skills: "HTML · CSS · JavaScript · React.js · Node.js",
    color: "from-emerald-400 to-teal-600",
    link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-556645b6-e0fc-4c27-b990-534177a331b8.pdf",
  },
  {
    title: "Work Smarter with AI",
    issuer: "Canva",
    date: "Nov 2025",
    skills: "AI Tools · Productivity · Design",
    color: "from-cyan-400 to-sky-600",
    link: "https://www.canva.com/design-school/certification-award/11338f39-7068-46f7-b1ba-2c2e8004be44",
  },
];

const volunteering = [
  {
    org: "FlyHigher - FHI",
    role: "Volunteer",
    period: "May 2023 – Present",
    cause: "Children",
    emoji: "👧",
    logo: "https://static.wixstatic.com/media/aedc57_38c3d2bf4a5b4d32bd00b1323116def1~mv2.png/v1/crop/x_0,y_91,w_500,h_295/fill/w_424,h_246,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/FHI%20Logo%202026.png",
    link: "https://www.flyhigherworld.org/",
  },
  {
    org: "Bhumi",
    role: "Volunteer",
    period: "Jun 2023 – Present",
    cause: "Children",
    emoji: "📚",
    logo: "https://www.bhumi.ngo/_next/static/media/BhumiNgoLogo.8431d033.svg",
    link: "https://www.bhumi.ngo/",
  },
  {
    org: "Blue Cross of India",
    role: "Volunteer",
    period: "Jun 2023 – Present",
    cause: "Animal Welfare",
    emoji: "🐾",
    logo: "https://bluecrossofindia.org/images/BCILogoWithWhiteR.png",
    link: "https://bluecrossofindia.org/",
  },
];

const cardAnim = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
};


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
        className="text-3xl lg:text-4xl font-bold mb-1 tracking-tight"
      >
        Skills &amp; <span className="text-shimmer">Experience</span>
      </motion.h1>
      <p className="text-xs sm:text-sm text-muted-foreground mb-8">4+ years of hands-on expertise in marketing &amp; development</p>

      {/* ── Skill icon card grid ── */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mb-8"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {allSkills.map((s) => (
            <motion.div
              key={s.name}
              variants={cardAnim}
              whileHover={{ y: -5, scale: 1.03 }}
              className="soft-card p-4 flex flex-col items-start gap-2 cursor-default group"
            >
              {/* Emoji */}
              <span className="text-3xl leading-none group-hover:scale-110 transition-transform duration-300 select-none">
                {s.emoji}
              </span>
              {/* Category dot */}
              <div className="flex-1">
                <p className="text-xs font-bold text-foreground leading-snug mt-1">{s.name}</p>
                <p className="text-[9px] font-semibold text-muted-foreground/60 uppercase tracking-wide mt-0.5">{s.cat}</p>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${tierBadge[s.tier]}`}>
                {s.tier}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

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
              {cert.logo ? (
                <div className="w-9 h-9 shrink-0 rounded-xl overflow-hidden border border-border shadow-sm bg-white flex items-center justify-center">
                  <img
                    src={cert.logo}
                    alt={cert.issuer}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-sm`}>
                  <Award className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-bold leading-tight mb-0.5">{cert.title}</h3>
                <p className="text-[10px] font-semibold text-primary/80">{cert.issuer}</p>
                <p className="text-[10px] text-muted-foreground mb-1.5">Issued {cert.date}</p>
                <p className="text-[10px] text-muted-foreground/70 leading-relaxed mb-2">{cert.skills}</p>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:underline group/link"
                  >
                    {cert.logo ? "View Certificate" : "Verify Credential"}
                    <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                )}
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
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
          {volunteering.map((v, i) => (
            <motion.a
              key={v.org}
              href={v.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={item}
              whileHover={{ y: -4, scale: 1.01 }}
              className="soft-card p-4 flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-3 group cursor-pointer"
            >
              {/* Logo */}
              <div className="h-10 w-20 shrink-0 flex items-center sm:w-auto">
                <img
                  src={v.logo}
                  alt={`${v.org} logo`}
                  className="h-8 sm:h-9 w-auto max-w-[80px] sm:max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="text-2xl hidden">{v.emoji}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold flex items-center gap-1 group-hover:text-primary transition-colors">
                  <span className="truncate">{v.org}</span>
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-60 transition-opacity" />
                </p>
                <p className="text-[10px] font-semibold text-primary/80 mt-0.5">{v.role}</p>
                <p className="text-[10px] text-muted-foreground">{v.period}</p>
                <span className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">{v.cause}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsPage;
