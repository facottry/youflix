import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { UploadPage } from './pages/UploadPage';
import { VideoPage } from './pages/VideoPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f9f9f9]">
        <Header />
        <Sidebar />
        <main className="pt-14 lg:pl-64">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/watch/:id" element={<VideoPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}