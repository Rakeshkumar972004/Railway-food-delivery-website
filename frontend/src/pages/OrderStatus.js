import { useLocation } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import "../styles/orderStatus.css";

export default function OrderStatus() {
  const location = useLocation();
  const { orders } = useOrders();
  const pnr = location.state?.pnr;

  // Sample orders for display when navigated from PNR page
  const sampleOrders = [
    {
      id: 1,
      name: "Masala Dosa + Tea",
      restaurant: "Saravana Bhavan",
      price: 95,
      time: "Feb 4, 2:30 PM",
      status: "Delivered",
      icon: "🥘"
    },
    {
      id: 2,
      name: "Veg Biryani + Raita",
      restaurant: "SS Hyderabad Biryani",
      price: 150,
      time: "Feb 3, 1:15 PM",
      status: "Delivered",
      icon: "🍚"
    },
    {
      id: 3,
      name: "Paneer Butter Masala + Naan",
      restaurant: "A2B – Adyar Ananda Bhavan",
      price: 160,
      time: "Feb 2, 6:00 PM",
      status: "Delivered",
      icon: "🧀"
    }
  ];

  const displayOrders = orders.length > 0 ? orders : sampleOrders;

  return (
    <div className="orderstatus-container">
      <div className="orderstatus-header">
        <h1>📦 Order Status</h1>
        <p>Track your meal orders in real-time</p>
        {pnr && <p className="pnr-badge">PNR: {pnr}</p>}
      </div>

      {displayOrders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-list">
          {displayOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-content">
                  <div className="order-icon">{order.icon || "🍱"}</div>
                  <div className="order-info">
                    <h3>{order.name}</h3>
                    <p className="restaurant">{order.restaurant || "Restaurant"}</p>
                    <p className="time">{order.time}</p>
                  </div>
                </div>
                <span className={`status-badge status-${order.status?.toLowerCase() || 'pending'}`}>
                  {order.status || "Preparing"}
                </span>
              </div>

              <div className="order-timeline">
                <div className="timeline-step completed">
                  ✓ Order Confirmed
                </div>
                <div className={`timeline-step ${order.status === 'Preparing' || order.status === 'Ready' || order.status === 'Delivered' ? 'completed' : ''}`}>
                  {order.status === 'Preparing' || order.status === 'Ready' || order.status === 'Delivered' ? '✓' : '○'} Preparing
                </div>
                <div className={`timeline-step ${order.status === 'Ready' || order.status === 'Delivered' ? 'completed' : ''}`}>
                  {order.status === 'Ready' || order.status === 'Delivered' ? '✓' : '○'} Ready for Delivery
                </div>
                <div className={`timeline-step ${order.status === 'Delivered' ? 'completed' : ''}`}>
                  {order.status === 'Delivered' ? '✓' : '○'} Delivered to Seat
                </div>
              </div>

              <div className="order-footer">
                <span className="order-price">₹{order.price || 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
