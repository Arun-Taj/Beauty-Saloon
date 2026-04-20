import { useState } from 'react';
import { LayoutDashboard, Calendar, Scissors, LogOut, Sparkles, BarChart3 } from 'lucide-react';
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

  const activeTabLabel = TABS.find((tab) => tab.id === activeTab)?.label ?? 'Overview';

  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.16),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(34,34,34,0.08),_transparent_28%),linear-gradient(180deg,_#fdfaf5_0%,_#f8f3eb_100%)] pt-24 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-charcoal-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1600px] gap-6 px-4 pb-8 sm:px-6 lg:px-8">
        {/* Sidebar */}
        <aside className="sticky top-28 hidden h-[calc(100vh-8rem)] w-72 shrink-0 flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-charcoal-900/95 text-cream-100 shadow-[0_24px_80px_rgba(17,17,17,0.18)] backdrop-blur-xl md:flex">
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500 text-white shadow-lg shadow-gold-500/30">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="min-w-0">
                <p className="truncate font-serif text-lg text-white">{user?.name}</p>
                <p className="text-xs uppercase tracking-[0.24em] text-cream-300">{user?.role} console</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            {TABS.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;

              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white shadow-lg shadow-gold-500/20'
                      : 'text-cream-300 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <Icon size={17} className={isActive ? 'text-white' : 'text-cream-300 group-hover:text-white'} />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-cream-300 transition-all hover:bg-white/10 hover:text-white"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_24px_80px_rgba(17,17,17,0.08)] backdrop-blur-xl">
          <div className="border-b border-cream-200/80 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
                  <Sparkles size={14} />
                  Admin Dashboard
                </div>
                <h1 className="font-serif text-3xl text-charcoal-900 sm:text-4xl lg:text-5xl">
                  Manage bookings with a cleaner, calmer workspace.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-charcoal-600 sm:text-base">
                  Track appointments, review revenue, and update services from one focused admin view.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-charcoal-500">Current section</p>
                  <p className="mt-1 font-serif text-lg text-charcoal-800">{activeTabLabel}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-2xl border border-charcoal-900 bg-charcoal-900 px-4 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-charcoal-800"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-2 overflow-x-auto pb-1 md:hidden hide-scrollbar">
              {TABS.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;

                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-charcoal-900 text-white shadow-md'
                        : 'bg-cream-100 text-charcoal-600 hover:bg-cream-200'
                    }`}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-8 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            {activeTab === 'overview' && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <BarChart3 size={20} className="text-gold-500" />
                  <h2 className="font-serif text-2xl text-charcoal-900 sm:text-3xl">Dashboard Overview</h2>
                </div>
                <StatsOverview />
              </section>
            )}

            {activeTab === 'appointments' && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-gold-500" />
                  <h2 className="font-serif text-2xl text-charcoal-900 sm:text-3xl">Appointments</h2>
                </div>
                <AppointmentTable />
              </section>
            )}

            {activeTab === 'services' && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <Scissors size={20} className="text-gold-500" />
                  <h2 className="font-serif text-2xl text-charcoal-900 sm:text-3xl">Services</h2>
                </div>
                <ServiceEditor />
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;