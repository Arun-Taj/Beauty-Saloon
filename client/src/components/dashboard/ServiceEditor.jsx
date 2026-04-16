import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { serviceService } from '@/services/serviceService';
import { useServiceStore } from '@/store/useServiceStore';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';

const CATEGORIES = ['Hair', 'Nails', 'Skin', 'Makeup', 'Wellness'];
const EMPTY_FORM = { name: '', category: 'Hair', description: '', price: '', duration: '', image: '' };

const ServiceEditor = () => {
  const { services, setServices, addService, updateService, removeService } = useServiceStore();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = create mode
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    serviceService.getAll()
      .then((res) => setServices(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (service) => {
    setEditing(service);
    setForm({
      name: service.name, category: service.category,
      description: service.description || '',
      price: service.price, duration: service.duration,
      image: service.image || '',
    });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      if (editing) {
        const res = await serviceService.update(editing._id, form);
        updateService(res.data.data);
      } else {
        const res = await serviceService.create(form);
        addService(res.data.data);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this service?')) return;
    await serviceService.remove(id);
    removeService(id);
  };

  const field = (key, label, type = 'text', extra = {}) => (
    <div>
      <label className="block text-sm font-sans text-charcoal-600 mb-1">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full px-4 py-2.5 rounded-xl border border-cream-200 font-sans text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
        {...extra}
      />
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-serif text-xl text-charcoal-800">Manage Services</h3>
        <Button size="sm" onClick={openCreate}>
          <Plus size={16} /> Add Service
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-16 rounded-xl bg-cream-100 animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service._id}
              className="flex items-center justify-between bg-white border border-cream-200 rounded-xl px-4 py-3 hover:shadow-card transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-sans font-medium text-charcoal-800">{service.name}</p>
                  <p className="text-xs text-charcoal-400 font-sans">{service.category} · ${service.price} · {service.duration}min</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full font-sans ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </span>
                <button onClick={() => openEdit(service)} className="p-2 hover:bg-cream-100 rounded-lg transition-colors">
                  <Pencil size={15} className="text-charcoal-600" />
                </button>
                <button onClick={() => handleDelete(service._id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={15} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Service' : 'Add New Service'}
      >
        <div className="space-y-4">
          {field('name', 'Service Name', 'text', { placeholder: 'e.g. Balayage Highlights' })}

          <div>
            <label className="block text-sm font-sans text-charcoal-600 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-200 font-sans text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-sans text-charcoal-600 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              placeholder="Short description of this service..."
              className="w-full px-4 py-2.5 rounded-xl border border-cream-200 font-sans text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {field('price',    'Price ($)',       'number', { min: 0,  placeholder: '65' })}
            {field('duration', 'Duration (min)',  'number', { min: 15, placeholder: '60' })}
          </div>

          {field('image', 'Image URL (Unsplash)', 'url', { placeholder: 'https://images.unsplash.com/...' })}

          {error && (
            <p className="text-sm text-red-500 font-sans">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setModalOpen(false)}>
              <X size={15} /> Cancel
            </Button>
            <Button className="flex-1" loading={submitting} onClick={handleSubmit}>
              <Check size={15} /> {editing ? 'Save Changes' : 'Create Service'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ServiceEditor;