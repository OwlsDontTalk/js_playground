import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <section className="landing">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>
          Discover vibrant tropicals, sculptural succulents, and air-purifying houseplants handpicked by our horticulture team. 
          We deliver plant joy with detailed care guides so every space can feel like a personal paradise.
        </p>
        <Link to="/products" className="cta-button">
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default LandingPage;
