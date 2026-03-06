import { Link } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { TickCircle, Add, Trash } from "iconsax-reactjs";
import { motion, AnimatePresence } from "framer-motion";
import { useTodoStore } from "@/store";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function Todos() {
  const todos = useTodoStore((s) => s.todos);
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const removeTodo = useTodoStore((s) => s.removeTodo);
  const doneCount = todos.filter((t) => t.done).length;

  return (
    <MainLayout>
      <div className="pb-12 space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-main tracking-tight">
              Todos
            </h1>
            <p className="text-sm text-muted mt-0.5">
              {doneCount} of {todos.length} completed
            </p>
          </div>

          <Link
            to="/todos/add"
            className="btn btn-primary rounded-xl px-4 py-2.5 text-sm font-medium gap-2 shadow-sm"
          >
            <Add size={18} />
            New todo
          </Link>
        </div>

        <AnimatePresence mode="popLayout">
          {todos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-dashed border-line bg-secondary/50 dark:bg-secondary/30 p-8 text-center"
            >
              <p className="text-muted text-sm">No todos yet.</p>
              <Link
                to="/todos/add"
                className="btn btn-primary rounded-xl px-4 py-2.5 text-sm font-medium gap-2 mt-4 inline-flex"
              >
                <Add size={18} />
                Add your first todo
              </Link>
            </motion.div>
          ) : (
            <motion.ul
              initial="hidden"
              animate="show"
              variants={container}
              className="space-y-3"
            >
              <AnimatePresence>
                {todos.map((t) => (
                  <motion.li
                    key={t.id}
                    variants={item}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-secondary dark:bg-secondary/60 border border-line rounded-2xl p-4 flex items-center justify-between gap-3"
                  >
                    <div
                    
                      onClick={() => toggleTodo(t.id)}
                      className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer"
                    >
                      <TickCircle
                        size={22}
                        variant={t.done ? "Bold" : "Outline"}
                        className={`shrink-0 ${
                          t.done ? "text-emerald-500" : "text-muted"
                        }`}
                      />
                      <div className="min-w-0">
                        <p
                          className={[
                            "font-medium text-main truncate",
                            t.done ? "line-through opacity-70" : "",
                          ].join(" ")}
                        >
                          {t.title}
                        </p>
                        {t.tag && (
                          <p className="text-xs text-muted mt-0.5">{t.tag}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Delete this todo?")) {
                          removeTodo(t.id);
                        }
                      }}
                      className="p-2 rounded-lg border border-line bg-background/50 hover:border-rose-500/50 text-muted hover:text-rose-500 transition-colors shrink-0"
                      title="Delete todo"
                    >
                      <Trash size={18} />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
