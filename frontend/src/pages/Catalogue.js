import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Catalogue.css';

const Catalogue = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="catalogue">
      <h2>Product Catalogue</h2>
      <ul className="catalogue-list">
        {products.map(p => (
          <li key={p._id} className="catalogue-item">
            <span>{p.name}</span>
            <span>₹{p.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalogue;
