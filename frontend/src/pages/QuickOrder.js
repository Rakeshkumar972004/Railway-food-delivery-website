import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/quickOrder.css";

export default function QuickOrder() {
  const [pnr, setPnr] = useState("");
  const [loading, setLoading] = useState(false);
  const [trainData, setTrainData] = useState(null);
  const navigate = useNavigate();

  const featured = [
    { id: 1, name: "Veg Biryani", price: 140, restaurant: "SS Hyderabad Biryani" },
    { id: 2, name: "Masala Dosa", price: 80, restaurant: "Saravana Bhavan" },
    { id: 3, name: "Paneer Butter Masala", price: 160, restaurant: "A2B – Adyar Ananda Bhavan" },
    { id: 4, name: "Meal Box", price: 120, restaurant: "Annapoorna Veg Hotel" },
  ];

  async function fetchPnr() {
    if (!pnr || pnr.length < 6) return alert("Enter a valid PNR");
    setLoading(true);
    try {
      const res = await API.get(`/pnr/${pnr}`);
      setTrainData(res.data);
      navigate("/restaurants", { state: { pnr, trainData: res.data } });
    } catch (err) {
      alert("PNR not found");
    } finally {
      setLoading(false);
    }
  }

  function orderFeatured(item) {
    if (!pnr) return alert("Please enter PNR first");
    // navigate to restaurants with selected item
    navigate("/restaurants", { state: { pnr, selectedItem: item } });
  }

  return (
    <div className="quickorder-container">
      <div className="quickorder-card">
        <h2>Order On-Train — Quick Steps</h2>

        <div className="pnr-row">
          <input value={pnr} onChange={(e) => setPnr(e.target.value)} placeholder="Enter PNR" />
          <button className="btn" onClick={fetchPnr}>{loading ? "Checking..." : "Check PNR"}</button>
        </div>

        <div className="steps">
          <div className="step">1. Enter PNR</div>
          <div className="step">2. Choose Restaurant</div>
          <div className="step">3. Select Item & Pay</div>
          <div className="step">4. Track Order</div>
        </div>

        <h3>Featured for your train</h3>
        <div className="featured-grid">
          {featured.map((f) => (
            <div key={f.id} className="featured-card">
              <div className="feat-name">{f.name}</div>
              <div className="feat-meta">{f.restaurant}</div>
              <div className="feat-bottom">
                <div className="price">₹{f.price}</div>
                <button className="btn" onClick={() => orderFeatured(f)}>Order</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
