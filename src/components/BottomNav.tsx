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
    <nav className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-[env(safe-area-inset-bottom,12px)]">
      <div className="rounded-2xl mx-auto max-w-md px-1.5 h-[68px] flex items-center justify-between relative backdrop-blur-2xl bg-card/80 dark:bg-card/90 border border-border/50 shadow-2xl">

        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex-1 flex flex-col items-center justify-center h-full min-w-[44px] z-10"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute -top-5 w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center shadow-lg"
                  style={{
                    boxShadow: '0 8px 24px hsl(24 95% 53% / 0.35)',
                    border: '4px solid hsl(var(--background))'
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </motion.div>
              )}

              {!isActive && (
                <Icon className="w-5 h-5 text-muted-foreground transition-colors hover:text-foreground" />
              )}

              <span
                className={`text-[9px] font-semibold tracking-wide transition-all duration-300 absolute bottom-1.5 ${isActive ? "opacity-0 translate-y-2" : "opacity-70 text-muted-foreground"
                  }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* Separator */}
        <div className="w-px h-8 bg-border/40 mx-0.5" />

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="relative flex flex-col items-center justify-center h-full min-w-[44px] z-10"
        >
          <motion.div
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            )}
          </motion.div>
          <span className="text-[9px] font-semibold text-muted-foreground/70 absolute bottom-1.5">
            {isDark ? "Light" : "Dark"}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
