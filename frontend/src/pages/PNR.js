import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import "../styles/pnr.css";

export default function PNR() {
  const [pnr, setPnr] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [groupSize, setGroupSize] = useState(10);
  const [groupMobile, setGroupMobile] = useState("");
  const [ratings, setRatings] = useState({});

  const navigate = useNavigate();

  const steps = [
    {
      icon: "🎫",
      title: "Enter PNR/Train No.",
      description: "Find your booking"
    },
    {
      icon: "🍴",
      title: "Select Restaurant & Food",
      description: "Browse & choose meals"
    },
    {
      icon: "💳",
      title: "Make Payment Online/COD",
      description: "Secure checkout"
    },
    {
      icon: "🚚",
      title: "On-Seat Free Delivery",
      description: "Get food on your seat"
    }
  ];

  const featuredItems = [
    {
      id: 1,
      name: "Veg Meals",
      price: 120,
      icon: "🍛",
      restaurant: "Saravana Bhavan"
    },
    {
      id: 2,
      name: "Masala Dosa",
      price: 80,
      icon: "🥘",
      restaurant: "Saravana Bhavan"
    },
    {
      id: 3,
      name: "Chicken Biryani",
      price: 180,
      icon: "🍚",
      restaurant: "SS Hyderabad Biryani"
    },
    {
      id: 4,
      name: "Paneer Butter Masala",
      price: 160,
      icon: "🧀",
      restaurant: "A2B – Adyar Ananda Bhavan"
    }
  ];

  const fetchPNR = async () => {
    if (!pnr.trim()) {
      alert("Enter PNR number");
      return;
    }

    try {
      setLoading(true);
      setCurrentStep(1); // Move to step 2

      const res = await API.get(`/pnr/${pnr}`);
      setData(res.data);

      // ✅ Move to restaurants page after success
      setTimeout(() => {
        navigate("/restaurants", { state: { pnr, trainData: res.data } });
      }, 800);

    } catch (err) {
      alert("PNR not found");
    } finally {
      setLoading(false);
    }
  };

  const handleOrderFood = (item) => {
    if (!pnr.trim()) {
      alert("Please enter PNR number first");
      return;
    }
    // Save selected item and navigate to restaurants page to browse or confirm
    setSelectedItem(item);
    navigate("/restaurants", { state: { pnr, selectedItem: item } });
  };

  const handleStepClick = (index) => {
    // If user clicks step 2 (Select Restaurant & Food), go to restaurants
    if (index === 1) {
      if (!pnr.trim()) {
        alert("Please enter PNR number first");
        return;
      }
      // If train data not fetched yet, fetch then navigate (fetchPNR auto-navigates)
      if (!data) {
        fetchPNR();
        return;
      }
      setCurrentStep(index);
      navigate("/restaurants", { state: { pnr, trainData: data } });
      return;
    }

    // If user clicks step 3 (Make Payment), navigate to payment page
    if (index === 2) {
      if (!pnr.trim()) {
        alert("Please enter PNR number first");
        return;
      }
      if (!selectedItem) {
        // ask user to select an item first
        alert("Please select an item first (tap a featured item or choose a restaurant)");
        navigate("/restaurants", { state: { pnr, trainData: data } });
        return;
      }
      // navigate to payment with item and minimal hotel info
      setCurrentStep(index);
      navigate("/payment", { state: { item: selectedItem, hotel: { name: selectedItem.restaurant } } });
      return;
    }

    // If user clicks step 4 (On-Seat Delivery / Order Status), navigate to status
    if (index === 3) {
      if (!pnr.trim()) {
        alert("Please enter PNR number first");
        return;
      }
      setCurrentStep(index);
      navigate("/status", { state: { pnr } });
      return;
    }

    setCurrentStep(index);
  };

  const createGroupOrder = () => {
    if (!pnr.trim()) return alert("Please enter PNR number before creating a group order");
    if (!groupSize || Number(groupSize) < 10) return alert("Group size must be at least 10");
    const phone = (groupMobile || "").trim();
    if (!phone || phone.replace(/\D/g, '').length < 10) return alert("Enter a valid mobile number");

    // Navigate to restaurants with group order info
    navigate('/restaurants', { state: { pnr, groupOrder: { size: Number(groupSize), mobile: phone } } });
  };

  const handleStarClick = (orderId, rating) => {
    setRatings({ ...ratings, [orderId]: rating });
    alert(`You rated "${orderId}" ${rating} star${rating > 1 ? 's' : ''}!`);
  };

  return (
    <div className="pnr-container">
      <div className="card">
        <h2>🚆 Enter Your PNR Number</h2>

        <input
          type="text"
          placeholder="Enter PNR"
          value={pnr}
          onChange={(e) => setPnr(e.target.value)}
        />

        <button onClick={fetchPNR} disabled={loading}>
          {loading ? "Fetching..." : "Fetch PNR"}
        </button>

        {data && (
          <div className="pnr-details">
            <p><b>Train:</b> {data.trainName}</p>
            <p><b>Status:</b> {data.status}</p>
            <p><b>From:</b> {data.boarding}</p>
            <p><b>To:</b> {data.destination}</p>
          </div>
        )}
      </div>

      <div className="easy-steps-container">
        <h2>Order Food in Train with Easy Steps</h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`step-card ${index <= currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              onClick={() => handleStepClick(index)}
            >
              <div className="step-number">{index + 1}</div>
              <span className="step-icon">{step.icon}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              <div className="step-connector"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="offer-featured-card">
        <h3>Offer Picks — Featured Items</h3>
        <div className="offer-items-grid">
          {featuredItems.map((item) => (
            <div key={item.id} className="offer-item-card">
              <div className="item-top">
                <div className="item-icon">{item.icon}</div>
                <div className="item-name">{item.name}</div>
              </div>
              <div className="item-bottom">
                <div className="item-restaurant">{item.restaurant}</div>
                <div className="item-meta">
                  <span className="item-price">₹{item.price}</span>
                  <button className="btn-add-item" onClick={() => handleOrderFood(item)}>Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pnr-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>🎉 Great Offer — 20% OFF on your first on-train order!</h1>
            <p>Use code RAIL20 at checkout. Free on-seat delivery for limited time.</p>
            <div style={{ marginTop: 12 }}>
              <button className="cta-btn" onClick={() => navigate('/quick-order')}>Grab Offer →</button>
            </div>
          </div>
          <div className="hero-images">
            <div className="hero-food-card">
              <div className="food-emoji">🍛</div>
              <p>Meals</p>
            </div>
            <div className="hero-food-card">
              <div className="food-emoji">🥘</div>
              <p>Biryani</p>
            </div>
            <div className="hero-food-card">
              <div className="food-emoji">🍚</div>
              <p>Rice</p>
            </div>
            <div className="hero-food-card">
              <div className="food-emoji">🧀</div>
              <p>Paneer</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="why-choose">
        <h2>Why Choose RailRecipe</h2>
        <p className="why-sub">Meals delivered to your seat — fast, fresh and reliable.</p>
        <div className="why-grid">
          <div className="why-card" onClick={() => navigate('/status', { state: { pnr } })}>
            <div className="why-icon">🚚</div>
            <h4>On-Seat Delivery</h4>
            <p>We deliver directly to your berth/seat, no waiting at stations.</p>
          </div>
          <div className="why-card" onClick={() => navigate('/restaurants')}>
            <div className="why-icon">✅</div>
            <h4>Verified Restaurants</h4>
            <p>Curated partners with hygiene and quality checks.</p>
          </div>
          <div className="why-card" onClick={() => navigate('/payment')}>
            <div className="why-icon">💳</div>
            <h4>Secure Payments</h4>
            <p>Multiple payment options with safe checkout.</p>
          </div>
          <div className="why-card" onClick={() => navigate('/restaurants')}>
            <div className="why-icon">🕒</div>
            <h4>Train-Aware Menus</h4>
            <p>Menu tailored to your route and arrival stations.</p>
          </div>
        </div>
      </div>

      <div className="group-order">
        <h2>Travelling as a group?</h2>
        <p className="group-sub">If you're a group of 10 or more, create a bulk order and we'll coordinate delivery together.</p>
        <div className="group-form">
          <input
            type="number"
            min={10}
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
            placeholder="Group size (min 10)"
          />
          <input
            type="tel"
            value={groupMobile}
            onChange={(e) => setGroupMobile(e.target.value)}
            placeholder="Contact mobile number"
          />
          <button className="btn" onClick={createGroupOrder}>Create Group Order</button>
        </div>
      </div>

      <div className="latest-orders">
        <h2>Your Latest Orders</h2>
        <div className="orders-list">
          <div className="order-item">
            <div className="order-info">
              <h4>Masala Dosa + Tea</h4>
              <p>From Saravana Bhavan • Feb 4, 2:30 PM</p>
            </div>
            <button className="btn-track" onClick={() => navigate('/status', { state: { pnr } })}>View Status</button>
          </div>
          <div className="order-item">
            <div className="order-info">
              <h4>Veg Biryani + Raita</h4>
              <p>From SS Hyderabad Biryani • Feb 3, 1:15 PM</p>
            </div>
            <button className="btn-track" onClick={() => navigate('/status', { state: { pnr } })}>View Status</button>
          </div>
          <div className="order-item">
            <div className="order-info">
              <h4>Paneer Butter Masala + Naan</h4>
              <p>From A2B – Adyar Ananda Bhavan • Feb 2, 6:00 PM</p>
            </div>
            <button className="btn-track" onClick={() => navigate('/status', { state: { pnr } })}>View Status</button>
          </div>
        </div>
      </div>

      <div className="rating-section">
        <h2>Rate Your Experience</h2>
        <p className="rating-sub">Help us improve by sharing your feedback on recent orders</p>
        <div className="rating-cards">
          <div className="rating-card">
            <h4>Masala Dosa + Tea</h4>
            <p className="rating-prompt">Share your feedback</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <span 
                  key={i} 
                  className={`star ${ratings['dosa'] && ratings['dosa'] >= i ? 'active' : ''}`}
                  onClick={() => handleStarClick('dosa', i)}
                >
                  ⭐
                </span>
              ))}
            </div>
            <button className="btn-rate">Rate & Review</button>
          </div>
          <div className="rating-card">
            <h4>Veg Biryani + Raita</h4>
            <p className="rating-prompt">Share your feedback</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <span 
                  key={i} 
                  className={`star ${ratings['biryani'] && ratings['biryani'] >= i ? 'active' : ''}`}
                  onClick={() => handleStarClick('biryani', i)}
                >
                  ⭐
                </span>
              ))}
            </div>
            <button className="btn-rate">Rate & Review</button>
          </div>
        </div>
      </div>

      <footer className="happy-travel-footer">
        <h3>🚆 Happy Travel with RailRecipe! 🍽️</h3>
        <p>Never go hungry on your train journey. We're here to ensure every meal is a memory.</p>
        <div className="footer-links">
          <a href="#home">Support</a>
          <a href="#home">Terms</a>
          <a href="#home">Privacy</a>
          <a href="#home">Contact</a>
        </div>
        <p className="footer-copyright">© 2026 RailRecipe. All rights reserved.</p>
      </footer>
    </div>
  );
}