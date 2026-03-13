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

const clients = [
  { name: "Eyes Event", logo: "/brands/Eyes_logo.png", link: "https://www.facebook.com/eyesraipur/" },
  { name: "Orgalife", logo: "/brands/Orgalife_Logo_2.avif", link: "https://www.instagram.com/orgalifefood" },
  { name: "Rajim Kumbh", logo: "/brands/Rajim%20Kumbh.png", link: "https://www.instagram.com/rajimkumbhkalp2026" },
  { name: "Chai Signal", logo: "/brands/Chai%20Signal.png", link: "https://www.instagram.com/chaisignal_cafe/" },
];

/* ─── Hooks ─────────────────────────────────────────────────────────── */
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now) => {
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

function useTypewriter(words, speed = 80, pause = 1800) {
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
const item = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } }
};

/* ─── Inline styles for responsive behavior ─────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --primary: hsl(24, 95%, 53%);
    --primary-foreground: #fff;
    --foreground: #0f0f0f;
    --muted-foreground: #6b7280;
    --card-bg: #ffffff;
    --card-border: rgba(0,0,0,0.06);
    --bg: #f8f7f5;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --foreground: #f0ede8;
      --muted-foreground: #9ca3af;
      --card-bg: #1a1917;
      --card-border: rgba(255,255,255,0.07);
      --bg: #111110;
    }
  }

  .home-page * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

  .home-page {
    position: relative;
    padding: clamp(24px, 5vw, 48px) clamp(16px, 4vw, 24px);
    max-width: 1280px;
    margin: 0 auto;
    background: var(--bg);
    min-height: 100vh;
    color: var(--foreground);
  }

  /* soft card */
  .soft-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    transition: box-shadow 0.3s;
  }
  .soft-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.1); }

  .gradient-bg {
    background: linear-gradient(135deg, hsl(24,95%,53%), hsl(14,95%,60%));
  }

  .text-shimmer {
    background: linear-gradient(90deg, hsl(24,95%,53%), hsl(35,95%,55%), hsl(24,95%,53%));
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }
  @keyframes shimmer { to { background-position: 200% center; } }

  .section-label {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted-foreground);
  }

  .soft-icon-box {
    width: 44px; height: 44px;
    background: hsl(24,95%,53%,0.1);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
  }

  /* ── Responsive Hero Layout ── */
  .hero-center { text-align: center; margin-bottom: 40px; }

  /* Profile image container */
  .profile-wrap {
    display: inline-block;
    position: relative;
    margin-bottom: 28px;
  }

  .profile-img-ring {
    width: clamp(100px, 22vw, 160px);
    height: clamp(100px, 22vw, 160px);
    border-radius: 50%;
    background: linear-gradient(135deg, hsl(24,95%,53%), hsl(14,95%,60%));
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 20px 48px hsl(24 95% 53% / 0.35));
  }

  .profile-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: top;
    display: block;
  }

  .pulse-badge {
    position: absolute;
    bottom: -4px;
    right: -4px;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: linear-gradient(135deg, hsl(24,95%,53%), hsl(14,95%,60%));
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px hsl(24 95% 53% / 0.4);
    animation: pulseBadge 2.5s ease-in-out infinite;
    z-index: 10;
  }
  @keyframes pulseBadge {
    0%,100% { transform: scale(1); }
    50% { transform: scale(1.18); }
  }

  .drag-hint {
    position: absolute;
    bottom: -26px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 9px;
    color: color-mix(in srgb, var(--muted-foreground) 50%, transparent);
    font-weight: 500;
    pointer-events: none;
    user-select: none;
  }

  /* Open to work badge */
  .avail-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 100px;
    background: rgba(34,197,94,0.1);
    border: 1px solid rgba(34,197,94,0.25);
    color: #16a34a;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.04em;
    margin-bottom: 16px;
  }
  @media (prefers-color-scheme: dark) {
    .avail-badge { color: #4ade80; }
  }

  .avail-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #22c55e;
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.3); }
  }

  /* Heading */
  .hero-heading {
    font-size: clamp(26px, 6vw, 52px);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin: 0 0 4px;
    color: var(--foreground);
  }

  /* Typewriter */
  .typewriter-wrap {
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }
  .typewriter-text {
    font-size: clamp(13px, 2.5vw, 18px);
    font-weight: 700;
    color: var(--primary);
  }
  .cursor {
    margin-left: 2px;
    color: hsl(24,95%,53%,0.6);
    animation: blink 1s step-end infinite;
  }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

  /* Meta chips row */
  .meta-chips {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 12px;
    color: var(--muted-foreground);
    flex-wrap: wrap;
    margin-bottom: 12px;
    padding: 0 8px;
  }
  .meta-chip {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 600;
  }
  .meta-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--muted-foreground) 40%, transparent);
  }
  .meta-email { display: none; }
  @media (min-width: 480px) { .meta-email { display: flex; } }

  /* Bio */
  .hero-bio {
    font-size: clamp(13px, 2vw, 15px);
    color: var(--muted-foreground);
    max-width: min(380px, 90vw);
    margin: 0 auto 24px;
    line-height: 1.7;
  }

  /* CTA buttons */
  .cta-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
    justify-content: center;
    padding: 0 16px;
  }
  @media (min-width: 400px) {
    .cta-row {
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0;
      align-items: center;
    }
  }

  .btn-hire {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 16px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    background: linear-gradient(135deg, hsl(24,95%,53%), hsl(14,95%,60%));
    color: #fff;
    box-shadow: 0 8px 24px hsl(24 95% 53% / 0.35);
    transition: transform 0.25s, box-shadow 0.25s;
    width: 100%;
  }
  @media (min-width: 400px) { .btn-hire { width: auto; } }
  .btn-hire:hover { transform: translateY(-2px); box-shadow: 0 12px 32px hsl(24 95% 53% / 0.45); }

  .btn-row-secondary {
    display: flex;
    gap: 10px;
    width: 100%;
  }
  @media (min-width: 400px) { .btn-row-secondary { width: auto; } }

  .btn-secondary {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: 16px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: var(--foreground);
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    transition: transform 0.25s, box-shadow 0.25s;
    text-decoration: none;
  }
  @media (min-width: 400px) { .btn-secondary { flex: none; } }
  .btn-secondary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }

  /* ── Stats Grid ── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 40px;
  }
  @media (min-width: 900px) {
    .stats-grid { grid-template-columns: repeat(4, 1fr); }
  }

  .stat-card {
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    transition: transform 0.25s;
  }
  .stat-card:hover { transform: translateY(-3px); }
  .stat-card:hover .soft-icon-box { transform: scale(1.1); }

  .stat-value {
    font-size: clamp(22px, 5vw, 32px);
    font-weight: 800;
    color: var(--foreground);
    letter-spacing: -0.02em;
    line-height: 1;
    margin-top: 12px;
  }
  .stat-primary { color: var(--primary); }
  .stat-label {
    font-size: clamp(8px, 1.5vw, 10px);
    font-weight: 800;
    color: var(--muted-foreground);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-top: 4px;
  }

  /* ── Marquee ── */
  .marquee-wrap { padding: 24px; margin-bottom: 40px; }
  .marquee-viewport {
    position: relative;
    display: flex;
    overflow: hidden;
    user-select: none;
  }
  .marquee-fade-left {
    position: absolute; left: 0; top: 0; bottom: 0; width: 40px;
    background: linear-gradient(to right, var(--card-bg), transparent);
    z-index: 10; pointer-events: none;
  }
  .marquee-fade-right {
    position: absolute; right: 0; top: 0; bottom: 0; width: 40px;
    background: linear-gradient(to left, var(--card-bg), transparent);
    z-index: 10; pointer-events: none;
  }
  .marquee-track {
    display: flex;
    gap: 40px;
    align-items: center;
    padding: 0 8px;
    animation: marquee 20s linear infinite;
    white-space: nowrap;
    min-width: 100%;
    flex-shrink: 0;
  }
  .marquee-track-2 {
    display: flex;
    gap: 40px;
    align-items: center;
    padding: 0 8px;
    animation: marquee 20s linear infinite;
    white-space: nowrap;
    min-width: 100%;
    flex-shrink: 0;
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
  .marquee-item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    transition: transform 0.3s, opacity 0.3s;
    cursor: pointer;
  }
  .marquee-item:hover { transform: scale(1.1); opacity: 1 !important; }
  .marquee-logo {
    height: 36px;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
    opacity: 0.7;
    transition: opacity 0.3s;
  }
  .marquee-item:hover .marquee-logo { opacity: 1; }

  /* ── Lightbox ── */
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .lightbox-bg {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(12px);
  }
  .lightbox-content {
    position: relative;
    z-index: 10;
    max-width: min(320px, 90vw);
    width: 100%;
    margin: 0 24px;
  }
  .lightbox-img-ring {
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 24px 64px hsl(24 95% 53% / 0.4);
    background: linear-gradient(135deg, hsl(24,95%,53%), hsl(14,95%,60%));
    padding: 3px;
  }
  .lightbox-img {
    width: 100%;
    height: auto;
    border-radius: 26px;
    object-fit: cover;
    object-position: top;
    display: block;
  }
  .lightbox-close {
    position: absolute;
    top: -12px; right: -12px;
    width: 36px; height: 36px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, hsl(24,95%,53%), hsl(14,95%,60%));
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transition: transform 0.2s;
    color: white;
  }
  .lightbox-close:hover { transform: scale(1.1); }

  /* ── Icon sizing ── */
  .icon-sm { width: 16px; height: 16px; flex-shrink: 0; }
  .icon-xs { width: 12px; height: 12px; flex-shrink: 0; color: var(--primary); }
  .icon-stat { width: 20px; height: 20px; color: var(--primary); }
