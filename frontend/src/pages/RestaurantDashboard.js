import { useOrders } from "../context/OrderContext";
import "../styles/dashboard.css";

export default function RestaurantDashboard() {
  const { orders, updateStatus } = useOrders();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>🏪 Restaurant Dashboard</h1>
        <p>Manage your food orders in real-time</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div className="stat-value">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🍳</span>
          <div className="stat-value">
            {orders.filter((o) => o.status === "Preparing").length}
          </div>
          <div className="stat-label">Preparing</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✓</span>
          <div className="stat-value">
            {orders.filter((o) => o.status === "Ready").length}
          </div>
          <div className="stat-label">Ready</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🚚</span>
          <div className="stat-value">
            {orders.filter((o) => o.status === "Delivered").length}
          </div>
          <div className="stat-label">Delivered</div>
        </div>
      </div>

      <div className="orders-header">
        <h2>📋 Active Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-icon">📭</span>
          <p>No orders yet. Orders will appear here when customers place them.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((o) => (
            <div key={o.id} className={`order-card ${o.status === "Preparing" ? "urgent" : ""}`}>
              <div className="order-card-header">
                <div>
                  <div className="order-id">Order #{o.id}</div>
                  <div className="order-time">Just now</div>
                </div>
                <span className={`order-status-badge badge-${o.status.toLowerCase()}`}>
                  {o.status}
                </span>
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <span className="detail-label">Restaurant</span>
                  <span className="detail-value restaurant">{o.hotel}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Item</span>
                  <span className="detail-value">{o.item}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount</span>
                  <span className="detail-value price">₹{o.price}</span>
                </div>
              </div>

              <div className="order-actions">
                {o.status === "Pending" && (
                  <button 
                    className="btn-action btn-primary-action"
                    onClick={() => updateStatus(o.id, "Preparing")}
                  >
                    Start Preparing
                  </button>
                )}
                {o.status === "Preparing" && (
                  <button 
                    className="btn-action btn-primary-action"
                    onClick={() => updateStatus(o.id, "Ready")}
                  >
                    Mark Ready
                  </button>
                )}
                {o.status === "Ready" && (
                  <button 
                    className="btn-action btn-primary-action"
                    onClick={() => updateStatus(o.id, "Delivered")}
                  >
                    Mark Delivered
                  </button>
                )}
                {o.status === "Delivered" && (
                  <button className="btn-action btn-secondary-action" disabled>
                    ✓ Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
