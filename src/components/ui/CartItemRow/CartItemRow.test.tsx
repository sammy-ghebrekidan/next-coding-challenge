import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartItemRow } from './CartItemRow';

describe('CartItemRow', () => {
  const item = { name: 'Test Product', quantity: 2 };
  const onIncrement = jest.fn();
  const onDecrement = jest.fn();
  const onRemove = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('renders item name and quantity', () => {
    render(<CartItemRow item={item} onIncrement={onIncrement} onDecrement={onDecrement} onRemove={onRemove} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls handlers on button clicks', async () => {
    render(<CartItemRow item={item} onIncrement={onIncrement} onDecrement={onDecrement} onRemove={onRemove} />);
    await userEvent.click(screen.getByLabelText(/increase quantity/i));
    expect(onIncrement).toHaveBeenCalledWith('Test Product');
    await userEvent.click(screen.getByLabelText(/decrease quantity/i));
    expect(onDecrement).toHaveBeenCalledWith('Test Product');
  });

  it('disables decrement when quantity is 1', () => {
    render(<CartItemRow item={{ name: 'X', quantity: 1 }} onIncrement={onIncrement} onDecrement={onDecrement} onRemove={onRemove} />);
    expect(screen.getByLabelText(/decrease quantity/i)).toBeDisabled();
  });

  it('has accessible remove button', () => {
    render(<CartItemRow item={item} onIncrement={onIncrement} onDecrement={onDecrement} onRemove={onRemove} />);
    expect(screen.getByLabelText(/remove test product from basket/i)).toBeInTheDocument();
  });
});
