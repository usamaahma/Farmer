import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addtocart.css";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateCart = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
    setCartItems([...items]);
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    updateCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateCart(updatedCart);
    }
  };

  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    // Navigating to the checkout page
    navigate("/checkout");
  };

  if (!cartItems.length)
    return <p className="empty-cart">Your cart is empty!</p>;

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Your Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div className="cart-card" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-img" />
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>Price: Rs {item.price}</p>
              <p>
                Quantity:
                <button
                  onClick={() => decreaseQuantity(index)}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty-count">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(index)}
                  className="qty-btn"
                >
                  +
                </button>
              </p>
              <p>Total: Rs {item.price * item.quantity}</p>
              <button onClick={() => removeItem(index)} className="remove-btn">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total Price: Rs {totalPrice}</h3>
        <button className="checkout-btn" onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
