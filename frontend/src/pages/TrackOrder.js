import React, { useState } from 'react';
import axios from 'axios';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);

  const handleSearch = () => {
    axios.get(`${process.env.REACT_APP_API_BASE}/api/orders/${orderId}`)
      .then(res => setOrder(res.data))
      .catch(() => alert('Order not found'));
  };

  return (
    <div>
      <h2>Track Order</h2>
      <input type="text" placeholder="Enter Order ID" value={orderId} onChange={e => setOrderId(e.target.value)} />
      <button onClick={handleSearch}>Track</button>
      {order && (
        <div>
          <p>Status: {order.status}</p>
          <p>Product: {order.product}</p>
          <p>Quantity: {order.quantity}</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;