import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { ArrowLeft } from "iconsax-reactjs";
import { useTodoStore } from "@/store";
import { useState } from "react";
import { InputWithoutIcon } from "@/components/ui";
import { toast } from "sonner";

const TAG_OPTIONS = [
  "Personal",
  "Work",
  "Finance",
  "Budget",
  "Health",
  "Shopping",
  "Other",
];

export default function AddTodo() {
  const navigate = useNavigate();
  const addTodo = useTodoStore((s) => s.addTodo);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Enter a title");
      return;
    }
    setSubmitting(true);
    addTodo({ title: title.trim(), tag: tag || undefined });
    toast.success("Todo added");
    navigate("/todos");
  };

  return (
    <MainLayout>
      <div className="pb-12">
        <Link
          to="/todos"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-main mb-6"
        >
          <ArrowLeft size={20} />
          Back to todos
        </Link>

        <h1 className="text-2xl font-semibold text-main tracking-tight">
          New todo
        </h1>
        <p className="text-sm text-muted mt-1">
          Add a task to track and complete.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 max-w-md">
          <InputWithoutIcon
            label="Title"
            type="text"
            placeholder="e.g Review budget categories"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="todo-title"
          />

          <div className="space-y-2">
            <label className="text-sm text-muted font-medium">Tag (optional)</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {TAG_OPTIONS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(tag === t ? "" : t)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    tag === t
                      ? "border-primary bg-primary/15 text-main"
                      : "border-line bg-secondary text-muted hover:border-primary/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary rounded-xl px-5 py-3 text-sm font-semibold"
            >
              {submitting ? "Adding…" : "Add todo"}
            </button>
            <Link
              to="/todos"
              className="btn rounded-xl px-5 py-3 text-sm font-medium border border-line bg-secondary text-main"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
