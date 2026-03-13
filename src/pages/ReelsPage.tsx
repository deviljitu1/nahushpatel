import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Music2, CheckCircle2, X, Play, Video, Film, Youtube, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const videoPortfolio = [
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

const formatCount = (n: number): string => {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
};

const getSessionId = () => {
  let sid = localStorage.getItem('portfolio_session_id');
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem('portfolio_session_id', sid);
  }
  return sid;
};

const timeAgo = (date: string) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
};

type DbComment = {
  id: string;
  video_id: number;
  user_name: string;
  avatar_initials: string;
  comment_text: string;
  likes: number;
  created_at: string;
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
  const [comments, setComments] = useState<DbComment[]>([]);
  const [commentCount, setCommentCount] = useState(video.comments);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [shareCount, setShareCount] = useState(video.shares);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showComments) {
      window.history.pushState({ drawerOpen: true }, "");
      const handlePopState = () => setShowComments(false);
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [showComments]);

  useEffect(() => {
    const sessionId = getSessionId();
    supabase.from('video_likes').select('id').eq('video_id', video.id).eq('session_id', sessionId)
      .then(({ data }) => { if (data && data.length > 0) setIsLiked(true); });
  }, [video.id]);

  const fetchComments = useCallback(async () => {
    const { data } = await supabase.from('video_comments').select('*').eq('video_id', video.id).order('created_at', { ascending: false });
    if (data) { setComments(data as DbComment[]); setCommentCount(data.length); }
  }, [video.id]);

  useEffect(() => {
    if (showComments) { fetchComments(); setTimeout(() => commentInputRef.current?.focus(), 400); }
  }, [showComments, fetchComments]);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      blurVideoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause(); blurVideoRef.current?.pause(); setIsPlaying(false); setShowComments(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); blurVideoRef.current?.pause(); setIsPlaying(false); }
    else { videoRef.current.play().catch(console.error); blurVideoRef.current?.play().catch(console.error); setIsPlaying(true); }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const sessionId = getSessionId();
    if (isLiked) {
      setIsLiked(false); setLikeCount(prev => prev - 1);
      await supabase.from('video_likes').delete().eq('video_id', video.id).eq('session_id', sessionId);
    } else {
      setIsLiked(true); setLikeCount(prev => prev + 1);
      await supabase.from('video_likes').insert({ video_id: video.id, session_id: sessionId });
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({ title: video.title, text: `Check out "${video.title}" by ${video.creator}`, url: window.location.href });
        setShareCount(prev => prev + 1);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setShareCount(prev => prev + 1);
        setShowCopied(true); setTimeout(() => setShowCopied(false), 2000);
      }
    } catch { }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    const userName = newName.trim() || 'Anonymous';
    const initials = userName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const { data, error } = await supabase.from('video_comments').insert({
      video_id: video.id, user_name: userName, avatar_initials: initials, comment_text: newComment.trim(),
    }).select().single();
    if (!error && data) { setComments(prev => [data as DbComment, ...prev]); setCommentCount(prev => prev + 1); setNewComment(""); }
    setIsSubmitting(false);
  };

  return (
    <div className="relative w-full h-[100dvh] md:h-full snap-start shrink-0 flex items-center justify-center bg-black overflow-hidden text-white">
      {video.aspectRatio === "16:9" && (
        <div className="absolute inset-0 z-0 opacity-40 scale-110 pointer-events-none">
          <video ref={blurVideoRef} src={video.videoUrl} className="w-full h-full object-cover blur-[60px]" loop muted playsInline preload="auto" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      <motion.div 
        key={video.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full h-full z-10 overflow-hidden cursor-pointer flex items-center justify-center" 
        onClick={togglePlay}
      >
        <video ref={videoRef} src={video.videoUrl}
          className={`max-w-full max-h-full transition-all duration-700 ${video.aspectRatio === "9:16" ? "h-full w-full object-cover" : "aspect-video h-auto w-full object-contain"}`}
          loop muted={false} playsInline preload="metadata" onEnded={onEnded}
          onTimeUpdate={() => { if (videoRef.current) setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100); }}
        />

        <AnimatePresence>
          {!isPlaying && (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-6 left-4 z-10">
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-black/40 text-white font-bold backdrop-blur-md border border-white/10">
            {video.type === 'youtube' && <Youtube className="w-3 h-3 text-red-500" />}
            {video.type === 'instagram' && <Instagram className="w-3 h-3 text-pink-500" />}
            {video.category}
          </span>
        </div>

        <AnimatePresence>
          {showCopied && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-xs text-white font-medium">
              Link copied! 🔗
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute right-4 bottom-32 z-20 flex flex-col items-center gap-6">
          <button onClick={handleLike} className="flex flex-col items-center gap-1 group">
            <motion.div whileTap={{ scale: 1.3 }} className="p-2 rounded-full bg-black/20 backdrop-blur-sm">
              <Heart className={`w-7 h-7 transition-all duration-300 ${isLiked ? "text-red-500 fill-red-500 scale-110" : "text-white"}`} />
            </motion.div>
            <span className="text-xs text-white font-medium drop-shadow-md">{formatCount(likeCount)}</span>
          </button>

          <button onClick={(e) => { e.stopPropagation(); setShowComments(true); if (isPlaying) { videoRef.current?.pause(); blurVideoRef.current?.pause(); setIsPlaying(false); } }}
            className="flex flex-col items-center gap-1 group">
            <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs text-white font-medium drop-shadow-md">{formatCount(commentCount)}</span>
          </button>

          <button onClick={handleShare} className="flex flex-col items-center gap-1 group">
            <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-white font-medium drop-shadow-md">{formatCount(shareCount)}</span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 pb-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
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
          </div>

          <h3 className="text-sm font-bold text-white drop-shadow-md mb-2 line-clamp-1">{video.title}</h3>
          <p className={`text-xs text-white/90 drop-shadow-md leading-relaxed pr-12 ${!showMore ? "line-clamp-2" : ""}`}
            onClick={(e) => { e.stopPropagation(); setShowMore(!showMore); }}>
            {video.description}
            {!showMore && <span className="text-white/60 font-medium ml-1">more</span>}
          </p>
          <div className="flex items-center gap-2 mt-4 text-white/70">
            <Music2 className="w-3 h-3 animate-pulse" />
            <div className="text-[10px] overflow-hidden w-32 relative">
              <div className="whitespace-nowrap animate-marquee">Original Audio - {video.creator} • Trending Sound</div>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showComments && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-[25] bg-black/40"
              onClick={(e) => { e.stopPropagation(); setShowComments(false); }} />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="absolute bottom-0 left-0 right-0 z-30 bg-zinc-900/98 backdrop-blur-2xl rounded-t-3xl flex flex-col"
              style={{ maxHeight: '55vh' }}
              onClick={(e) => e.stopPropagation()}>
              
              <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full bg-white/30" /></div>
              
              <div className="flex items-center justify-between px-4 pb-3 border-b border-white/10">
                <h4 className="text-sm font-bold text-white">{formatCount(commentCount)} Comments</h4>
                <button onClick={() => setShowComments(false)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                {comments.map((comment) => (
                  <motion.div key={comment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-white">{comment.avatar_initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{comment.user_name}</span>
                        <span className="text-[10px] text-white/40">{timeAgo(comment.created_at)}</span>
                      </div>
                      <p className="text-xs text-white/80 mt-0.5 leading-relaxed">{comment.comment_text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="px-4 py-3 border-t border-white/10 space-y-2 pb-6">
                <div className="flex gap-2">
                  <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Name"
                    className="w-24 bg-white/10 rounded-full px-3 py-2 text-xs text-white placeholder:text-white/40 outline-none" />
                  <input ref={commentInputRef} type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add comment..."
                    className="flex-1 bg-white/10 rounded-full px-4 py-2 text-xs text-white placeholder:text-white/40 outline-none" />
                  <button type="submit" className="text-primary font-bold text-xs disabled:opacity-30">Post</button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div className="h-full bg-primary transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

const ReelsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / container.clientHeight);
    if (!isNaN(index) && index !== activeIndex) setActiveIndex(index);
  };

  return (
    <div className="h-[100dvh] w-full bg-black overflow-hidden relative">
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none flex flex-col"
        style={{ scrollBehavior: 'smooth' }}
      >
        {videoPortfolio.map((video, i) => (
          <ReelCard 
            key={video.id} 
            video={video} 
            isActive={i === activeIndex} 
            onEnded={() => {
              if (i < videoPortfolio.length - 1) {
                containerRef.current?.scrollTo({ top: (i + 1) * window.innerHeight, behavior: 'smooth' });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ReelsPage;
