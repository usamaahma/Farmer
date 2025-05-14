import React, { useEffect, useState } from "react";
import "./checkout.css";
import { checkout } from "../utils/axios";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setCartItems(storedCart);
    setUser(storedUser);
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async (paymentMethod) => {
    try {
      if (!user) {
        alert("User not logged in");
        return;
      }

      for (const item of cartItems) {
        const payload = {
          farmerId: item.postedBy?.id,
          product: item.name,
          price: item.price,
          quantity: item.quantity,
          user: {
            name: user.name,
            email: user.email,
          },
          paymentMethod,
        };

        await checkout.post("/", payload);

        // 🟢 Only for payment, open WhatsApp with farmer's number
        if (paymentMethod === "Online") {
          const contact = item.postedBy?.farmer?.contact;
          if (contact) {
            const message = `Hello, I have just placed an order for ${item.quantity} x ${item.name}. Please confirm.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${contact}?text=${encodedMessage}`;
            window.open(whatsappURL, "_blank");
          }
        }
      }

      alert(`Order placed with ${paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}`);
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (error) {
      console.error("Order Error:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <>
          <div className="checkout-items">
            {cartItems.map((item) => (
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
              <button
                className="checkout-btn cod-btn"
                onClick={() => handleOrder("COD")}
              >
                Cash on Delivery
              </button>
              <button
                className="checkout-btn payment-btn"
                onClick={() => handleOrder("Online")}
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
