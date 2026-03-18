import {
  getUpdatedCart,
  getCartTotal,
  getCartItemQuantity,
  formatItemCount,
} from './cart';

describe('getUpdatedCart', () => {
  it('adds new item to empty basket', () => {
    const result = getUpdatedCart([], 'Product A');
    expect(result).toEqual([{ name: 'Product A', quantity: 1 }]);
  });

  it('increments quantity for existing item', () => {
    const items = [{ name: 'Product A', quantity: 1 }];
    const result = getUpdatedCart(items, 'Product A');
    expect(result).toEqual([{ name: 'Product A', quantity: 2 }]);
  });

  it('adds new item alongside existing items', () => {
    const items = [{ name: 'Product A', quantity: 2 }];
    const result = getUpdatedCart(items, 'Product B');
    expect(result).toEqual([
      { name: 'Product A', quantity: 2 },
      { name: 'Product B', quantity: 1 },
    ]);
  });

  it('does not mutate original array', () => {
    const items = [{ name: 'Product A', quantity: 1 }];
    const result = getUpdatedCart(items, 'Product A');
    expect(items[0].quantity).toBe(1);
    expect(result).not.toBe(items);
  });
});

describe('getCartTotal', () => {
  it('returns 0 for empty basket', () => {
    expect(getCartTotal([])).toBe(0);
  });

  it('returns quantity for single item', () => {
    expect(getCartTotal([{ name: 'A', quantity: 3 }])).toBe(3);
  });

  it('sums quantities across items', () => {
    const items = [
      { name: 'A', quantity: 2 },
      { name: 'B', quantity: 5 },
    ];
    expect(getCartTotal(items)).toBe(7);
  });
});

describe('getCartItemQuantity', () => {
  it('returns 0 for non-existent item', () => {
    expect(getCartItemQuantity([], 'Missing')).toBe(0);
  });

  it('returns quantity for existing item', () => {
    const items = [{ name: 'Product', quantity: 4 }];
    expect(getCartItemQuantity(items, 'Product')).toBe(4);
  });
});

describe('formatItemCount', () => {
  it('returns singular for 1 item', () => {
    expect(formatItemCount(1)).toBe('1 item');
  });

  it('returns plural for 0 items', () => {
    expect(formatItemCount(0)).toBe('0 items');
  });

  it('returns plural for multiple items', () => {
    expect(formatItemCount(5)).toBe('5 items');
  });
});
