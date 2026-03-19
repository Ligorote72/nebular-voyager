import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import PurchaseSteps from '../components/PurchaseSteps';
import './Catalog.css';

import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function Catalog() {
  const { addToCart } = useCart();
  const [addedProduct, setAddedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    note: 'All',
    size: 'All',
    gender: 'All'
  });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredProducts = PRODUCTS.filter(product => {
    const noteFilter = filters.note === 'All' ? true : (filters.note === 'Amaderado' ? product.note === 'Amaderado' : (filters.note === 'Cítrico' ? product.note === 'Cítrico' : product.note === filters.note));
    return noteFilter &&
           (filters.size === 'All' || product.size === filters.size) &&
           (filters.gender === 'All' || product.gender === filters.gender);
  });

  return (
    <div className="catalog animate-fade-in">
      {addedProduct && (
        <div className="toast-notification">
          ¡{addedProduct} añadido al carrito!
        </div>
      )}
      <div className="catalog-header container">
        <h1>La Colección</h1>
        <button 
          className="btn btn-secondary filter-toggle"
          onClick={() => setIsFilterOpen(true)}
        >
          <Filter size={18} style={{ marginRight: '8px' }} />
          Filtros
        </button>
      </div>

      <div className="catalog-layout container">
        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="filters-header">
            <h3>Filtrar Por</h3>
            <button className="icon-btn" onClick={() => setIsFilterOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="filter-group">
            <h4>Nota Olfativa</h4>
            {['All', 'Floral', 'Amaderado', 'Cítrico'].map(note => (
              <label key={note} className="filter-option">
                <input 
                  type="radio" 
                  name="note" 
                  checked={filters.note === note}
                  onChange={() => handleFilterChange('note', note)}
                />
                <span>{note === 'All' ? 'Todas' : note}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Tamaño</h4>
            {['All', '50ml', '100ml', '150ml', '200ml'].map(size => (
              <label key={size} className="filter-option">
                <input 
                  type="radio" 
                  name="size" 
                  checked={filters.size === size}
                  onChange={() => handleFilterChange('size', size)}
                />
                <span>{size === 'All' ? 'Todos' : size}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Género</h4>
            {['All', 'Femenino', 'Masculino', 'Unisex'].map(gender => (
              <label key={gender} className="filter-option">
                <input 
                  type="radio" 
                  name="gender" 
                  checked={filters.gender === gender}
                  onChange={() => handleFilterChange('gender', gender)}
                />
                <span>{gender === 'All' ? 'Todos' : gender}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="catalog-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className={`product-card ${product.category}`}>
              <div className="product-image-container">
                <Link to={`/product/${product.id}`}>
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <img src={product.image} alt={product.name} />
                </Link>
                <button 
                  className="quick-add"
                  onClick={() => {
                    addToCart(product, 1);
                    // Feedback handled by toast logic in parent or local state
                  }}
                >
                  {/* ... can add local toast trigger here ... */}
                  Añadir al Carrito
                </button>
              </div>
              <div className="product-info">
                <Link to={`/product/${product.id}`}>
                  <div className="product-note-wrapper">
                    <span className="note-icon">{product.noteIcon}</span>
                    <span className="product-note">{product.note} / {product.size}</span>
                  </div>
                  <h3>{product.name}</h3>
                </Link>
                <span className="product-price">${product.price.toLocaleString('es-CO')}</span>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="no-results">
              <p>No hay productos que coincidan con tus criterios. Intenta ajustar los filtros.</p>
              <button 
                className="btn btn-secondary mt-4"
                onClick={() => setFilters({note: 'All', size: 'All', gender: 'All'})}
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </div>
      <PurchaseSteps />
    </div>
  );
}
