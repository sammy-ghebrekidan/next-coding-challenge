import { memo } from 'react';
import { CartItem } from '@/types/cart';
import styles from './CartItemRow.module.css';

interface Props {
  item: CartItem;
  onIncrement: (name: string) => void;
  onDecrement: (name: string) => void;
  onRemove: (name: string) => void;
}

export const CartItemRow = memo(function CartItemRow({ item, onIncrement, onDecrement, onRemove }: Props) {
  return (
    <>
      <span className={styles.itemName}>{item.name}</span>
      <div className={styles.qtyControls}>
        <button
          className={styles.qtyBtn}
          onClick={() => onDecrement(item.name)}
          aria-label={`Decrease quantity of ${item.name}`}
          disabled={item.quantity <= 1}
        >−</button>
        <span className={styles.qty} aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
        <button
          className={styles.qtyBtn}
          onClick={() => onIncrement(item.name)}
          aria-label={`Increase quantity of ${item.name}`}
        >+</button>
      </div>
      <button
        className={styles.removeBtn}
        onClick={() => onRemove(item.name)}
        aria-label={`Remove ${item.name} from basket`}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
        </svg>
      </button>
    </>
  );
});
