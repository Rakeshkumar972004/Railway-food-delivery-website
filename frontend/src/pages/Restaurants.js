import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../styles/restaurants.css";

export default function Restaurants() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleStepClick(index) {
    if (index === 1) {
      navigate("/pnr");
      return;
    }
    // for now, other steps can route to their rough targets
    if (index === 2) {
      // stay on restaurants
      return;
    }
    if (index === 3) {
      navigate("/payment");
      return;
    }
    if (index === 4) {
      navigate("/status");
      return;
    }
  }

  useEffect(() => {
    // If navigation included a selectedItem from PNR page, open that restaurant's menu
    const sel = location.state && location.state.selectedItem;
    const grp = location.state && location.state.groupOrder;
    if (grp) {
      // leave a small banner; handled via JSX below
    }
    if (sel) {
      // find restaurant by name (best-effort match)
      const match = restaurants.find(r => r.name === sel.restaurant || r.name.includes(sel.restaurant));
      if (match) {
        // small delay so Restaurants page renders briefly
        setTimeout(() => {
          navigate("/menu", { state: { ...match, selectedItem: sel } });
        }, 200);
      }
    }
  }, [location.state]);

  const restaurants = [
    {
      id: 1,
      name: "Saravana Bhavan",
      station: "Vijayawada",
    },
    {
      id: 2,
      name: "SS Hyderabad Biryani",
      station: "Nellore",
    },
   
     {
      id: 3,
      name: "A2B – Adyar Ananda Bhavan",
      station: "Chennai",
    },
      {
      id: 4,
      name: "Annapoorna Veg Hotel",
      station: "Bangalore",
    },
     
     
    
    //   {
    //   id: 5,
    //   name: "Junior Kuppanna",
    //   station: "Chennai",
    // },
    //  {
    //   id: 6,
    //   name: "Sangeetha Veg Restaurant",
    //   station: "Bangalore",
    // },
    //   {
    //   id: 7,
    //   name: "Lakshmi Veg Restaurant",
    //   station: "Bangalore",
    // },
    
  ];

  return (
    <div className="restaurants-container">
      {location.state && location.state.groupOrder && (
        <div className="group-banner">
          Group order for <strong>{location.state.groupOrder.size}</strong> people — contact: <strong>{location.state.groupOrder.mobile}</strong>
        </div>
      )}
      <div className="page-steps">
        {[1, 2, 3, 4].map((s) => (
          <button key={s} className={`step-btn step-${s}`} onClick={() => handleStepClick(s)}>
            {s}
          </button>
        ))}
      </div>
      <div className="restaurants-header">
        <h1>🍴 Available Restaurants</h1>
        <p>Select a restaurant to view menus</p>
      </div>

      <div className="restaurants-grid">
        {restaurants.map((hotel) => (
          <div key={hotel.id} className="restaurant-card">
            <div className="restaurant-info">
              <div className="restaurant-icon">🏪</div>
              <div className="restaurant-details">
                <h3>{hotel.name}</h3>
                <p>{hotel.station}</p>
              </div>
            </div>

            <button
              className="btn-view-menu"
              onClick={() => navigate("/menu", { state: hotel })}
            >
              View Menu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
