'use client';

import { createContext, useContext, useState, useMemo, useCallback, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types/cart';
import { getUpdatedCart, getCartTotal, getCartItemQuantity } from '@/utils';
import { loadCart, saveCart } from '@/lib/storage';

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  addToCart: (name: string) => void;
  getQuantity: (name: string) => number;
  removeItem: (name: string) => void;
  decrementItem: (name: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveCart(items);
  }, [items, loaded]);

  const totalCount = useMemo(() => getCartTotal(items), [items]);

  const addToCart = useCallback((name: string) => {
    setItems(prev => getUpdatedCart(prev, name));
  }, []);

  const removeItem = useCallback((name: string) => {
    setItems(prev => prev.filter(i => i.name !== name));
  }, []);

  const decrementItem = useCallback((name: string) => {
    setItems(prev => prev.map(i => i.name === name ? { ...i, quantity: i.quantity - 1 } : i).filter(i => i.quantity > 0));
  }, []);

  const getQuantity = useCallback((name: string) => getCartItemQuantity(items, name), [items]);

  const value = useMemo(() => ({
    items,
    totalCount,
    addToCart,
    getQuantity,
    removeItem,
    decrementItem,
  }), [items, totalCount, addToCart, getQuantity, removeItem, decrementItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
