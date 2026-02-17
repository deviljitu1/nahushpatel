import { motion } from "framer-motion";
import { ArrowRight, Eye, TrendingUp, Users, DollarSign, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const stats = [
  { label: "Projects", value: 50, suffix: "+", icon: Sparkles },
  { label: "Leads Generated", value: 10, suffix: "K+", icon: TrendingUp },
  { label: "Clients Served", value: 30, suffix: "+", icon: Users },
  { label: "Revenue Generated", value: 2, suffix: "M+", icon: DollarSign },
];

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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <div className="px-6 pt-10 max-w-lg lg:max-w-4xl mx-auto">
      {/* Hero Section */}
      <motion.div variants={container} initial="hidden" animate="show" className="text-center mb-12">
        <motion.div variants={item} className="mb-6 inline-block relative">
          <div className="w-28 h-28 rounded-[2rem] gradient-bg p-[2.5px] mx-auto shadow-xl" style={{ boxShadow: '0 12px 40px hsl(24 95% 53% / 0.25)' }}>
            <div className="w-full h-full rounded-[1.85rem] bg-card flex items-center justify-center text-4xl font-bold gradient-text">
              J
            </div>
          </div>
          <motion.div
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl gradient-bg flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        </motion.div>

        <motion.h1 variants={item} className="text-3xl font-bold mb-1.5 tracking-tight">
          Hey, I'm <span className="gradient-text">Jitu</span>
        </motion.h1>
        <motion.p variants={item} className="text-sm font-medium text-muted-foreground mb-1">
          Digital Marketer & Web Developer
        </motion.p>
        <motion.p variants={item} className="text-xs text-muted-foreground/60 max-w-[280px] mx-auto leading-relaxed">
          I build high-converting websites & automated growth systems
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex gap-3 justify-center mt-7">
          <button
            onClick={() => onNavigate("contact")}
            className="group px-6 py-3 rounded-2xl gradient-bg text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            style={{ boxShadow: '0 8px 24px hsl(24 95% 53% / 0.3)' }}
          >
            Hire Me <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate("work")}
            className="px-6 py-3 rounded-2xl soft-card text-foreground font-semibold text-sm flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-300 !shadow-md"
          >
            <Eye className="w-4 h-4 text-primary" /> View Work
          </button>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </motion.div>

      {/* Client Marquee */}
      <ClientMarquee />
    </div>
  );
};

const clients = [
  { name: "Eyes Event", logo: "/brands/Eyes_logo.png", link: "https://www.facebook.com/eyesraipur/" },
  { name: "Orgalife", logo: "/brands/Orgalife_Logo_2.avif", link: "https://www.instagram.com/orgalifefood" },
  { name: "Rajim Kumbh", logo: "/brands/Rajim%20Kumbh.png", link: "https://www.instagram.com/rajimkumbhkalp2026" },
  { name: "Chai Signal", logo: "/brands/Chai%20Signal.png", link: "https://www.instagram.com/chaisignal_cafe/" },
];

const ClientMarquee = () => {
  return (
    <div className="soft-card p-6 mb-10">
      <h2 className="section-label text-center mb-5">
        Trusted By
      </h2>
      <div className="relative flex overflow-hidden select-none">
        <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-card to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-l from-card to-transparent pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap gap-10 min-w-full shrink-0 items-center px-2">
          {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
            <a
              key={i}
              href={client.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[100px] transition-all duration-500 hover:scale-110 transform cursor-pointer"
            >
              <img src={client.logo} alt={client.name} className="h-9 w-auto object-contain drop-shadow-sm opacity-70 hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
        <div className="flex animate-marquee whitespace-nowrap gap-10 min-w-full shrink-0 items-center px-2" aria-hidden="true">
          {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
            <a
              key={`dup-${i}`}
              href={client.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[100px] transition-all duration-500 hover:scale-110 transform cursor-pointer"
            >
              <img src={client.logo} alt={client.name} className="h-9 w-auto object-contain drop-shadow-sm opacity-70 hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

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
        {count}
        <span className="text-primary">{stat.suffix}</span>
      </div>
      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em] mt-1">{stat.label}</p>
    </motion.div>
  );
}

export default HomePage;
