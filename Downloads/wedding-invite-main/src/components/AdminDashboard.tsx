import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, MessageCircle, Calendar, Download, X } from 'lucide-react';
import { supabase, RSVPResponse } from '../lib/supabase';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [rsvpData, setRsvpData] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'yes' | 'no'>('all');

  useEffect(() => {
    fetchRSVPData();
  }, []);

  const fetchRSVPData = async () => {
    try {
      if (!supabase) {
        // Demo data for when Supabase is not configured
        const demoData: RSVPResponse[] = [
          {
            id: 1,
            name: "John Doe",
            attendance: "yes",
            guest_count: 2,
            message: "Congratulations! Can't wait to celebrate with you both!",
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            name: "Jane Smith",
            attendance: "no",
            guest_count: 1,
            message: "Sorry I can't make it, but wishing you all the best!",
            created_at: new Date(Date.now() - 86400000).toISOString()
          }
        ];
        setRsvpData(demoData);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('rsvp_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching RSVP data:', error);
        setRsvpData([]);
        return;
      }

      setRsvpData(data || []);
    } catch (error) {
      console.error('Error:', error);
      setRsvpData([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = rsvpData.filter(item => 
    filter === 'all' ? true : item.attendance === filter
  );

  const stats = {
    total: rsvpData.length,
    attending: rsvpData.filter(item => item.attendance === 'yes').length,
    notAttending: rsvpData.filter(item => item.attendance === 'no').length,
    totalGuests: rsvpData
      .filter(item => item.attendance === 'yes')
      .reduce((sum, item) => sum + item.guest_count, 0)
  };

  const exportToCSV = () => {
    const headers = ['Nama', 'Kehadiran', 'Jumlah Tamu', 'Pesan', 'Tanggal RSVP'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(item => [
        `"${item.name}"`,
        item.attendance === 'yes' ? 'Hadir' : 'Tidak Hadir',
        item.guest_count,
        `"${item.message.replace(/"/g, '""')}"`,
        new Date(item.created_at).toLocaleDateString('id-ID')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `rsvp-data-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8">
          <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading RSVP data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">RSVP Dashboard</h2>
              {!supabase && (
                <p className="text-pink-100 text-sm mt-1">Demo Mode - Connect Supabase for real data</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total RSVP</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{stats.attending}</div>
              <div className="text-sm text-gray-600">Akan Hadir</div>
            </div>
            <div className="bg-red-50 p-4 rounded-xl text-center">
              <UserX className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">{stats.notAttending}</div>
              <div className="text-sm text-gray-600">Tidak Hadir</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl text-center">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{stats.totalGuests}</div>
              <div className="text-sm text-gray-600">Total Tamu</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 border-b flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semua ({stats.total})
            </button>
            <button
              onClick={() => setFilter('yes')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'yes' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Hadir ({stats.attending})
            </button>
            <button
              onClick={() => setFilter('no')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'no' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tidak Hadir ({stats.notAttending})
            </button>
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* RSVP List */}
        <div className="overflow-auto max-h-96">
          {filteredData.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Belum ada RSVP yang masuk</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredData.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.attendance === 'yes' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.attendance === 'yes' ? 'Hadir' : 'Tidak Hadir'}
                        </span>
                        {item.attendance === 'yes' && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {item.guest_count} orang
                          </span>
                        )}
                      </div>
                      {item.message && (
                        <div className="flex items-start gap-2 text-gray-600">
                          <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{item.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};