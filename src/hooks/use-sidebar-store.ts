import { create } from 'zustand';

interface SidebarStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSidebar = create<SidebarStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: !get().isOpen }),
  onClose: () => set({ isOpen: false }),
}));
