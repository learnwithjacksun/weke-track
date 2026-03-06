import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoState {
  todos: Todo[];
  addTodo: (payload: { title: string; tag?: string }) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, payload: { title?: string; tag?: string }) => void;
  removeTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: (payload) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              title: payload.title,
              done: false,
              tag: payload.tag,
              createdAt: Date.now(),
            },
          ],
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),

      updateTodo: (id, payload) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, ...payload } : t
          ),
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),
    }),
    { name: "weke-todos" }
  )
);
