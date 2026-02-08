import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import PNR from "./pages/PNR";
import Restaurants from "./pages/Restaurants";
import Menu from "./pages/Menu";
import Payment from "./pages/Payment";
import OrderStatus from "./pages/OrderStatus";
import AdminDashboard from "./pages/AdminDashboard";
import QuickOrder from "./pages/QuickOrder";

import "./App.css";

export default function App() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="app-bg">
      <header className="app-header">
        <div className="nav-title">RailRecipe</div>

        <button
          className="nav-menu"
          onClick={() => setOpenMenu(!openMenu)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </header>

      {/* SLIDE MENU */}
      {openMenu && (
        <div className="side-menu">
          <Link to="/pnr" onClick={() => setOpenMenu(false)}>PNR</Link>
          <Link to="/restaurants" onClick={() => setOpenMenu(false)}>Restaurants</Link>
         
          <Link to="/payment" onClick={() => setOpenMenu(false)}>Payment</Link>
          <Link to="/status" onClick={() => setOpenMenu(false)}>Order Status</Link>
          
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pnr" element={<PNR />} />
        <Route path="/quick-order" element={<QuickOrder />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/status" element={<OrderStatus />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}
