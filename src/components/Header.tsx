import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Upload, Bell, Mic, User } from 'lucide-react';
import { cn } from '../lib/utils';

export function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left section */}
        <div className="flex items-center">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center ml-4">
            <svg viewBox="0 0 90 20" className="h-5">
              <g viewBox="0 0 90 20">
                <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000" />
                <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white" />
              </g>
            </svg>
            <span className="ml-1 text-xl font-bold">YouTube</span>
          </Link>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-[732px] mx-4">
          <div className="flex items-center">
            <div className="flex-1 relative">
              <input
                type="search"
                placeholder="Search"
                className={cn(
                  "w-full px-4 py-2 pl-12 border rounded-l-full",
                  "focus:outline-none focus:border-blue-500",
                  isSearchFocused && "border-blue-500 shadow-[0_0_0_1px_#3ea6ff]"
                )}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button className="px-6 py-2 bg-gray-50 border border-l-0 rounded-r-full hover:bg-gray-100">
              <Search className="w-5 h-5" />
            </button>
            <button className="ml-4 p-2 hover:bg-gray-100 rounded-full">
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <Link
            to="/upload"
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Upload className="w-6 h-6" />
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}