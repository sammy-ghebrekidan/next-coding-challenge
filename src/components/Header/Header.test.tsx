import { render, screen } from '@testing-library/react';
import { Header } from './Header';

jest.mock('next/dynamic', () => {
  const MockCart = () => <div>Basket</div>;
  MockCart.displayName = 'MockCart';
  return () => MockCart;
});

describe('Header', () => {
  it('renders store name', () => {
    render(<Header locale="uk" />);
    expect(screen.getByText("Michael's Amazing Web Store")).toBeInTheDocument();
  });
});
