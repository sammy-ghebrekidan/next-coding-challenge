import { getLocalStorage, setLocalStorage } from './client';
import { CartItem } from '@/types/cart';

export const loadCart = () => getLocalStorage<CartItem[]>('cart', []);
export const saveCart = (items: CartItem[]) => setLocalStorage('cart', items);
