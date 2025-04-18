import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Catalogue from './pages/Catalogue';
import PlaceOrder from './pages/PlaceOrder';
import TrackOrder from './pages/TrackOrder';
import AdminDashboard from './pages/AdminDashboard';
import './styles/Navbar.css'

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Catalogue</Link> |{' '}
        <Link to="/order">Place Order</Link> |{' '}
        <Link to="/track">Track Order</Link> |{' '}
        <Link to="/admin">Admin Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;