import React from 'react';
import { VideoCard } from './VideoCard';
import type { Video } from '../types/video';

interface RelatedVideosProps {
  videos: Video[];
  currentVideoId: string;
}

export function RelatedVideos({ videos, currentVideoId }: RelatedVideosProps) {
  const filteredVideos = videos.filter(video => video.id !== currentVideoId);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Related Videos</h2>
      <div className="grid gap-4">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            thumbnail={video.thumbnailPath || ''}
            duration={video.duration || 0}
            views={video.views}
            uploadedAt={new Date(video.createdAt).toLocaleDateString()}
            uploaderName={video.uploader}
          />
        ))}
      </div>
    </div>
  );
}