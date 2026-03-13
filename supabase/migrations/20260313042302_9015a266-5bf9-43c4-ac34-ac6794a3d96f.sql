
-- Create video_comments table for portfolio video comments
CREATE TABLE public.video_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id INTEGER NOT NULL,
  user_name TEXT NOT NULL,
  avatar_initials TEXT NOT NULL DEFAULT 'AN',
  comment_text TEXT NOT NULL,
  likes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.video_comments ENABLE ROW LEVEL SECURITY;

-- Anyone can read comments
CREATE POLICY "Anyone can read comments"
  ON public.video_comments FOR SELECT
  USING (true);

-- Anyone can insert comments (public portfolio)
CREATE POLICY "Anyone can insert comments"
  ON public.video_comments FOR INSERT
  WITH CHECK (true);

-- Create index for fast lookups
CREATE INDEX idx_video_comments_video_id ON public.video_comments(video_id);

-- Create video_likes table for tracking likes
CREATE TABLE public.video_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id INTEGER NOT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(video_id, session_id)
);

ALTER TABLE public.video_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read likes"
  ON public.video_likes FOR SELECT USING (true);

CREATE POLICY "Anyone can insert likes"
  ON public.video_likes FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can delete their likes"
  ON public.video_likes FOR DELETE USING (true);

CREATE INDEX idx_video_likes_video_id ON public.video_likes(video_id);
