import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

// Helper to calculate promo quantities and pricing
const calculatePromoDetails = (item, baseQuantity) => {
  if (!item.isPromo || !item.promoType) {
    return {
      quantity: baseQuantity,
      paidQuantity: baseQuantity,
      freeQuantity: 0,
      itemPrice: item.priceRegular,
      lineTotal: item.priceRegular * baseQuantity,
    };
  }

  const originalPrice = item.originalPrice || item.priceRegular;

  switch (item.promoType) {
    case 'bogo': // Buy One Get One Free - quantity represents "sets" of 2
      const bogoSets = baseQuantity;
      const bogoTotal = bogoSets * 2; // Total items (paid + free)
      return {
        quantity: bogoTotal,
        paidQuantity: bogoSets,
        freeQuantity: bogoSets,
        itemPrice: originalPrice,
        lineTotal: originalPrice * bogoSets, // Only pay for half
      };
    case 'discount':
      return {
        quantity: baseQuantity,
        paidQuantity: baseQuantity,
        freeQuantity: 0,
        itemPrice: item.priceRegular, // Already discounted
        lineTotal: item.priceRegular * baseQuantity,
      };
    case 'buy2get1': // Buy 2 Get 1 Free - for every 2 paid, get 1 free
      const paidQty = baseQuantity;
      const freeQty = Math.floor(baseQuantity / 2);
      const totalQty = paidQty + freeQty;
      return {
        quantity: totalQty,
        paidQuantity: paidQty,
        freeQuantity: freeQty,
        itemPrice: originalPrice,
        lineTotal: originalPrice * paidQty,
      };
    default:
      return {
        quantity: baseQuantity,
        paidQuantity: baseQuantity,
        freeQuantity: 0,
        itemPrice: item.priceRegular,
        lineTotal: item.priceRegular * baseQuantity,
      };
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity = 1) => {
    setCartItems((prevItems) => {
      // For promo items, we store the "base" quantity (sets for BOGO, paid qty for buy2get1)
      // The actual quantity shown is calculated dynamically
      let baseQty = quantity;
      
      // For BOGO, if we receive actualQuantity (e.g., 2), convert to sets (1)
      if (item.promoType === 'bogo') {
        baseQty = Math.ceil(quantity / 2); // Convert total to sets
      }
      // For buy2get1, quantity passed is the total, we need paid quantity
      else if (item.promoType === 'buy2get1') {
        // If 3 items passed (2 paid + 1 free), we store 2 as base
        baseQty = Math.ceil(quantity * 2 / 3);
      }

      const existingItem = prevItems.find((i) => i.id === item.id && i.selectedSize === item.selectedSize);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id && i.selectedSize === item.selectedSize 
            ? { ...i, baseQuantity: i.baseQuantity + baseQty } 
            : i
        );
      }
      return [...prevItems, { ...item, baseQuantity: baseQty }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          const newBaseQuantity = item.baseQuantity + change;
          return newBaseQuantity > 0 ? { ...item, baseQuantity: newBaseQuantity } : null;
        }
        return item;
      }).filter(Boolean); 
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate cart items with promo details
  const cartItemsWithPromo = cartItems.map(item => {
    const promoDetails = calculatePromoDetails(item, item.baseQuantity);
    return {
      ...item,
      ...promoDetails,
    };
  });

  const subtotal = cartItemsWithPromo.reduce((sum, item) => sum + item.lineTotal, 0);
  const vat = subtotal * 0.06;
  const total = subtotal + vat;

  return (
    <CartContext.Provider value={{ 
      cartItems: cartItemsWithPromo, 
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