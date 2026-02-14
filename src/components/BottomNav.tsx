import { motion } from "framer-motion";
import { Home, Briefcase, Layers, BarChart3, Mail, Sun, Moon } from "lucide-react";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "services", label: "Services", icon: Layers },
  { id: "skills", label: "Skills", icon: BarChart3 },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const BottomNav = ({ activeTab, onTabChange, isDark, onToggleTheme }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-[env(safe-area-inset-bottom,8px)]">
      <div className="glass rounded-full mx-auto max-w-md lg:max-w-lg px-3 py-2 flex items-end justify-around shadow-xl relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center gap-0.5 transition-all min-w-[48px]"
            >
              {isActive ? (
                <motion.div
                  layoutId="activeTabDock"
                  className="absolute -top-5 w-12 h-12 rounded-full gradient-bg flex items-center justify-center shadow-lg glow-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </motion.div>
              ) : (
                <Icon className="w-5 h-5 text-muted-foreground" />
              )}
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "mt-7 text-primary" : "mt-1 text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="relative flex flex-col items-center gap-0.5 min-w-[44px]"
        >
          <motion.div
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground" />
            )}
          </motion.div>
          <span className="text-[10px] font-medium text-muted-foreground mt-1">
            {isDark ? "Light" : "Dark"}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
