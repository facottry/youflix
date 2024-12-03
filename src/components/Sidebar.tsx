import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Clock, ThumbsUp, PlaySquare, Film, Gamepad2, Newspaper, Trophy, Music2, Flame } from 'lucide-react';

const primaryLinks = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Compass, label: 'Explore', path: '/explore' },
  { icon: PlaySquare, label: 'Subscriptions', path: '/subscriptions' },
];

const secondaryLinks = [
  { icon: Clock, label: 'History', path: '/history' },
  { icon: ThumbsUp, label: 'Liked videos', path: '/playlist?list=LL' },
];

const exploreLinks = [
  { icon: Flame, label: 'Trending', path: '/trending' },
  { icon: Music2, label: 'Music', path: '/music' },
  { icon: Film, label: 'Movies', path: '/movies' },
  { icon: Gamepad2, label: 'Gaming', path: '/gaming' },
  { icon: Newspaper, label: 'News', path: '/news' },
  { icon: Trophy, label: 'Sports', path: '/sports' },
];

export function Sidebar() {
  return (
    <aside className="fixed top-14 left-0 w-64 h-[calc(100vh-56px)] bg-white overflow-y-auto pb-4 hidden lg:block">
      <div className="px-3 pt-3">
        {/* Primary Links */}
        <div className="pb-3 border-b">
          {primaryLinks.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              <Icon className="w-6 h-6" />
              <span className="ml-6 text-sm">{label}</span>
            </Link>
          ))}
        </div>

        {/* Secondary Links */}
        <div className="py-3 border-b">
          {secondaryLinks.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              <Icon className="w-6 h-6" />
              <span className="ml-6 text-sm">{label}</span>
            </Link>
          ))}
        </div>

        {/* Explore */}
        <div className="pt-3">
          <h3 className="px-3 text-base font-medium mb-1">Explore</h3>
          {exploreLinks.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              <Icon className="w-6 h-6" />
              <span className="ml-6 text-sm">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}