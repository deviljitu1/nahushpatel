import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Wrench, ArrowUpRight, Play, Pause, Heart, MessageCircle, Send, Music2, Film, Video, CheckCircle2, ArrowLeft, ArrowUp, ArrowDown, Code2, ExternalLink, Globe, X, Bookmark } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

const filters = ["All", "Social Media", "SEO", "Web Dev", "Automation"];

// Real web development projects from nahushpatel.in
const webDevProjects = [
  {
    id: 1,
    title: "Project Kisan",
    badge: "🏆 Hackathon",
    status: "In Progress",
    description: "An AI-powered farming assistant built for Google Hackathon 2025. Assists farmers with soil analysis, irrigation advice, crop planning, and organic solutions using Gemini AI.",
    tags: ["React", "Gemini AI", "Vercel"],
    color: "from-green-500 to-emerald-700",
    link: "https://project-kisan-ai-farming-assistant-fawn.vercel.app/",
    coverImage: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "LinkPost AI",
    badge: "🤖 AI Tool",
    status: "Live",
    description: "An AI-powered LinkedIn post generator built with React and OpenAI/Gemini API. Helps craft engaging, SEO-optimized posts with just a click.",
    tags: ["React", "OpenAI", "Netlify"],
    color: "from-blue-500 to-indigo-700",
    link: "https://linkpostai.netlify.app/",
    coverImage: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Tindog",
    badge: "🐶 Landing Page",
    status: "Live",
    description: "A responsive Tinder-like landing page for dogs, built with Bootstrap 5. Features responsive navigation, pricing cards, and testimonial sections.",
    tags: ["HTML", "CSS", "Bootstrap 5"],
    color: "from-amber-500 to-orange-600",
    link: "https://deviljitu1.github.io/Tindog/",
    coverImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Personal Portfolio",
    badge: "🌐 Portfolio",
    status: "Live",
    description: "A responsive personal portfolio website showcasing projects, skills and experience. Built with modern web technologies and optimized for performance.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "from-purple-500 to-violet-700",
    link: "https://nahushpatel.in/",
    coverImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Poetree",
    badge: "✍️ Blog",
    status: "Live",
    description: "A minimalist poetry blog with elegant typography and smooth animations. Built with HTML, CSS and JavaScript for a serene reading experience.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "from-rose-400 to-pink-600",
    link: "https://poetreebird.netlify.app/",
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Calm Mind AI",
    badge: "🧠 Wellness",
    status: "Live",
    description: "An AI-powered mental wellness web app designed to help emotionally vulnerable individuals with guided support, breathing exercises, and curated resources.",
    tags: ["React", "AI", "Netlify"],
    color: "from-teal-400 to-cyan-600",
    link: "https://calmmindai.netlify.app/",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
  },
];

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
    tools: ["n8n", "WhatsApp API", "Google Sheets", "Google Looker Studio"],
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

