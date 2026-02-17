import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import HomePage from "@/pages/HomePage";
import { useTheme } from "@/hooks/use-theme";

const WorkPage = lazy(() => import("@/pages/WorkPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const SkillsPage = lazy(() => import("@/pages/SkillsPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));

const tabs = ["home", "work", "services", "skills", "contact"] as const;
type Tab = (typeof tabs)[number];

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
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

  useEffect(() => {
    const prefetchTimer = setTimeout(() => {
      Promise.all([
        import("@/pages/WorkPage"),
        import("@/pages/ServicesPage"),
        import("@/pages/SkillsPage"),
        import("@/pages/ContactPage"),
      ]).catch(() => {});
    }, 2500);
    return () => clearTimeout(prefetchTimer);
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
    <div className="min-h-screen bg-background relative overflow-hidden font-sans selection:bg-primary/30">
      {/* Subtle background orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-15%] w-[500px] h-[500px] bg-primary/8 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-accent/6 blur-[100px] rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex-1 overflow-hidden flex flex-col relative"
        >
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-none pb-24 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="min-h-full"
              >
                <Suspense fallback={
                  <div className="flex h-[80vh] items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  </div>
                }>
                  {renderPage()}
                </Suspense>
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
