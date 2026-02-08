import API from "../services/api";
import "../styles/order.css";

export default function Order() {
  const orderVegMeal = async () => {
    try {
      const res = await API.post("/orders", { item: "Veg Meal", price: 120 });
      alert(res.data.message);
    } catch {
      alert("Order failed");
    }
  };

  return (
    <div className="order-container">
      <div className="order-header">
        <h1>🛒 Your Order</h1>
        <p>Review and confirm your meal order</p>
      </div>

      <div className="order-card">
        <h2>Order Summary</h2>
        <div className="order-summary">
          <div className="order-item">
            <span className="order-item-name">Veg Meal</span>
            <span className="order-item-price">₹120</span>
          </div>
          <div className="order-total">
            <span>Total</span>
            <span>₹120</span>
          </div>
        </div>

        <div className="order-actions">
          <button className="btn btn-primary" onClick={orderVegMeal}>
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
