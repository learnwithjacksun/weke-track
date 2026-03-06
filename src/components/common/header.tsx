import { Link, useLocation } from "react-router-dom";
import ModeToggle from "../ui/mode-toggle";

export default function Header() {
    const { pathname } = useLocation();
    const isTodos = pathname.startsWith("/todos");
    const isBudget = pathname.startsWith("/budget");

    return (
        <>
            <header className="bg-background dark:bg-secondary border-b border-line sticky top-0 z-50">
                <nav className="max-w-[920px] mx-auto w-[90%] h-[60px] flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.svg" alt="logo" className="md:h-9 md:w-9 h-7 w-7 object-contain" />
                        <h3 className="text-lg font-bold hidden lg:block">Weke Track</h3>
                    </Link>

                    <div className="flex items-center gap-2">
                        <ModeToggle/>
                        <div className="flex items-center border border-line rounded-full bg-secondary dark:bg-background p-1">
                            <Link
                                to="/budget"
                                className={[
                                    "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                                    isBudget
                                        ? "bg-background dark:bg-secondary shadow-sm text-main"
                                        : "text-muted hover:text-main",
                                ].join(" ")}
                            >
                                Budget
                            </Link>
                            <Link
                                to="/todos"
                                className={[
                                    "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                                    isTodos
                                        ? "bg-background dark:bg-secondary shadow-sm text-main"
                                        : "text-muted hover:text-main",
                                ].join(" ")}
                            >
                                Todos
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}