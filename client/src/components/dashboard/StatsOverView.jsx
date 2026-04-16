import { useEffect, useState } from 'react';
import { TrendingUp, Calendar, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';
import { bookingService } from '@/services/bookingService';
import { formatCurrency } from '@/utils/formatDate';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-2xl border border-cream-200 shadow-card p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-sm font-sans text-charcoal-500">{label}</p>
      <p className="text-2xl font-serif text-charcoal-800 mt-0.5">{value}</p>
    </div>
  </div>
);

const StatsOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getStats()
      .then((res) => setStats(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-cream-100 animate-pulse" />
        ))}
      </div>
    );
  }

  const cards = [
    { icon: Calendar,    label: 'Total Bookings',    value: stats.bookings.total,     color: 'bg-charcoal-700' },
    { icon: Clock,       label: 'Pending',            value: stats.bookings.pending,   color: 'bg-amber-500' },
    { icon: CheckCircle, label: 'Confirmed',          value: stats.bookings.confirmed, color: 'bg-blue-500' },
    { icon: TrendingUp,  label: 'Completed',          value: stats.bookings.completed, color: 'bg-green-500' },
    { icon: XCircle,     label: 'Cancelled',          value: stats.bookings.cancelled, color: 'bg-red-400' },
    { icon: DollarSign,  label: 'Revenue This Month', value: formatCurrency(stats.revenue.thisMonth), color: 'bg-gold-500' },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => <StatCard key={card.label} {...card} />)}
      </div>

      {/* All-time revenue highlight */}
      <div className="bg-charcoal-800 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-sans text-cream-300">All-Time Revenue</p>
          <p className="font-serif text-4xl text-gold-400 mt-1">{formatCurrency(stats.revenue.allTime)}</p>
        </div>
        <TrendingUp size={40} className="text-gold-500 opacity-40" />
      </div>
    </div>
  );
};

export default StatsOverview;