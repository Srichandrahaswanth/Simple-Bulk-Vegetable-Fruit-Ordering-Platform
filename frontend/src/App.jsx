import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import PlaceOrder from './pages/PlaceOrder';
import TrackOrder from './pages/TrackOrder';
import AdminDashboard from './pages/AdminDashboard';
import { ShoppingBag, Search, LayoutDashboard, Send } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="container">
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShoppingBag className="primary-color" style={{ color: 'var(--primary)' }} />
        <h2 style={{ margin: 0 }}>Fresh<span className="gradient-text">Bulk</span></h2>
      </div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Catalogue</Link>
        <Link to="/track" className={location.pathname === '/track' ? 'active' : ''}>Track Order</Link>
        <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Admin</Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
