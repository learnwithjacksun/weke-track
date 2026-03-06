import { Link } from "react-router-dom";
import { useTime } from "@/hooks";
import { MainLayout } from "@/layouts";
import {
    Clock,
    Wallet2,
    MoneyRecive,
    MoneySend,
    Add,
    Chart2,
    AddCircle,
    Trash,
    ArrowDown,
    ArrowUp,
} from "iconsax-reactjs";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBudgetStore } from "@/store";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { InputWithoutIcon } from "@/components/ui";
import { toast } from "sonner";

const Title = () => {
    const time = useTime();
    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
                <h1 className="text-2xl font-semibold text-main tracking-tight">
                    Budget
                </h1>
                <p className="text-sm text-muted mt-0.5">Track and manage your spending</p>
            </div>
            <div className="flex items-center gap-2 bg-background dark:bg-secondary border border-line px-3 py-2 rounded-xl">
                <Clock size={18} className="text-primary shrink-0" />
                <span className="text-sm text-muted font-medium">{time}</span>
            </div>
        </div>
    );
};

function formatCurrency(n: number) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(n);
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
};

function LogSpendingModal({
    categoryId,
    categoryName,
    onClose,
}: {
    categoryId: string;
    categoryName: string;
    onClose: () => void;
}) {
    const addBudgetItem = useBudgetStore((s) => s.addBudgetItem);
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!note.trim()) {
            toast.error("Enter an item name");
            return;
        }
        const value = Number(amount.replace(/\D/g, ""));
        if (!value || value <= 0) {
            toast.error("Enter a valid amount");
            return;
        }

        setSubmitting(true);
        addBudgetItem({ categoryId, amount: value, note: note.trim() || undefined });
        toast.success("Spending logged");
        onClose();
    };

    return (
        <Modal isOpen={true} title={`Log spending · ${categoryName}`} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputWithoutIcon
                    label="Item name"
                    type="text"
                    placeholder="e.g Lunch at restaurant"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    id="spending-note"
                    className="bg-background dark:bg-secondary"
                />
                <InputWithoutIcon
                    label="Amount (₦)"
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g 5000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                    id="spending-amount"
                    className="bg-background dark:bg-secondary"
                />

                <div className="flex gap-2 pt-2">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary rounded-xl px-4 py-2.5 text-sm font-semibold"
                    >
                        {submitting ? "Logging…" : "Log spending"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn rounded-xl px-4 py-2.5 text-sm font-medium border border-line bg-secondary text-main"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default function BudgetList() {
    const categories = useBudgetStore((s) => s.categories);
    const items = useBudgetStore((s) => s.items);
    const getSpentByCategoryId = useBudgetStore((s) => s.getSpentByCategoryId);
    const removeCategory = useBudgetStore((s) => s.removeCategory);
    const [logModal, setLogModal] = useState<{
        id: string;
        name: string;
    } | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const totalBudget = categories.reduce((s, c) => s + c.allocatedAmount, 0);
    const totalSpent = categories.reduce(
        (s, c) => s + getSpentByCategoryId(c.id),
        0
    );
    const remaining = totalBudget - totalSpent;
    const spentPct = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
    const remainingPct = totalBudget > 0 ? Math.round((remaining / totalBudget) * 100) : 0;

    const summaryCards = [
        {
            label: "Total budget",
            value: formatCurrency(totalBudget),
            icon: Wallet2,
            trend: null,
            color: "bg-primary/15 text-primary border-primary/20",
        },
        {
            label: "Spent",
            value: formatCurrency(totalSpent),
            icon: MoneySend,
            trend: totalBudget > 0 ? `${spentPct}%` : "—",
            color: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20",
        },
        {
            label: "Remaining",
            value: formatCurrency(remaining),
            icon: MoneyRecive,
            trend: totalBudget > 0 ? `${remainingPct}%` : "—",
            color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        },
    ];

    return (
        <MainLayout>
            <div className="pb-12 space-y-8">
                <Title />

                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={container}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                    {summaryCards.map((card) => (
                        <motion.div
                            key={card.label}
                            variants={item}
                            className={`rounded-2xl border p-4 ${card.color}`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="p-2 rounded-xl bg-background/60 dark:bg-background/40">
                                    <card.icon size={20} className="text-current" />
                                </div>
                                {card.trend && (
                                    <span className="text-xs font-semibold opacity-90">
                                        {card.trend}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs font-medium text-muted mt-3 uppercase tracking-wider">
                                {card.label}
                            </p>
                            <p className="text-lg font-bold text-main mt-1">{card.value}</p>
                        </motion.div>
                    ))}
                </motion.section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-semibold text-main flex items-center gap-2">
                            <Chart2 size={20} className="text-primary" />
                            By category
                        </h2>
                        <Link
                            to="/budget/add"
                            className="btn btn-primary rounded-xl px-4 py-2.5 text-sm font-medium gap-2 shadow-sm"
                        >
                            <Add size={18} />
                            Add budget
                        </Link>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {categories.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="rounded-2xl border border-dashed border-line bg-background dark:bg-secondary/30 p-8 text-center"
                            >
                                <p className="text-muted text-sm">No budget categories yet.</p>
                                <Link
                                    to="/budget/add"
                                    className="btn btn-primary rounded-xl px-4 py-2.5 text-sm font-medium gap-2 mt-4 inline-flex"
                                >
                                    <Add size={18} />
                                    Add your first category
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.ul
                                initial="hidden"
                                animate="show"
                                variants={container}
                                className="space-y-3"
                            >
                                {categories.map((cat) => {
                                    const spent = getSpentByCategoryId(cat.id);
                                    const pct = Math.min(
                                        100,
                                        cat.allocatedAmount > 0
                                            ? Math.round((spent / cat.allocatedAmount) * 100)
                                            : 0
                                    );
                                    const isOver = spent > cat.allocatedAmount;
                                    const categoryItems = items
                                        .filter((i) => i.categoryId === cat.id)
                                        .sort((a, b) => b.createdAt - a.createdAt);
                                    const isExpanded = expandedId === cat.id;
                                    return (
                                        <motion.li
                                            key={cat.id}
                                            variants={item}
                                            layout
                                            className="bg-background dark:bg-secondary border border-line rounded-2xl p-4 hover:border-primary/30 transition-colors"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setExpandedId(isExpanded ? null : cat.id)
                                                }
                                                className="w-full flex items-center justify-between gap-3 text-left"
                                            >
                                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                                    <span className="text-muted shrink-0">
                                                        {isExpanded ? (
                                                            <ChevronUp size={20} />
                                                        ) : (
                                                            <ChevronDown size={20} />
                                                        )}
                                                    </span>
                                                    <span className="text-xl shrink-0" aria-hidden>
                                                        {cat.icon}
                                                    </span>
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-main truncate">
                                                            {cat.name}
                                                        </p>
                                                        <p className="text-xs text-muted mt-0.5">
                                                            {formatCurrency(spent)} of{" "}
                                                            {formatCurrency(cat.allocatedAmount)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    {isOver ? (
                                                        <ArrowUp size={16} className="text-rose-500" />
                                                    ) : (
                                                        <ArrowDown size={16} className="text-emerald-500" />
                                                    )}
                                                    <span
                                                        className={`text-sm font-semibold ${isOver
                                                            ? "text-rose-500"
                                                            : "text-emerald-600 dark:text-emerald-400"
                                                            }`}
                                                    >
                                                        {pct}%
                                                    </span>
                                                </div>
                                            </button>
                                            <div className="mt-3 h-2 bg-background dark:bg-foreground/30 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pct}%` }}
                                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                                    className={`h-full rounded-full ${isOver ? "bg-rose-500" : "bg-primary"
                                                        }`}
                                                />
                                            </div>

                                            <AnimatePresence>
                                                {isExpanded && categoryItems.length > 0 && (
                                                    <motion.div
                                                        key="items"
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <ul className="mt-3 pt-3 border-t border-line space-y-2">
                                                            {categoryItems.map((entry) => (
                                                                <li
                                                                    key={entry.id}
                                                                    className="flex items-center justify-between gap-2 text-sm"
                                                                >
                                                                    <span className="text-muted truncate">
                                                                        {entry.note || "Spending"}
                                                                    </span>
                                                                    <span className="font-medium text-main shrink-0">
                                                                        {formatCurrency(entry.amount)}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                )}
                                                {isExpanded && categoryItems.length === 0 && (
                                                    <motion.p
                                                        key="empty"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="mt-3 pt-3 border-t border-line text-xs text-muted"
                                                    >
                                                        No spending logged yet.
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>

                                            <div className="mt-3 flex gap-2 w-full">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setLogModal({ id: cat.id, name: cat.name })
                                                    }
                                                    className="flex-1 btn rounded-xl px-3 py-2.5 text-sm font-medium gap-2 border border-line bg-background/50 hover:border-primary/50 text-main hover:text-primary transition-colors"
                                                >
                                                    <AddCircle size={18} />
                                                    Log spending
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                `Remove "${cat.name}" and its spending?`
                                                            )
                                                        ) {
                                                            removeCategory(cat.id);
                                                            toast.success("Category removed");
                                                        }
                                                    }
                                                    }
                                                    className="flex-1 btn rounded-xl px-3 py-2.5 text-sm font-medium gap-2 border border-line bg-background/50 hover:border-rose-500/50 text-muted hover:text-rose-500 transition-colors"
                                                >
                                                    <Trash size={18} />
                                                    Delete
                                                </button>
                                            </div>
                                        </motion.li>
                                    );
                                })}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </section>
            </div>

            {logModal && (
                <LogSpendingModal
                    categoryId={logModal.id}
                    categoryName={logModal.name}
                    onClose={() => setLogModal(null)}
                />
            )}
        </MainLayout>
    );
}
