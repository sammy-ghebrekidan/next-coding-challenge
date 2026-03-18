import { renderHook, act } from '@testing-library/react';
import { CartProvider } from '@/context/CartContext';
import { useCart } from './useCart';

const wrapper = ({ children }: { children: React.ReactNode }) =>
  CartProvider({ children });

describe('useCart', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with an empty basket', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.totalCount).toBe(0);
    expect(result.current.items).toEqual([]);
  });

  it('adds an item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart('Item 1'));
    expect(result.current.totalCount).toBe(1);
    expect(result.current.getQuantity('Item 1')).toBe(1);
  });

  it('increments quantity for duplicate adds', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart('Item 1'));
    act(() => result.current.addToCart('Item 1'));
    expect(result.current.totalCount).toBe(2);
    expect(result.current.getQuantity('Item 1')).toBe(2);
  });

  it('tracks multiple items independently', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart('Item 1'));
    act(() => result.current.addToCart('Item 2'));
    act(() => result.current.addToCart('Item 2'));
    expect(result.current.totalCount).toBe(3);
    expect(result.current.getQuantity('Item 1')).toBe(1);
    expect(result.current.getQuantity('Item 2')).toBe(2);
  });

  it('throws when used outside CartProvider', () => {
    expect(() => {
      renderHook(() => useCart());
    }).toThrow('useCart must be used within CartProvider');
  });
});
