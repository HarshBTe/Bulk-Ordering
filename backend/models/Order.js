const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  customerName: String,
  contactInfo: String,
  address: String,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Delivered'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
