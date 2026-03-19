import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    city: ''
  });

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    setIsRedirecting(true);
    
    // Generar un ID simple para referencia
    const orderId = `LUV-${Math.floor(Math.random() * 9000 + 1000)}`;
    
    const itemsList = cart.map(item => 
      `• ${item.name} x${item.quantity} ($${(item.price * item.quantity).toLocaleString('es-CO')})`
    ).join('\n');

    const message = encodeURIComponent(
      `✨ *¡Hola Luvenia!* ✨\n` +
      `He estado explorando la colección en la web y me he enamorado de estas fragancias. 🛍️💖\n\n` +
      `*Aquí tienes los detalles de mi pedido:*\n` +
      `------------------------------------------\n` +
      `👤 *A nombre de:* ${customerInfo.name}\n` +
      `📍 *Destino:* ${customerInfo.city}\n` +
      `🆔 *Referencia:* ${orderId}\n\n` +
      `📦 *Mi Selección:*\n${itemsList}\n\n` +
      `✨ *Inversión Total:* $${subtotal.toLocaleString('es-CO')}\n` +
      `------------------------------------------\n\n` +
      `Quedo a la espera de sus indicaciones para el pago y el envío. ¡Muchas gracias por la atención personalizada! ✨🌸`
    );

    // Redirección inmediata
    setTimeout(() => {
      window.open(`https://wa.me/573114441818?text=${message}`, '_blank');
      setIsRedirecting(false);
      setOrderComplete(true);
      clearCart();
    }, 1000);
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="checkout-empty container animate-fade-in">
        <h2>Tu carrito está vacío</h2>
        <p>Explora nuestra colección para encontrar tu aroma ideal.</p>
        <Link to="/shop" className="btn btn-primary mt-4">Ver Colección</Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="checkout-success container animate-fade-in">
        <CheckCircle size={64} color="#25D366" />
        <h1>¡Pedido Enviado!</h1>
        <p>Te hemos redirigido a WhatsApp con el resumen de tu compra. Tu asesor te atenderá allí para finalizar el pago.</p>
        <Link to="/" className="btn btn-primary mt-4">Volver al Inicio</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page container animate-fade-in">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={16} /> Volver a la Colección
      </Link>
      
      <div className="checkout-layout">
        <div className="checkout-form-section">
          <h1>Finalizar vía WhatsApp</h1>
          <p className="subtitle">Hablaremos directamente contigo para coordinar el pago y envío de forma personalizada.</p>
          
          <form className="checkout-form" onSubmit={handleWhatsAppOrder}>
            <div className="checkout-section">
              <h3 className="section-title">Confirma tus Datos</h3>
              <div className="form-grid">
                <input 
                  required 
                  type="text" 
                  placeholder="Tu nombre completo" 
                  className="span-2"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                />
                <input 
                  required 
                  type="text" 
                  placeholder="Ciudad de envío" 
                  className="span-2"
                  value={customerInfo.city}
                  onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary whatsapp-btn" disabled={isRedirecting}>
              <MessageCircle size={18} style={{marginRight: '10px'}} />
              {isRedirecting ? 'Preparando mensaje...' : 'Completar Pedido (WhatsApp)'}
            </button>
          </form>
        </div>

        <aside className="order-summary">
          <h3>Tu Pedido</h3>
          <div className="cart-items-preview">
            {cart.map(item => (
              <div key={item.id} className="preview-item">
                <div className="item-details">
                  <span className="name">{item.name}</span>
                  <span className="qty">x{item.quantity}</span>
                </div>
                <span className="price">${(item.price * item.quantity).toLocaleString('es-CO')}</span>
              </div>
            ))}
          </div>
          <div className="summary-list">
            <div className="summary-total">
              <span>Total Estimado</span>
              <span>${subtotal.toLocaleString('es-CO')}</span>
            </div>
          </div>
          <div className="assurance-badges">
            <div className="badge">✓ Pago seguro contra entrega o transferencia</div>
            <div className="badge">✓ Asesoría personalizada 1 a 1 en WhatsApp</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
