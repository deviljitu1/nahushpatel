import { motion } from "framer-motion";
import { Home, Briefcase, Layers, BarChart3, Mail } from "lucide-react";

// Order: Home, Work, Services (Center), Skills, Contact
const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "services", label: "Services", icon: Layers }, // Center item
  { id: "skills", label: "Skills", icon: BarChart3 },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  // Split tabs into left, center, right
  const leftTabs = tabs.slice(0, 2);
  const centerTab = tabs[2];
  const rightTabs = tabs.slice(3, 5);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center pb-4 pointer-events-none">
      <div className="relative flex items-end pointer-events-auto filter drop-shadow-xl">
        {/* Left Bar Part */}
        <div className="h-16 w-32 md:w-40 bg-card rounded-l-3xl flex items-center justify-evenly pr-2">
          {leftTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative p-2 group"
              >
                <div className={`transition-colors duration-300 ${isActive ? "text-emerald-500" : "text-muted-foreground group-hover:text-foreground"}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Center Cutout Part (SVG) */}
        <div className="relative h-16 w-[120px] shrink-0 -mx-[1px]">
          {/* The SVG background for the cutout */}
          <svg
            viewBox="0 0 120 64"
            className="absolute bottom-0 left-0 w-full h-full text-card fill-current"
            preserveAspectRatio="none"
          >
            <path d="M0,0 H28 C28,0 40,0 44,10 C48,25 50,40 60,40 C70,40 72,25 76,10 C80,0 92,0 92,0 H120 V64 H0 Z" />
          </svg>

          {/* The Floating Center Button */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14">
            <button
              onClick={() => onTabChange(centerTab.id)}
              className={`w-full h-full rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 ${activeTab === centerTab.id
                  ? "bg-emerald-500 ring-4 ring-card"
                  : "bg-emerald-500/90 hover:bg-emerald-500 ring-4 ring-card"
                }`}
            >
              <centerTab.icon className="w-6 h-6 text-white" />
            </button>
            {/* Text Label for center? Maybe hidden to keep it clean like reference */}
          </div>
        </div>

        {/* Right Bar Part */}
        <div className="h-16 w-32 md:w-40 bg-card rounded-r-3xl flex items-center justify-evenly pl-2">
          {rightTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative p-2 group"
              >
                <div className={`transition-colors duration-300 ${isActive ? "text-emerald-500" : "text-muted-foreground group-hover:text-foreground"}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
