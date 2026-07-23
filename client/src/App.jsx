import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import Kitchen from "./pages/Kitchen";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Menu from "./pages/Menu";
import Reports from "./pages/Reports";
import Employees from "./pages/Employees";
import Purchases from "./pages/Purchases";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/billing" element={<Billing />} />
  <Route path="/kitchen" element={<Kitchen />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/inventory" element={<Inventory />} />
  <Route path="/menu" element={<Menu />} />
  <Route path="/reports" element={<Reports />} />
  <Route path="/employees" element={<Employees />} />
  <Route path="/purchases" element={<Purchases />} />
</Routes>
    </BrowserRouter>
  );
}