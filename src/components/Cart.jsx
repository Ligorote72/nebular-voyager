import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import './Cart.css';

// Using dummy state for UI demonstration
const DUMMY_CART_ITEMS = [
  { id: 1, name: 'Rose & Velvet', size: '100ml', price: 85, quantity: 1, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop', category: 'card-floral' },
  { id: 3, name: 'Bergamot Breeze', size: '150ml', price: 95, quantity: 2, image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2000&auto=format&fit=crop', category: 'card-citrus' }
];

export default function Cart({ isOpen, onClose }) {
  const cartItems = DUMMY_CART_ITEMS;
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Real shipping calculation logic would go here
  const shipping = subtotal > 100 ? 0 : 15; 
  const total = subtotal + shipping;

  return (
    <>
      {/* Backdrop */}
      <div className={`cart-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} />
      
      {/* Cart Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length > 0 ? (
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className={`cart-item-image ${item.category}`}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <h3>{item.name}</h3>
                      <button className="remove-btn">Remove</button>
                    </div>
                    <span className="cart-item-size">{item.size}</span>
                    <div className="cart-item-bottom">
                      <div className="cart-quantity-selector">
                        <button><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button><Plus size={14} /></button>
                      </div>
                      <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-cart">
              <ShoppingBag size={48} />
              <p>Your cart is currently empty.</p>
              <button className="btn btn-primary" onClick={onClose}>Continue Shopping</button>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="payment-icons">
              {/* Dummy SVGs for Payment Providers */}
              <span className="payment-icon">VISA</span>
              <span className="payment-icon">MasterCard</span>
              <span className="payment-icon">PayPal</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row shipping-row">
              <span>Shipping (Est.)</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <p className="shipping-note">Taxes and final shipping calculated at checkout.</p>
            
            <button className="btn btn-primary checkout-btn" onClick={() => window.location.href='/checkout'}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
