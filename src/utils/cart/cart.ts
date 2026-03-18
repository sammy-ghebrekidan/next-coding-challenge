import { CartItem } from '@/types/cart';

export const getUpdatedCart = (items: CartItem[], productName: string): CartItem[] => {
  const existing = items.find(item => item.name === productName);
  if (existing) {
    return items.map(item =>
      item.name === productName
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...items, { name: productName, quantity: 1 }];
}

export const getCartTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export const getCartItemQuantity = (items: CartItem[], name: string): number => {
  return items.find(item => item.name === name)?.quantity ?? 0;
}

export const formatItemCount = (count: number): string => {
  return `${count} ${count === 1 ? 'item' : 'items'}`;
}
