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

      {/* Top Background Pattern/Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full mix-blend-screen" />
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 z-[1] opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Header Area (Fixed Top) */}
      <header className="fixed top-0 left-0 right-0 z-40 h-24 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[2px] shadow-lg shadow-primary/20">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-white text-lg">
              J
            </div>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">Jitu</h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide">Digital Specialist</p>
          </div>
        </div>
        {/* Search Bar mimic from design */}
        <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/5 w-64">
          <div className="w-4 h-4 rounded-full border-2 border-white/30 mr-2" />
          <div className="h-2 w-20 bg-white/10 rounded-full" />
        </div>
      </header>

      {/* Main Content Sheet with Wave */}
      <div className="relative z-10 mt-24 flex flex-col h-[calc(100vh-6rem)]">

        {/* Wave SVG Separator */}
        <div className="absolute -top-12 left-0 right-0 h-12 z-20 overflow-hidden pointer-events-none">
          {/* We use a simple rounded top for the sheet, but let's try to add the 'S' curve accent if possible. 
               For stability, we'll start with a clean modern card look. */}
        </div>

        {/* The Glass Sheet Container */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 bg-slate-50/90 dark:bg-slate-900/80 backdrop-blur-2xl rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] border-t border-white/20 overflow-hidden flex flex-col relative"
        >
          {/* The "Wave" visual accent on the top right */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2" />

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-none pb-28 pt-8">
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
