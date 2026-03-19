import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import PurchaseSteps from '../components/PurchaseSteps';
import HappyClients from '../components/HappyClients';
import './Home.css';

export default function Home() {
  const { addToCart } = useCart();
  const [addedProduct, setAddedProduct] = useState(null);
  const featuredProducts = PRODUCTS.slice(0, 3);

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedProduct(product.name);
    setTimeout(() => setAddedProduct(null), 2000);
  };

  return (
    <div className="home animate-fade-in">
      {addedProduct && (
        <div className="toast-notification">
          ¡{addedProduct} añadido al carrito!
        </div>
      )}
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <span className="hero-subtitle">LUVENIA / Alta Perfumería</span>
          <h1 className="hero-title">La Esencia de la Pureza.</h1>
          <p className="hero-description">
            Descubre nuestra colección curada de lociones premium, 
            diseñadas para elevar tu ritual diario con hidratación elegante 
            y fragancias atemporales.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">
              Explorar Colección
            </Link>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2787&auto=format&fit=crop" 
            alt="Botella de Loción de Lujo" 
            className="hero-image"
          />
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured container">
        <div className="section-header">
          <h2>Aromas Distintivos</h2>
          <Link to="/shop" className="link-arrow">Ver Todo</Link>
        </div>
        
        <div className="featured-grid">
          {featuredProducts.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className={`product-card ${product.category}`}>
              <div className="product-image-container">
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <img src={product.image} alt={product.name} />
                <button 
                  className="quick-add"
                  onClick={(e) => handleQuickAdd(e, product)}
                >
                  Añadir Rápido
                </button>
              </div>
              <div className="product-info">
                <div className="product-note-wrapper">
                  <span className="note-icon">{product.noteIcon}</span>
                  <span className="product-note">{product.note} / {product.size}</span>
                </div>
                <h3>{product.name}</h3>
                <span className="product-price">${product.price.toLocaleString('es-CO')}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <HappyClients />
      <PurchaseSteps />
    </div>
  );
}
