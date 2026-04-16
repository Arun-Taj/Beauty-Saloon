import { useState } from 'react';
import { LayoutDashboard, Calendar, Scissors, Users, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import StatsOverview from '@/components/dashboard/StatsOverview';
import AppointmentTable from '@/components/dashboard/AppointmentTable';
import ServiceEditor from '@/components/dashboard/ServiceEditor';

const TABS = [
  { id: 'overview',      label: 'Overview',     icon: LayoutDashboard },
  { id: 'appointments',  label: 'Appointments', icon: Calendar },
  { id: 'services',      label: 'Services',     icon: Scissors },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal-800 text-cream-100 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-serif">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <p className="font-sans font-medium text-white text-sm">{user?.name}</p>
              <p className="font-sans text-xs text-cream-300 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans transition-all ${
                activeTab === id
                  ? 'bg-gold-500 text-white'
                  : 'text-cream-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans text-cream-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {/* Mobile tab bar */}
        <div className="flex gap-2 mb-6 md:hidden overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans whitespace-nowrap ${
                activeTab === id ? 'bg-charcoal-800 text-white' : 'bg-cream-100 text-charcoal-600'
              }`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            <h2 className="font-serif text-3xl text-charcoal-800 mb-6">Dashboard Overview</h2>
            <StatsOverview />
          </div>
        )}
        {activeTab === 'appointments' && (
          <div>
            <h2 className="font-serif text-3xl text-charcoal-800 mb-6">Appointments</h2>
            <AppointmentTable />
          </div>
        )}
        {activeTab === 'services' && (
          <div>
            <h2 className="font-serif text-3xl text-charcoal-800 mb-6">Services</h2>
            <ServiceEditor />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;