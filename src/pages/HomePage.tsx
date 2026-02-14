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
    <div className="px-5 pt-14 max-w-lg lg:max-w-4xl mx-auto">

      {/* Hero Section */}
      <motion.div variants={container} initial="hidden" animate="show" className="text-center mb-10">
        <motion.div variants={item} className="mb-6 inline-block relative">
          <div className="w-28 h-28 rounded-full gradient-bg p-[2px] mx-auto">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-4xl font-bold gradient-text">
              J
            </div>
          </div>
          <motion.div
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full gradient-bg flex items-center justify-center"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        </motion.div>

        <motion.h1 variants={item} className="text-3xl font-bold mb-1">
          Hey, I'm <span className="gradient-text">Jitu</span>
        </motion.h1>
        <motion.p variants={item} className="text-base font-medium text-muted-foreground mb-2">
          Digital Marketer & Web Developer
        </motion.p>
        <motion.p variants={item} className="text-sm text-muted-foreground/80 max-w-xs mx-auto leading-relaxed">
          I build high-converting websites & automated growth systems
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => onNavigate("contact")}
            className="gradient-bg text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity glow-primary"
          >
            Hire Me <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate("work")}
            className="glass px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-secondary/60 transition-colors"
          >
            <Eye className="w-4 h-4" /> View Work
          </button>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
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
  { name: "Eyes Event", logo: "/brands/Eyes_logo.png", link: "https://instagram.com/nahushpatel" },
  { name: "Orgalife", logo: "/brands/Orgalife_Logo_2.avif", link: "https://instagram.com/nahushpatel" },
  { name: "Rajim Kumbh", logo: "/brands/Rajim%20Kumbh.png", link: "https://instagram.com/nahushpatel" },
  { name: "Chai Signal", logo: "/brands/Chai%20Signal.png", link: "https://instagram.com/nahushpatel" },
];

const ClientMarquee = () => {
  return (
    <div className="w-full overflow-hidden py-12 opacity-90">
      <h2 className="text-center text-xs font-bold text-muted-foreground/50 uppercase tracking-widest mb-8">
        Worked for the Brand
      </h2>
      <div className="relative flex overflow-hidden group select-none">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap gap-12 min-w-full shrink-0 items-center px-6">
          {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
            <a
              key={i}
              href={client.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[140px] transition-all duration-500 opacity-100 hover:scale-110 transform cursor-pointer"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-12 w-auto object-contain drop-shadow-sm"
              />
            </a>
          ))}
        </div>
        <div className="flex animate-marquee whitespace-nowrap gap-12 min-w-full shrink-0 items-center px-6" aria-hidden="true">
          {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
            <a
              key={`dup-${i}`}
              href={client.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[140px] transition-all duration-500 opacity-100 hover:scale-110 transform cursor-pointer"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-12 w-auto object-contain drop-shadow-sm"
              />
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
      className="glass rounded-2xl p-4 hover:scale-[1.02] transition-transform"
    >
      <Icon className="w-5 h-5 text-primary mb-2" />
      <div className="text-2xl font-bold">
        {count}
        <span className="gradient-text">{stat.suffix}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
    </motion.div>
  );
}

export default HomePage;
