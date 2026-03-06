import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import { Home } from "@/pages/main";
import { Auth } from "./pages/auth";
import { BudgetList, AddBudget } from "./pages/main/budget";
import { Todos, AddTodo } from "./pages/main/todos";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/budget" element={<BudgetList />} />
        <Route path="/budget/add" element={<AddBudget />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/todos/add" element={<AddTodo />} />
      </Routes>
    </>
  );
}
