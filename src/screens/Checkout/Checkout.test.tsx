import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '@/context/CartContext';
import { Checkout } from './Checkout';

const renderCheckout = (locale: 'uk' | 'us' = 'uk') =>
  render(<CartProvider><Checkout locale={locale} /></CartProvider>);

describe('Checkout', () => {
  beforeEach(() => localStorage.clear());

  it('shows empty message when basket is empty', () => {
    renderCheckout();
    expect(screen.getByText('Your basket is empty.')).toBeInTheDocument();
    expect(screen.getByText('Continue shopping')).toBeInTheDocument();
  });

  it('shows US locale empty message', () => {
    renderCheckout('us');
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  it('has accessible heading', () => {
    renderCheckout();
    expect(screen.getByRole('heading', { name: 'Checkout' })).toBeInTheDocument();
  });

  it('links back to home with correct locale', () => {
    renderCheckout('us');
    expect(screen.getByRole('link', { name: 'Continue shopping' })).toHaveAttribute('href', '/us');
  });
});
