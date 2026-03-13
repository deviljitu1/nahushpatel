import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Briefcase, 
  Video, 
  BarChart3, 
  Mail, 
  Sun, 
  Moon, 
  Menu, 
  ChevronRight 
} from "lucide-react";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "reels", label: "Reels", icon: Video },
  { id: "skills", label: "Skills", icon: BarChart3 },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const Sidebar = ({ activeTab, onTabChange, isDark, onToggleTheme }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isExpanded ? 260 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden lg:flex flex-col h-screen sticky top-0 left-0 bg-background/80 backdrop-blur-xl border-r border-border/50 z-[100] overflow-hidden px-4 py-8"
    >
      {/* Sidebar Header & Toggle */}
      <div className={`mb-10 flex items-center ${isExpanded ? "justify-between px-2" : "justify-center"}`}>
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.h1
              key="logo-full"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-xl font-bold tracking-tighter whitespace-nowrap"
            >
              NAHUSH<span className="gradient-text">.IN</span>
            </motion.h1>
          ) : (
            <motion.div
              key="logo-compact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
            >
              <span className="text-primary font-black text-sm">N.</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 rounded-lg hover:bg-muted/50 transition-colors ${!isExpanded ? "absolute top-8 left-1/2 -translate-x-1/2" : ""}`}
        >
          {isExpanded ? <Menu className="w-5 h-5 text-muted-foreground" /> : <Menu className="w-5 h-5 text-primary" />}
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-2 mt-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative h-12 ${
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              } ${!isExpanded ? "justify-center px-0" : ""}`}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-primary/80" : ""}`} />
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-semibold text-sm tracking-tight whitespace-nowrap"
                  >
                    {tab.label}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {isActive && (
                <motion.div
                  layoutId="activeTabSidebar"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {!isExpanded && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border shadow-xl z-50">
                  {tab.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-border/50">
        <button
          onClick={onToggleTheme}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all group ${!isExpanded ? "justify-center px-0" : ""}`}
        >
          <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors shrink-0">
            {isDark ? (
              <Sun className="w-5 h-5 group-hover:text-primary transition-colors" />
            ) : (
              <Moon className="w-5 h-5 group-hover:text-primary transition-colors" />
            )}
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-semibold text-sm whitespace-nowrap"
              >
                {isDark ? "Light Mode" : "Dark Mode"}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
