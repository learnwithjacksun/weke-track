import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { ArrowLeft } from "iconsax-reactjs";
import { useBudgetStore } from "@/store";
import { useState } from "react";
import { InputWithoutIcon } from "@/components/ui";
import { toast } from "sonner";

const ICON_OPTIONS = [
  { value: "🍽️", label: "Food & Groceries" },
  { value: "🚗", label: "Transport" },
  { value: "💡", label: "Bills & Utilities" },
  { value: "🎬", label: "Entertainment" },
  { value: "🛍️", label: "Shopping" },
  { value: "🏦", label: "Savings" },
  { value: "🏠", label: "Housing" },
  { value: "💊", label: "Health" },
  { value: "📚", label: "Education" },
  { value: "🎁", label: "Other" },
];

export default function AddBudget() {
  const navigate = useNavigate();
  const addCategory = useBudgetStore((s) => s.addCategory);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(ICON_OPTIONS[0].value);
  const [allocatedAmount, setAllocatedAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(allocatedAmount.replace(/\D/g, ""));
    if (!name.trim()) {
      toast.error("Enter a category name");
      return;
    }
    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setSubmitting(true);
    addCategory({ name: name.trim(), icon, allocatedAmount: amount });
    toast.success("Budget category added");
    navigate("/budget");
  };

  return (
    <MainLayout>
      <div className="pb-12">
        <Link
          to="/budget"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-main mb-6"
        >
          <ArrowLeft size={20} />
          Back to budget
        </Link>

        <h1 className="text-2xl font-semibold text-main tracking-tight">
          Add budget category
        </h1>
        <p className="text-sm text-muted mt-1">
          Set a category and how much you want to allocate.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 max-w-md">
          <InputWithoutIcon
            label="Category name"
            type="text"
            placeholder="e.g Food & Groceries"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="category-name"
            className="bg-background dark:bg-secondary"
          />

          <div className="space-y-2">
            <label className="text-sm text-muted font-medium">Icon</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {ICON_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setIcon(opt.value)}
                  className={`w-10 h-10 rounded-xl border text-lg flex items-center justify-center transition-colors ${
                    icon === opt.value
                      ? "border-primary bg-primary/15 text-main"
                      : "border-line dark:bg-secondary bg-background hover:border-primary/50"
                  }`}
                  title={opt.label}
                >
                  {opt.value}
                </button>
              ))}
            </div>
          </div>

          <InputWithoutIcon
            label="Allocated amount (₦)"
            type="text"
            inputMode="numeric"
            placeholder="e.g 120000"
            value={allocatedAmount}
            onChange={(e) =>
              setAllocatedAmount(e.target.value.replace(/\D/g, ""))
            }
            id="allocated-amount"
            className="bg-background dark:bg-secondary"
          />

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary rounded-xl px-5 py-3 text-sm font-semibold"
            >
              {submitting ? "Adding…" : "Add category"}
            </button>
            <Link
              to="/budget"
              className="btn rounded-xl px-5 py-3 text-sm font-medium border border-line dark:bg-secondary bg-background text-main"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
