import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Wrench, ArrowUpRight, Play, Pause, Heart, MessageCircle, Send, Music2, Film, Video } from "lucide-react";
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

const ReelCard = ({ video }: { video: (typeof videoPortfolio)[number] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showMore, setShowMore] = useState(false);

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
    <div className="relative w-full snap-start" style={{ height: "calc(100vh - 140px)" }}>
      {/* Video */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden bg-secondary/30 cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="metadata"
        />

        {/* Play/Pause overlay */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-background/20"
            >
              <div className="w-16 h-16 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-8 h-8 text-primary-foreground fill-primary-foreground ml-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary/80 text-primary-foreground font-medium backdrop-blur-sm">
            {video.category}
          </span>
        </div>

        {/* Right side actions (Instagram style) */}
        <div className="absolute right-3 bottom-28 z-10 flex flex-col items-center gap-5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="flex flex-col items-center gap-1"
          >
            <Heart
              className={`w-7 h-7 transition-all ${
                isLiked
                  ? "text-red-500 fill-red-500 scale-110"
                  : "text-primary-foreground drop-shadow-lg"
              }`}
            />
            <span className="text-[11px] text-primary-foreground font-semibold drop-shadow-lg">
              {video.likes}
            </span>
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-1"
          >
            <MessageCircle className="w-7 h-7 text-primary-foreground drop-shadow-lg" />
            <span className="text-[11px] text-primary-foreground font-semibold drop-shadow-lg">
              {video.comments}
            </span>
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-1"
          >
            <Send className="w-6 h-6 text-primary-foreground drop-shadow-lg" />
            <span className="text-[11px] text-primary-foreground font-semibold drop-shadow-lg">
              {video.shares}
            </span>
          </button>
        </div>

        {/* Bottom info overlay (Instagram style) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-background/90 via-background/50 to-transparent">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">Y</span>
            </div>
            <span className="text-sm font-semibold text-primary-foreground drop-shadow-lg">
              {video.creator}
            </span>
          </div>
          <h3 className="text-sm font-bold text-primary-foreground drop-shadow-lg mb-1">
            {video.title}
          </h3>
          <p
            className={`text-xs text-primary-foreground/80 drop-shadow-lg leading-relaxed ${
              !showMore ? "line-clamp-2" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setShowMore(!showMore);
            }}
          >
            {video.description}
            {!showMore && (
              <span className="text-primary-foreground font-semibold ml-1 cursor-pointer">
                more
              </span>
            )}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-primary-foreground/60">
            <Music2 className="w-3 h-3" />
            <span className="text-[10px]">Original Audio</span>
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

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <div className="px-5 pt-14 max-w-lg mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-1"
      >
        My <span className="gradient-text">Work</span>
      </motion.h1>
      <p className="text-sm text-muted-foreground mb-4">Case studies & creative work</p>

      {/* Section Toggle: Projects vs Video Portfolio */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveSection("projects")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSection === "projects"
              ? "gradient-bg text-primary-foreground"
              : "glass text-muted-foreground hover:text-foreground"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" /> Projects
        </button>
        <button
          onClick={() => setActiveSection("videos")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSection === "videos"
              ? "gradient-bg text-primary-foreground"
              : "glass text-muted-foreground hover:text-foreground"
          }`}
        >
          <Film className="w-3.5 h-3.5" /> Video Portfolio
        </button>
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
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeFilter === f
                      ? "gradient-bg text-primary-foreground"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Project Cards */}
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-3 mt-3">
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
          <motion.div key="videos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
              <Video className="w-3.5 h-3.5" /> Swipe through reels — tap to play
            </p>
            <div
              className="flex flex-col gap-4 snap-y snap-mandatory overflow-y-auto scrollbar-none -mx-5 px-5"
              style={{ height: "calc(100vh - 220px)" }}
            >
              {videoPortfolio.map((video) => (
                <ReelCard key={video.id} video={video} />
              ))}
            </div>
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
