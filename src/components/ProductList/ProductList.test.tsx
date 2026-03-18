import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductList } from './ProductList';

const products = [
  { id: 1, name: 'Product 1', price: 10, image: '/1.jpg' },
  { id: 2, name: 'Product 2', price: 20, image: '/2.jpg' },
];

describe('ProductList', () => {
  it('renders all products', () => {
    render(<ProductList products={products} onAddToBasket={jest.fn()} locale="uk" />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('calls onAddToBasket for each item', async () => {
    const onAdd = jest.fn();
    render(<ProductList products={products} onAddToBasket={onAdd} locale="uk" />);
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(onAdd).toHaveBeenCalledWith('Product 1');
  });
});
