import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = ({ userName, hotel, item }) => {
    const orderId = Date.now();

    const newOrder = {
      id: orderId,
      userName,
      hotel,
      item,
      status: "Preparing",
    };

    setOrders((prev) => [...prev, newOrder]);

    // ⏱️ Auto update after 1 minute → Ready
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: "Ready" } : o
        )
      );
    }, 60000);

    // ⏱️ Auto update after 2 minutes → Delivered
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: "Delivered" } : o
        )
      );
    }, 120000);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
