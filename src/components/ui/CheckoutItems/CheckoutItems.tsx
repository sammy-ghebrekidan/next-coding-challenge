import { CartItem } from '@/types/cart';
import { CartItemRow } from '@/components/ui/CartItemRow/CartItemRow';
import styles from './CheckoutItems.module.css';

interface Props {
  items: CartItem[];
  heading: string;
  quantityLabel: string;
  onIncrement: (name: string) => void;
  onDecrement: (name: string) => void;
  onRemove: (name: string) => void;
}

export const CheckoutItems = ({ items, heading, quantityLabel, onIncrement, onDecrement, onRemove }: Props) => {
  return (
    <ul className={styles.list} aria-label="Items in your basket">
      <li className={`${styles.item} ${styles.header}`} aria-hidden="true">
        <span className={styles.itemName}>{heading}</span>
        <span className={styles.itemQuantity}>{quantityLabel}</span>
      </li>
      {items.map(item => (
        <li key={item.name} className={styles.item}>
          <CartItemRow item={item} onIncrement={onIncrement} onDecrement={onDecrement} onRemove={onRemove} />
        </li>
      ))}
    </ul>
  );
}