// Demo comments data per video
const demoComments: Record<number, Array<{ user: string; avatar: string; text: string; time: string; likes: number }>> = {
  1: [
    { user: "priya.sharma", avatar: "PS", text: "The slow-mo on this is insane! 🔥", time: "2h", likes: 24 },
    { user: "rahul_creates", avatar: "RC", text: "What camera did you use for this?", time: "5h", likes: 12 },
    { user: "foodie.vibes", avatar: "FV", text: "This made me hungry ngl 😂", time: "1d", likes: 45 },
    { user: "cinematic.ak", avatar: "CA", text: "Color grading is top notch 👏", time: "1d", likes: 8 },
  ],
  2: [
    { user: "mumbai_diaries", avatar: "MD", text: "This captures the city perfectly!", time: "3h", likes: 67 },
    { user: "avi.filmmaker", avatar: "AF", text: "Transitions are so smooth brother 🤝", time: "8h", likes: 31 },
    { user: "deepa.clicks", avatar: "DC", text: "Love the sound design on this one", time: "1d", likes: 19 },
  ],
  3: [
    { user: "aesthetics.co", avatar: "AC", text: "Autumn vibes are unreal 🍂✨", time: "4h", likes: 52 },
    { user: "travel.with.me", avatar: "TW", text: "Where was this shot?", time: "12h", likes: 15 },
  ],
  4: [
    { user: "photo.raj", avatar: "PR", text: "Golden hour hits different in your edits", time: "1h", likes: 89 },
    { user: "sunset.lover", avatar: "SL", text: "This is wallpaper worthy! 📱", time: "6h", likes: 34 },
    { user: "creative.mind", avatar: "CM", text: "Tutorial please! 🙏", time: "2d", likes: 27 },
  ],
  5: [
    { user: "hindi.culture", avatar: "HC", text: "Beautifully captured our heritage 🇮🇳", time: "30m", likes: 156 },
    { user: "doc.films", avatar: "DF", text: "This deserves way more views", time: "2h", likes: 98 },
    { user: "ritu.patel", avatar: "RP", text: "Brought tears to my eyes ❤️", time: "5h", likes: 73 },
    { user: "arjun.stories", avatar: "AS", text: "Share BTS please!", time: "1d", likes: 41 },
    { user: "india.proud", avatar: "IP", text: "Shared this with my whole family", time: "1d", likes: 62 },
  ],
  6: [
    { user: "film.school", avatar: "FS", text: "Production value is insane 🎬", time: "1h", likes: 201 },
    { user: "vfx.master", avatar: "VM", text: "VFX breakdown when?", time: "4h", likes: 87 },
    { user: "director.sanjay", avatar: "DS", text: "Let's collaborate!", time: "8h", likes: 44 },
  ],
  7: [
    { user: "brand.guru", avatar: "BG", text: "Short but impactful 💯", time: "2h", likes: 18 },
    { user: "social.media.pro", avatar: "SM", text: "Perfect for reels format", time: "6h", likes: 11 },
  ],
  8: [
    { user: "reel.queen", avatar: "RQ", text: "The pacing is *chefs kiss* 👨‍🍳", time: "45m", likes: 76 },
    { user: "mobile.films", avatar: "MF", text: "Vertical cinema done right!", time: "3h", likes: 54 },
    { user: "content.king", avatar: "CK", text: "Saved for inspiration 🔖", time: "1d", likes: 39 },
  ],
  9: [
    { user: "widescreen.fan", avatar: "WF", text: "This needs to be on a big screen", time: "1h", likes: 112 },
    { user: "cinema.lover", avatar: "CL", text: "Reminds me of Deakins' work", time: "5h", likes: 68 },
  ],
};

const videoPortfolio = [
  {
    id: 1,
    title: "Art of the Whisk",
    category: "Commercial",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344608/Whisk_qty2idzlzmzkvgzz0iy3itytmznlrtl2ugn30iy_zhzkzd.mp4",
    creator: "@nahushpatel",
    description: "A high-speed culinary motion study focusing on textures and movement. 🍳",
    likes: 3200,
    comments: 245,
    shares: 1100,
    aspectRatio: "16:9",
  },
  {
    id: 2,
    title: "Urban Rhythms",
    category: "Scene",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344582/_scene_1_202511111742_sh8fv_srx10l.mp4",
    creator: "@nahushpatel",
    description: "Capturing the essence of city life through dynamic transitions and sound design. 🏙️",
    likes: 4500,
    comments: 312,
    shares: 890,
    aspectRatio: "16:9",
  },
  {
    id: 3,
    title: "November Hues",
    category: "Lifestyle",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344554/Nov_17__1228_15s_202511171254_32z0y_oqrmxq.mp4",
    creator: "@nahushpatel",
    description: "A seasonal lifestyle edit with warm tones and cinematic grading. 🍂",
    likes: 2800,
    comments: 156,
    shares: 432,
    aspectRatio: "16:9",
  },
  {
    id: 4,
    title: "Golden Hour Story",
    category: "Cinematic",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344538/Nov_14__1433_29s_202511141457_ho8je_yimvk9.mp4",
    creator: "@nahushpatel",
    description: "Exploring light and shadow during the most magical hour of the day. ☀️",
    likes: 5100,
    comments: 423,
    shares: 1200,
    aspectRatio: "16:9",
  },
  {
    id: 5,
    title: "Cultural Narratives",
    category: "Documentary",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344516/Hindi_sdkg1s.mp4",
    creator: "@nahushpatel",
    description: "A vertical documentary piece exploring Hindi cultural expressions. 🇮🇳",
    likes: 8900,
    comments: 1100,
    shares: 3400,
    aspectRatio: "9:16",
  },
  {
    id: 6,
    title: "Masterpiece Production",
    category: "Film",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344504/1_npwj0g.mp4",
    creator: "@nahushpatel",
    description: "Full-scale production showcase with high-end camera work and VFX. 🎥",
    likes: 12000,
    comments: 2400,
    shares: 5600,
    aspectRatio: "16:9",
  },
  {
    id: 7,
    title: "Quick Branding Snap",
    category: "Social",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344468/_duration_8s_202511170013_dbx1h_n7ypbj.mp4",
    creator: "@nahushpatel",
    description: "Short-form content designed for maximum engagement in under 10 seconds. ⚡",
    likes: 1500,
    comments: 89,
    shares: 267,
    aspectRatio: "16:9",
  },
  {
    id: 8,
    title: "Cinematic Vertical",
    category: "Reel",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344453/_description_cinematic_202512082302_8oaa_k4drmr.mp4",
    creator: "@nahushpatel",
    description: "Premium cinematic storytelling optimized for mobile scrolling. ✨",
    likes: 6700,
    comments: 534,
    shares: 1800,
    aspectRatio: "9:16",
  },
  {
    id: 9,
    title: "Widescreen Vision",
    category: "Showcase",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344437/_description_cinematic_202511170019_ltn6_paqx05.mp4",
    creator: "@nahushpatel",
    description: "Cinematic wide-ratio showcase for high-resolution displays. 🎞️",
    likes: 9200,
    comments: 890,
    shares: 2100,
    aspectRatio: "16:9",
  },
];