`;

/* ─── ProfileAvatar (replaces ProfileCube for standalone use) ─────── */
function ProfileAvatar({ imageSrc, onClick }) {
  return (
    <div
      className="profile-img-ring"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <img src={imageSrc} alt="Nahush Patel" className="profile-img" />
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────────── */
const HomePage = ({ onNavigate }) => {
  const [zoomOpen, setZoomOpen] = useState(false);
  const typed = useTypewriter([
    "Digital Marketer",
    "Web Developer",
    "Growth Hacker",
    "Automation Expert",
  ]);

  return (
    <>
      <style>{styles}</style>
      <div className="home-page">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="hero-center"
        >
          {/* Profile Image */}
          <motion.div variants={item} style={{ marginBottom: 28, display: "inline-block", position: "relative" }}>
            <ProfileAvatar imageSrc="/Nahush Patel.jpg" onClick={() => setZoomOpen(true)} />
            <motion.div
              className="pulse-badge"
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              title="Available for Hire"
            >
              <Sparkles className="icon-sm" />
            </motion.div>
            <span className="drag-hint">tap to zoom</span>
          </motion.div>

          {/* Available badge */}
          <motion.div variants={item} style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <span className="avail-badge">
              <span className="avail-dot" />
              Available for Hire
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item} className="hero-heading">
            Hi, I'm <span className="text-shimmer">Nahush Patel</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={item} className="typewriter-wrap">
            <span className="typewriter-text">
              {typed}
              <span className="cursor">|</span>
            </span>
          </motion.div>

          {/* Meta chips */}
          <motion.div variants={item} className="meta-chips">
            <span className="meta-chip">
              <MapPin className="icon-xs" /> Raipur, India
            </span>
            <span className="meta-dot" />
            <span className="meta-chip meta-email">
              <Mail className="icon-xs" /> nahushpatel2@gmail.com
            </span>
            <span className="meta-dot" />
            <span className="meta-chip">
              <Briefcase className="icon-xs" /> Freelance / Full-time
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={item} className="hero-bio">
            I craft high-converting digital experiences — from ads that sell to automations that scale.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="cta-row">
            <button className="btn-hire" onClick={() => onNavigate?.("contact")}>
              Hire Me <ArrowRight className="icon-sm" />
            </button>
            <div className="btn-row-secondary">
              <button className="btn-secondary" onClick={() => onNavigate?.("work")}>
                <Eye className="icon-sm" style={{ color: "var(--primary)" }} /> Work
              </button>
              <a href="/resume.pdf" download="Nahush_Patel_Resume.pdf" className="btn-secondary">
                <Download className="icon-sm" style={{ color: "var(--primary)" }} /> CV
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Stats Grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="stats-grid"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>

        {/* ── Client Marquee ── */}
        <ClientMarquee />

        {/* ── Zoom Lightbox ── */}
        <AnimatePresence>
          {zoomOpen && (
            <motion.div
              className="lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setZoomOpen(false)}
            >
              <div className="lightbox-bg" />
              <motion.div
                className="lightbox-content"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="lightbox-img-ring">
                  <img src="/Nahush Patel.jpg" alt="Nahush Patel" className="lightbox-img" />
                </div>
                <button
                  className="lightbox-close"
                  onClick={() => setZoomOpen(false)}
                  aria-label="Close"
                >
                  <X style={{ width: 16, height: 16 }} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

/* ─── Stat Card ─────────────────────────────────────────────────────── */
function StatCard({ stat }) {
  const { count, ref } = useCountUp(stat.value);
  const Icon = stat.icon;
  return (
    <motion.div variants={item} ref={ref} className="soft-card stat-card">
      <div className="soft-icon-box" style={{ transition: "transform 0.3s" }}>
        <Icon className="icon-stat" />
      </div>
      <div className="stat-value">
        {count}<span className="stat-primary">{stat.suffix}</span>
      </div>
      <p className="stat-label">{stat.label}</p>
    </motion.div>
  );
}

/* ─── Client Marquee ────────────────────────────────────────────────── */
const ClientMarquee = () => {
  const allClients = [...clients, ...clients, ...clients, ...clients];
  return (
    <div className="soft-card marquee-wrap">
      <p className="section-label" style={{ textAlign: "center", marginBottom: 20 }}>Trusted By</p>
      <div className="marquee-viewport">
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />
        {[0, 1].map((n) => (
          <div key={n} className={n === 0 ? "marquee-track" : "marquee-track-2"} aria-hidden={n === 1}>
            {allClients.map((client, i) => (
              <a
                key={i}
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="marquee-item"
              >
                <img src={client.logo} alt={client.name} className="marquee-logo" />
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;