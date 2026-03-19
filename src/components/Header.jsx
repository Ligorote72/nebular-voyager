import { Link } from 'react-router-dom';
import { ShoppingBag, User, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const { totalItems } = useCart();

  return (
    <>
      <header className="header glass">
        <div className="header-container container">
          <Link to="/" className="logo">
            LUVENIA
          </Link>
          
          <nav className="nav">
            <Link to="/shop" className="nav-link">La Colección</Link>
          </nav>

          <div className="header-actions">
            <button className="icon-btn" aria-label="Cuenta">
              <User size={20} />
            </button>
            <Link to="/checkout" className="icon-btn cart-toggle" aria-label="Carrito">
              <ShoppingBag size={20} />
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </Link>
          </div>
        </div>
      </header>
      
      {/* Botón Flotante de WhatsApp */}
      <a 
        href="https://wa.me/573114441818" 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        title="Hablar con un asesor en WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </>
  );
}
