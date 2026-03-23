import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, X, Play, Youtube, Instagram, ArrowUp, ArrowDown, Maximize2, Send } from "lucide-react";

// Video data remains exactly the same
export const videoPortfolio = [
  {
    id: 1, title: "Art of the Whisk", category: "YouTube Shorts",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344608/Whisk_qty2idzlzmzkvgzz0iy3itytmznlrtl2ugn30iy_zhzkzd.mp4",
    creator: "@nahushpatel", description: "A high-speed culinary motion study focusing on textures and movement. 🍳",
    likes: 3200, comments: 245, shares: 1100, aspectRatio: "16:9",
    type: "youtube"
  },
  {
    id: 2, title: "Urban Rhythms", category: "Instagram Reels",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344582/_scene_1_202511111742_sh8fv_srx10l.mp4",
    creator: "@nahushpatel", description: "Capturing the essence of city life through dynamic transitions and sound design. 🏙️",
    likes: 4500, comments: 312, shares: 890, aspectRatio: "16:9",
    type: "instagram"
  },
  {
    id: 3, title: "November Hues", category: "Lifestyle",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344554/Nov_17__1228_15s_202511171254_32z0y_oqrmxq.mp4",
    creator: "@nahushpatel", description: "A seasonal lifestyle edit with warm tones and cinematic grading. 🍂",
    likes: 2800, comments: 156, shares: 432, aspectRatio: "16:9",
    type: "tiktok"
  },
  {
    id: 4, title: "Golden Hour Story", category: "Cinematic",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344538/Nov_14__1433_29s_202511141457_ho8je_yimvk9.mp4",
    creator: "@nahushpatel", description: "Exploring light and shadow during the most magical hour of the day. ☀️",
    likes: 5100, comments: 423, shares: 1200, aspectRatio: "16:9",
    type: "instagram"
  },
  {
    id: 5, title: "Cultural Narratives", category: "YouTube Shorts",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344516/Hindi_sdkg1s.mp4",
    creator: "@nahushpatel", description: "A vertical documentary piece exploring Hindi cultural expressions. 🇮🇳",
    likes: 8900, comments: 1100, shares: 3400, aspectRatio: "9:16",
    type: "youtube"
  },
  {
    id: 6, title: "Masterpiece Production", category: "Film",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344504/1_npwj0g.mp4",
    creator: "@nahushpatel", description: "Full-scale production showcase with high-end camera work and VFX. 🎥",
    likes: 12000, comments: 2400, shares: 5600, aspectRatio: "16:9",
    type: "showcase"
  },
  {
    id: 7, title: "Quick Branding Snap", category: "Social",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344468/_duration_8s_202511170013_dbx1h_n7ypbj.mp4",
    creator: "@nahushpatel", description: "Short-form content designed for maximum engagement in under 10 seconds. ⚡",
    likes: 1500, comments: 89, shares: 267, aspectRatio: "16:9",
    type: "instagram"
  },
  {
    id: 8, title: "Cinematic Vertical", category: "Instagram Reels",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344453/_description_cinematic_202512082302_8oaa_k4drmr.mp4",
    creator: "@nahushpatel", description: "Premium cinematic storytelling optimized for mobile scrolling. ✨",
    likes: 6700, comments: 534, shares: 1800, aspectRatio: "9:16",
    type: "instagram"
  },
  {
    id: 9, title: "Widescreen Vision", category: "Showcase",
    videoUrl: "https://res.cloudinary.com/djm7sh0zd/video/upload/v1773344437/_description_cinematic_202511170019_ltn6_paqx05.mp4",
    creator: "@nahushpatel", description: "Cinematic wide-ratio showcase for high-resolution displays. 🎞️",
    likes: 9200, comments: 890, shares: 2100, aspectRatio: "16:9",
    type: "showcase"
  },
];

const formatCount = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
};

const timeAgo = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
};

// Reusable animated button component
const ActionButton = ({ icon: Icon, label, onClick, isActive = false, activeColor = "", tooltip = "" }: any) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 group relative"
    title={tooltip}
  >
    <motion.div
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className={`p-3.5 xl:p-4 rounded-full transition-all duration-300 shadow-sm border
        ${isActive
          ? `bg-white border-transparent shadow-md`
          : `bg-white/80 border-slate-200/50 hover:bg-white hover:shadow-md hover:border-slate-200 backdrop-blur-sm`}`}
    >
      <Icon className={`w-6 h-6 xl:w-7 xl:h-7 transition-colors duration-300 
        ${isActive ? activeColor : "text-slate-600 group-hover:text-slate-900"}`}
      />
    </motion.div>
    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-700 transition-colors drop-shadow-sm xl:drop-shadow-none">
      {label}
    </span>
  </button>
);

