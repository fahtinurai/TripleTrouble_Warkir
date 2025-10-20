import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("cart") || "[]");
      // normalisasi ke {id, nama, harga, qty}
      return raw.map((it) => ({ ...it, qty: Math.max(1, Number(it.qty || 1)) }));
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem("cart", JSON.stringify(items)); } catch {}
  }, [items]);

  const addItem = (item, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === item.id);
      if (idx === -1) return [...prev, { ...item, qty }];
      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
      return copy;
    });
  };

  const decreaseItem = (id, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === id);
      if (idx === -1) return prev;
      const nextQty = prev[idx].qty - qty;
      if (nextQty <= 0) return prev.filter((x) => x.id !== id);
      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty: nextQty };
      return copy;
    });
  };

  const setQty = (id, qty) => {
    const n = Math.max(0, Number(qty) || 0);
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === id);
      if (idx === -1) return prev;
      if (n === 0) return prev.filter((x) => x.id !== id);
      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty: n };
      return copy;
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
  const clearCart = () => setItems([]);

  const total = useMemo(
    () => items.reduce((acc, it) => acc + Number(it.harga || 0) * Number(it.qty || 1), 0),
    [items]
  );
  const count = useMemo(() => items.reduce((acc, it) => acc + (it.qty || 0), 0), [items]);

  const value = { items, addItem, decreaseItem, setQty, removeItem, clearCart, total, count };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
