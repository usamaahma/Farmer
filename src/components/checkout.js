import React, { useEffect, useState } from "react";
import "./checkout.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCOD = () => {
    alert("Order placed with Cash on Delivery!");
    // Navigate or call API logic here
  };

  const handlePayment = () => {
    alert("Redirecting to Payment Gateway...");
    // Navigate or initiate payment integration
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <>
          <div className="checkout-items">
            {cartItems.map((item, index) => (
              <div key={item.id} className="checkout-item">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Total: Rs {item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="checkout-summary">
            <h3>Total Price: Rs {totalPrice}</h3>
            <div className="checkout-buttons">
              <button className="checkout-btn cod-btn" onClick={handleCOD}>
                Cash on Delivery
              </button>
              <button
                className="checkout-btn payment-btn"
                onClick={handlePayment}
              >
                Payment
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
