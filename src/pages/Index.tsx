import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import HomePage from "@/pages/HomePage";
import WorkPage from "@/pages/WorkPage";
import ServicesPage from "@/pages/ServicesPage";
import SkillsPage from "@/pages/SkillsPage";
import ContactPage from "@/pages/ContactPage";

const tabs = ["home", "work", "services", "skills", "contact"] as const;
type Tab = (typeof tabs)[number];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onNavigate={(tab: string) => setActiveTab(tab as Tab)} />;
      case "work":
        return <WorkPage />;
      case "services":
        return <ServicesPage onNavigate={(tab: string) => setActiveTab(tab as Tab)} />;
      case "skills":
        return <SkillsPage />;
      case "contact":
        return <ContactPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <main className="relative z-10 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
