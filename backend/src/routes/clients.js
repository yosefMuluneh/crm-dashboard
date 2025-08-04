const express = require('express');
const router = express.Router();
const {
  getClients,
  getClientById,
  createClient,
  updateClient
} = require('../controllers/clientController');

// GET /api/clients - Get all clients
router.get('/', getClients);

// GET /api/clients/:id - Get client by ID
router.get('/:id', getClientById);

// POST /api/clients - Create new client
router.post('/', createClient);

// PUT /api/clients/:id - Update client
router.put('/:id', updateClient);

module.exports = router;