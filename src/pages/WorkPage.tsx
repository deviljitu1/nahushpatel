import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Wrench, ArrowUpRight, Play, Pause, Heart, MessageCircle, Send, Music2, Film, Video, CheckCircle2, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const filters = ["All", "SEO", "Paid Ads", "Web Dev", "Automation", "Social Media"];

const projects = [
  {
    id: 1,
    title: "E-Commerce Growth Engine",
    result: "3x revenue in 90 days",
    tags: ["SEO", "Paid Ads"],
    image: "📈",
    problem: "Low organic traffic and poor ROAS on paid campaigns.",
    solution: "Rebuilt SEO architecture, launched targeted Meta & Google Ads funnels.",
    tools: ["Google Ads", "Meta Ads", "Ahrefs", "GA4"],
    metrics: [
      { label: "Revenue Growth", value: "3x" },
      { label: "ROAS", value: "4.2x" },
      { label: "Organic Traffic", value: "+180%" },
    ],
  },
  {
    id: 2,
    title: "SaaS Landing Page Redesign",
    result: "45% conversion lift",
    tags: ["Web Dev"],
    image: "🚀",
    problem: "High bounce rate on landing pages, low trial signups.",
    solution: "Designed mobile-first landing with clear CTAs and social proof.",
    tools: ["React", "TailwindCSS", "Figma", "Hotjar"],
    metrics: [
      { label: "Conversion Rate", value: "+45%" },
      { label: "Bounce Rate", value: "-32%" },
      { label: "Page Speed", value: "98/100" },
    ],
  },
  {
    id: 3,
    title: "Lead Gen Automation Pipeline",
    result: "500+ leads/month on autopilot",
    tags: ["Automation"],
    image: "⚡",
    problem: "Manual lead collection, no nurture sequences.",
    solution: "Built n8n workflows with WhatsApp + email automation.",
    tools: ["n8n", "WhatsApp API", "Google Sheets", "Zapier"],
    metrics: [
      { label: "Leads/Month", value: "500+" },
      { label: "Response Time", value: "<5 min" },
      { label: "Cost/Lead", value: "-60%" },
    ],
  },
  {
    id: 4,
    title: "Restaurant Social Takeover",
    result: "10K followers in 60 days",
    tags: ["Social Media"],
    image: "📱",
    problem: "Zero social presence, no local visibility.",
    solution: "Created content calendar, Reels strategy, and influencer collabs.",
    tools: ["Instagram", "Canva", "Later", "Meta Business Suite"],
    metrics: [
      { label: "Followers", value: "10K+" },
      { label: "Engagement Rate", value: "8.4%" },
      { label: "Walk-ins", value: "+35%" },
    ],
  },
  {
    id: 5,
    title: "SEO Domination for Local Biz",
    result: "#1 on Google for 12 keywords",
    tags: ["SEO"],
    image: "🎯",
    problem: "Not ranking for any local search terms.",
    solution: "Technical SEO audit, content clusters, and local citation building.",
    tools: ["Ahrefs", "Screaming Frog", "Google Search Console"],
    metrics: [
      { label: "Keywords #1", value: "12" },
      { label: "Organic Traffic", value: "+240%" },
      { label: "Leads", value: "+90%" },
    ],
  },
  {
    id: 6,
    title: "Funnel + Ads for Coaching Biz",
    result: "₹15L revenue in 30 days",
    tags: ["Paid Ads", "Web Dev"],
    image: "💰",
    problem: "No online sales system for high-ticket coaching.",
    solution: "Built sales funnel with webinar flow + retargeting ads.",
    tools: ["ClickFunnels", "Google Ads", "Meta Ads", "Razorpay"],
    metrics: [
      { label: "Revenue", value: "₹15L" },
      { label: "ROAS", value: "5.8x" },
      { label: "Webinar Signups", value: "800+" },
    ],
  },
];

