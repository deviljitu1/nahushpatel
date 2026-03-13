import { motion } from "framer-motion";
import { Home, Briefcase, Video, BarChart3, Mail, Sun, Moon } from "lucide-react";

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
  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 left-0 bg-background/80 backdrop-blur-xl border-r border-border/50 z-[100] px-4 py-8">
      <div className="mb-10 px-2">
        <h1 className="text-xl font-bold tracking-tighter">
          NAHUSH<span className="gradient-text">.IN</span>
        </h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative ${
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "text-primary" : ""}`} />
              <span className="font-semibold text-sm tracking-tight">{tab.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTabSidebar"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-border/50">
        <button
          onClick={onToggleTheme}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all group"
        >
          <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
            {isDark ? (
              <Sun className="w-5 h-5 group-hover:text-primary transition-colors" />
            ) : (
              <Moon className="w-5 h-5 group-hover:text-primary transition-colors" />
            )}
          </div>
          <span className="font-semibold text-sm">{isDark ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
