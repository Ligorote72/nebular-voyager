import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { Package, Tag, ShoppingCart, Users, TrendingUp, AlertCircle } from 'lucide-react';
import './Admin.css';

export default function AdminDashboard() {
  const [products, setProducts] = useState(PRODUCTS);
  const [activeTab, setActiveTab] = useState('inventory');

  const updateStock = (id, delta) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
    ));
  };

  const stats = [
    { label: 'Ventas Totales', value: '$45.200.000', icon: <TrendingUp size={20} />, trend: '+12.5%' },
    { label: 'Pedidos Activos', value: '24', icon: <ShoppingCart size={20} /> },
    { label: 'Stock Bajo', value: products.filter(p => p.stock < 10).length, icon: <AlertCircle size={20} />, color: '#E74C3C' },
    { label: 'Clientes', value: '1.204', icon: <Users size={20} /> },
  ];

  return (
    <div className="admin-page container">
      <header className="admin-header">
        <h1>Gestión de Tienda</h1>
        <div className="admin-tabs">
          <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}>
            <Package size={18} /> Inventario
          </button>
          <button className={activeTab === 'coupons' ? 'active' : ''} onClick={() => setActiveTab('coupons')}>
            <Tag size={18} /> Cupones
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            <ShoppingCart size={18} /> Pedidos
          </button>
        </div>
      </header>

      <section className="admin-stats">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              {stat.trend && <span className="stat-trend">{stat.trend}</span>}
            </div>
          </div>
        ))}
      </section>

      <main className="admin-content">
        {activeTab === 'inventory' && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Nota</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="td-product">
                        <img src={product.image} alt="" />
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td>{product.note}</td>
                    <td>
                      <span className={`stock-badge ${product.stock < 10 ? 'low' : ''}`}>
                        {product.stock} unidades
                      </span>
                    </td>
                    <td>${product.price.toLocaleString('es-CO')}</td>
                    <td>
                      <div className="stock-actions">
                        <button onClick={() => updateStock(product.id, -1)}>-1</button>
                        <button onClick={() => updateStock(product.id, 1)}>+1</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'coupons' && (
          <div className="placeholder-view">
            <h3>Gestión de Cupones</h3>
            <p>Crea y rastrea códigos de descuento para tus clientes.</p>
            <button className="btn btn-primary">Crear Nuevo Cupón</button>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="placeholder-view">
            <h3>Historial de Pedidos</h3>
            <p>Visualiza y gestiona los pedidos de los clientes y el estado del envío.</p>
          </div>
        )}
      </main>
    </div>
  );
}
