import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/foodMenu.css";

export default function Menu() {
  const location = useLocation();
  const { state: hotel } = location;
  const navigate = useNavigate();
  const [preselected, setPreselected] = useState(null);

  if (!hotel) {
    return <h3>No hotel selected</h3>;
  }

  // ✅ Menus based on hotel
  const menus = {
    "Saravana Bhavan": [
      { id: 1, name: "Veg Meals", price: 120 },
      { id: 2, name: "Masala Dosa", price: 80 },
      { id: 3, name: "Idli Sambar", price: 60 },
      { id: 4, name: "Curd Rice", price: 70 },
    ],
    "SS Hyderabad Biryani": [
      { id: 1, name: "Chicken Biryani", price: 180 },
      { id: 2, name: "Mutton Biryani", price: 220 },
      { id: 3, name: "Veg Biryani", price: 140 },
      { id: 4, name: "Chicken 65", price: 120 },
    ],
    "Annapoorna Veg Hotel": [
      { id: 1, name: "South Indian Meals", price: 130 },
      { id: 2, name: "Paneer Fried Rice", price: 150 },
      { id: 3, name: "Chapati Kurma", price: 90 },
      { id: 4, name: "Lemon Rice", price: 70 },
    ],
    "A2B – Adyar Ananda Bhavan": [
      { id: 1, name: "Mini Meals", price: 110 },
      { id: 2, name: "Ghee Roast", price: 95 },
      { id: 3, name: "Poori Masala", price: 85 },
      { id: 4, name: "Kesari", price: 50 },
    ],

    "Sangeetha Veg Restaurant": [
      { id: 1, name: "Full Meals", price: 140 },
      { id: 2, name: "Paneer Butter Masala", price: 160 },
      { id: 3, name: "Butter Naan", price: 40 },
      { id: 4, name: "Veg Fried Rice", price: 120 },
    ],

    "Junior Kuppanna": [
      { id: 1, name: "Mutton Biryani", price: 240 },
      { id: 2, name: "Chicken Chukka", price: 180 },
      { id: 3, name: "Egg Kothu Parotta", price: 120 },
      { id: 4, name: "Plain Parotta", price: 20 },
    ],

    "Thalappakatti Biryani": [
      { id: 1, name: "Dindigul Chicken Biryani", price: 210 },
      { id: 2, name: "Mutton Biryani", price: 260 },
      { id: 3, name: "Chicken Pepper Fry", price: 190 },
      { id: 4, name: "Boiled Egg", price: 15 },
    ],

  };

  const menuList = menus[hotel.name] || [];

  useEffect(() => {
    // if navigated with selectedItem from PNR/Restaurants, mark it
    if (hotel && hotel.selectedItem) {
      setPreselected(hotel.selectedItem.name);
      // optionally scroll into view or auto-open payment - keeping user on menu
      const id = `menu-item-${hotel.selectedItem.name.replace(/\s+/g, "-").toLowerCase()}`;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [hotel]);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>📋 {hotel.name}</h1>
        <p>Order delicious food delivered on-train</p>
      </div>

      <div className="menu-list">
        {menuList.map((item) => (
        <div 
          id={`menu-item-${item.name.replace(/\s+/g, "-").toLowerCase()}`} 
          key={item.id} 
          className={`food-card ${preselected === item.name ? 'highlight' : ''}`}>
            <div className="food-info">
              <h4>{item.name}</h4>
              <span className="price">₹{item.price}</span>
            </div>
            <button
              className="btn-order"
              onClick={() =>
                navigate("/payment", {
                  state: { item, hotel },
                })
              }
            >
              Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
