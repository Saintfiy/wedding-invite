import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from './data/weddingData';
import { LandingPage } from './components/LandingPage';
import { MusicControl } from './components/MusicControl';
import { CoupleProfiles } from './components/CoupleProfiles';
import { EventDetails } from './components/EventDetails';
import { CountdownTimer } from './components/CountdownTimer';
import { Gallery } from './components/Gallery';
import { RSVPForm } from './components/RSVPForm';
import { LiveStreaming } from './components/LiveStreaming';
import { EGift } from './components/EGift';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';

function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleEnterInvitation = () => {
    setLoading(true);
    setTimeout(() => {
      setShowInvitation(true);
      setLoading(false);
    }, 1500);
  };

  // Scroll to top when invitation is shown
  useEffect(() => {
    if (showInvitation) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showInvitation]);

  // Admin access with keyboard shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="relative">
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-blue-900 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center text-white"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
              />
              <p className="text-xl font-medium">Preparing your invitation...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Dashboard */}
      {showAdmin && (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      )}

      {/* Music Control */}
      <MusicControl 
        musicUrl={weddingData.music.url}
        title={weddingData.music.title}
      />

      {/* Admin Access Button (Hidden) */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-4 left-4 w-2 h-2 opacity-0 z-40"
        aria-label="Admin Access"
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!showInvitation ? (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <LandingPage
              brideName={weddingData.couple.bride.name}
              groomName={weddingData.couple.groom.name}
              onEnter={handleEnterInvitation}
            />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50"
          >
            {/* Couple Profiles & Story */}
            <CoupleProfiles 
              couple={weddingData.couple}
              story={weddingData.story}
            />

            {/* Event Details */}
            <EventDetails event={weddingData.event} />

            {/* Countdown Timer */}
            <CountdownTimer targetDate={`${weddingData.event.date}T${weddingData.event.time}`} />

            {/* Gallery */}
            <Gallery gallery={weddingData.gallery} />

            {/* RSVP Form */}
            <RSVPForm />

            {/* Live Streaming */}
            <LiveStreaming livestream={weddingData.livestream} />

            {/* E-Gift */}
            <EGift gift={weddingData.gift} />

            {/* Footer */}
            <Footer 
              couple={weddingData.couple}
              hashtag={weddingData.hashtag}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;