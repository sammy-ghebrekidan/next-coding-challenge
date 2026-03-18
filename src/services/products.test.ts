import { getProducts, getMoreProducts } from './products';

const mockApiResponse = {
  success: true,
  products: [
    { id: 1, name: { uk: 'Trainers', us: 'Sneakers' }, price: { gbp: 50, usd: 60 }, stock: 10 },
    { id: 2, name: { uk: 'Jumper', us: 'Sweater' }, price: { gbp: 30, usd: 40 }, stock: 5 },
  ],
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(mockApiResponse) } as Response)
  );
});

describe('getProducts', () => {
  it('fetches and normalizes products for UK', async () => {
    const products = await getProducts('uk');
    expect(products).toHaveLength(2);
    expect(products[0].name).toBe('Trainers');
    expect(products[0].price).toBe(50);
  });

  it('fetches and normalizes products for US', async () => {
    const products = await getProducts('us');
    expect(products[0].name).toBe('Sneakers');
    expect(products[0].price).toBe(60);
  });

  it('throws on failed request', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false } as Response));
    await expect(getProducts()).rejects.toThrow('Failed to fetch products');
  });
});

describe('getMoreProducts', () => {
  it('fetches and normalizes more products', async () => {
    const products = await getMoreProducts('uk');
    expect(products).toHaveLength(2);
    expect(products[1].name).toBe('Jumper');
  });

  it('throws on failed request', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false } as Response));
    await expect(getMoreProducts()).rejects.toThrow('Failed to fetch more products');
  });
});
