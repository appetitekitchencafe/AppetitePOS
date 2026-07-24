import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import Kitchen from "./pages/Kitchen";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Menu from "./pages/Menu";
import Reports from "./pages/Reports";
import Settings from "./pages/settings/Settings";
import Employees from "./pages/Employees";
import Purchases from "./pages/Purchases";
import OnlineMenu from "./pages/OnlineMenu";
import OnlineCart from "./pages/OnlineCart";
import OrderSuccess from "./pages/OrderSuccess";

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
  <Route path="/settings" element={<Settings />} />
  <Route path="/employees" element={<Employees />} />
  <Route path="/purchases" element={<Purchases />} />
  <Route path="/order" element={<OnlineMenu />} />

<Route path="/cart" element={<OnlineCart />} />

<Route path="/order-success/:id" element={<OrderSuccess />} />
</Routes>
    </BrowserRouter>
  );
}