// Video portfolio items — replace URLs with your actual hosted video files
const videoPortfolio = [
  {
    id: 1,
    title: "Brand Intro Reel",
    category: "Reel",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    creator: "@yourusername",
    description: "Created this brand intro using After Effects + Premiere Pro. Focused on smooth transitions and brand color matching. 🎬",
    likes: "2.4K",
    comments: "186",
    shares: "342",
  },
  {
    id: 2,
    title: "Product Motion Graphics",
    category: "Motion",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    creator: "@yourusername",
    description: "3D product showcase with motion graphics. Made with Blender + After Effects. Client loved the floating effect ✨",
    likes: "5.1K",
    comments: "423",
    shares: "891",
  },
  {
    id: 3,
    title: "AI Generated Ad",
    category: "AI Video",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    creator: "@yourusername",
    description: "Fully AI-generated ad using Runway + Midjourney. Prompt engineering + post-production editing in Premiere 🤖",
    likes: "8.7K",
    comments: "1.2K",
    shares: "2.1K",
  },
  {
    id: 4,
    title: "Client Testimonial Edit",
    category: "Edit",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    creator: "@yourusername",
    description: "Testimonial video edit with dynamic captions, b-roll cuts, and color grading. Shot on iPhone, edited in DaVinci 🎥",
    likes: "1.8K",
    comments: "94",
    shares: "156",
  },
  {
    id: 5,
    title: "Social Media Campaign",
    category: "Reel",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    creator: "@yourusername",
    description: "Campaign reel for a food brand. Hook → Value → CTA format. 3x engagement vs their previous content 📱",
    likes: "12K",
    comments: "890",
    shares: "3.4K",
  },
  {
    id: 6,
    title: "Explainer Animation",
    category: "Motion",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    creator: "@yourusername",
    description: "2D explainer animation for a SaaS product. Script → Storyboard → Animation pipeline in 5 days 🚀",
    likes: "3.6K",
    comments: "267",
    shares: "518",
  },
];

