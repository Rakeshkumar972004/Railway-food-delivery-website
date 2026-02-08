import React, { useState } from "react";
import axios from "axios";

export default function OrderModal({ meal, onClose }) {
  const [step, setStep] = useState(0); // 0=select payment, 1=UPI scan, 2=success
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [successMsg, setSuccessMsg] = useState("");

  const proceedPayment = () => {
    if (paymentMethod === "UPI") setStep(1); // show QR
    else confirmOrder();
  };

  const confirmOrder = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/orders", { meal, paymentMethod });
      setSuccessMsg(res.data.message);
      setStep(2);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20, border: "1px solid #000", width: 300 }}>
      {step === 0 && (
        <>
          <h3>Confirm Order: {meal.name}</h3>
          <p>Price: ₹{meal.price}</p>
          <label>
            <input type="radio" value="UPI" checked={paymentMethod==="UPI"} onChange={e=>setPaymentMethod(e.target.value)} />
            UPI (Scan QR)
          </label>
          <br/>
          <label>
            <input type="radio" value="Cash" checked={paymentMethod==="Cash"} onChange={e=>setPaymentMethod(e.target.value)} />
            Cash on Delivery
          </label>
          <br/><br/>
          <button onClick={proceedPayment}>Proceed to Pay</button>
          <button onClick={onClose} style={{ marginLeft: 10 }}>Cancel</button>
        </>
      )}

      {step === 1 && (
        <>
          <h3>Scan QR to Pay via UPI</h3>
          <img src="https://via.placeholder.com/200?text=UPI+QR" alt="QR Code"/>
          <br/><br/>
          <button onClick={confirmOrder}>I have Paid</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>{successMsg}</h3>
          <p>Payment Method: {paymentMethod}</p>
          <button onClick={onClose}>Close</button>
        </>
      )}
    </div>
  );
}
