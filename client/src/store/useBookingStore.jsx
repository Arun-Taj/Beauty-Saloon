import { create } from 'zustand';

export const useBookingStore = create((set) => ({
  // Wizard state
  currentStep: 1,          // 1: service → 2: stylist → 3: datetime → 4: confirm
  selectedService: null,
  selectedStylist: null,
  selectedDate: null,
  selectedTimeSlot: null,
  notes: '',

  // Actions
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),
  prevStep: () => set((s) => ({ currentStep: s.currentStep - 1 })),

  setService:   (service)  => set({ selectedService: service, selectedStylist: null }),
  setStylist:   (stylist)  => set({ selectedStylist: stylist }),
  setDate:      (date)     => set({ selectedDate: date, selectedTimeSlot: null }),
  setTimeSlot:  (slot)     => set({ selectedTimeSlot: slot }),
  setNotes:     (notes)    => set({ notes }),

  resetBooking: () =>
    set({
      currentStep: 1,
      selectedService: null,
      selectedStylist: null,
      selectedDate: null,
      selectedTimeSlot: null,
      notes: '',
    }),
}));