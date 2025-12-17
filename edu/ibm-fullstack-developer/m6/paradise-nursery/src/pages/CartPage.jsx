import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem.jsx';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  selectCartCount
} from '../store/cartSlice.js';

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalCost = useSelector(selectCartTotal);
  const totalCount = useSelector(selectCartCount);

  const handleIncrement = (id) => dispatch(incrementQuantity(id));
  const handleDecrement = (id) => dispatch(decrementQuantity(id));
  const handleRemove = (id) => dispatch(removeFromCart(id));

  const handleCheckout = () => {
    window.alert('Checkout coming soon!');
  };

  if (items.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Start filling it with lush greenery and style your space.</p>
          <Link to="/products" className="continue-button">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        <div className="cart-metrics">
          <span>Total plants: {totalCount}</span>
          <span>Total cost: ${totalCost.toFixed(2)}</span>
        </div>
      </div>
      <div className="cart-summary">
        <div className="cart-items">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
            />
          ))}
        </div>
        <div className="cart-actions">
          <Link to="/products" className="continue-button">
            Continue Shopping
          </Link>
          <button type="button" className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
