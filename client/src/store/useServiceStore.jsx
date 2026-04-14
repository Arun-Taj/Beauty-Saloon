import { create } from 'zustand';

export const useServiceStore = create((set) => ({
  services: [],
  categories: ['Hair', 'Nails', 'Skin', 'Makeup', 'Wellness'],
  activeCategory: 'All',
  loading: false,
  error: null,

  setServices: (services) => set({ services }),
  setLoading:  (loading)  => set({ loading }),
  setError:    (error)    => set({ error }),
  setCategory: (cat)      => set({ activeCategory: cat }),

  // Optimistic add/edit/delete for snappy dashboard UX
  addService: (service) =>
    set((s) => ({ services: [...s.services, service] })),

  updateService: (updated) =>
    set((s) => ({
      services: s.services.map((sv) =>
        sv._id === updated._id ? updated : sv
      ),
    })),

  removeService: (id) =>
    set((s) => ({
      services: s.services.filter((sv) => sv._id !== id),
    })),
}));