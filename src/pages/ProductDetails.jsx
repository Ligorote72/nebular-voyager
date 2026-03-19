import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, ArrowLeft, Star, Heart, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = PRODUCTS.find(p => p.id === parseInt(id)) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity(prev => prev + 1);

  const onAddToCart = () => {
    addToCart(product, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const onBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div 
      className="product-details-page animate-fade-in"
      style={{
        '--product-theme-color': product.color,
        background: `radial-gradient(circle at 50% -20%, ${product.color}44, var(--color-bg) 80%)`
      }}
    >
      <div className="dynamic-background-sweep" style={{ background: `linear-gradient(45deg, ${product.color}22, transparent)` }}></div>
      <div className="dynamic-background-glow" style={{ backgroundColor: product.color }}></div>
      {showToast && (
        <div className="toast-notification-premium">
          <div className="toast-content">
            <CheckCircle size={20} color="#00A650" />
            <span>¡{product.name} añadido al carrito!</span>
          </div>
          <Link to="/cart" className="toast-link">Ver Carrito</Link>
        </div>
      )}
      <div className="container">
        <Link to="/shop" className="back-link">
          <ArrowLeft size={16} style={{ marginRight: '8px' }} />
          Volver a la Colección
        </Link>
        
        <div className="product-details-layout">
          {/* Left Column: Gallery + Extended Info */}
          <div className="product-main-content">
            <div className={`product-gallery-wrapper card-${product.category}`}>
              <div className="gallery-main">
                <img src={product.image} alt={product.name} className="main-image" />
                <button className="wishlist-btn"><Heart size={20} /></button>
              </div>
            </div>
            
            <div className="product-details-extended">
              <section className="product-section">
                <h3>Descripción</h3>
                <p>{product.description}</p>
              </section>

              <section className="product-section">
                <div className="product-accordion">
                  <details className="accordion-item" open>
                    <summary>Notas e Ingredientes</summary>
                    <div className="accordion-content">
                      <p>{product.ingredients}</p>
                    </div>
                  </details>
                  <details className="accordion-item">
                    <summary>Envío y Devoluciones</summary>
                    <div className="accordion-content">
                      <p>Envío gratuito en pedidos superiores a $300,000 COP. Se aceptan devoluciones dentro de los 14 días posteriores a la entrega en su estado original y sin abrir.</p>
                    </div>
                  </details>
                  <details className="accordion-item">
                    <summary>Reseñas de Clientes ({product.reviews.length})</summary>
                    <div className="accordion-content reviews-list">
                      {product.reviews.length > 0 ? product.reviews.map(review => (
                        <div key={review.id} className="review-item">
                          <div className="review-header">
                            <span className="reviewer-name">{review.user}</span>
                            <div className="rating">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < review.rating ? "var(--color-text-primary)" : "none"} stroke="var(--color-text-primary)" />
                              ))}
                            </div>
                          </div>
                          <p className="review-comment">{review.comment}</p>
                          {review.photo && <div className="review-photo-wrapper"><img src={review.photo} alt="Reseña" /></div>}
                        </div>
                      )) : <p className="empty-reviews">Aún no hay reseñas. Sé el primero en compartir tu experiencia.</p>}
                    </div>
                  </details>
                </div>
              </section>
            </div>
          </div>

          {/* Right Column: Sticky Purchase Card */}
          <aside className="product-purchase-column">
            <div className="purchase-card info-panel-glass">
              <div className="product-status-bar">
                <span className="stock-badge">Nuevo | {product.stock > 0 ? 'Disponible' : 'Agotado'}</span>
              </div>
              
              <h1 className="product-title-lite">{product.name}</h1>
              
              <div className="product-rating-summary">
                <div className="stars">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} />
                </div>
                <span className="review-count">({product.reviews.length} opiniones)</span>
              </div>

              <div className="price-tag">
                <span className="currency">$</span>
                <span className="amount">{product.price.toLocaleString('es-CO').replace('$', '')}</span>
              </div>

              <div className="purchase-cta-box">
                <p className="shipping-info">Envío **Gratis** a todo el país</p>
                <p className="shipping-subtitle">Llega entre el jueves y el lunes</p>
                
                <div className="quantity-selector-ml">
                  <label>Cantidad:</label>
                  <div className="qty-controls">
                    <button onClick={handleDecrease}><Minus size={14} /></button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}><Plus size={14} /></button>
                  </div>
                  <span className="available-text">({product.stock} disponibles)</span>
                </div>

                <button 
                  className="btn btn-primary btn-buy-now" 
                  disabled={product.stock === 0}
                  onClick={onBuyNow}
                  style={{ backgroundColor: product.color, borderColor: product.color }}
                >
                  Continuar Compra
                </button>
                
                <button 
                  className="btn btn-add-cart-secondary" 
                  disabled={product.stock === 0}
                  onClick={onAddToCart}
                  style={{ color: product.color, borderColor: product.color }}
                >
                  Agregar al carrito
                </button>

                <div className="trust-badges">
                  <div className="trust-item">🛡️ Compra Protegida</div>
                  <div className="trust-item">✨ Producto Original Nebular</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
