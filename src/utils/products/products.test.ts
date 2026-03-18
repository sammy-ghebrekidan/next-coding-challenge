import { getNormalizedProduct, formatPrice } from './products';
import { ApiProduct } from '@/types/cart';

const mockApiProduct: ApiProduct = {
  id: 1,
  name: { us: 'US Product Name', uk: 'UK Product Name' },
  price: { usd: 29.99, gbp: 24.99 },
  stock: 10,
};

describe('getNormalizedProduct', () => {
  it('normalizes for UK locale', () => {
    const result = getNormalizedProduct(mockApiProduct, 'uk');
    expect(result).toEqual({
      id: 1,
      name: 'UK Product Name',
      price: 24.99,
      image: expect.any(String),
    });
  });

  it('normalizes for US locale', () => {
    const result = getNormalizedProduct(mockApiProduct, 'us');
    expect(result).toEqual({
      id: 1,
      name: 'US Product Name',
      price: 29.99,
      image: expect.any(String),
    });
  });

  it('defaults to UK locale', () => {
    const result = getNormalizedProduct(mockApiProduct);
    expect(result.name).toBe('UK Product Name');
    expect(result.price).toBe(24.99);
  });
});

describe('formatPrice', () => {
  it('formats UK price with pound symbol', () => {
    const result = formatPrice(29.99, 'uk');
    expect(result).toBe('£29.99');
  });

  it('formats US price with dollar symbol', () => {
    const result = formatPrice(29.99, 'us');
    expect(result).toBe('$29.99');
  });

  it('defaults to UK locale', () => {
    const result = formatPrice(10);
    expect(result).toBe('£10.00');
  });

  it('handles whole numbers', () => {
    expect(formatPrice(100, 'uk')).toBe('£100.00');
  });
});
