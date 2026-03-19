import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import './Checkout.css';

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const [isGenerating, setIsGenerating] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    city: ''
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    const orderId = `NEB-${Math.floor(Math.random() * 900000 + 100000)}`;
    
    doc.setFontSize(22);
    doc.text('LUVENIA - Resumen de Pedido', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`ID de Orden: ${orderId}`, 20, 30);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.text(`Cliente: ${customerInfo.name}`, 20, 45);
    doc.text(`Ciudad: ${customerInfo.city}`, 20, 52);
    
    doc.line(20, 60, 190, 60);
    
    let y = 70;
    cart.forEach((item) => {
      doc.text(`${item.name} x ${item.quantity}`, 20, y);
      doc.text(`$${(item.price * item.quantity).toLocaleString('es-CO')}`, 160, y);
      y += 10;
    });
    
    doc.line(20, y, 190, y);
    doc.setFontSize(14);
    doc.text(`Total: $${subtotal.toLocaleString('es-CO')}`, 145, y + 10);
    
    // Guardar/Descargar el PDF
    doc.save(`Pedido_Luvenia_${orderId}.pdf`);
    
    return { orderId };
  };

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    const { orderId } = generatePDF();
    
    // Simular preparación de documento y redirección
    setTimeout(() => {
      setIsGenerating(false);
      setOrderComplete(true);
      
      const message = encodeURIComponent(
        `¡Hola! Soy ${customerInfo.name} de ${customerInfo.city}.\n` +
        `Quisiera concretar mi pedido ${orderId}.\n\n` +
        `📦 **Adjunto te envío el PDF con el resumen de mi pedido que acabo de descargar.**\n\n` +
        `Total a pagar: $${subtotal.toLocaleString('es-CO')}\n\n` +
        `Por favor, indíquenme cómo proceder con el pago.`
      );
      
      window.open(`https://wa.me/573114441818?text=${message}`, '_blank');
      clearCart();
    }, 1500);
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
        <h1>¡Pedido en Camino!</h1>
        <p>Tu resumen PDF se ha descargado. Te hemos redirigido a WhatsApp para finalizar el pago con tu asesor.</p>
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
                  placeholder="Nombre completo" 
                  className="span-2"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                />
                <input 
                  required 
                  type="text" 
                  placeholder="Ciudad de destino" 
                  className="span-2"
                  value={customerInfo.city}
                  onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary whatsapp-btn" disabled={isGenerating}>
              <MessageCircle size={18} style={{marginRight: '10px'}} />
              {isGenerating ? 'Generando PDF y Redirigiendo...' : 'Coordinar por WhatsApp'}
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
