import React from "react";

export default function FoodMenu({ menu, onAdd }) {
  return (
    <div className="card">
      {menu.map((item, idx) => (
        <div key={idx} className="menu-item">
          <span>{item.name} ₹{item.price}</span>
          <button onClick={() => onAdd(item)}>Add</button>
        </div>
      ))}
    </div>
  );
}
