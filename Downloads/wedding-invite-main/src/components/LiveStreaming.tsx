import React from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, Globe } from 'lucide-react';
import { WeddingData } from '../data/weddingData';

interface LiveStreamingProps {
  livestream: WeddingData['livestream'];
}

export const LiveStreaming: React.FC<LiveStreamingProps> = ({ livestream }) => {
  const streamDate = new Date(livestream.scheduledTime);
  const isLive = new Date() >= streamDate;

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Live Streaming
          </h2>
          <p className="text-xl text-white/80">
            Can't join us in person? Watch our ceremony live!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Stream Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${isLive ? 'bg-red-500' : 'bg-blue-500'}`}>
                  {isLive ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Play className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <Calendar className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {isLive ? 'LIVE NOW' : 'Scheduled Stream'}
                  </h3>
                  <p className="text-white/80">
                    {streamDate.toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })} WIB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Platform</h3>
                  <p className="text-white/80">{livestream.platform}</p>
                </div>
              </div>

              <div className="pt-4">
                <motion.a
                  href={livestream.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-4 px-6 rounded-full font-medium text-center transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isLive 
                      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLive ? '🔴 Join Live Stream' : '📅 Set Reminder'}
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Stream Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold mb-4 text-center">
              {isLive ? 'Live Stream' : 'Stream Preview'}
            </h3>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/50">
              {isLive ? (
                <iframe
                  src={livestream.url}
                  className="w-full h-full"
                  allowFullScreen
                  title="Wedding Live Stream"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl opacity-50"
                  >
                    📹
                  </motion.div>
                </div>
              )}
            </div>
            <p className="text-center text-sm text-white/60 mt-4">
              {isLive 
                ? 'Stream is currently live' 
                : 'Stream will begin at the scheduled time'
              }
            </p>
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto">
            <h4 className="text-lg font-bold mb-3">Stream Instructions</h4>
            <ul className="text-white/80 space-y-2 text-left">
              <li>• The live stream will start 15 minutes before the ceremony</li>
              <li>• Make sure you have a stable internet connection</li>
              <li>• You can interact with other viewers in the chat</li>
              <li>• The stream will be available for replay for 30 days</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};