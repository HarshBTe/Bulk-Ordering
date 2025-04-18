import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlaceOrder = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: '',
    quantity: '',
    customerName: '',
    contact: '',
    address: ''
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedProduct = products.find(p => p._id === form.productId);
    const orderData = {
      ...form,
      product: selectedProduct ? selectedProduct.name : ''
    };

    axios.post(`${process.env.REACT_APP_API_BASE}/api/orders`, orderData)
      .then(() => alert('Order placed successfully'))
      .catch(err => alert('Error placing order'));
  };

  return (
    <div>
      <h2>Place Bulk Order</h2>
      <form onSubmit={handleSubmit}>
      <select
  name="productId"
  value={form.productId}
  onChange={e => setForm({ ...form, productId: e.target.value })}
  required
  style={{
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none'
  }}
>
  <option value="">Select Product</option>
  {products.map(p => (
    <option key={p._id} value={p._id}>{p.name}</option>
  ))}
</select>
<br />


        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
          required
        /><br />

        <input
          type="text"
          placeholder="Buyer Name"
          value={form.customerName}
          onChange={e => setForm({ ...form, customerName: e.target.value })}
          required
        /><br />

        <input
          type="text"
          placeholder="Contact"
          value={form.contact}
          onChange={e => setForm({ ...form, contact: e.target.value })}
          required
        /><br />

        <textarea
          placeholder="Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          required
        /><br />

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default PlaceOrder;
