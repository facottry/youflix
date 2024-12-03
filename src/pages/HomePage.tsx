import React from 'react';
import { VideoGrid } from '../components/VideoGrid';

const MOCK_VIDEOS = [
  {
    id: '1',
    title: 'Building a YouTube Clone with React and Node.js - Full Stack Tutorial',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    duration: 1250,
    views: 10420,
    uploadedAt: '2 days ago',
    uploaderName: 'Tech Tutorial',
  },
  {
    id: '2',
    title: 'Learn Web Development in 2024 - Complete Roadmap from Beginner to Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
    duration: 845,
    views: 5230,
    uploadedAt: '5 days ago',
    uploaderName: 'Code Master',
  },
  {
    id: '3',
    title: 'React 18 Crash Course - Learn Hooks, Context, and Best Practices',
    thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2',
    duration: 2250,
    views: 15890,
    uploadedAt: '1 week ago',
    uploaderName: 'React Mastery',
  },
  {
    id: '4',
    title: 'Modern JavaScript Fundamentals - ES6+ Features Explained',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
    duration: 1800,
    views: 8750,
    uploadedAt: '3 days ago',
    uploaderName: 'JavaScript Pro',
  },
];

export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <VideoGrid videos={MOCK_VIDEOS} />
    </div>
  );
}