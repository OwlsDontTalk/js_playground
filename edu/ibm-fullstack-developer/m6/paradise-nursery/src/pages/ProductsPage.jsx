import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard.jsx';
import plants from '../data/plants.js';
import { addToCart, selectCartItems } from '../store/cartSlice.js';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const cartIds = new Set(cartItems.map((item) => item.id));

  const categories = plants.reduce((acc, plant) => {
    if (!acc[plant.category]) {
      acc[plant.category] = [];
    }
    acc[plant.category].push(plant);
    return acc;
  }, {});

  const handleAdd = (plant) => {
    dispatch(addToCart(plant));
  };

  return (
    <section className="products-page">
      <h2>Shop Houseplants</h2>
      <p className="description">
        Browse our curated selection of plants organized by the perfect environment to help your greenery thrive.
      </p>
      {Object.entries(categories).map(([category, categoryPlants]) => (
        <div className="category-group" key={category}>
          <h3 className="category-title">{category}</h3>
          <div className="products-grid">
            {categoryPlants.map((plant) => (
              <ProductCard
                key={plant.id}
                plant={plant}
                onAdd={handleAdd}
                inCart={cartIds.has(plant.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductsPage;
