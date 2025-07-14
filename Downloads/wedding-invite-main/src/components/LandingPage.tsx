import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowDown } from 'lucide-react';

interface LandingPageProps {
  brideName: string;
  groomName: string;
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ brideName, groomName, onEnter }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/80 via-purple-900/60 to-blue-900/80 z-10" />
      
      {/* Background Image (fallback for video) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920)'
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -80, -20],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-30 text-center text-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Heart className="w-16 h-16 text-pink-300 mx-auto" fill="currentColor" />
          </motion.div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 tracking-wider">
            The Wedding of
          </h1>
          
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-300 via-white to-blue-300 bg-clip-text text-transparent mb-2">
              {brideName}
            </h2>
            <div className="flex items-center justify-center my-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-pink-300" />
              <Heart className="w-6 h-6 text-pink-300 mx-4" fill="currentColor" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-pink-300" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-300 via-white to-pink-300 bg-clip-text text-transparent">
              {groomName}
            </h2>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={onEnter}
          className="group relative overflow-hidden bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Buka Undangan
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8 text-sm sm:text-base text-white/80"
        >
          15 Juni 2024 • Jakarta
        </motion.p>
      </div>
    </div>
  );
};