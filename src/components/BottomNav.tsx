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
    <nav className="fixed bottom-0 left-0 right-0 z-[100] px-3 sm:px-4"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 8px)" }}
    >
      <div
        className="rounded-2xl mx-auto max-w-md px-1 h-[62px] sm:h-[68px] flex items-center justify-between relative backdrop-blur-2xl border border-border/50 shadow-2xl"
        style={{
          background: "hsl(var(--card) / 0.85)",
          boxShadow: "0 -4px 32px rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-label={tab.label}
              className="relative flex-1 flex flex-col items-center justify-center h-full min-w-[44px] z-10 group"
            >
              {/* Active pill */}
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute -top-5 w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center shadow-lg"
                  style={{
                    boxShadow: "0 8px 28px hsl(24 95% 53% / 0.4)",
                    border: "4px solid hsl(var(--background))",
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                >
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </motion.div>
              )}

              {/* Inactive icon + hover tooltip */}
              {!isActive && (
                <>
                  <motion.div whileTap={{ scale: 0.85 }} className="relative">
                    <Icon className="w-5 h-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                  </motion.div>

                  {/* Tooltip on hover (desktop) */}
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-foreground text-background text-[9px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 hidden sm:block shadow-lg">
                    {tab.label}
                  </span>
                </>
              )}

              {/* Mobile label under inactive icon */}
              <span
                className={`text-[9px] font-semibold tracking-wide transition-all duration-300 absolute bottom-1.5 ${isActive ? "opacity-0 translate-y-2" : "opacity-60 text-muted-foreground group-hover:opacity-100"
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
          aria-label="Toggle theme"
          className="relative flex flex-col items-center justify-center h-full min-w-[44px] z-10 group"
        >
          <motion.div
            key={isDark ? "sun" : "moon"}
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.22 }}
            whileTap={{ scale: 0.85 }}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </motion.div>
          <span className="text-[9px] font-semibold text-muted-foreground/70 absolute bottom-1.5 group-hover:opacity-100 transition-opacity">
            {isDark ? "Light" : "Dark"}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
