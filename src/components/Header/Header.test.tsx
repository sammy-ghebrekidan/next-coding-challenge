import { render, screen } from '@testing-library/react';
import { Header } from './Header';

jest.mock('next/dynamic', () => () => () => <div>Basket</div>);

describe('Header', () => {
  it('renders store name', () => {
    render(<Header locale="uk" />);
    expect(screen.getByText("Michael's Amazing Web Store")).toBeInTheDocument();
  });
});
