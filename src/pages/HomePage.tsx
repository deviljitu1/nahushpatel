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
    <div className="px-5 pt-14 max-w-lg mx-auto">
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
        className="grid grid-cols-2 gap-3"
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </motion.div>
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
