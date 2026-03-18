import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '@/context/CartContext';
import { Cart } from './Cart';

const renderCart = (locale: 'uk' | 'us' = 'uk') => render(<CartProvider><Cart locale={locale} /></CartProvider>);

describe('Cart', () => {
  beforeEach(() => localStorage.clear());

  it('opens accessible dialog on click', async () => {
    renderCart();
    await userEvent.click(screen.getByLabelText(/basket, 0 items/i));
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Basket');
  });

  it('shows empty message with status role', async () => {
    renderCart();
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('status')).toHaveTextContent('Your basket is empty.');
  });

  it('has close button with aria-label', async () => {
    renderCart();
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByLabelText('Close basket')).toBeInTheDocument();
  });
});
