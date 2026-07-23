import { createContext, useState } from "react";

export const BillingContext = createContext();

export default function BillingProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
const clearCart = () => {
  setCart([]);
};
  return (
    <BillingContext.Provider
  value={{
    cart,
    addItem,
    removeItem,
    clearCart,
    total,
  }}
>
      {children}
    </BillingContext.Provider>
  );
}