import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Wrench, ArrowUpRight, Play, Pause, Heart, MessageCircle, Send, Music2, Film, Video, CheckCircle2 } from "lucide-react";
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

  // Auto-play when active
  useEffect(() => {
    if (isActive) {
      const playPromise = videoRef.current?.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay blocked/failed:", error);
            setIsPlaying(false);
          });
      }
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-[100dvh] md:h-full snap-center shrink-0 flex items-center justify-center bg-black">
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

const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [activeSection, setActiveSection] = useState<"projects" | "videos">("projects");
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for robust scroll detection
  useEffect(() => {
    if (activeSection !== 'videos') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveVideoIndex(index);
          }
        });
      },
      {
        root: null, // Use viewport
        threshold: 0.6, // Trigger when 60% of video is visible
      }
    );

    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      videoRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [activeSection]);

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <div className={`pt-14 mx-auto ${activeSection === 'projects' ? 'px-5 max-w-lg' : 'px-0 max-w-lg md:h-[calc(100dvh-6rem)] h-[100dvh] flex flex-col'}`}>

      {/* Header - Variable Padding based on section */}
      {/* For videos, we float the header on top or hide it? Let's float it on top with z-index */}
      <div className={`${activeSection === 'videos' ? 'fixed top-0 left-0 right-0 z-30 px-5 pt-14 bg-gradient-to-b from-black/80 to-transparent pointer-events-none' : ''}`}>
        <div className={activeSection === 'videos' ? 'pointer-events-auto max-w-lg mx-auto' : ''}>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-2xl font-bold mb-1 ${activeSection === 'videos' ? 'text-white' : ''}`}
          >
            My <span className={activeSection === 'videos' ? 'text-white' : 'gradient-text'}>Work</span>
          </motion.h1>
          <p className={`text-sm mb-4 ${activeSection === 'videos' ? 'text-white/70' : 'text-muted-foreground'}`}>Case studies & creative work</p>

          {/* Section Toggle: Projects vs Video Portfolio */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveSection("projects")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeSection === "projects"
                  ? "gradient-bg text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
                }`}
            >
              <TrendingUp className="w-3.5 h-3.5" /> Projects
            </button>
            <button
              onClick={() => setActiveSection("videos")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeSection === "videos"
                  ? "bg-white/20 text-white backdrop-blur-md"
                  : "glass text-muted-foreground hover:text-foreground"
                }`}
            >
              <Film className="w-3.5 h-3.5" /> Video Portfolio
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSection === "projects" ? (
          <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none -mx-1 px-1">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeFilter === f
                      ? "gradient-bg text-primary-foreground"
                      : "glass text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Project Cards */}
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-3 mt-3 pb-24">
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardAnim}
                    layout
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
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="videos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0 bg-black"
          >
            <div
              className="w-full h-full snap-y snap-mandatory overflow-y-auto scrollbar-none"
            >
              {videoPortfolio.map((video, index) => (
                <div
                  key={video.id}
                  ref={(el) => (videoRefs.current[index] = el)}
                  data-index={index}
                  className="w-full h-[100dvh] snap-center snap-always relative"
                >
                  <ReelCard video={video} isActive={activeVideoIndex === index} />
                </div>
              ))}

              {/* Spacer at bottom to ensure last video snaps correctly without being covered by browser chrome if any */}
              <div className="h-1 w-full snap-align-none" />
            </div>

            {/* Gradient fade at bottom for smooth transition to nav - only needed if nav is overlaying */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
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
    </div>
  );
};

export default WorkPage;
