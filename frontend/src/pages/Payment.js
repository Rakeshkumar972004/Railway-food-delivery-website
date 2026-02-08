import { useLocation, useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import "../styles/payment.css";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addOrder } = useOrders();

  if (!state) return <h3>No order found</h3>;

  const { item, hotel } = state;

  const payNow = () => {
    // Safe demo payment
    addOrder({ item, hotel });
    alert("Payment Successful");
    navigate("/status");
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>💳 Secure Payment</h1>
        <p>Complete your order securely</p>
      </div>

      <div className="payment-card">
        <h2>Order Summary</h2>
        <div className="payment-summary">
          <h3>Restaurant</h3>
          <div className="payment-item">
            <span>{hotel.name}</span>
            <span>{hotel.station}</span>
          </div>
        </div>

        <div className="payment-summary">
          <h3>Item</h3>
          <div className="payment-item">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </div>

          <div className="price-breakdown">
            <div className="price-row">
              <span>Subtotal</span>
              <span>₹{item.price}</span>
            </div>
            <div className="price-row">
              <span>Service Fee</span>
              <span>₹0</span>
            </div>
            <div className="price-row">
              <span>Delivery Fee</span>
              <span>₹0</span>
            </div>
            <div className="price-row total">
              <span>Total Amount</span>
              <span>₹{item.price}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="payment-card">
        <h2>Payment Method</h2>
        <div className="payment-methods">
          <label className="method-option">
            <input type="radio" name="payment" defaultChecked />
            <span className="method-icon">💳</span>
            <label>Debit/Credit Card</label>
          </label>
          <label className="method-option">
            <input type="radio" name="payment" />
            <span className="method-icon">📱</span>
            <label>UPI</label>
          </label>
          <label className="method-option">
            <input type="radio" name="payment" />
            <span className="method-icon">💰</span>
            <label>Cash on Delivery</label>
          </label>
        </div>
      </div>

      <div className="security-info">
        <span className="security-icon">🔒</span>
        <span>Your payment is secure and encrypted</span>
      </div>

      <div className="payment-actions">
        <button className="btn-pay" onClick={payNow}>
          Pay ₹{item.price}
        </button>
      </div>
    </div>
  );
}
