import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CreditCard, Copy, Check, Send, Heart } from 'lucide-react';
import { WeddingData } from '../data/weddingData';

interface EGiftProps {
  gift: WeddingData['gift'];
}

export const EGift: React.FC<EGiftProps> = ({ gift }) => {
  const [copiedField, setCopiedField] = useState<string>('');
  const [giftMessage, setGiftMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmitGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (senderName.trim()) {
      setIsSubmitted(true);
      // Here you would typically send the data to your backend
      console.log('Gift message submitted:', { senderName, giftMessage });
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-yellow-50 to-pink-50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="w-10 h-10 text-yellow-600" fill="currentColor" />
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Thank You, {senderName}!
            </h3>
            <p className="text-lg text-gray-600">
              Your thoughtful gift and kind words mean the world to us. 
              We're so grateful for your love and support! 💕
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-yellow-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Wedding Gift
          </h2>
          <p className="text-lg text-gray-600">
            Your presence is the greatest gift, but if you wish to give something more...
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Bank Transfer */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Bank Transfer</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Bank Name
                </label>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium">{gift.bankName}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Account Number
                </label>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="font-mono font-medium">{gift.accountNumber}</span>
                  <motion.button
                    onClick={() => copyToClipboard(gift.accountNumber, 'account')}
                    className="ml-2 p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copiedField === 'account' ? 
                      <Check className="w-4 h-4 text-green-600" /> : 
                      <Copy className="w-4 h-4" />
                    }
                  </motion.button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Account Name
                </label>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium">{gift.accountName}</span>
                  <motion.button
                    onClick={() => copyToClipboard(gift.accountName, 'name')}
                    className="ml-2 p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copiedField === 'name' ? 
                      <Check className="w-4 h-4 text-green-600" /> : 
                      <Copy className="w-4 h-4" />
                    }
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* QRIS */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">QRIS Payment</h3>
            </div>

            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block p-4 bg-white rounded-2xl shadow-lg mb-4"
              >
                <img
                  src={gift.qrisUrl}
                  alt="QRIS Code"
                  className="w-48 h-48 mx-auto"
                />
              </motion.div>
              <p className="text-sm text-gray-600">
                Scan this QR code with any e-wallet app
              </p>
            </div>
          </motion.div>
        </div>

        {/* Gift Message Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Send a Message with Your Gift
            </h3>
            
            <form onSubmit={handleSubmitGift} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Share your wishes and blessings..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={!senderName.trim()}
                className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 text-white py-4 px-6 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-yellow-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                whileHover={{ scale: senderName.trim() ? 1.02 : 1 }}
                whileTap={{ scale: senderName.trim() ? 0.98 : 1 }}
              >
                <Send className="w-5 h-5" />
                Send Gift Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};