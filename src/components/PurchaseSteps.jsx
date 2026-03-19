import React from 'react';
import { ShoppingBag, FileText, MessageSquare, Package } from 'lucide-react';
import './PurchaseSteps.css';

export default function PurchaseSteps() {
  const steps = [
    {
      icon: <ShoppingBag size={32} />,
      title: '1. Elige',
      description: 'Explora nuestra colección y añade tus favoritos al carrito.'
    },
    {
      icon: <FileText size={32} />,
      title: '2. Confirma',
      description: 'Ingresa tus datos y descarga tu resumen de pedido en PDF.'
    },
    {
      icon: <MessageSquare size={32} />,
      title: '3. Coordina',
      description: 'Envíanos el PDF por WhatsApp para acordar el pago y envío.'
    },
    {
      icon: <Package size={32} />,
      title: '4. Recibe',
      description: '¡Listo! Despachamos tu pedido y lo recibes en la puerta de tu casa.'
    }
  ];

  return (
    <section className="purchase-steps">
      <div className="container">
        <div className="section-header text-center">
          <h2>Cómo Comprar en LUVENIA</h2>
          <p>Tu experiencia de lujo, paso a paso</p>
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-icon">
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
