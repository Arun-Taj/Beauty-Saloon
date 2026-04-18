import { useEffect, useState } from 'react';
import { bookingService } from '@/services/bookingService';
import { formatDate, formatTime, formatCurrency } from '@/utils/formatDate';
import Button from '@/components/common/Button';

const STATUS_COLORS = {
  pending:   'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
};

const STATUSES = ['All', 'pending', 'confirmed', 'completed', 'cancelled'];

const getAppointmentTimestamp = (apt) => {
  const dt = new Date(apt.date);
  const [hours, minutes] = (apt.timeSlot || '00:00').split(':').map(Number);
  dt.setHours(hours || 0, minutes || 0, 0, 0);
  return dt.getTime();
};

const sortAppointments = (items) =>
  [...items].sort((a, b) => {
    const aCancelled = a.status === 'cancelled';
    const bCancelled = b.status === 'cancelled';

    if (aCancelled !== bCancelled) return aCancelled ? 1 : -1;

    return getAppointmentTimestamp(a) - getAppointmentTimestamp(b);
  });

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [updating, setUpdating] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (filter !== 'All') params.status = filter;
      const res = await bookingService.getAll(params);
      setAppointments(sortAppointments(res.data.data.appointments));
      setPagination(res.data.data.pagination);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter, page]);

  const handleStatusChange = async (id, status) => {
    setUpdating(id);
    try {
      await bookingService.updateStatus(id, { status });
      load(); // refresh table
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => { setFilter(s); setPage(1); }}
            className={`px-4 py-1.5 rounded-full text-xs font-sans capitalize transition-all ${
              filter === s ? 'bg-charcoal-800 text-white' : 'bg-cream-100 text-charcoal-600 hover:bg-cream-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-cream-200">
        <table className="w-full text-sm font-sans">
          <thead className="bg-cream-50 border-b border-cream-200">
            <tr>
              {['Client', 'Service', 'Stylist', 'Date & Time', 'Price', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-charcoal-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(7)].map((_, j) => (
                    <td key={j} className="px-4 py-4">
                      <div className="h-4 bg-cream-100 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : appointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-charcoal-400">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((apt) => (
                <tr key={apt._id} className="hover:bg-cream-50 transition-colors">
                  <td className="px-4 py-4">
                    <p className="font-medium text-charcoal-800">{apt.client?.name}</p>
                    <p className="text-xs text-charcoal-400">{apt.client?.email}</p>
                  </td>
                  <td className="px-4 py-4 text-charcoal-700">{apt.service?.name}</td>
                  <td className="px-4 py-4 text-charcoal-700">{apt.stylist?.name}</td>
                  <td className="px-4 py-4">
                    <p className="text-charcoal-700">{formatDate(apt.date)}</p>
                    <p className="text-xs text-charcoal-400">{formatTime(apt.timeSlot)}</p>
                  </td>
                  <td className="px-4 py-4 text-charcoal-700">{formatCurrency(apt.totalPrice)}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[apt.status]}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {apt.status === 'pending' && (
                        <Button
                          size="sm" variant="outline"
                          loading={updating === apt._id}
                          onClick={() => handleStatusChange(apt._id, 'confirmed')}
                        >
                          Confirm
                        </Button>
                      )}
                      {apt.status === 'confirmed' && (
                        <Button
                          size="sm"
                          loading={updating === apt._id}
                          onClick={() => handleStatusChange(apt._id, 'completed')}
                        >
                          Complete
                        </Button>
                      )}
                      {['pending', 'confirmed'].includes(apt.status) && (
                        <Button
                          size="sm" variant="danger"
                          loading={updating === apt._id}
                          onClick={() => handleStatusChange(apt._id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-5">
          <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Previous
          </Button>
          <span className="text-sm font-sans text-charcoal-600">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button size="sm" variant="outline" disabled={page === pagination.pages} onClick={() => setPage(p => p + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;