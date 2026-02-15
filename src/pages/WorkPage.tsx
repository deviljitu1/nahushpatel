import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Wrench, ArrowUpRight, Play, Pause, Heart, MessageCircle, Send, Music2, Film, Video, CheckCircle2, ArrowLeft, ArrowUp, ArrowDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const filters = ["All", "Social Media", "SEO", "Paid Ads", "Web Dev", "Automation"];

const projects = [
  {
    id: 1,
    title: "E-Commerce Growth Engine",
    result: "3x revenue in 90 days",
    tags: ["SEO", "Paid Ads"],
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop",
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
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
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
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
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
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
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
    coverImage: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=800&auto=format&fit=crop",
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
    coverImage: "https://images.unsplash.com/photo-1553877616-152807fbe913?q=80&w=800&auto=format&fit=crop",
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

const ReelCard = ({ video, isActive, onEnded }: { video: (typeof videoPortfolio)[number]; isActive: boolean; onEnded?: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [progress, setProgress] = useState(0);

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
          onEnded={onEnded}
          onTimeUpdate={() => {
            if (videoRef.current) {
              const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
              setProgress(p);
            }
          }}
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
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent p-[2px]">
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

      {/* Custom Timeline Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-primary transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
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
  const [socialSubTab, setSocialSubTab] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [selectedCreative, setSelectedCreative] = useState<(typeof creativeItems)[number] | null>(null);
  const [creativeMode, setCreativeMode] = useState<"wall" | "carousel">("wall");
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.tags.includes(activeFilter));

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const child = containerRef.current.children[index] as HTMLElement;
    child?.scrollIntoView({ behavior: 'smooth' });
    const child = containerRef.current.children[index] as HTMLElement;
    child?.scrollIntoView({ behavior: 'smooth' });
    setActiveVideoIndex(index);
  };

  // Auto-scroll effect when index changes programmatically
  // Auto-scroll effect when index changes programmatically
  useEffect(() => {
    if (containerRef.current && activeFilter === 'Social Media' && socialSubTab === 'Video Portfolio') {
      const child = containerRef.current.children[activeVideoIndex] as HTMLElement;
      child?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeVideoIndex, activeFilter, socialSubTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!(activeFilter === 'Social Media' && socialSubTab === 'Video Portfolio')) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollToIndex(Math.min(activeVideoIndex + 1, videoPortfolio.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollToIndex(Math.max(activeVideoIndex - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFilter, socialSubTab, activeVideoIndex]);

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
    if (socialSubTab !== 'Creatives') {
      setTimeout(() => setCreativeMode('wall'), 300);
    }
  }, [socialSubTab]);



  const isFullscreen = activeFilter === 'Social Media' && (socialSubTab === 'Video Portfolio' || socialSubTab === 'Creatives');

  return (
    <div className={`relative mx-auto ${isFullscreen ? 'px-0 max-w-lg lg:max-w-6xl md:h-[calc(100dvh-6rem)] h-[100dvh] flex flex-col' : 'px-5 max-w-lg lg:max-w-4xl min-h-screen pt-2'}`}>

      {/* Section Toggle - Always visible */}
      <div className={`${isFullscreen ? 'absolute top-0 left-0 right-0 z-50 px-5 pt-3 pb-2 bg-gradient-to-b from-black/90 via-black/60 to-transparent' : 'mb-8'}`}>
        <div className={isFullscreen ? 'max-w-lg mx-auto' : ''}>

          {/* Back Button for Creative Carousel */}
          {activeFilter === 'Social Media' && socialSubTab === 'Creatives' && creativeMode === 'carousel' && (
            <button
              onClick={() => setCreativeMode('wall')}
              className="mb-2 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Gallery
            </button>
          )}

          {!isFullscreen && (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold mb-1"
              >
                My <span className="gradient-text">Work</span>
              </motion.h1>
              <p className="text-sm mb-6 text-muted-foreground">Case studies & creative work</p>
            </>
          )}

          {/* Main Filter Navigation */}
          <div className={`flex gap-3 overflow-x-auto pb-2 scrollbar-none ${!isFullscreen ? '-mx-1 px-1 lg:justify-center' : ''}`}>
            {!isFullscreen && filters.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all border border-b-[3px] active:border-b-0 active:translate-y-[3px] whitespace-nowrap ${activeFilter === tag
                  ? "bg-slate-800 dark:bg-white text-white dark:text-black border-slate-600 dark:border-slate-300 shadow-md"
                  : "bg-white dark:bg-slate-800 text-muted-foreground border-slate-200 dark:border-slate-700 hover:text-foreground"}`}
              >
                {tag}
              </button>
            ))}

            {/* If fullscreen (Social Media sub-modes), show a back to projects/all button or similar if needed? 
                  Actually, user might want to switch tabs even in fullscreen. 
                  But full screen video portfolio usually hides the main nav.
                  Let's show a minimal back button or the sub-tabs.
              */}
            {isFullscreen && (
              <button
                onClick={() => {
                  // Go back to main view or simply reset subtab
                  setSocialSubTab('All');
                }}
                className="px-4 py-2 rounded-xl bg-white/10 text-white backdrop-blur-sm border border-white/10 text-xs font-bold"
              >
                ← Back to Case Studies
              </button>
            )}
          </div>

          {/* Social Media Sub-Tabs (Only visible if Social Media is active and NOT fullscreen video, or overlaid?) 
               Actually, if we want them to switch between All/Video/Creative, we should show this bar.
           */}
          {activeFilter === 'Social Media' && !isFullscreen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex gap-2 justify-center"
            >
              {['All', 'Video Portfolio', 'Creatives'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSocialSubTab(sub)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all border ${socialSubTab === sub
                    ? 'bg-primary/10 text-primary border-primary/20'
                    : 'bg-transparent text-muted-foreground border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  {sub}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: PROJECTS (Case Studies) */}
        {(!isFullscreen) && (
          <motion.div
            key="projects-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pb-24 grid gap-8 px-1"
          >
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-6">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedProject(project)}
                  className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 border-b-[4px] border-b-slate-200 dark:border-b-slate-800 rounded-3xl overflow-hidden cursor-pointer hover:border-b-primary/50 dark:hover:border-b-primary/50 transition-all active:border-b-0 active:translate-y-[4px]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-bold text-lg text-white leading-tight mb-1">{project.title}</h3>
                      <div className="flex gap-2 flex-wrap">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-sm">{project.result}</span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {project.problem}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW 2: VIDEO PORTFOLIO */}
        {activeFilter === "Social Media" && socialSubTab === "Video Portfolio" && (
          <motion.div
            key="videos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0 bg-black lg:flex lg:items-center lg:justify-center"
          >
            {/* Desktop: centered phone-frame container */}
            <div
              ref={containerRef}
              className="w-full h-full lg:w-[450px] lg:h-[90vh] lg:rounded-3xl lg:overflow-hidden lg:border-2 lg:border-white/10 lg:shadow-2xl snap-y snap-mandatory overflow-y-auto scrollbar-none relative focus:outline-none"
              tabIndex={0}
              onScroll={handleScroll}
            >
              {videoPortfolio.map((video, index) => (
                <div
                  key={video.id}
                  className="w-full h-[100dvh] lg:h-full snap-start snap-always relative"
                >
                  <ReelCard
                    video={video}
                    isActive={activeVideoIndex === index}
                    onEnded={() => {
                      if (index < videoPortfolio.length - 1) {
                        // Small timeout to ensure seamless transition feel
                        setTimeout(() => {
                          setActiveVideoIndex(index + 1);
                        }, 100);
                      } else {
                        // Loop back to start if desired, or stop
                        setActiveVideoIndex(0);
                      }
                    }}
                  />
                </div>
              ))}
              <div className="h-1 w-full snap-align-none" />
            </div>

            {/* Desktop Side Info / Navigation for Videos */}
            <div className="hidden lg:flex flex-col ml-8 gap-4">
              <div className="flex gap-4">
                <button
                  onClick={() => scrollToIndex(Math.max(activeVideoIndex - 1, 0))}
                  disabled={activeVideoIndex === 0}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all border border-white/10 active:scale-95"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToIndex(Math.min(activeVideoIndex + 1, videoPortfolio.length - 1))}
                  disabled={activeVideoIndex === videoPortfolio.length - 1}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all border border-white/10 active:scale-95"
                >
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>

              <div className="grid gap-3 overflow-y-auto pr-2 scrollbar-none mask-gradient-b max-h-[60vh]">
                {videoPortfolio.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => scrollToIndex(i)} // This will update activeVideoIndex
                    className={`w-full text-left p-4 rounded-xl transition-all border-b-[3px] active:border-b-0 active:translate-y-[3px] flex items-center justify-between group ${activeVideoIndex === i
                      ? 'bg-white text-black border-slate-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                      }`}
                  >
                    <div>
                      <p className="font-bold text-sm mb-1">{v.title}</p>
                      <p className="text-[10px] opacity-70">{v.category}</p>
                    </div>
                    {activeVideoIndex === i && <div className="w-2 h-2 rounded-full bg-black animate-pulse" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: CREATIVES */}
        {activeFilter === "Social Media" && socialSubTab === "Creatives" && (
          <motion.div
            className="pb-24 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="columns-2 md:columns-3 gap-4 space-y-4 px-1">
              {creativeItems.map(item => (
                <motion.div
                  key={item.id}
                  className="break-inside-avoid bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    // Handle selection or open dialog/modal for image
                  }}
                >
                  <img src={item.image} alt={item.title} className="w-full h-auto" />
                  <div className="p-3">
                    <h3 className="font-bold text-xs">{item.title}</h3>
                    <p className="text-[10px] text-muted-foreground">{item.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
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
      </motion.div >
        )}
    </AnimatePresence >

  {/* Project Detail Modal */ }
  < Dialog open = {!!selectedProject} onOpenChange = {() => setSelectedProject(null)}>
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
  </Dialog >

  {/* Creative Detail Modal (Lightbox) */ }
  < Dialog open = {!!selectedCreative} onOpenChange = {() => setSelectedCreative(null)}>
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
  </Dialog >
    </div >
  );
};

export default WorkPage;
```
