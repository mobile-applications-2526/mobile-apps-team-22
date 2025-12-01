import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevItems, { ...item, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 3. Update Quantity (Modified to remove item if quantity becomes 0)
  const updateQuantity = (id, change) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          // If new quantity is 0, we mark it null so we can filter it out later
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean); // This removes the 'null' items (the ones that hit 0)
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // 4. Calculate Totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.priceRegular * item.quantity), 0);
  const vat = subtotal * 0.06; // Assuming 6% VAT roughly, or use your logic
  const total = subtotal + vat;

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      subtotal, 
      vat, 
      total 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);