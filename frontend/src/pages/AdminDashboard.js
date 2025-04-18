import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css'

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_API_BASE}/api/orders`).then(res => setOrders(res.data));
    axios.get(`${process.env.REACT_APP_API_BASE}/api/products`).then(res => setProducts(res.data));
  };

  const updateStatus = (id, newStatus) => {
    axios.put(`${process.env.REACT_APP_API_BASE}/api/orders/${id}/status`, { status: newStatus }).then(fetchData);
  };

  const addProduct = () => {
    // Validate
    if (!newProduct.name || !newProduct.price) {
      alert("Please fill all fields");
      return;
    }

    // Convert price to number
    const productToAdd = {
      ...newProduct,
      price: Number(newProduct.price)
    };

    axios.post(`${process.env.REACT_APP_API_BASE}/api/products`, productToAdd).then(() => {
      setNewProduct({ name: '', price: '' });
      fetchData();
    }).catch(err => {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    });
  };

  const deleteProduct = id => {
    axios.delete(`${process.env.REACT_APP_API_BASE}/api/products/${id}`).then(fetchData);
  };

  return (
    <div className="dashboard">
  <h2>Admin Dashboard</h2>

  <div className="section">
    <h3>Orders</h3>
    {orders.map(o => (
      <div key={o._id} className="order">
        <p>{o.customerName} - {o.product} x {o.quantity} ({o.status})</p>
        <div>
          <button onClick={() => updateStatus(o._id, 'In Progress')}>In Progress</button>
          <button onClick={() => updateStatus(o._id, 'Delivered')}>Delivered</button>
        </div>
      </div>
    ))}
  </div>

  <div className="section">
    <h3>Inventory</h3>
    {products.map(p => (
      <div key={p._id} className="product">
        <span>{p.name} - ₹{p.price}</span>
        <button onClick={() => deleteProduct(p._id)}>Delete</button>
      </div>
    ))}
  </div>

  <div className="section">
    <h4>Add Product</h4>
    <input
      type="text"
      placeholder="Name"
      value={newProduct.name}
      onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
    />
    <input
      type="number"
      placeholder="Price"
      value={newProduct.price}
      onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
    />
    <button onClick={addProduct}>Add</button>
  </div>
</div>

  );
};

export default AdminDashboard;
