const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder
} = require('../controllers/orderController');

// GET /api/orders - Get all orders
router.get('/', getOrders);

// GET /api/orders/:id - Get order by ID
router.get('/:id', getOrderById);

// POST /api/orders - Create new order
router.post('/', createOrder);

// PUT /api/orders/:id - Update order
router.put('/:id', updateOrder);

module.exports = router;