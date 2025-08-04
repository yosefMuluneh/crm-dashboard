const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Generate order number
const generateOrderNumber = () => {
  return '#' + Math.floor(Math.random() * 90000 + 10000);
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
            isVip: true
          }
        }
      },
      orderBy: {
        dateTime: 'desc'
      }
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        client: true
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Create new order
const createOrder = async (req, res) => {
  try {
    const { clientId, dateTime, amount, description, status = 'PENDING' } = req.body;
    
    // Check if client exists
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    });

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const orderNumber = generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        clientId,
        dateTime: new Date(dateTime),
        amount: parseFloat(amount),
        description,
        status
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            isVip: true
          }
        }
      }
    });

    // Update client statistics
    await updateClientStats(clientId);

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Update order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { dateTime, amount, description, status } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(dateTime && { dateTime: new Date(dateTime) }),
        ...(amount && { amount: parseFloat(amount) }),
        ...(description !== undefined && { description }),
        ...(status && { status })
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            isVip: true
          }
        }
      }
    });

    // Update client statistics
    await updateClientStats(order.clientId);

    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Helper function to update client statistics
const updateClientStats = async (clientId) => {
  const orders = await prisma.order.findMany({
    where: { clientId }
  });

  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, order) => sum + parseFloat(order.amount), 0);
  const lastOrder = orders.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))[0];

  await prisma.client.update({
    where: { id: clientId },
    data: {
      totalOrders,
      totalAmount,
      lastOrderDate: lastOrder ? lastOrder.dateTime : null
    }
  });
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder
};