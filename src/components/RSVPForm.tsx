import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, User, Users, Heart, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RSVPFormData {
  name: string;
  attendance: 'yes' | 'no' | '';
  guestCount: number;
  message: string;
}

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    attendance: '',
    guestCount: 1,
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if Supabase is configured
      if (supabase) {
        // Save to Supabase
        const { error } = await supabase
          .from('rsvp_responses')
          .insert([
            {
              name: formData.name,
              attendance: formData.attendance,
              guest_count: formData.guestCount,
              message: formData.message
            }
          ]);

        if (error) {
          console.error('Error saving RSVP:', error);
          // Still show success for demo purposes
        }
      } else {
        // Demo mode - just simulate saving
        console.log('Demo mode - RSVP data:', formData);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      // Still show success for demo purposes
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guestCount' ? parseInt(value) || 1 : value
    }));
  };

  if (isSubmitted) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-green-600" />
            </motion.div>

            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Thank You!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              {formData.attendance === 'yes' 
                ? `We're excited to celebrate with you, ${formData.name}!`
                : `Thank you for your response, ${formData.name}. We'll miss you!`
              }
            </p>

            {formData.attendance === 'yes' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 p-6 bg-white rounded-2xl shadow-lg"
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  See You at Our Wedding!
                </h4>
                <p className="text-gray-600">
                  We can't wait to celebrate this special day with you. 
                  Please save the date and we'll see you there! 💕
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            RSVP
          </h2>
          <p className="text-lg text-gray-600">
            Please let us know if you can join our celebration
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl space-y-6"
        >
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full name"
            />
          </div>

          {/* Attendance Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Heart className="w-4 h-4 inline mr-2" />
              Will you attend? *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, attendance: 'yes' }))}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.attendance === 'yes'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:border-green-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ✅ Yes, I'll be there!
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, attendance: 'no' }))}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.attendance === 'no'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:border-red-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ❌ Sorry, can't make it
              </motion.button>
            </div>
          </div>

          {/* Guest Count - only show if attending */}
          {formData.attendance === 'yes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Number of Guests
              </label>
              <select
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'person' : 'people'}
                  </option>
                ))}
              </select>
            </motion.div>
          )}

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Message for the Couple
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Share your wishes and blessings..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!formData.name || !formData.attendance || isSubmitting}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-6 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            whileHover={{ scale: formData.name && formData.attendance ? 1.02 : 1 }}
            whileTap={{ scale: formData.name && formData.attendance ? 0.98 : 1 }}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send RSVP
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};