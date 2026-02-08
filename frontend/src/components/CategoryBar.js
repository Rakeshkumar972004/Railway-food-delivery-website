export default function PaymentModal({ show, onPay, onCancel }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>💳 Payment</h2>
        <p>Amount: ₹120</p>

        <button onClick={onPay}>Pay Now</button>
        <button className="cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
