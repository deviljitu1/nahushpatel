import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import HomePage from "@/pages/HomePage";
import WorkPage from "@/pages/WorkPage";
import ServicesPage from "@/pages/ServicesPage";
import SkillsPage from "@/pages/SkillsPage";
import ContactPage from "@/pages/ContactPage";
import { useTheme } from "@/hooks/use-theme";

const tabs = ["home", "work", "services", "skills", "contact"] as const;
type Tab = (typeof tabs)[number];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const Index = () => {
  const { isDark, toggle: toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    return tabs.includes(tab as Tab) ? (tab as Tab) : "home";
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab && tabs.includes(tab as Tab)) {
        setActiveTab(tab as Tab);
      } else {
        setActiveTab("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", tab);
    window.history.pushState({}, "", newUrl);
  };

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onNavigate={(tab: string) => handleTabChange(tab as Tab)} />;
      case "work":
        return <WorkPage />;
      case "services":
        return <ServicesPage onNavigate={(tab: string) => handleTabChange(tab as Tab)} />;
      case "skills":
        return <SkillsPage />;
      case "contact":
        return <ContactPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden font-sans selection:bg-primary/30">

      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] bg-orange-600/10 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 z-[1] opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Dark Header */}
      <header className="fixed top-0 left-0 right-0 z-40 h-20 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-orange-400 p-[2px] shadow-lg shadow-primary/20">
            <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center font-bold text-white text-lg">
              J
            </div>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">Jitu</h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Digital Specialist</p>
          </div>
        </div>
        {/* Pill indicator */}
        <div className="hidden md:flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[11px] text-white/70 font-medium">Available for hire</span>
        </div>
      </header>

      {/* Main Content: Curved Sheet */}
      <div className="relative z-10 mt-20 flex flex-col h-[calc(100vh-5rem)]">

        {/* Wave / S-Curve SVG */}
        <svg viewBox="0 0 1440 60" className="w-full h-8 md:h-12 relative z-20 block" preserveAspectRatio="none">
          <path
            d="M0,60 L0,20 Q360,0 720,20 Q1080,40 1440,20 L1440,60 Z"
            className="fill-slate-50 dark:fill-slate-900"
          />
        </svg>

        {/* Glass Sheet Container */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 bg-slate-50 dark:bg-slate-900 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col relative -mt-px"
        >
          {/* Accent glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/8 blur-3xl pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2" />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-none pb-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="min-h-full"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} isDark={isDark} onToggleTheme={toggleTheme} />
    </div>
  );
};

export default Index;
