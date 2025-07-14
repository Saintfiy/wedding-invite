import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Instagram, Share2 } from 'lucide-react';
import { WeddingData } from '../data/weddingData';

interface FooterProps {
  couple: WeddingData['couple'];
  hashtag: string;
}

export const Footer: React.FC<FooterProps> = ({ couple, hashtag }) => {
  const shareToWhatsApp = () => {
    const message = `Join us for Sarah & David's wedding! ${hashtag} ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-pink-900 via-purple-900 to-blue-900 text-white py-20 px-6 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
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

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Heart className="w-16 h-16 text-pink-300 mx-auto" fill="currentColor" />
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Thank You
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            We can't wait to celebrate this special day with all of you. 
            Your love and support mean everything to us as we begin this beautiful journey together.
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6">Follow Our Journey</h3>
          <div className="flex justify-center gap-6">
            <motion.a
              href={`https://instagram.com/${couple.bride.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-5 h-5" />
              {couple.bride.instagram}
            </motion.a>
            <motion.a
              href={`https://instagram.com/${couple.groom.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-5 h-5" />
              {couple.groom.instagram}
            </motion.a>
          </div>
        </motion.div>

        {/* Wedding Hashtag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-4">Wedding Hashtag</h3>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full"
          >
            <span className="text-2xl font-bold text-pink-300">{hashtag}</span>
          </motion.div>
          <p className="text-white/60 mt-2">Don't forget to use our hashtag when you post!</p>
        </motion.div>

        {/* Share Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold mb-4">Share Our Invitation</h3>
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={shareToWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📱 Share via WhatsApp
            </motion.button>
            <motion.button
              onClick={copyLink}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-4 h-4" />
              Copy Link
            </motion.button>
          </div>
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-white/20 pt-8"
        >
          <p className="text-white/60 mb-4">
            Made with 💕 for Sarah & David's Wedding
          </p>
          <p className="text-white/40 text-sm">
            © 2024 - All rights reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
};