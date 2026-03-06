import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BudgetState {
  categories: BudgetCategory[];
  items: BudgetItem[];
  addCategory: (payload: {
    name: string;
    icon: string;
    allocatedAmount: number;
  }) => void;
  removeCategory: (id: string) => void;
  addBudgetItem: (payload: {
    categoryId: string;
    amount: number;
    note?: string;
  }) => void;
  removeBudgetItem: (id: string) => void;
  getSpentByCategoryId: (categoryId: string) => number;
}

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set, get) => ({
      categories: [],
      items: [],

      addCategory: (payload) =>
        set((state) => ({
          categories: [
            ...state.categories,
            {
              id: crypto.randomUUID(),
              name: payload.name,
              icon: payload.icon,
              allocatedAmount: payload.allocatedAmount,
              createdAt: Date.now(),
            },
          ],
        })),

      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
          items: state.items.filter((i) => i.categoryId !== id),
        })),

      addBudgetItem: (payload) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              id: crypto.randomUUID(),
              categoryId: payload.categoryId,
              amount: payload.amount,
              note: payload.note,
              createdAt: Date.now(),
            },
          ],
        })),

      removeBudgetItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      getSpentByCategoryId: (categoryId) =>
        get().items
          .filter((i) => i.categoryId === categoryId)
          .reduce((sum, i) => sum + i.amount, 0),
    }),
    { name: "weke-budget" }
  )
);
