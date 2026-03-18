import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '@/context/CartContext';
import { MoreProducts } from './MoreProducts';

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock('swiper/modules', () => ({ FreeMode: {}, Navigation: {} }));
jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/free-mode', () => ({}));

const products = [
  { id: 1, name: 'Product 1', price: 10, image: '/1.jpg' },
  { id: 2, name: 'Product 2', price: 20, image: '/2.jpg' },
];

const renderMoreProducts = (locale: 'uk' | 'us' = 'uk') =>
  render(<CartProvider><MoreProducts products={products} locale={locale} /></CartProvider>);

describe('MoreProducts', () => {
  beforeEach(() => localStorage.clear());

  it('renders heading and item count', () => {
    renderMoreProducts();
    expect(screen.getByText('More Products')).toBeInTheDocument();
    expect(screen.getByText('2 items')).toBeInTheDocument();
  });

  it('renders all products', () => {
    renderMoreProducts();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('has accessible section', () => {
    renderMoreProducts();
    expect(screen.getByRole('region')).toHaveAttribute('aria-labelledby', 'more-products-heading');
  });

  it('calls addToCart on click', async () => {
    renderMoreProducts();
    await userEvent.click(screen.getAllByRole('button')[0]);
  });
});
