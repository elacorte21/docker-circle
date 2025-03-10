import { create } from 'zustand';

interface StoreState {
    bookCartIds: number[];
    addBookToCart: (id: number) => void;
    removeBookFromCart: (id: number) => void;
    clearCart: () => void;
}

export const useStore = create<StoreState>((set) => ({
    bookCartIds: [],
    addBookToCart: (id) => set((state) => {
        if (!state.bookCartIds.includes(id)) {
            return { bookCartIds: [...state.bookCartIds, id] };
        }
        return state;
    }),
    removeBookFromCart: (id) => set((state) => {
        const updatedIds = state.bookCartIds.filter(bookId => bookId !== id);
        return { bookCartIds: updatedIds };
    }),
    clearCart: () => set({ bookCartIds: [] })
}));
  
export const fetchCartIds = (): number[] => {
    const { bookCartIds } = useStore.getState();
    return bookCartIds;
} 
