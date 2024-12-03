import React from 'react';
import { Link } from 'react-router-dom';
import { formatDuration } from '../lib/utils';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  views: number;
  uploadedAt: string;
  uploaderName: string;
}

export function VideoCard({
  id,
  title,
  thumbnail,
  duration,
  views,
  uploadedAt,
  uploaderName,
}: VideoCardProps) {
  return (
    <Link to={`/watch/${id}`} className="group">
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute bottom-1 right-1 bg-black/80 px-2 py-1 text-xs text-white rounded">
          {formatDuration(duration)}
        </div>
      </div>
      <div className="mt-3 flex">
        <div className="flex-shrink-0 mr-3">
          <div className="w-9 h-9 bg-gray-200 rounded-full" />
        </div>
        <div>
          <h3 className="text-base font-medium line-clamp-2 leading-5 mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{uploaderName}</p>
          <div className="text-sm text-gray-600 flex items-center">
            <span>{views.toLocaleString()} views</span>
            <span className="mx-1">•</span>
            <span>{uploadedAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}