const ReelCard = ({ video, isActive }: { video: (typeof videoPortfolio)[number]; isActive: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.error("Autoplay failed:", e);
        setIsPlaying(false);
      });
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] md:h-full snap-start shrink-0 flex items-center justify-center bg-black">
      {/* Video */}
      <div
        className="relative w-full h-full overflow-hidden cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted={false}
          playsInline
          preload="metadata"
        />

        {/* Play/Pause overlay - Minimal */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-black/20 z-10"
            >
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category badge */}
        <div className="absolute top-16 left-4 z-10 md:top-4">
          <span className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-black/40 text-white font-medium backdrop-blur-md border border-white/10">
            {video.category}
          </span>
        </div>

        {/* Right side actions (Instagram style) */}
        <div className="absolute right-4 bottom-32 md:bottom-24 z-10 flex flex-col items-center gap-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm group-active:scale-90 transition-transform">
              <Heart
                className={`w-7 h-7 transition-colors ${isLiked
                  ? "text-red-500 fill-red-500"
                  : "text-white"
                  }`}
              />
            </div>
            <span className="text-xs text-white font-medium drop-shadow-md">
              {video.likes}
            </span>
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm group-active:scale-90 transition-transform">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs text-white font-medium drop-shadow-md">
              {video.comments}
            </span>
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm group-active:scale-90 transition-transform">
              <Send className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-white font-medium drop-shadow-md">
              {video.shares}
            </span>
          </button>
        </div>

        {/* Bottom info overlay (Instagram style) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 pb-24 md:pb-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <span className="text-xs font-bold text-white">NP</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white drop-shadow-md flex items-center gap-1">
                {video.creator} <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-400/20" />
              </span>
              <span className="text-[10px] text-white/80">Original Audio</span>
            </div>
            <button className="ml-2 px-3 py-1 rounded-lg border border-white/30 text-[10px] text-white font-medium backdrop-blur-sm hover:bg-white/10 transition-colors">
              Follow
            </button>
          </div>

          <h3 className="text-sm font-bold text-white drop-shadow-md mb-2 line-clamp-1">
            {video.title}
          </h3>

          <p
            className={`text-xs text-white/90 drop-shadow-md leading-relaxed pr-12 ${!showMore ? "line-clamp-2" : ""
              }`}
            onClick={(e) => {
              e.stopPropagation();
              setShowMore(!showMore);
            }}
          >
            {video.description}
            {!showMore && (
              <span className="text-white/60 font-medium ml-1 cursor-pointer hover:text-white">
                more
              </span>
            )}
          </p>

          {showMore && (
            <div className="mt-2 text-[10px] text-white/50 flex gap-2">
              <span>#portfolio</span>
              <span>#video</span>
              <span>#creative</span>
            </div>
          )}

          <div className="flex items-center gap-2 mt-4 text-white/70">
            <Music2 className="w-3 h-3 animate-pulse" />
            <div className="text-[10px] overflow-hidden w-32 relative">
              <div className="whitespace-nowrap animate-marquee">
                Original Audio - {video.creator} • Trending Sound
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Creative portfolio items
const creativeItems = [
  {
    id: 1,
    title: "Neon Brand Identity",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    description: "Complete visual identity for a cyberpunk-themed coffee shop.",
  },
  {
    id: 2,
    title: "Minimalist Poster Series",
    category: "Print Design",
    image: "https://images.unsplash.com/photo-1572044162444-ad6021105507?q=80&w=2000&auto=format&fit=crop",
    description: "Series of 3 posters focusing on typography and negative space.",
  },
  {
    id: 3,
    title: "Social Media Kit",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop",
    description: " cohesive set of templates for Instagram stories and posts.",
  },
  {
    id: 4,
    title: "3D Product Render",
    category: "3D Art",
    image: "https://images.unsplash.com/photo-1633596683562-4a46a328325a?q=80&w=2000&auto=format&fit=crop",
    description: "Hyper-realistic render of a concept smart watch.",
  },
  {
    id: 5,
    title: "Event Banner",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
    description: "Large format banner design for a tech conference.",
  },
  {
    id: 6,
    title: "App UI Concept",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop",
    description: "Dark mode interface design for a music streaming app.",
  },
];



const SeasonBackground = ({ season }: { season: 'summer' | 'winter' | 'rainy' | 'autumn' }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio Context Management
  useEffect(() => {
    // Create new audio instance if needed
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0; // Start silent
    }

    // Smooth transition
    const fadeOut = setInterval(() => {
      if (audioRef.current && audioRef.current.volume > 0.05) {
        audioRef.current.volume -= 0.05;
      } else {
        clearInterval(fadeOut);
        if (audioRef.current) {
          audioRef.current.pause();
          // audioRef.current.src = SOUNDS[season];
          // Attempt to play (browser may block without interaction)
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Audio autoplay prevented:", error);
            });
          }

          // Fade In
          const fadeIn = setInterval(() => {
            if (audioRef.current && audioRef.current.volume < 0.3) {
              audioRef.current.volume += 0.05;
            } else {
              clearInterval(fadeIn);
            }
          }, 200);
        }
      }
    }, 100);

    return () => {
      if (fadeOut) clearInterval(fadeOut);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [season]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[40]">
      {season === 'summer' && (
        <>
          <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-yellow-400/20 blur-[100px] rounded-full animate-pulse z-[-1]" />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: -20, opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
              className="absolute w-2 h-2 bg-yellow-200/60 rounded-full blur-[2px]"
              style={{ top: `${20 + Math.random() * 60}%`, left: `${Math.random() * 100}%` }}
            />
          ))}
        </>
      )}

      {season === 'winter' && (
        <>
          <div className="absolute inset-0 bg-slate-900/10 z-[-1]" />
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * 100, opacity: 0 }}
              animate={{
                y: '100vh',
                x: Math.random() * 100 + (Math.random() * 200 - 100),
                rotate: 360,
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
              className="absolute w-2 h-2 bg-white/90 rounded-full blur-[1px]"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </>
      )}

      {season === 'autumn' && (
        <>
          <div className="absolute inset-0 bg-orange-900/5 z-[-1]" />
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * 100, rotate: 0, opacity: 0 }}
              animate={{
                y: '100vh',
                x: `calc(${Math.random() * 100}% + ${Math.random() * 400 - 200}px)`,
                rotate: 720,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
              className={`absolute w-3 h-3 rounded-sm ${['bg-red-500/60', 'bg-orange-500/60', 'bg-yellow-600/60'][Math.floor(Math.random() * 3)]}`}
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </>
      )}

      {season === 'rainy' && (
        <>
          <div className="absolute inset-0 bg-slate-950/40 transition-colors duration-[2000ms] z-[-1]" />

          {/* Lightning */}
          <motion.div
            animate={{ opacity: [0, 0, 0, 0.4, 0, 0, 0.1, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: Math.random() * 3 }}
            className="absolute inset-0 bg-blue-100/10 z-[-1] mix-blend-overlay"
          />

          {/* Heavy Rain Drops - BIGGER & FASTER */}
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: '120vh', opacity: [0.6, 0.8, 0.6] }}
              transition={{
                duration: 0.4 + Math.random() * 0.2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
              className="absolute w-[2px] h-24 bg-blue-200/50 -skew-x-6"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}

          {/* Water Splashes on Ground */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`splash-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5], opacity: [0.8, 0] }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute bottom-0 w-8 h-2 bg-blue-300/30 rounded-full blur-sm"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}

          {/* Flood Water */}
          <motion.div
            initial={{ height: "0px" }}
            animate={{ height: ["15px", "25px", "15px"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/80 to-blue-500/20 backdrop-blur-sm border-t border-blue-300/30 z-[50]"
          />
        </>
      )}
    </div>
  );
};

const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [selectedCreative, setSelectedCreative] = useState<(typeof creativeItems)[number] | null>(null);
  const [activeSection, setActiveSection] = useState<"projects" | "videos" | "creatives">("projects");
  const [creativeMode, setCreativeMode] = useState<"wall" | "carousel">("wall");
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.tags.includes(activeFilter));

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.clientHeight === 0) return;
    const index = Math.round(container.scrollTop / container.clientHeight);
    if (!isNaN(index) && index !== activeVideoIndex) {
      setActiveVideoIndex(index);
    }
  };

  // Reset creative mode when section changes
  useEffect(() => {
    if (activeSection !== 'creatives') {
      setTimeout(() => setCreativeMode('wall'), 300);
    }
  }, [activeSection]);



  return (
    <div className={`relative pt-14 mx-auto ${activeSection === 'videos' || activeSection === 'creatives' ? 'px-0 max-w-lg md:h-[calc(100dvh-6rem)] h-[100dvh] flex flex-col' : 'px-5 max-w-lg min-h-screen'}`}>

      {/* Header - Variable Padding based on section */}
      <div className={`${activeSection === 'videos' || activeSection === 'creatives' ? 'fixed top-0 left-0 right-0 z-30 px-5 pt-2 bg-gradient-to-b from-black/80 to-transparent pointer-events-none' : ''}`}>
        <div className={activeSection === 'videos' || activeSection === 'creatives' ? 'pointer-events-auto max-w-lg mx-auto flex flex-col items-center' : ''}>

          {/* Back Button for Creative Carousel */}
          {activeSection === 'creatives' && creativeMode === 'carousel' && (
            <button
              onClick={() => setCreativeMode('wall')}
              className="mb-2 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit self-start"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Gallery
            </button>
          )}

          {!(activeSection === 'videos' || activeSection === 'creatives') && (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold mb-1"
              >
                My <span className="gradient-text">Work</span>
              </motion.h1>
              <p className="text-sm mb-4 text-muted-foreground">Case studies & creative work</p>
            </>
          )}

          {/* Section Toggle */}
          <div className={`flex gap-2 overflow-x-auto pb-2 scrollbar-none ${activeSection === 'videos' || activeSection === 'creatives' ? 'mt-2' : 'mb-4'}`}>
            <button
              onClick={() => setActiveSection("projects")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeSection === "projects"
                ? "gradient-bg text-primary-foreground"
                : "glass text-muted-foreground hover:text-foreground"
                }`}
            >
              <TrendingUp className="w-3.5 h-3.5" /> Projects
            </button>
            <button
              onClick={() => setActiveSection("videos")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeSection === "videos"
                ? "bg-white/20 text-white backdrop-blur-md"
                : "glass text-muted-foreground hover:text-foreground"
                }`}
            >
              <Film className="w-3.5 h-3.5" /> Video Portfolio
            </button>
            <button
              onClick={() => setActiveSection("creatives")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeSection === "creatives"
                ? "gradient-bg text-primary-foreground"
                : "glass text-muted-foreground hover:text-foreground"
                }`}
            >
              <Wrench className="w-3.5 h-3.5" /> Creatives
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSection === "projects" ? (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pb-24 grid gap-8 px-1"
          >
            {/* Filter Tags - Glass Pill Style */}
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none -mx-1 px-1">
              {filters.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all shadow-lg ${activeFilter === tag
                    ? "gradient-bg text-primary-foreground"
                    : "glass text-muted-foreground hover:text-foreground"}`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {filtered.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProject(project)}
                className="glass rounded-2xl p-4 cursor-pointer hover:scale-[1.01] transition-transform active:scale-[0.99]"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{project.image}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{project.title}</h3>
                    <p className="text-xs text-primary font-medium flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3 h-3" /> {project.result}
                    </p>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : activeSection === "videos" ? (
          <motion.div
            key="videos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0 bg-black"
          >
            <div
              className="w-full h-full snap-y snap-mandatory overflow-y-auto scrollbar-none"
              onScroll={handleScroll}
            >
              {videoPortfolio.map((video, index) => (
                <div
                  key={video.id}
                  className="w-full h-[100dvh] snap-start snap-always relative"
                >
                  <ReelCard video={video} isActive={activeVideoIndex === index} />
                </div>
              ))}
              <div className="h-1 w-full snap-align-none" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
          </motion.div>
        ) : (
          <motion.div
            key="creatives"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={creativeMode === 'carousel' ? "fixed inset-0 z-0 bg-neutral-900 flex flex-col pt-28" : "fixed inset-0 z-0 bg-neutral-100 dark:bg-neutral-900 flex flex-col pt-24 overflow-y-auto"}
          >
            {/* Spotlight Effect Background */}
            {creativeMode === 'carousel' && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.1),rgba(0,0,0,0)50%)] pointer-events-none" />
            )}

            {creativeMode === "wall" ? (
              <div className="pb-20 px-5">
                <div className="text-center pt-8 mb-24">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-foreground">
                    Welcome to the <span className="italic text-primary">Gallery</span>
                  </h2>
                  <p className="text-sm text-muted-foreground font-light tracking-wide">Tap a frame to view details</p>
                </div>

                {/* Wall View - Grid of Frames */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-20 perspective-1000 max-w-lg mx-auto">
                  {creativeItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group cursor-pointer"
                      onClick={() => setCreativeMode('carousel')}
                    >
                      {/* Hanging String */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-black/20 dark:bg-white/20 z-0" />
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/40 dark:bg-white/40 shadow-sm z-0" />

                      <div className="bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-300 relative z-10 transform-gpu">
                        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover filter contrast-105" />
                        </div>
                        <div className="mt-3 text-center">
                          <h3 className="text-[10px] font-serif font-bold truncate px-1 text-black">{item.title}</h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Carousel View - Horizontal Scroll */}
                <div className="relative z-10 px-5 mb-2">
                  <p className="text-xs text-white/50 font-serif italic mb-4 text-center">"A curation of visual experiments"</p>
                </div>

                <div className="flex-1 overflow-x-auto overflow-y-hidden flex items-center gap-12 px-10 pb-20 snap-x snap-mandatory scrollbar-none perspective-1000">
                  {creativeItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                      viewport={{ margin: "-10% 0px -10% 0px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative group shrink-0 w-[280px] snap-center"
                      onClick={() => setSelectedCreative(item)}
                    >
                      {/* Hanging String (Visual) */}
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-white/20 z-0" />
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.5)] z-0" />

                      {/* Frame & Artwork */}
                      <div className="relative bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer z-10">
                        <div className="relative overflow-hidden aspect-[4/5] bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover filter sepia-[0.2] contrast-105 group-hover:sepia-0 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>

                        {/* Plaque / Label */}
                        <div className="mt-4 text-center">
                          <h3 className="text-black font-serif text-lg font-bold tracking-tight">{item.title}</h3>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{item.category}</p>
                        </div>
                      </div>

                      {/* Floor Reflection (Subtle) */}
                      <div className="absolute -bottom-12 left-0 right-0 h-10 bg-gradient-to-b from-white/10 to-transparent transform scale-y-[-1] opacity-20 blur-sm pointer-events-none" />
                    </motion.div>
                  ))}

                  {/* Spacer for end of gallery */}
                  <div className="w-10 shrink-0" />
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass rounded-2xl max-w-md mx-auto max-h-[80vh] overflow-y-auto border-border">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="text-4xl mb-2">{selectedProject.image}</div>
                <DialogTitle className="text-lg">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-primary font-medium text-sm">
                  {selectedProject.result}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Problem</h4>
                  <p className="text-sm">{selectedProject.problem}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Solution</h4>
                  <p className="text-sm">{selectedProject.solution}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Tools Used</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tools.map((tool) => (
                      <span key={tool} className="text-xs px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground">
                        <Wrench className="w-3 h-3 inline mr-1" />{tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Results</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProject.metrics.map((m) => (
                      <div key={m.label} className="text-center p-2 rounded-xl bg-secondary/50">
                        <div className="text-lg font-bold gradient-text">{m.value}</div>
                        <div className="text-[10px] text-muted-foreground">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Creative Detail Modal (Lightbox) */}
      <Dialog open={!!selectedCreative} onOpenChange={() => setSelectedCreative(null)}>
        <DialogContent className="bg-black/95 border-none text-white max-w-lg mx-auto p-0 overflow-hidden shadow-2xl rounded-2xl">
          {selectedCreative && (
            <div className="relative">
              <img src={selectedCreative.image} alt={selectedCreative.title} className="w-full h-auto max-h-[60vh] object-contain bg-black/50" />
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary tracking-widest uppercase border border-primary/30 px-2 py-0.5 rounded">{selectedCreative.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 font-serif tracking-tight">{selectedCreative.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed font-light">{selectedCreative.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};


export default WorkPage;
