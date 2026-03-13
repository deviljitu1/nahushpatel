import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Eye, TrendingUp, Users, DollarSign,
  Sparkles, X, MapPin, Mail, Briefcase, Code2, Megaphone, Zap, Download
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import ProfileCube from "@/components/ProfileCube";

/* ─── Data ─────────────────────────────────────────────────────────── */
const stats = [
  { label: "Projects", value: 50, suffix: "+", icon: Sparkles },
  { label: "Leads Generated", value: 10, suffix: "K+", icon: TrendingUp },
  { label: "Clients Served", value: 30, suffix: "+", icon: Users },
  { label: "Revenue Generated", value: 2, suffix: "M+", icon: DollarSign },
];

const whatIDo = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "SEO, Google Ads, Meta Ads & growth funnels that convert.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: Code2,
    title: "Web Development",
    desc: "React, WordPress & custom sites built for speed & conversions.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Automation",
    desc: "n8n workflows & AI automations that save 20+ hours a week.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

const clients = [
  { name: "Eyes Event", logo: "/brands/Eyes_logo.png", link: "https://www.facebook.com/eyesraipur/" },
  { name: "Orgalife", logo: "/brands/Orgalife_Logo_2.avif", link: "https://www.instagram.com/orgalifefood" },
  { name: "Rajim Kumbh", logo: "/brands/Rajim%20Kumbh.png", link: "https://www.instagram.com/rajimkumbhkalp2026" },
  { name: "Chai Signal", logo: "/brands/Chai%20Signal.png", link: "https://www.instagram.com/chaisignal_cafe/" },
];

/* ─── Hooks ─────────────────────────────────────────────────────────── */
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ─── Variants ──────────────────────────────────────────────────────── */
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" as const } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

/* ─── Props ─────────────────────────────────────────────────────────── */
interface HomePageProps {
  onNavigate: (tab: string) => void;
}

/* ─── Component ─────────────────────────────────────────────────────── */
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

