import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../store/cartSlice.js';

const Header = () => {
  const cartCount = useSelector(selectCartCount);
  const location = useLocation();
  const onCartPage = location.pathname === '/cart';

  const navTarget = onCartPage
    ? { to: '/products', label: 'Continue Shopping' }
    : { to: '/', label: 'Landing' };

  return (
    <header className="app-header">
      <Link to="/products" className="brand">
        Paradise Nursery
      </Link>
      <nav>
        <Link to={navTarget.to} className="secondary-link">
          {navTarget.label}
        </Link>
        <Link to="/cart" className="cart-link" aria-label="View cart">
          <span className="cart-icon" role="img" aria-label="Shopping cart icon">🛒</span>
          <span className="cart-count">{cartCount}</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
