import { create } from 'zustand';
import { SubscriptionStore } from './useSubscriptionStore';

export type Item = SubscriptionStore & {
  useId: string;
};

export type ItemState = {
  items: Item[]; // 아이템 리스트
  addItem: (item: Item) => void;  // 추가(post)
  getItemById: (id: string) => Item | undefined; // 조회(get)
  updateItem: (id: string, updatedItem: Partial<Item>) => void; // 수정(put)
  removeItem: (id: string) => void; // 삭제(delete)
};

export const useItemStore = create<ItemState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  getItemById: (id) =>
    useItemStore.getState().items.find((item) => item.id === id),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateItem: (id, updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    })),
}));