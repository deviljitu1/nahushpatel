import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, ArrowUpRight, Play, Heart, MessageCircle, Share2, 
  Video, ExternalLink, Globe, X, Sparkles, Megaphone, Youtube, 
  Instagram, Maximize2, Send, ChevronLeft, ChevronRight, BarChart3, Code2,
  ArrowUp, ArrowDown, Lightbulb, Target, ShieldCheck, CheckCircle2, Image as ImageIcon
} from "lucide-react";

import { formatCount } from "@/lib/utils";

/* ─── Shared UI Components ─── */

const SimpleDialog = ({ open, onOpenChange, children, className }: any) => {
  if (typeof window === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className={`fixed inset-0 z-[201] flex items-center justify-center pointer-events-none p-4 sm:p-8 md:p-12`}
          >
            {/* Global Close Button */}
            <button
               onClick={() => onOpenChange(false)}
               className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[210] pointer-events-auto p-2.5 sm:p-3 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all active:scale-90"
               aria-label="Close dialog"
            >
               <X className="w-5 h-5 sm:w-6 h-6" />
            </button>
            <div className={`relative pointer-events-auto max-w-full max-h-full flex flex-col outline-none overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl ${className || ""}`}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

const ActionButton = ({ icon: Icon, label, onClick, isActive = false, activeColor = "" }: any) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1.5 group">
    <motion.div 
      whileTap={{ scale: 0.85 }}
      className={`p-3.5 rounded-full transition-all duration-300 backdrop-blur-md border outline-none
        ${isActive ? `bg-primary/20 border-primary/40` : `bg-black/20 border-white/10 hover:bg-white/10 hover:border-white/20`}`}
    >
      <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? activeColor : "text-white/60 group-hover:text-white"}`} />
    </motion.div>
    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{label}</span>
  </button>
);

import { 
  videoPortfolio, 
  creativeItems, 
  adCampaigns, 
  webDevProjects, 
  seoProjects, 
  automationProjects, 
  categories 
} from "@/data/portfolioData";

/* ─── Reel Fullscreen Component ─── */

const ReelFullscreenPlayer = ({ initialIndex, onClose }: any) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: any) => {
    const index = Math.round(e.currentTarget.scrollTop / e.currentTarget.clientHeight);
    if (!isNaN(index) && index !== activeIndex) setActiveIndex(index);
  };

  const scrollToIndex = useCallback((index: any) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({ top: index * containerRef.current.clientHeight, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "ArrowDown") { e.preventDefault(); scrollToIndex(Math.min(activeIndex + 1, videoPortfolio.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); scrollToIndex(Math.max(activeIndex - 1, 0)); }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollToIndex, onClose]);

  useEffect(() => {
    if(containerRef.current && initialIndex > 0) {
        containerRef.current.scrollTop = initialIndex * containerRef.current.clientHeight;
    }
  }, [initialIndex]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] bg-[#0a0b10] text-foreground flex justify-center overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute inset-0 z-0 hidden lg:block overflow-hidden pointer-events-none">
         <div className="absolute inset-0 bg-[#0a0b10]/90 backdrop-blur-3xl z-[1]" />
         <video src={videoPortfolio[activeIndex]?.videoUrl} className="w-full h-full object-cover blur-[140px] opacity-40 scale-125" loop muted autoPlay playsInline />
      </div>

      <button 
        onClick={onClose} 
        className="absolute top-6 left-6 sm:top-8 sm:left-8 z-[1050] flex items-center gap-2 group px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-2xl border border-white/20 rounded-2xl transition-all text-white shadow-2xl active:scale-95"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-black uppercase tracking-widest">Back</span>
      </button>

      <div ref={containerRef} onScroll={handleScroll} className="h-[100dvh] w-full max-w-[420px] overflow-y-scroll snap-y snap-mandatory scrollbar-none z-10 relative bg-black shadow-[0_0_120px_rgba(0,0,0,1)]">
        {videoPortfolio.map((video, i) => (
          <ReelSlide key={video.id} video={video} isActive={i === activeIndex} onEnded={() => scrollToIndex(i < videoPortfolio.length - 1 ? i + 1 : 0)} />
        ))}
      </div>

      <div className="hidden lg:flex fixed right-12 top-1/2 -translate-y-1/2 flex-col gap-8 z-[1050]">
        <button 
          onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))} 
          disabled={activeIndex === 0} 
          className="p-6 rounded-[2rem] bg-white/10 hover:bg-white/20 disabled:opacity-20 backdrop-blur-3xl border border-white/20 transition-all text-white shadow-[0_16px_48px_rgba(0,0,0,0.5)] group"
        >
          <ArrowUp className="w-8 h-8 group-hover:-translate-y-1.5 transition-all" />
        </button>
        <button 
          onClick={() => scrollToIndex(Math.min(activeIndex + 1, videoPortfolio.length - 1))} 
          disabled={activeIndex === videoPortfolio.length - 1} 
          className="p-6 rounded-[2rem] bg-white/10 hover:bg-white/20 disabled:opacity-20 backdrop-blur-3xl border border-white/20 transition-all text-white shadow-[0_16px_48px_rgba(0,0,0,0.5)] group"
        >
          <ArrowDown className="w-8 h-8 group-hover:translate-y-1.5 transition-all" />
        </button>
      </div>
    </div>,
    document.body
  );
};

const ReelSlide = ({ video, isActive, onEnded }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      videoRef.current?.pause(); setIsPlaying(false); setShowComments(false);
    }
  }, [isActive]);

  return (
    <div className="relative w-full h-[100dvh] snap-start shrink-0 flex items-center justify-center text-white">
      <div className="relative h-full lg:h-[90vh] lg:rounded-[2.5rem] overflow-hidden w-full lg:max-w-[420px] bg-black shadow-[0_0_80px_rgba(0,0,0,0.6)] flex items-center group cursor-pointer" onClick={() => { if(isPlaying) videoRef.current?.pause(); else videoRef.current?.play(); setIsPlaying(!isPlaying); }}>
        
        <video ref={videoRef} src={video.videoUrl} className={`w-full ${video.aspectRatio === "9:16" ? "h-full object-cover" : "aspect-video object-contain"}`} loop={false} muted={false} playsInline onEnded={onEnded} onTimeUpdate={() => { if (videoRef.current) setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100) }} />

        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest z-10 text-white">
          {video.type === 'youtube' && <Youtube className="w-3.5 h-3.5 text-red-500" />}
          {video.type === 'instagram' && <Instagram className="w-3.5 h-3.5 text-pink-500" />}
          {video.category}
        </div>

        <AnimatePresence>
          {!isPlaying && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] pointer-events-none z-10">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Play className="w-8 h-8 text-white fill-white ml-1.5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Interaction Bar */}
        <div className="absolute right-3 bottom-[180px] z-20 flex flex-col items-center gap-5">
          <ActionButton icon={Heart} label={formatCount(video.likes + (isLiked?1:0))} onClick={(e: any) => { e.stopPropagation(); setIsLiked(!isLiked); }} isActive={isLiked} activeColor="text-primary fill-primary" />
          <ActionButton icon={MessageCircle} label={formatCount(video.comments)} onClick={(e: any) => { e.stopPropagation(); setShowComments(true); }} />
          <ActionButton icon={Share2} label={formatCount(video.shares)} onClick={(e: any) => { e.stopPropagation(); }} />
        </div>

        {/* Bottom Details */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pb-[100px] pt-24 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none text-white">
          <div className="pointer-events-auto max-w-[85%]">
            <h3 className="text-base font-black mb-1">{video.title}</h3>
            <p className="text-sm text-white/90 line-clamp-2 leading-relaxed">{video.description}</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
          <div className="h-full bg-primary transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(255,165,0,0.8)]" style={{ width: `${progress}%` }} />
        </div>
      </div>
      
      {/* Simple Slide-up Comments Mock */}
      <AnimatePresence>
        {showComments && (
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring" as const, damping: 25, stiffness: 300 }} className="absolute bottom-0 left-0 right-0 lg:left-1/2 lg:-translate-x-1/2 lg:w-[420px] h-[60vh] bg-card border-t border-border rounded-t-3xl z-50 flex flex-col p-6 text-foreground" onClick={(e) => e.stopPropagation()}>
               <div className="flex justify-between items-center mb-6">
                 <h4 className="font-bold">Comments ({video.comments})</h4>
                 <button onClick={() => setShowComments(false)} className="p-2 bg-muted rounded-full"><X className="w-4 h-4" /></button>
               </div>
               <div className="flex-1 overflow-y-auto space-y-4">
                  <p className="text-sm text-muted-foreground text-center mt-10">Comments preview mode.</p>
               </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── WorkPage Main Component ─── */

const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState("Social Media");
  const [socialSubTab, setSocialSubTab] = useState("Paid Ads");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [creativeGallery, setCreativeGallery] = useState<{ index: number } | null>(null);
  const [adGallery, setAdGallery] = useState<{ images: string[], index: number } | null>(null);
  const [activeReelIndex, setActiveReelIndex] = useState<any>(null); // null means grid view
  const [isScrolled, setIsScrolled] = useState(false);

  // Keyboard Navigation for Lightboxes & Galleries
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Creative Gallery Shortcuts (Left/Right arrow)
      if (creativeGallery !== null) {
        if (e.key === "ArrowRight") {
          setCreativeGallery({ index: (creativeGallery.index + 1) % creativeItems.length });
        } else if (e.key === "ArrowLeft") {
          setCreativeGallery({ index: (creativeGallery.index - 1 + creativeItems.length) % creativeItems.length });
        } else if (e.key === "Escape") {
          setCreativeGallery(null);
        }
      }

      // 2. Ad Campaign Gallery Shortcuts (Left/Right arrow)
      if (adGallery !== null) {
        if (e.key === "ArrowRight") {
          setAdGallery({ ...adGallery, index: (adGallery.index + 1) % adGallery.images.length });
        } else if (e.key === "ArrowLeft") {
          setAdGallery({ ...adGallery, index: (adGallery.index - 1 + adGallery.images.length) % adGallery.images.length });
        } else if (e.key === "Escape") {
          setAdGallery(null);
        }
      }

      // 3. Project Detail Modal Close (Escape)
      if (selectedProject !== null) {
        if (e.key === "Escape") setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [creativeGallery, adGallery, selectedProject]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 50);
  };

  const getProjects = () => {
    if (activeFilter === "Web Dev") return webDevProjects;
    if (activeFilter === "SEO") return seoProjects;
    if (activeFilter === "Automation") return automationProjects;
    return [];
  };

  return (
    <div onScroll={handleScroll} className="h-full w-full overflow-y-auto scrollbar-none bg-background text-foreground selection:bg-primary/20 font-sans pb-24 relative">
      
      {/* ─── Background Gradients ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      {/* ─── Header & Navigation ─── */}
      <header className={`sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 transition-all duration-300 ${isScrolled ? "pt-2 md:pt-3 pb-2 shadow-md" : "pt-6 pb-4"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          
          <div className="flex flex-col w-full transition-all duration-300">
            <div className={`flex items-center justify-between w-full transition-all duration-300 ${isScrolled ? "flex-row gap-2" : "flex-col md:flex-row gap-4 sm:gap-6"}`}>
              
              <AnimatePresence mode="popLayout">
                {!isScrolled ? (
                  <motion.div
                    key="title"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 w-full md:w-auto origin-left"
                  >
                    <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl lg:text-4xl font-bold tracking-tight mb-1 leading-tight">
                      My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Work</span>
                    </motion.h1>
                    <p className="text-sm text-muted-foreground font-medium">Digital experiences & campaigns</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="subnav-top"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex shrink-0 min-w-0"
                  >
                    {activeFilter === "Social Media" ? (
                      <div className="flex gap-1.5 sm:gap-2">
                        {["Video Portfolio", "Creatives", "Ads"].map((sub) => {
                          const internalSub = sub === "Ads" ? "Paid Ads" : sub;
                          const isActive = socialSubTab === internalSub;
                          return (
                            <button key={sub} onClick={() => setSocialSubTab(internalSub)} className={`flex items-center justify-center gap-1.5 transition-all border ${isScrolled ? "p-2 sm:px-3 sm:py-1.5 rounded-xl" : "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full"} ${isActive ? "bg-primary text-primary-foreground border-transparent shadow-[0_0_15px_rgba(var(--primary),0.3)]" : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"}`}>
                              {sub === "Video Portfolio" && <Video className="w-4 h-4 sm:w-3.5 sm:h-3.5" />}
                              {sub === "Creatives" && <Sparkles className="w-4 h-4 sm:w-3.5 sm:h-3.5" />}
                              {sub === "Ads" && <Megaphone className="w-4 h-4 sm:w-3.5 sm:h-3.5" />}
                              <span className={`text-[10px] sm:text-xs font-bold ${isScrolled ? "hidden md:inline-block" : "inline-block"}`}>{sub}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : <div />}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop Segmented Control */}
              <motion.div layout className={`flex p-1 bg-muted/50 backdrop-blur-md border border-border snap-x snap-mandatory ${isScrolled ? "rounded-[1rem] sm:rounded-2xl shrink-0 flex-nowrap" : "rounded-2xl w-full md:w-fit overflow-x-auto scrollbar-none"}`}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveFilter(cat); setSocialSubTab("Video Portfolio"); }}
                    className={`relative transition-all whitespace-nowrap snap-start shrink-0 flex items-center justify-center ${isScrolled ? "p-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl" : "px-3 sm:px-5 py-1.5 sm:py-2.5 text-[10px] sm:text-sm font-bold tracking-wide rounded-xl"} ${activeFilter === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"}`}
                  >
                    {activeFilter === cat && (
                      <motion.div layoutId="nav-pill" className={`absolute inset-0 bg-background shadow-sm border border-border/50 ${isScrolled ? "rounded-lg sm:rounded-xl" : "rounded-xl"}`} transition={{ type: "spring" as const, stiffness: 300, damping: 30 }} />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                      {cat === "Social Media" && <Youtube className={`text-red-500 ${isScrolled ? "w-4 h-4 sm:w-4 sm:h-4" : "w-3 h-3 md:w-4 md:h-4"}`} />}
                      {cat === "Web Dev" && <Code2 className={`text-blue-500 ${isScrolled ? "w-4 h-4 sm:w-4 sm:h-4" : "w-3 h-3 md:w-4 md:h-4"}`} />}
                      {cat === "SEO" && <TrendingUp className={`text-emerald-500 ${isScrolled ? "w-4 h-4 sm:w-4 sm:h-4" : "w-3 h-3 md:w-4 md:h-4"}`} />}
                      {cat === "Automation" && <Sparkles className={`text-amber-500 ${isScrolled ? "w-4 h-4 sm:w-4 sm:h-4" : "w-3 h-3 md:w-4 md:h-4"}`} />}
                      <span className={`text-[10px] sm:text-sm font-bold tracking-wide ${isScrolled ? "hidden lg:inline-block" : "inline-block"}`}>{cat}</span>
                    </span>
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Sub-tabs for Social Media (Bottom Row) */}
            <AnimatePresence>
              {!isScrolled && activeFilter === "Social Media" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: 16 }} exit={{ height: 0, opacity: 0, marginTop: 0 }} className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
                  {["Video Portfolio", "Creatives", "Ads"].map((sub) => {
                    const internalSub = sub === "Ads" ? "Paid Ads" : sub;
                    const isActive = socialSubTab === internalSub;
                    return (
                      <button key={sub} onClick={() => setSocialSubTab(internalSub)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${isActive ? "bg-primary text-primary-foreground border-transparent shadow-[0_0_20px_rgba(var(--primary),0.3)]" : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"}`}>
                        {sub === "Video Portfolio" && <Video className="w-3.5 h-3.5" />}
                        {sub === "Creatives" && <Sparkles className="w-3.5 h-3.5" />}
                        {sub === "Ads" && <Megaphone className="w-3.5 h-3.5" />}
                        {sub}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ─── Main Content Area ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8 relative z-10">
        <AnimatePresence mode="wait">

          {/* VIEW: VIDEO PORTFOLIO GRID */}
          {activeFilter === "Social Media" && socialSubTab === "Video Portfolio" && (
            <motion.div key="video-grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {videoPortfolio.map((video, index) => (
                  <motion.div 
                    key={video.id} 
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group relative aspect-[9/16] bg-card rounded-2xl overflow-hidden cursor-pointer border border-border/50 shadow-xl"
                    onClick={() => setActiveReelIndex(index)}
                  >
                    {/* Thumbnail video preview on hover */}
                    <video src={video.videoUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" preload="metadata" muted playsInline onMouseOver={e => (e.target as HTMLVideoElement).play()} onMouseOut={e => (e.target as HTMLVideoElement).pause()} />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                      <Play className="w-3 h-3 text-white fill-white" />
                      <span className="text-[10px] font-bold text-white tracking-widest">{formatCount(video.likes)}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 pointer-events-none text-white">
                      <span className="text-[9px] text-primary font-bold tracking-widest uppercase mb-1 block">{video.category}</span>
                      <h3 className="text-sm font-bold line-clamp-2 leading-tight">{video.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* VIEW: CREATIVES GALLERY */}
          {activeFilter === "Social Media" && socialSubTab === "Creatives" && (
            <motion.div key="creatives" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {creativeItems.map((item, i) => (
                <motion.div key={item.id} whileHover={{ scale: 1.02 }} className="group relative break-inside-avoid bg-card rounded-3xl overflow-hidden cursor-pointer border border-border/50" onClick={() => setCreativeGallery({ index: i })}>
                  <img src={item.image} alt={item.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                     <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{item.category}</span>
                     <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* VIEW: PAID ADS (Detailed Case Study Layout) */}
          {activeFilter === "Social Media" && socialSubTab === "Paid Ads" && (
            <motion.div key="ads" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col gap-6 w-full">
              {adCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-5 sm:p-8">
                  {/* Header */}
                  <div className="flex flex-col gap-4 mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-bold text-xs sm:text-sm border border-primary/20 w-fit">
                      <TrendingUp className="w-4 h-4" /> {campaign.highlightBadge}
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black text-foreground">{campaign.title}</h3>
                    <p className="text-sm sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">{campaign.subtitle}</p>
                  </div>

                  {/* Images Row */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {campaign.images.map((img, i) => (
                      <div key={i} onClick={() => setAdGallery({ images: campaign.images, index: i })} className="rounded-2xl overflow-hidden aspect-video border border-border/50 relative group cursor-pointer shadow-sm">
                         <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Ad Creative" />
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[10px] sm:text-xs font-bold text-white border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1"><Maximize2 className="w-3 h-3" /> View Ad</span>
                         </div>
                      </div>
                    ))}
                  </div>

                  {/* Strategy Description */}
                  <div className="mb-8 bg-card border border-border/50 rounded-2xl p-6 sm:p-8">
                    <p className="text-base sm:text-lg text-foreground leading-relaxed font-medium capitalize-first">
                      {campaign.strategy}
                    </p>
                  </div>

                  {/* 📊 Funnel Breakdown */}
                  <div className="flex flex-col gap-4 mb-8">
                     <div className="flex items-center gap-2 text-foreground/80 font-bold text-sm uppercase tracking-[0.2em] mb-2 px-2">
                        <BarChart3 className="w-4 h-4 text-primary" /> Funnel Breakdown
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {campaign.funnel.map((stage: any, idx: number) => {
                          const IconComp = { Globe, MessageCircle, TrendingUp }[stage.icon as "Globe" | "MessageCircle" | "TrendingUp"] || Globe;
                          return (
                            <div key={idx} className="relative p-6 bg-muted/30 rounded-3xl border border-border/50 group hover:border-primary/30 transition-all flex flex-col gap-4 overflow-hidden">
                               <div className={`absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity -mr-4 -mt-4`}>
                                  <IconComp className="w-24 h-24" />
                               </div>
                               <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-xl bg-background shadow-sm ${stage.color}`}>
                                     <IconComp className="w-5 h-5" />
                                  </div>
                                  <span className="font-bold text-sm text-foreground/90">{stage.stage}</span>
                               </div>
                               {stage.metrics ? (
                                  <div className="grid grid-cols-1 gap-3">
                                     {stage.metrics.map((m: any, i: number) => (
                                        <div key={i} className="flex flex-col">
                                           <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{m.label}</span>
                                           <span className="text-xl font-black text-foreground">{m.value}</span>
                                        </div>
                                     ))}
                                  </div>
                               ) : (
                                  <div className="flex flex-col gap-2">
                                     <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                           <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                        </span>
                                        <span className="text-[10px] uppercase font-bold text-rose-500 tracking-widest">{stage.status}</span>
                                     </div>
                                     <span className="text-xs text-muted-foreground leading-snug italic">"{stage.insight}"</span>
                                  </div>
                               )}
                            </div>
                          );
                        })}
                     </div>
                  </div>

                  {/* ➕ Additional Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-6 bg-primary/5 rounded-3xl border border-primary/10">
                    {campaign.additionalMetrics.map((m, i) => (
                      <div key={i} className="flex flex-col">
                         <span className="text-[10px] uppercase font-bold text-primary/60 tracking-widest mb-1">{m.label}</span>
                         <span className="text-xs sm:text-sm font-bold text-foreground/90">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    {/* Key Insight */}
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
                       <div className="flex items-center gap-2 text-primary font-bold text-lg">
                          <Lightbulb className="w-5 h-5 fill-primary/20" /> Key Insight
                       </div>
                       <p className="text-sm sm:text-base text-foreground leading-relaxed italic">"{campaign.keyInsight}"</p>
                    </div>

                    {/* Optimization Approach */}
                    <div className="bg-muted/30 border border-border/50 rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
                       <div className="flex items-center gap-2 text-foreground font-bold text-lg">
                          <Target className="w-5 h-5 text-accent" /> Optimization Approach
                       </div>
                       <ul className="flex flex-col gap-3">
                         {campaign.optimizationApproach.map((item, idx) => (
                           <li key={idx} className="flex items-start gap-3">
                             <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                             <span className="text-sm sm:text-base text-muted-foreground font-medium">{item}</span>
                           </li>
                         ))}
                       </ul>
                    </div>
                  </div>

                  {/* Campaign Proof Section */}
                  <div className="pt-8 border-t border-border/50">
                     <div className="flex items-center gap-2 mb-4 text-foreground font-bold text-xl">
                        <ShieldCheck className="w-6 h-6 text-emerald-500" /> Campaign Proof
                     </div>
                     <p className="text-sm text-muted-foreground mb-6 font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl inline-block w-fit">
                        {campaign.proofText}
                     </p>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {campaign.proofImages.map((img, idx) => (
                           <div key={idx} onClick={() => setAdGallery({ images: campaign.proofImages, index: idx })} className="rounded-xl overflow-hidden aspect-[4/3] border border-border/50 relative group cursor-pointer shadow-sm bg-muted flex items-center justify-center">
                              <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Campaign Proof ${idx + 1}`} />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <div className="flex flex-col items-center gap-2">
                                    <ImageIcon className="w-6 h-6 text-white/80" />
                                    <span className="text-xs font-bold text-white tracking-widest uppercase">View Proof</span>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                </div>
              ))}
            </motion.div>
          )}

          {/* VIEW: PROJECTS (Web Dev, SEO, Automation) */}
          {activeFilter !== "Social Media" && (
            <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
               {getProjects().map((project) => (
                 <motion.div 
                   key={project.id} 
                   whileHover={{ y: -5 }}
                   className="group relative bg-card border border-border/50 rounded-3xl overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                   onClick={() => setSelectedProject(project)}
                 >
                   <div className="aspect-[16/10] sm:aspect-[4/3] xl:aspect-[16/10] relative overflow-hidden">
                     <img src={project.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={project.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                     
                     <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                       <span className="px-2.5 sm:px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-white">
                         {project.status || project.result || project.badge}
                       </span>
                     </div>
                   </div>
                   
                   <div className="p-4 sm:p-6 relative z-10 -mt-6">
                     <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{project.title}</h3>
                     <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-4 sm:mb-6 leading-relaxed">{project.problem || project.description}</p>
                     
                     <div className="flex items-center justify-between mt-auto">
                       <div className="flex gap-2">
                         {project.tags.slice(0,2).map(tag => (
                           <span key={tag} className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md">{tag}</span>
                         ))}
                       </div>
                       <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary transition-colors">
                         <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
                       </div>
                     </div>
                   </div>
                 </motion.div>
               ))}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ─── Overlays & Modals ─── */}
      
      {/* 1. Fullscreen Reel Player */}
      {activeReelIndex !== null && (
        <ReelFullscreenPlayer initialIndex={activeReelIndex} onClose={() => setActiveReelIndex(null)} />
      )}

      {/* 2. Project Detail Modal */}
      <SimpleDialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)} className="flex flex-col bg-card border border-white/10 shadow-2xl p-0 w-[95vw] w-full md:w-auto md:min-w-[700px] max-w-3xl overflow-hidden">
        {selectedProject && (
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="relative h-48 md:h-64 shrink-0 overflow-hidden">
              <img src={selectedProject.coverImage} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <button onClick={() => setSelectedProject(null)} className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-1.5 md:p-2 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors">
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-8 md:right-8">
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2 md:mb-3 tracking-tight">{selectedProject.title}</h2>
                <div className="flex gap-1.5 md:gap-2 flex-wrap">
                  {selectedProject.tags.map((tag: any) => (
                    <span key={tag} className="px-2 py-0.5 md:px-3 md:py-1 bg-muted/80 backdrop-blur-md rounded-full text-[10px] md:text-xs font-bold text-muted-foreground border border-border">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 md:p-8 overflow-y-auto space-y-6 md:space-y-8 flex-1">
              {(selectedProject.result || selectedProject.status) && (
                <div className="flex items-center gap-4 bg-primary/10 p-5 rounded-2xl border border-primary/20">
                  <div className="p-3 bg-primary rounded-xl text-primary-foreground shadow-lg shadow-primary/30"><TrendingUp className="w-6 h-6" /></div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-primary tracking-widest mb-1">{selectedProject.result ? "Key Result" : "Status"}</span>
                    <span className="text-xl font-bold text-foreground">{selectedProject.result || selectedProject.status}</span>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> The Challenge
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{selectedProject.problem || selectedProject.description}</p>
                </div>
                {selectedProject.solution && (
                  <div>
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> The Solution
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{selectedProject.solution}</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">Tech & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {(selectedProject.tools || selectedProject.tags).map((tool: any) => (
                    <span key={tool} className="px-4 py-2 bg-muted rounded-xl text-xs font-bold text-muted-foreground border border-border">{tool}</span>
                  ))}
                </div>
              </div>

              {selectedProject.metrics && (
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                  {selectedProject.metrics.map((metric: any, i: any) => (
                    <div key={i} className="text-center bg-muted/50 p-4 rounded-2xl border border-border/50">
                      <div className="text-2xl font-black text-foreground mb-1">{metric.value}</div>
                      <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{metric.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </SimpleDialog>

      {/* 3. Creative Gallery Lightbox */}
      <SimpleDialog open={!!creativeGallery} onOpenChange={() => setCreativeGallery(null)} className="flex-col md:flex-row bg-card border border-white/10 p-0 md:p-0 w-[95vw] sm:w-[90vw] md:w-auto md:min-w-[800px] max-w-5xl">
        {creativeGallery && (
          <>
            <div className="relative w-full md:w-2/3 bg-black flex flex-1 items-center justify-center border-b md:border-b-0 md:border-r border-white/5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={creativeGallery.index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  src={creativeItems[creativeGallery.index].image} 
                  alt={creativeItems[creativeGallery.index].title} 
                  className="max-h-[50vh] md:max-h-[85vh] w-auto max-w-full object-contain" 
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <button 
                  onClick={(e) => { e.stopPropagation(); setCreativeGallery({ index: (creativeGallery.index - 1 + creativeItems.length) % creativeItems.length }); }}
                  className="p-2 sm:p-3 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 pointer-events-auto hover:bg-black/70 transition-all active:scale-90"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setCreativeGallery({ index: (creativeGallery.index + 1) % creativeItems.length }); }}
                  className="p-2 sm:p-3 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 pointer-events-auto hover:bg-black/70 transition-all active:scale-90"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-6 md:p-10 flex flex-col justify-center bg-card">
              <span className="text-[9px] md:text-[10px] font-bold text-primary tracking-widest uppercase border border-primary/30 bg-primary/10 px-2 md:px-3 py-0.5 md:py-1 rounded-full w-fit mb-4 md:mb-6">{creativeItems[creativeGallery.index].category}</span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">{creativeItems[creativeGallery.index].title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-4">{creativeItems[creativeGallery.index].description}</p>
              
              <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                <span className="text-primary">{creativeGallery.index + 1}</span>
                <span className="opacity-30">/</span>
                <span>{creativeItems.length}</span>
              </div>
            </div>
          </>
        )}
      </SimpleDialog>

      {/* 4. Ad Image Gallery Lightbox */}
      <SimpleDialog open={!!adGallery} onOpenChange={() => setAdGallery(null)} className="bg-transparent border-none shadow-none p-0 flex items-center justify-center overflow-visible">
        {adGallery && (
          <div className="relative flex items-center justify-center w-full h-full max-w-[95vw] md:max-w-6xl">
            <AnimatePresence mode="wait">
              <motion.img 
                key={adGallery.index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={adGallery.images[adGallery.index]} 
                alt="Ad Campaign Image" 
                className="w-auto h-auto max-w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-xl md:rounded-2xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5" 
              />
            </AnimatePresence>

            {/* Navigation Arrows for Proofs/Ads */}
            {adGallery.images.length > 1 && (
              <div className="absolute inset-x-[-20px] sm:inset-x-[-60px] top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); setAdGallery({ ...adGallery, index: (adGallery.index - 1 + adGallery.images.length) % adGallery.images.length }); }}
                  className="p-3 sm:p-4 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 pointer-events-auto hover:bg-white/20 transition-all active:scale-90"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setAdGallery({ ...adGallery, index: (adGallery.index + 1) % adGallery.images.length }); }}
                  className="p-3 sm:p-4 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 pointer-events-auto hover:bg-white/20 transition-all active:scale-90"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            )}

            {/* Image Counter */}
            {adGallery.images.length > 1 && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest">
                {adGallery.index + 1} / {adGallery.images.length}
              </div>
            )}
          </div>
        )}
      </SimpleDialog>

    </div>
  );
};

export default WorkPage;