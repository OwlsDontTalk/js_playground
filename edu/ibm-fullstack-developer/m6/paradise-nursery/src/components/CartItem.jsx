const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  const lineTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <span>Unit price: ${item.price.toFixed(2)}</span>
        <span>Line total: ${lineTotal}</span>
        <div className="quantity-controls" aria-label={`Quantity controls for ${item.name}`}>
          <button type="button" onClick={() => onDecrement(item.id)} aria-label={`Decrease ${item.name} quantity`}>
            -
          </button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => onIncrement(item.id)} aria-label={`Increase ${item.name} quantity`}>
            +
          </button>
        </div>
        <button type="button" className="remove-button" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
