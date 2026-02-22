import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Eye, TrendingUp, Users, DollarSign,
  Sparkles, X, MapPin, Mail, Briefcase, Code2, Megaphone, Zap, Download
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

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
    desc: "n8n & Zapier workflows that save 20+ hours a week.",
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
const HomePage = ({ onNavigate }: HomePageProps) => {
  const [zoomOpen, setZoomOpen] = useState(false);
  const typed = useTypewriter([
    "Digital Marketer",
    "Web Developer",
    "Growth Hacker",
    "Automation Expert",
  ]);

  return (
    <div className="px-5 pt-10 max-w-lg lg:max-w-4xl mx-auto">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <motion.div variants={container} initial="hidden" animate="show" className="text-center mb-10">

        {/* Profile photo */}
        <motion.div variants={item} className="mb-5 inline-block relative">
          <button
            onClick={() => setZoomOpen(true)}
            className="block focus:outline-none group"
            aria-label="View profile photo"
          >
            <div
              className="w-28 h-28 rounded-[2rem] gradient-bg p-[3px] mx-auto shadow-xl transition-transform duration-300 group-hover:scale-105"
              style={{ boxShadow: "0 16px 48px hsl(24 95% 53% / 0.3)" }}
            >
              <div className="w-full h-full rounded-[1.75rem] overflow-hidden bg-card">
                <img
                  src="/Nahush Patel.jpg"
                  alt="Nahush Patel"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </button>

          {/* Pulse badge */}
          <motion.div
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl gradient-bg flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            title="Available for Hire"
          >
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        </motion.div>

        {/* Open to Work */}
        <motion.div variants={item} className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/25 text-green-600 dark:text-green-400 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Available for Hire
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 variants={item} className="text-3xl font-bold mb-1 tracking-tight">
          Hi, I'm <span className="text-shimmer">Nahush Patel</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div variants={item} className="h-6 flex items-center justify-center mb-2">
          <span className="text-sm font-semibold text-primary">
            {typed}
            <span className="animate-blink ml-0.5 font-normal text-primary/60">|</span>
          </span>
        </motion.div>

        {/* Meta chips */}
        <motion.div variants={item} className="flex items-center justify-center gap-3 text-[11px] text-muted-foreground/70 mb-3 flex-wrap">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Raipur, India</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> nahushpatel2@gmail.com</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> Freelance / Full-time</span>
        </motion.div>

        <motion.p variants={item} className="text-xs text-muted-foreground/60 max-w-[300px] mx-auto leading-relaxed mb-7">
          I craft high-converting digital experiences — from ads that sell to automations that scale.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => onNavigate("contact")}
            className="group px-6 py-3 rounded-2xl gradient-bg text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            style={{ boxShadow: "0 8px 24px hsl(24 95% 53% / 0.35)" }}
          >
            Hire Me <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate("work")}
            className="px-6 py-3 rounded-2xl soft-card text-foreground font-semibold text-sm flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-300 !shadow-md"
          >
            <Eye className="w-4 h-4 text-primary" /> View Work
          </button>
          <a
            href="/resume.pdf"
            download="Nahush_Patel_Resume.pdf"
            className="px-6 py-3 rounded-2xl soft-card text-foreground font-semibold text-sm flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-300 !shadow-md"
          >
            <Download className="w-4 h-4 text-primary" /> Resume
          </a>
        </motion.div>
      </motion.div>

      {/* ── What I Do ────────────────────────────────────────── */}
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
                  <h3 className="font-bold text-sm mb-0.5">{w.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{w.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

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
      <div className="text-2xl font-bold text-foreground tracking-tight">
        {count}<span className="text-primary">{stat.suffix}</span>
      </div>
      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em] mt-1">{stat.label}</p>
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
