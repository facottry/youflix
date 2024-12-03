import React from 'react';
import { VideoCard } from './VideoCard';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  views: number;
  uploadedAt: string;
  uploaderName: string;
}

interface VideoGridProps {
  videos: Video[];
}

export function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
}