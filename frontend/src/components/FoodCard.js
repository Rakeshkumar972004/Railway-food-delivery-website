import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderModal from "./OrderModal";

export default function MealList() {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/meals")
      .then(res => setMeals(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Available Meals</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {meals.map(meal => (
          <div key={meal._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10, width: 200 }}>
            <h3>{meal.name}</h3>
            <p>₹{meal.price}</p>
            <p>Station: {meal.station}</p>
            <button onClick={() => setSelectedMeal(meal)}>Order Now</button>
          </div>
        ))}
      </div>

      {selectedMeal && (
        <OrderModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
}
