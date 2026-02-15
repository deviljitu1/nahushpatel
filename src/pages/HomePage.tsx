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
    <div className="px-5 pt-8 max-w-lg lg:max-w-4xl mx-auto">

      {/* Hero Section */}
      <motion.div variants={container} initial="hidden" animate="show" className="text-center mb-10">
        <motion.div variants={item} className="mb-5 inline-block relative">
          <div className="w-24 h-24 rounded-3xl gradient-bg p-[2px] mx-auto shadow-lg shadow-primary/20">
            <div className="w-full h-full rounded-3xl bg-white dark:bg-slate-800 flex items-center justify-center text-3xl font-bold gradient-text">
              J
            </div>
          </div>
          <motion.div
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl gradient-bg flex items-center justify-center shadow-md"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
          </motion.div>
        </motion.div>

        <motion.h1 variants={item} className="text-2xl font-bold mb-1">
          Hey, I'm <span className="gradient-text">Jitu</span>
        </motion.h1>
        <motion.p variants={item} className="text-sm font-medium text-muted-foreground mb-1">
          Digital Marketer & Web Developer
        </motion.p>
        <motion.p variants={item} className="text-xs text-muted-foreground/70 max-w-xs mx-auto leading-relaxed">
          I build high-converting websites & automated growth systems
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => onNavigate("contact")}
            className="group px-5 py-2.5 rounded-2xl gradient-bg text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          >
            Hire Me <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate("work")}
            className="px-5 py-2.5 rounded-2xl soft-card text-foreground font-semibold text-sm flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Eye className="w-4 h-4" /> View Work
          </button>
        </motion.div>
      </motion.div>

      {/* Stats - 2x2 grid with neumorphic icon boxes */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
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
    <div className="soft-card p-5 mb-8">
      <h2 className="text-center text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-5">
        Trusted By
      </h2>
      <div className="relative flex overflow-hidden group select-none">
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-white dark:from-slate-800 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-white dark:from-slate-800 to-transparent pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap gap-8 min-w-full shrink-0 items-center px-2">
          {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
            <a
              key={i}
              href={client.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[100px] transition-all duration-500 hover:scale-110 transform cursor-pointer"
            >
              <img src={client.logo} alt={client.name} className="h-8 w-auto object-contain drop-shadow-sm" />
            </a>
          ))}
        </div>
        <div className="flex animate-marquee whitespace-nowrap gap-8 min-w-full shrink-0 items-center px-2" aria-hidden="true">
          {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
            <a
              key={`dup-${i}`}
              href={client.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[100px] transition-all duration-500 hover:scale-110 transform cursor-pointer"
            >
              <img src={client.logo} alt={client.name} className="h-8 w-auto object-contain drop-shadow-sm" />
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
      className="soft-card p-4 flex flex-col items-center justify-center text-center cursor-pointer group"
    >
      <div className="soft-icon-box mb-2.5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="text-xl font-bold text-foreground">
        {count}
        <span className="text-primary">{stat.suffix}</span>
      </div>
      <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">{stat.label}</p>
    </motion.div>
  );
}

export default HomePage;
