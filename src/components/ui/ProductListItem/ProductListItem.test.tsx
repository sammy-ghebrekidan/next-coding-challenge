import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductListItem } from './ProductListItem';

const product = { id: 1, name: 'Test Product', price: 29.99, image: '/test.jpg' };

describe('ProductListItem', () => {
  it('renders product info with accessibility', () => {
    render(<ProductListItem product={product} onAddToBasket={jest.fn()} locale="uk" />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('£29.99')).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveAttribute('aria-label', 'Test Product, £29.99');
  });

  it('calls onAddToBasket with accessible button', async () => {
    const onAdd = jest.fn();
    render(<ProductListItem product={product} onAddToBasket={onAdd} locale="uk" />);
    await userEvent.click(screen.getByLabelText(/quick add: test product/i));
    expect(onAdd).toHaveBeenCalledWith('Test Product');
  });

  it('formats price for US locale', () => {
    render(<ProductListItem product={product} onAddToBasket={jest.fn()} locale="us" />);
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });
});