return (
  <div className="relative px-4 sm:px-6 pt-6 sm:pt-12 max-w-screen-xl mx-auto overflow-x-hidden">

    {/* ── All page content ──────────────────────────────────── */}
    <div className="relative z-10 flex flex-col items-center">
      <motion.div variants={container} initial="hidden" animate="show" className="text-center mb-12 w-full max-w-2xl">

        {/* 3D Profile Cube */}
        <motion.div variants={item} className="mb-8 inline-block relative">
          {/* Outer glow ring */}
          <div
            className="relative"
            style={{
              filter: "drop-shadow(0 20px 48px hsl(24 95% 53% / 0.35))",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse -z-10" />
            <ProfileCube
              imageSrc="/Nahush Patel.jpg"
              size={isMobile ? 120 : 160}
              onFaceClick={() => setZoomOpen(true)}
            />
          </div>

          {/* Pulse badge */}
          <motion.div
            className="absolute -bottom-1 -right-1 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shadow-lg z-10 border-4 border-white dark:border-zinc-950"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            title="Available for Hire"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </motion.div>

          {/* Drag hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-muted-foreground/60 font-medium select-none pointer-events-none tracking-widest uppercase"
          >
            drag to rotate
          </motion.p>
        </motion.div>

        {/* Open to Work */}
        <motion.div variants={item} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 text-green-600 dark:text-green-400 text-[11px] font-bold tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            OPEN FOR PROJECTS
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-7xl font-black mb-2 tracking-tight leading-[1.05] px-2">
          Hi, I'm <span className="text-shimmer">Nahush Patel</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div variants={item} className="h-8 flex items-center justify-center mb-4">
          <span className="text-base sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">
            {typed}
            <span className="animate-blink ml-1 font-normal text-primary">|</span>
          </span>
        </motion.div>

        {/* Meta chips */}
        <motion.div variants={item} className="flex items-center justify-center gap-3 text-[13px] text-muted-foreground mb-8 flex-wrap px-4">
          <span className="flex items-center gap-1.5 font-semibold bg-secondary/50 px-3 py-1 rounded-full"><MapPin className="w-3.5 h-3.5 text-primary" /> Raipur, India</span>
          <span className="flex items-center gap-1.5 font-semibold bg-secondary/50 px-3 py-1 rounded-full"><Mail className="w-3.5 h-3.5 text-primary" /> nahushpatel2@gmail.com</span>
          <span className="flex items-center gap-1.5 font-semibold bg-secondary/50 px-3 py-1 rounded-full"><Briefcase className="w-3.5 h-3.5 text-primary" /> Full-cycle Marketing</span>
        </motion.div>

        <motion.p variants={item} className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed mb-10 px-6 font-medium">
          I craft high-converting digital experiences — from <span className="text-foreground font-bold">meta ads</span> that sell to <span className="text-foreground font-bold">automations</span> that scale.
        </motion.p>

        {/* CTAs — Optimized for Mobile Tapability */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center px-6 sm:px-0">
          <button
            onClick={() => onNavigate("contact")}
            className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-orange-500 text-white font-bold text-base shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_35px_rgba(249,115,22,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
          >
            Hire Me <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate("work")}
              className="flex-1 sm:flex-none px-7 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-foreground font-bold text-base shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <Eye className="w-5 h-5 text-primary" /> Work
            </button>
            <a
              href="/resume.pdf"
              download="Nahush_Patel_Resume.pdf"
              className="flex-1 sm:flex-none px-7 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-foreground font-bold text-base shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <Download className="w-5 h-5 text-primary" /> CV
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* ── What I Do (Hidden for now) ──────────────────────────────────
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10"
        >
          <motion.h2 variants={fadeUp} className="section-label text-center mb-4">What I Do</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {whatIDo.map((w) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={w.title}
                  variants={item}
                  className="soft-card p-5 flex flex-col gap-3 group cursor-default"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${w.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 ${w.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm lg:text-base mb-0.5">{w.title}</h3>
                    <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        ────────────────────────────────────────────────────────── */}

      {/* ── Stats ────────────────────────────────────────────── */}
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </motion.div>

      {/* ── Client Marquee ───────────────────────────────────── */}
      <ClientMarquee />

      {/* ── Zoom Lightbox ────────────────────────────────────── */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setZoomOpen(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div
              className="relative z-10 max-w-xs w-full mx-6"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl gradient-bg p-[3px]"
                style={{ boxShadow: "0 24px 64px hsl(24 95% 53% / 0.4)" }}>
                <img
                  src="/Nahush Patel.jpg"
                  alt="Nahush Patel"
                  className="w-full h-auto rounded-[22px] object-cover object-top block"
                />
              </div>
              <button
                onClick={() => setZoomOpen(false)}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full gradient-bg flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-primary-foreground" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    {/* end z-10 content wrapper */}
  </div>
);
};

/* ─── Stat Card ─────────────────────────────────────────────────────── */
function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  const { count, ref } = useCountUp(stat.value);
  const Icon = stat.icon;
  return (
    <motion.div
      variants={item}
      ref={ref}
      className="soft-card p-5 flex flex-col items-center justify-center text-center cursor-pointer group"
    >
      <div className="soft-icon-box mb-3 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
        {count}<span className="text-primary">{stat.suffix}</span>
      </div>
      <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mt-1">{stat.label}</p>
    </motion.div>
  );
}

/* ─── Client Marquee ────────────────────────────────────────────────── */
const ClientMarquee = () => (
  <div className="soft-card p-6 mb-10">
    <h2 className="section-label text-center mb-5">Trusted By</h2>
    <div className="relative flex overflow-hidden select-none">
      <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-card to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-l from-card to-transparent pointer-events-none" />
      {[0, 1].map((n) => (
        <div key={n} className="flex animate-marquee whitespace-nowrap gap-10 min-w-full shrink-0 items-center px-2" aria-hidden={n === 1}>
          {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
            <a key={i} href={client.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[100px] transition-all duration-500 hover:scale-110 transform cursor-pointer">
              <img src={client.logo} alt={client.name} className="h-9 w-auto object-contain drop-shadow-sm opacity-70 hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default HomePage;
