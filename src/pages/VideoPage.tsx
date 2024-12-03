import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share } from 'lucide-react';
import { VideoPlayer } from '../components/VideoPlayer';
import { RelatedVideos } from '../components/RelatedVideos';
import { api } from '../lib/api';
import type { Video } from '../types/video';

export function VideoPage() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideo() {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const [videoData, allVideos] = await Promise.all([
          api.getVideo(id),
          api.getVideos()
        ]);
        
        setVideo(videoData);
        setRelatedVideos(allVideos);
      } catch (err) {
        setError('Failed to load video');
      } finally {
        setIsLoading(false);
      }
    }

    loadVideo();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || 'Video not found'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoPlayer
            src={video.hlsPath || ''}
            poster={video.thumbnailPath}
          />
          
          <div className="mt-4 space-y-4">
            <h1 className="text-2xl font-bold">{video.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {video.views.toLocaleString()} views
                </span>
                <span className="text-sm text-gray-600">
                  {new Date(video.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 hover:bg-gray-100 px-3 py-2 rounded-full">
                  <ThumbsUp className="w-5 h-5" />
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-1 hover:bg-gray-100 px-3 py-2 rounded-full">
                  <ThumbsDown className="w-5 h-5" />
                  <span>Dislike</span>
                </button>
                <button className="flex items-center space-x-1 hover:bg-gray-100 px-3 py-2 rounded-full">
                  <Share className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div>
                  <h3 className="font-semibold">{video.uploader}</h3>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{video.description}</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <RelatedVideos videos={relatedVideos} currentVideoId={video.id} />
        </div>
      </div>
    </div>
  );
}