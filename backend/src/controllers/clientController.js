const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all clients
const getClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: {
        orders: {
          select: {
            id: true,
            orderNumber: true,
            dateTime: true,
            status: true,
            amount: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
};

// Get client by ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: {
            dateTime: 'desc'
          }
        }
      }
    });

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ error: 'Failed to fetch client' });
  }
};

// Create new client
const createClient = async (req, res) => {
  try {
    const { name, phone, email, isVip = false } = req.body;

    const client = await prisma.client.create({
      data: {
        name,
        phone,
        email,
        isVip
      }
    });

    res.status(201).json(client);
  } catch (error) {
    console.error('Error creating client:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create client' });
  }
};

// Update client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, isVip } = req.body;

    const client = await prisma.client.update({
      where: { id },
      data: {
        name,
        phone,
        email,
        isVip
      }
    });

    res.json(client);
  } catch (error) {
    console.error('Error updating client:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Client not found' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to update client' });
  }
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient
};