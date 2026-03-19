import React from 'react';
import './HappyClients.css';

export default function HappyClients() {
  const testimonials = [
    {
      image: '/img/client1.png',
      user: 'Sofía R.',
      comment: '¡Me encantó mi Lattafa! El proceso de pedido por WhatsApp fue súper rápido y el PDF me dio mucha seguridad.'
    },
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop',
      user: 'Julián M.',
      comment: 'Excelente atención. El Bad Boy llegó en menos de 24 horas a Medellín. 100% recomendado.'
    },
    {
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop',
      user: 'Valentina P.',
      comment: 'La presentación de los paquetes es de otro nivel. Se nota que cuidan cada detalle de LUVENIA.'
    }
  ];

  return (
    <section className="happy-clients container">
      <div className="section-header text-center">
        <h2>Nuestras Clientas</h2>
        <p>Experiencias reales, aromas inolvidables</p>
      </div>
      <div className="clients-grid">
        {testimonials.map((item, index) => (
          <div key={index} className="client-card">
            <div className="client-image">
              <img src={item.image} alt={item.user} />
            </div>
            <div className="client-info">
              <h4>{item.user}</h4>
              <p className="client-comment">"{item.comment}"</p>
              <div className="stars">★★★★★</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