export const ReelCard = ({ video, isActive, onEnded }) => {
  const videoRef = useRef(null);
  const blurVideoRef = useRef(null);
  const commentInputRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [showMore, setShowMore] = useState(false);
  const [progress, setProgress] = useState(0);

  // Comments state (Local for preview)
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(video.comments);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");

  const [shareCount, setShareCount] = useState(video.shares);
  const [showCopied, setShowCopied] = useState(false);

  // Generate some dummy comments for preview purposes
  useEffect(() => {
    if (showComments && comments.length === 0) {
      setComments([
        { id: '1', user_name: 'Alex Design', avatar_initials: 'AD', comment_text: 'The color grading on this is absolutely insane. 🔥', created_at: new Date(Date.now() - 3600000).toISOString() },
        { id: '2', user_name: 'Sarah M.', avatar_initials: 'SM', comment_text: 'What camera did you use for this? The clarity is amazing.', created_at: new Date(Date.now() - 7200000).toISOString() },
      ]);
      setTimeout(() => commentInputRef.current?.focus(), 400);
    }
  }, [showComments]);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      blurVideoRef.current?.play().catch(() => { });
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

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) videoRef.current.requestFullscreen();
      else if (videoRef.current.webkitRequestFullscreen) videoRef.current.webkitRequestFullscreen();
      else if (videoRef.current.msRequestFullscreen) videoRef.current.msRequestFullscreen();
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({ title: video.title, text: `Check out "${video.title}"`, url: window.location.href });
        setShareCount(prev => prev + 1);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setShareCount(prev => prev + 1);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } catch { }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const userName = newName.trim() || 'Guest User';
    const initials = userName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    const newCommentObj = {
      id: Math.random().toString(),
      user_name: userName,
      avatar_initials: initials,
      comment_text: newComment.trim(),
      created_at: new Date().toISOString()
    };

    setComments(prev => [newCommentObj, ...prev]);
    setCommentCount(prev => prev + 1);
    setNewComment("");
  };

  return (
    <div className="relative w-full h-full snap-start shrink-0 flex flex-col overflow-hidden text-slate-900 bg-[#f8fafc]">

      {/* Light Ambient Background Blur - Desktop Only */}
      <div className="absolute inset-0 z-0 opacity-40 scale-110 pointer-events-none overflow-hidden hidden xl:block">
        <video ref={blurVideoRef} src={video.videoUrl} className="w-full h-full object-cover blur-[80px]" loop muted playsInline preload="auto" />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-3xl" />
      </div>

      <motion.div
        key={video.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative flex-1 flex flex-col xl:flex-row items-center justify-center z-10 overflow-hidden cursor-pointer xl:gap-16 xl:px-12 2xl:px-24"
        onClick={togglePlay}
      >
        {/* VIDEO COLUMN */}
        <div className="relative w-full h-full xl:h-[82vh] xl:aspect-[9/16] xl:w-auto max-h-screen flex items-center justify-center bg-black xl:bg-slate-900 xl:rounded-[2.5rem] xl:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] xl:border-8 border-white overflow-hidden transition-all duration-500 group">

          <video ref={videoRef} src={video.videoUrl}
            className={`transition-all duration-700 ${video.aspectRatio === "9:16" ? "h-full w-full object-cover" : "aspect-video h-auto w-full object-contain"}`}
            loop={false} muted={false} playsInline preload="metadata" onEnded={onEnded}
            onTimeUpdate={() => { if (videoRef.current) setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100); }}
          />

          {/* Video Controls / Badges inside player */}
          <button
            onClick={toggleFullscreen}
            className="absolute bottom-6 right-6 z-30 p-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100 hidden xl:block"
            title="Fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {/* Desktop Badge Inside Video (Optional, looks clean) */}
          <div className="absolute top-6 left-6 z-30 hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            {video.type === 'youtube' && <Youtube className="w-3.5 h-3.5 text-red-500" />}
            {video.type === 'instagram' && <Instagram className="w-3.5 h-3.5 text-pink-500" />}
            {video.category}
          </div>

          <AnimatePresence>
            {!isPlaying && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center bg-black/10 z-10 backdrop-blur-[2px]">
                <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-2xl flex items-center justify-center pointer-events-none">
                  <Play className="w-8 h-8 text-white fill-white ml-1.5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar (Mobile and Desktop bottom of video) */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-20">
            <div className="h-full bg-white transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* DETAILS & INTERACTION COLUMN - DESKTOP */}
        <div className="hidden xl:flex flex-col justify-end xl:h-[82vh] w-full max-w-[400px] py-10 gap-10 animate-in fade-in slide-in-from-right-8 duration-700">

          <div className="space-y-6 bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-widest border border-slate-200">
              {video.type === 'youtube' && <Youtube className="w-3.5 h-3.5 text-red-500" />}
              {video.type === 'instagram' && <Instagram className="w-3.5 h-3.5 text-pink-500" />}
              {video.type === 'tiktok' && <span className="w-3.5 h-3.5 flex items-center justify-center font-bold text-lg leading-none mb-0.5">♪</span>}
              {video.category}
            </div>

            <h3 className="text-4xl font-black tracking-tight leading-[1.1] text-slate-900">
              {video.title}
            </h3>

            <p className="text-base text-slate-600 leading-relaxed font-medium">
              {video.description}
            </p>

            <div className="pt-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-md">
                NP
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{video.creator}</p>
                <p className="text-xs text-slate-500 font-medium">Original Creator</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 px-4">
            <ActionButton
              icon={Heart}
              label={formatCount(likeCount)}
              onClick={handleLike}
              isActive={isLiked}
              activeColor="text-red-500 fill-red-500"
            />
            <ActionButton
              icon={MessageCircle}
              label={formatCount(commentCount)}
              onClick={(e) => { e.stopPropagation(); setShowComments(true); if (isPlaying) togglePlay(); }}
            />
            <ActionButton
              icon={Share2}
              label={formatCount(shareCount)}
              onClick={handleShare}
            />
          </div>
        </div>

        {/* MOBILE OVERLAYS - Hidden on Desktop */}
        <div className="xl:hidden">
          <div className="absolute top-6 left-4 z-10">
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-black/40 text-white font-bold backdrop-blur-md border border-white/10 shadow-lg">
              {video.type === 'youtube' && <Youtube className="w-3 h-3 text-red-500" />}
              {video.type === 'instagram' && <Instagram className="w-3 h-3 text-pink-500" />}
              {video.category}
            </span>
          </div>

          <AnimatePresence>
            {showCopied && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="absolute top-20 left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 rounded-full bg-white text-sm text-slate-900 font-bold shadow-xl border border-slate-100 flex items-center gap-2">
                <span>Link copied!</span> 🔗
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute right-4 bottom-28 z-20 flex flex-col items-center gap-6">
            <button onClick={handleLike} className="flex flex-col items-center gap-1 group">
              <motion.div whileTap={{ scale: 1.2 }} className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
                <Heart className={`w-7 h-7 transition-all duration-300 ${isLiked ? "text-red-500 fill-red-500" : "text-white drop-shadow-md"}`} />
              </motion.div>
              <span className="text-xs text-white font-bold drop-shadow-md">{formatCount(likeCount)}</span>
            </button>

            <button onClick={(e) => { e.stopPropagation(); setShowComments(true); if (isPlaying) togglePlay(); }} className="flex flex-col items-center gap-1 group">
              <div className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
                <MessageCircle className="w-7 h-7 text-white drop-shadow-md" />
              </div>
              <span className="text-xs text-white font-bold drop-shadow-md">{formatCount(commentCount)}</span>
            </button>

            <button onClick={handleShare} className="flex flex-col items-center gap-1 group">
              <div className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
                <Share2 className="w-7 h-7 text-white drop-shadow-md" />
              </div>
              <span className="text-xs text-white font-bold drop-shadow-md">{formatCount(shareCount)}</span>
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 p-5 pb-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
            <div className="pointer-events-auto">
              <h3 className="text-lg font-bold text-white drop-shadow-md mb-2 flex items-center gap-2">
                {video.creator}
              </h3>
              <p className={`text-sm text-white/90 drop-shadow-md leading-relaxed pr-16 ${!showMore ? "line-clamp-2" : ""}`}
                onClick={(e) => { e.stopPropagation(); setShowMore(!showMore); }}>
                {video.description}
                {!showMore && <span className="text-white/70 font-bold ml-2 cursor-pointer">more</span>}
              </p>
            </div>
          </div>
        </div>

      </motion.div>

      {/* COMMENTS DRAWER - Light Theme Redesign */}
      <AnimatePresence>
        {showComments && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-[40] bg-slate-900/20 backdrop-blur-sm"
              onClick={(e) => { e.stopPropagation(); setShowComments(false); }} />

            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 xl:left-auto xl:right-12 xl:bottom-12 xl:w-[400px] xl:rounded-3xl z-50 bg-white shadow-2xl rounded-t-[2rem] flex flex-col border border-slate-100"
              style={{ maxHeight: '70vh' }}
              onClick={(e) => e.stopPropagation()}>

              {/* Drag Handle (Mobile) */}
              <div className="flex justify-center pt-4 pb-2 xl:hidden">
                <div className="w-12 h-1.5 rounded-full bg-slate-200" />
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h4 className="text-base font-black text-slate-900">{formatCount(commentCount)} Comments</h4>
                <button onClick={() => setShowComments(false)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                {comments.length === 0 ? (
                  <p className="text-center text-slate-500 text-sm mt-8 font-medium">Be the first to comment!</p>
                ) : (
                  comments.map((comment) => (
                    <motion.div key={comment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                      <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                        <span className="text-[11px] font-bold text-slate-600">{comment.avatar_initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-bold text-slate-900">{comment.user_name}</span>
                          <span className="text-[10px] font-medium text-slate-400">{timeAgo(comment.created_at)}</span>
                        </div>
                        <p className="text-sm text-slate-700 mt-1 leading-relaxed">{comment.comment_text}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <form onSubmit={handleAddComment} className="p-4 border-t border-slate-100 bg-slate-50 xl:rounded-b-3xl">
                <div className="flex flex-col gap-3">
                  <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Your Name (Optional)"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all shadow-sm" />
                  <div className="flex gap-2 relative">
                    <input ref={commentInputRef} type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..."
                      className="flex-1 bg-white border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all shadow-sm" />
                    <button type="submit" disabled={!newComment.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-indigo-50 rounded-lg disabled:opacity-30 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

const ReelsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWheelLocked, setIsWheelLocked] = useState(false);
  const containerRef = useRef(null);

  const handleScroll = (e) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / container.clientHeight);
    if (!isNaN(index) && index !== activeIndex) setActiveIndex(index);
  };

  const scrollToIndex = (index) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.scrollTo({ top: index * container.clientHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollToIndex(Math.min(activeIndex + 1, videoPortfolio.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollToIndex(Math.max(activeIndex - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 40) return;
      if (isWheelLocked) return;

      setIsWheelLocked(true);
      setTimeout(() => setIsWheelLocked(false), 700);

      if (e.deltaY > 0) scrollToIndex(Math.min(activeIndex + 1, videoPortfolio.length - 1));
      else scrollToIndex(Math.max(activeIndex - 1, 0));
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, isWheelLocked]);

  return (
    <div className="h-[100dvh] w-full bg-[#f8fafc] overflow-hidden relative lg:flex lg:items-center lg:justify-center">

      {/* Background Decor (Subtle gradient mesh) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[120px] opacity-60 pointer-events-none hidden xl:block" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[120px] opacity-60 pointer-events-none hidden xl:block" />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none flex flex-col z-10"
        style={{ scrollBehavior: 'smooth' }}
      >
        {videoPortfolio.map((video, i) => (
          <ReelCard
            key={video.id}
            video={video}
            isActive={i === activeIndex}
            onEnded={() => {
              if (i < videoPortfolio.length - 1) scrollToIndex(i + 1);
              else scrollToIndex(0);
            }}
          />
        ))}

        {/* Desktop navigation buttons */}
        <div className="hidden lg:flex fixed flex-col right-8 lg:right-12 top-1/2 -translate-y-1/2 gap-4 z-50">
          <button onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))} disabled={activeIndex === 0}
            className="p-4 rounded-2xl bg-white hover:bg-slate-50 hover:-translate-y-1 transition-all disabled:opacity-30 disabled:hover:translate-y-0 active:scale-95 border border-slate-200 shadow-xl text-slate-700"
            title="Previous (Arrow Up)">
            <ArrowUp className="w-5 h-5" />
          </button>
          <button onClick={() => scrollToIndex(Math.min(activeIndex + 1, videoPortfolio.length - 1))} disabled={activeIndex === videoPortfolio.length - 1}
            className="p-4 rounded-2xl bg-white hover:bg-slate-50 hover:translate-y-1 transition-all disabled:opacity-30 disabled:hover:translate-y-0 active:scale-95 border border-slate-200 shadow-xl text-slate-700"
            title="Next (Arrow Down)">
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReelsPage;