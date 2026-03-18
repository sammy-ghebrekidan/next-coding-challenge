import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '@/context/CartContext';
import { ProductListing } from './ProductListing';

const products = [
  { id: 1, name: 'Product 1', price: 10, image: '/1.jpg' },
  { id: 2, name: 'Product 2', price: 20, image: '/2.jpg' },
];

const renderListing = (locale: 'uk' | 'us' = 'uk') =>
  render(<CartProvider><ProductListing products={products} locale={locale} /></CartProvider>);

describe('ProductListing', () => {
  beforeEach(() => localStorage.clear());

  it('renders heading and description', () => {
    renderListing();
    expect(screen.getByRole('heading', { name: 'Products' })).toBeInTheDocument();
    expect(screen.getByText(/Browse Michael's Amazing Web Store/)).toBeInTheDocument();
  });

  it('renders item count', () => {
    renderListing();
    expect(screen.getByText('2 items')).toBeInTheDocument();
  });

  it('renders all products', () => {
    renderListing();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('adds to basket on click', async () => {
    renderListing();
    await userEvent.click(screen.getAllByRole('button')[0]);
  });
});
