import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      {orders.map(o => (
        <p key={o._id}>{o.user} - {o.food} - {o.status}</p>
      ))}
    </div>
  );
}
