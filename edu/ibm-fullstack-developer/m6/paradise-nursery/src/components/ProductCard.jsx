const ProductCard = ({ plant, onAdd, inCart }) => {
  return (
    <article className="product-card">
      <img src={plant.image} alt={plant.name} loading="lazy" />
      <div className="product-card-content">
        <h3>{plant.name}</h3>
        <p className="price-tag">${plant.price.toFixed(2)}</p>
        <button
          type="button"
          className="add-button"
          onClick={() => onAdd(plant)}
          disabled={inCart}
        >
          {inCart ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
