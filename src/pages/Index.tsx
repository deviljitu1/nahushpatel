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
      {/* Main Content: Full Screen Sheet */}
      <div className="relative z-10 flex flex-col h-screen">

        {/* Glass Sheet Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 bg-slate-50 dark:bg-slate-900 overflow-hidden flex flex-col relative"
        >
          {/* Work Tab Custom Gradient Background */}
          {/* Custom Gradient Background */}
          <div className="absolute inset-0 pointer-events-none hidden dark:block bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FDA13640] via-slate-900 to-slate-900" />

          {/* Accent glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/8 blur-3xl pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2" />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-none pb-28 relative z-10">
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
