import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart } from 'lucide-react';
import { WeddingData } from '../data/weddingData';

interface CoupleProfilesProps {
  couple: WeddingData['couple'];
  story: WeddingData['story'];
}

export const CoupleProfiles: React.FC<CoupleProfilesProps> = ({ couple, story }) => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-8">
            {story.title}
          </h2>
          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {story.content}
            </motion.p>
          </div>
        </motion.div>

        {/* Couple Profiles */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative mb-8 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-3xl shadow-2xl mx-auto w-80 h-96"
              >
                <img
                  src={couple.bride.photo}
                  alt={couple.bride.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              
              {/* Floating Hearts */}
              <motion.div
                animate={{
                  y: [-10, -20, -10],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 text-pink-400"
              >
                <Heart className="w-8 h-8" fill="currentColor" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {couple.bride.fullName}
              </h3>
              <p className="text-gray-600 mb-4">{couple.bride.parents}</p>
              <motion.a
                href={`https://instagram.com/${couple.bride.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5" />
                {couple.bride.instagram}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative mb-8 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-3xl shadow-2xl mx-auto w-80 h-96"
              >
                <img
                  src={couple.groom.photo}
                  alt={couple.groom.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              
              {/* Floating Hearts */}
              <motion.div
                animate={{
                  y: [-10, -20, -10],
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="absolute -top-4 -left-4 text-blue-400"
              >
                <Heart className="w-8 h-8" fill="currentColor" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {couple.groom.fullName}
              </h3>
              <p className="text-gray-600 mb-4">{couple.groom.parents}</p>
              <motion.a
                href={`https://instagram.com/${couple.groom.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5" />
                {couple.groom.instagram}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};