const formatCount = (n: number): string => {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
};

const ReelCard = ({ video, isActive, onEnded }: { video: (typeof videoPortfolio)[number]; isActive: boolean; onEnded?: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const blurVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [showMore, setShowMore] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(demoComments[video.id] || []);
  const [newComment, setNewComment] = useState("");
  const [shareCount, setShareCount] = useState(video.shares);

  useEffect(() => {
    if (isActive) {
      const playPromise = videoRef.current?.play();
      const blurPlayPromise = blurVideoRef.current?.play();

      playPromise?.then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.error("Autoplay failed:", e);
        setIsPlaying(false);
      });

      blurPlayPromise?.catch(e => console.log("Blur autoplay silent fail"));
    } else {
      videoRef.current?.pause();
      blurVideoRef.current?.pause();
      setIsPlaying(false);
      setShowComments(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      blurVideoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(console.error);
      blurVideoRef.current?.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: video.title,
      text: `Check out "${video.title}" by ${video.creator}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareCount(prev => prev + 1);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareCount(prev => prev + 1);
        // Brief visual feedback handled by count change
      }
    } catch (err) {
      // User cancelled share
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment = {
      user: "you",
      avatar: "YO",
      text: newComment.trim(),
      time: "now",
      likes: 0,
    };
    setComments(prev => [comment, ...prev]);
    setNewComment("");
  };

  return (
    <div className="relative w-full h-[100dvh] md:h-full snap-start shrink-0 flex items-center justify-center bg-black overflow-hidden text-white">
      {/* Background Blur for 16:9 videos */}
      {video.aspectRatio === "16:9" && (
        <div className="absolute inset-0 z-0 opacity-40 scale-110 pointer-events-none">
          <video
            ref={blurVideoRef}
            src={video.videoUrl}
            className="w-full h-full object-cover blur-[60px]"
            loop
            muted
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}
      {/* Video */}
      <div
        className="relative w-full h-full z-10 overflow-hidden cursor-pointer flex items-center justify-center"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          className={`max-w-full max-h-full transition-all duration-700 ${video.aspectRatio === "9:16" ? "h-full w-full object-cover" : "aspect-video h-auto w-full object-contain"}`}
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

        {/* Play/Pause overlay */}
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

        {/* Right side actions */}
        <div className="absolute right-4 bottom-32 md:bottom-24 z-10 flex flex-col items-center gap-6">
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-1 group"
          >
            <motion.div
              whileTap={{ scale: 1.3 }}
              className="p-2 rounded-full bg-black/20 backdrop-blur-sm transition-transform"
            >
              <Heart
                className={`w-7 h-7 transition-all duration-300 ${isLiked
                  ? "text-red-500 fill-red-500 scale-110"
                  : "text-white"
                  }`}
              />
            </motion.div>
            <span className="text-xs text-white font-medium drop-shadow-md">
              {formatCount(likeCount)}
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowComments(true);
              if (isPlaying) {
                videoRef.current?.pause();
                blurVideoRef.current?.pause();
                setIsPlaying(false);
              }
            }}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm group-active:scale-90 transition-transform">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs text-white font-medium drop-shadow-md">
              {formatCount(comments.length > (demoComments[video.id]?.length || 0) ? video.comments + (comments.length - (demoComments[video.id]?.length || 0)) : video.comments)}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm group-active:scale-90 transition-transform">
              <Send className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-white font-medium drop-shadow-md">
              {formatCount(shareCount)}
            </span>
          </button>
        </div>

        {/* Bottom info overlay */}
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

      {/* Comments Drawer */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 z-30 bg-zinc-900/95 backdrop-blur-xl rounded-t-3xl max-h-[65%] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-white/30" />
            </div>
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-3 border-b border-white/10">
              <h4 className="text-sm font-bold text-white">{formatCount(comments.length > (demoComments[video.id]?.length || 0) ? video.comments + (comments.length - (demoComments[video.id]?.length || 0)) : video.comments)} Comments</h4>
              <button
                onClick={() => setShowComments(false)}
                className="text-white/60 hover:text-white text-xs font-medium"
              >
                ✕
              </button>
            </div>

            {/* Comments list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {comments.map((comment, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-white">{comment.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">{comment.user}</span>
                      <span className="text-[10px] text-white/40">{comment.time}</span>
                    </div>
                    <p className="text-xs text-white/80 mt-0.5 leading-relaxed">{comment.text}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <button className="text-[10px] text-white/40 hover:text-white/70 flex items-center gap-1">
                        <Heart className="w-3 h-3" /> {comment.likes > 0 && comment.likes}
                      </button>
                      <button className="text-[10px] text-white/40 hover:text-white/70">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add comment */}
            <form onSubmit={handleAddComment} className="px-4 py-3 border-t border-white/10 flex gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-white">YO</span>
              </div>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-white/10 rounded-full px-4 py-2 text-xs text-white placeholder:text-white/40 outline-none focus:bg-white/15 transition-colors"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="text-primary font-bold text-xs disabled:opacity-30 transition-opacity"
              >
                Post
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

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



// SeasonBackground removed — was unused and added unnecessary complexity

const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [socialSubTab, setSocialSubTab] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [selectedCreative, setSelectedCreative] = useState<(typeof creativeItems)[number] | null>(null);
  const [creativeMode, setCreativeMode] = useState<"wall" | "carousel">("wall");
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isAutoScrolling = useRef(false);

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.tags.includes(activeFilter));

  const scrollToIndex = (index: number) => {
    setActiveVideoIndex(index);
  };

  // Auto-scroll effect when index changes programmatically
  useEffect(() => {
    if (containerRef.current && activeFilter === 'Social Media' && socialSubTab === 'Video Portfolio') {
      const child = containerRef.current.children[activeVideoIndex] as HTMLElement;
      if (child) {
        isAutoScrolling.current = true;
        child.scrollIntoView({ behavior: 'smooth' });

        const timeout = setTimeout(() => {
          isAutoScrolling.current = false;
        }, 800);
        return () => clearTimeout(timeout);
      }
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

  // Mouse wheel navigation for reels on desktop
  useEffect(() => {
    const wheelCooldown = { blocked: false };

    const handleWheel = (e: WheelEvent) => {
      if (!(activeFilter === 'Social Media' && socialSubTab === 'Video Portfolio')) return;

      // Ignore tiny trackpad momentum / micro-scrolls
      if (Math.abs(e.deltaY) < 50) return;
      if (wheelCooldown.blocked) return;

      e.preventDefault();
      wheelCooldown.blocked = true;
      // Long enough for the scroll animation to finish before allowing next reel
      setTimeout(() => { wheelCooldown.blocked = false; }, 900);

      if (e.deltaY > 0) {
        scrollToIndex(Math.min(activeVideoIndex + 1, videoPortfolio.length - 1));
      } else {
        scrollToIndex(Math.max(activeVideoIndex - 1, 0));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeFilter, socialSubTab, activeVideoIndex]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isAutoScrolling.current) return;

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



  const isFullscreen = activeFilter === 'Social Media' && (socialSubTab === 'Video Portfolio' || socialSubTab === 'Creatives' || socialSubTab === 'Paid Ads');

  return (
    <div className={`relative mx-auto ${isFullscreen ? 'px-0 max-w-lg lg:max-w-6xl md:h-[calc(100dvh-6rem)] h-[100dvh] flex flex-col' : 'px-6 max-w-lg lg:max-w-4xl min-h-screen pt-4'}`}>

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
                className="text-3xl font-bold mb-1 tracking-tight"
              >
                My <span className="gradient-text">Work</span>
              </motion.h1>
              <p className="text-sm mb-8 text-muted-foreground">Case studies & creative work</p>
            </>
          )}

          {/* Main Filter Navigation */}
          <div className={`flex gap-3 overflow-x-auto pb-2 scrollbar-none ${!isFullscreen ? '-mx-1 px-1 lg:justify-center' : ''}`}>
            {!isFullscreen && filters.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all border border-b-[3px] active:border-b-0 active:translate-y-[3px] whitespace-nowrap ${activeFilter === tag
                  ? "bg-transparent text-primary border-primary/20 shadow-none ring-2 ring-primary/10"
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

          </div>

          {/* Top Right Navigation for Fullscreen Modes */}
          {isFullscreen && createPortal(
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 right-4 z-[9999] flex gap-2"
            >
              {['Video Portfolio', 'Creatives', 'Paid Ads'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSocialSubTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold backdrop-blur-md border transition-all shadow-lg ${socialSubTab === tab
                    ? 'bg-white text-black border-white scale-105'
                    : 'bg-black/40 text-white/70 border-white/10 hover:bg-black/60 hover:text-white'
                    }`}
                >
                  {tab === 'Video Portfolio' ? 'Reels' : tab === 'Paid Ads' ? 'Ads' : tab}
                </button>
              ))}
            </motion.div>,
            document.body
          )}


          {/* Social Media Sub-Tabs (Only visible if Social Media is active and NOT fullscreen video, or overlaid?) 
               Actually, if we want them to switch between All/Video/Creative, we should show this bar.
           */}
          {activeFilter === 'Social Media' && !isFullscreen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex gap-2 justify-center"
            >
              {['All', 'Video Portfolio', 'Creatives', 'Paid Ads'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSocialSubTab(sub)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all border shadow-sm ${socialSubTab === sub
                    ? 'bg-primary text-primary-foreground border-primary scale-105 shadow-md'
                    : 'bg-white/80 dark:bg-slate-800/80 text-muted-foreground border-transparent hover:bg-slate-100 dark:hover:bg-slate-700'}`}
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
        {(!isFullscreen) && activeFilter !== "Web Dev" && (
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
                  className="group soft-card overflow-hidden cursor-pointer !p-0"
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
            <div className="text-center mb-12 mt-12 pointer-events-none">
              <h2 className="text-2xl font-serif font-bold text-foreground">
                Welcome to My <span className="italic text-primary">Gallery</span>
              </h2>
              <p className="text-xs text-muted-foreground font-light tracking-wide mt-1">A curation of visual experiments</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-16 px-4 max-w-4xl mx-auto">
              {creativeItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedCreative(item)}
                >
                  {/* Hanging String */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-slate-300 dark:bg-slate-700 z-0" />
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 shadow-sm z-0" />

                  {/* Frame */}
                  <div className="bg-white p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-1 relative z-10">
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover filter contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="mt-3 text-center">
                      <h3 className="text-[10px] font-serif font-bold truncate px-1 text-black tracking-tight">{item.title}</h3>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        {/* VIEW 4: PAID ADS */}
        {activeFilter === "Social Media" && socialSubTab === "Paid Ads" && (
          <motion.div
            key="paid-ads"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-24 pt-20 px-2 flex-1 overflow-y-auto"
          >
            <div className="text-center mb-10 w-full max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-2">Ad <span className="gradient-text">Campaigns</span></h2>
              <p className="text-sm text-muted-foreground">High-converting creatives & strategic funnels.</p>
            </div>

            <div className="grid gap-12 max-w-5xl mx-auto pb-12">
              {[
                {
                  id: 1,
                  title: "DTC Fashion Brand Scale",
                  result: "4.5x ROAS",
                  strategy: "Full-funnel Meta Ads strategy. We used UGC creatives for top-of-funnel awareness and dynamic product ads for retargeting.",
                  images: [
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop"
                  ],
                  stats: { spend: "$5k", revenue: "$22.5k", cpa: "$12" }
                },
                {
                  id: 2,
                  title: "Webinar Lead Gen",
                  result: "800+ Signups",
                  strategy: "YouTube & LinkedIn Ads targeting B2B decision makers. Direct response copy focused on pain points.",
                  images: [
                    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop"
                  ],
                  stats: { spend: "$2k", leads: "842", cpl: "$2.37" }
                }
              ].map((campaign) => (
                <div key={campaign.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{campaign.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 max-w-lg">{campaign.strategy}</p>
                    </div>
                    <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl font-bold text-sm border border-green-200 dark:border-green-900/50 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> {campaign.result}
                    </div>
                  </div>

                  {/* Screenshots Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {campaign.images.map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-video relative group">
                        <img src={img} alt="Ad Creative" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs font-bold text-white border border-white/30 px-3 py-1 rounded-full backdrop-blur-md">View Creative</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stats Footer */}
                  <div className="flex gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {Object.entries(campaign.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">{key}</div>
                        <div className="text-lg font-mono font-bold text-foreground">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW 5: WEB DEVELOPMENT PROJECTS */}
        {activeFilter === "Web Dev" && (
          <motion.div
            key="web-dev"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pb-24"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-1">
                Web <span className="gradient-text">Development</span>
              </h2>
              <p className="text-sm text-muted-foreground">Live projects built with modern web technologies.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {webDevProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group soft-card overflow-hidden cursor-pointer !p-0"
                >
                  {/* Cover Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* Status badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20 text-white ${project.status === 'In Progress'
                        ? 'bg-amber-500/50'
                        : 'bg-green-500/50'
                        }`}>
                        {project.status === 'In Progress' ? '⚡ In Progress' : '✅ Live'}
                      </span>
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-[10px] font-semibold text-white/70 mb-0.5">{project.badge}</div>
                      <h3 className="font-bold text-lg text-white leading-tight">{project.title}</h3>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View project link */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-xs font-bold text-primary hover:underline group/link"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      View Live Project
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-white dark:bg-slate-900 border-none text-foreground max-w-lg lg:max-w-2xl mx-auto p-0 overflow-hidden shadow-2xl rounded-3xl">
          {selectedProject && (
            <>
              <div className="relative h-64 overflow-hidden">
                <img src={selectedProject.coverImage} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <div className="flex gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
                <div className="flex items-center gap-3 mb-6 bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100 dark:border-green-900/30">
                  <div className="p-2 bg-green-500 rounded-full text-white">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-green-600 dark:text-green-400 tracking-wider">Key Result</span>
                    <span className="text-lg font-bold text-foreground">{selectedProject.result}</span>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 mb-8">
                  <div>
                    <h3 className="font-bold text-sm text-foreground mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-primary rounded-full" /> Problem
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.problem}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-green-500 rounded-full" /> Solution
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.solution}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-sm text-foreground mb-3">Tech Stack & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map(tool => (
                      <span key={tool} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium text-muted-foreground">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                  {selectedProject.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                      <div className="text-[10px] uppercase font-bold text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
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
      {/* Floating Back Button for Mobile Accessibility */}
      {/* Floating Back Button for Mobile Accessibility */}
      {isFullscreen && createPortal(
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => setSocialSubTab('All')}
          className="fixed bottom-20 right-4 z-[9999] px-5 py-3 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 text-xs font-bold shadow-2xl flex items-center gap-2 hover:bg-black/70 transition-all active:scale-95"
          style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }} // Ensure visibility on iOS
        >
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </motion.button>,
        document.body
      )}
    </div>
  );
};

export default WorkPage;
