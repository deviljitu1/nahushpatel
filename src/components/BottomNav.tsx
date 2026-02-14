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
    <nav className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-[env(safe-area-inset-bottom,16px)]">
      <div className="glass rounded-full mx-auto max-w-lg px-2 h-16 flex items-center justify-between shadow-xl relative backdrop-blur-md bg-white/70 dark:bg-black/70 border border-white/20 dark:border-white/10">

        {/* Navigation Tabs */}
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex-1 flex flex-col items-center justify-center h-full min-w-[48px] z-10"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabCircle"
                  className="absolute -top-6 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg"
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    // This creates the "space" around the circle
                    border: '6px solid hsl(var(--background))'
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                >
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </motion.div>
              )}

              {!isActive && (
                <Icon className="w-5 h-5 text-muted-foreground transition-colors hover:text-foreground" />
              )}

              <span
                className={`text-[10px] font-medium transition-all duration-300 absolute bottom-1 ${isActive ? "opacity-0 translate-y-2" : "opacity-100 text-muted-foreground"
                  }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* Separator */}
        <div className="w-px h-8 bg-border/50 mx-1" />

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="relative flex flex-col items-center justify-center h-full min-w-[48px] z-10"
        >
          <div className="relative">
            <motion.div
              key={isDark ? "moon" : "sun"}
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              ) : (
                <Moon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              )}
            </motion.div>
          </div>
          <span className="text-[10px] font-medium text-muted-foreground mt-1 absolute bottom-1">
            {isDark ? "Light" : "Dark"}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
