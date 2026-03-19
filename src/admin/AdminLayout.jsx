import { Outlet, Link, useLocation } from 'react-router-dom';
import { Package, Tag, Users, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import './AdminLayout.css';

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Inventory', path: '/admin/inventory', icon: <Package size={20} /> },
    { name: 'Coupons', path: '/admin/coupons', icon: <Tag size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <Users size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="admin-container">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>AURA</h2>
          <span>Admin Portal</span>
        </div>

        <nav className="admin-nav">
          {navItems.map(item => (
            <Link 
              key={item.name} 
              to={item.path}
              className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-bottom-nav">
          <Link to="/" className="admin-nav-item text-muted">
            <LogOut size={20} />
            <span>Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-user-info">
            <div className="avatar">A</div>
            <span>Admin User</span>
          </div>
        </header>

        <div className="admin-content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
