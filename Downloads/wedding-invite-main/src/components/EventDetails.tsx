import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Plus } from 'lucide-react';
import { WeddingData } from '../data/weddingData';

interface EventDetailsProps {
  event: WeddingData['event'];
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const eventDate = new Date(`${event.date}T${event.time}`);
  
  const addToCalendar = () => {
    const startTime = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endTime = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sarah%20%26%20David%20Wedding&dates=${startTime}/${endTime}&details=Wedding%20celebration%20of%20Sarah%20and%20David&location=${encodeURIComponent(event.address)}`;
    
    window.open(calendarUrl, '_blank');
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Save the Date
          </h2>
          <p className="text-lg text-gray-600">
            Join us as we celebrate the beginning of our forever
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Event Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Date</h3>
                  <p className="text-gray-600">
                    {eventDate.toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Time</h3>
                  <p className="text-gray-600">{event.time} WIB - Selesai</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Venue</h3>
                  <p className="text-gray-600 font-medium">{event.venue}</p>
                  <p className="text-sm text-gray-500 mt-1">{event.address}</p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={addToCalendar}
              className="w-full mt-8 bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 px-6 rounded-full font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-5 h-5" />
              Add to Calendar
            </motion.button>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="font-semibold text-gray-800 mb-4 text-center">Location</h3>
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <iframe
                src={event.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
            <motion.a
              href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-full font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Open in Maps
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};