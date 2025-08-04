const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Client API functions
export const clientApi = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/clients`);
    if (!response.ok) throw new Error('Failed to fetch clients');
    return response.json();
  },

  async getById(id: string) {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`);
    if (!response.ok) throw new Error('Failed to fetch client');
    return response.json();
  },

  async create(clientData: {
    name: string;
    phone: string;
    email: string;
    isVip?: boolean;
  }) {
    const response = await fetch(`${API_BASE_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });
    if (!response.ok) throw new Error('Failed to create client');
    return response.json();
  },

  async update(id: string, clientData: {
    name?: string;
    phone?: string;
    email?: string;
    isVip?: boolean;
  }) {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });
    if (!response.ok) throw new Error('Failed to update client');
    return response.json();
  }
};

// Order API functions
export const orderApi = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/orders`);
    console.log("response", response);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  async getById(id: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  async create(orderData: {
    clientId: string;
    dateTime: string;
    amount: number;
    description?: string;
    status?: 'IN_PROGRESS' | 'PENDING' | 'COMPLETED';
  }) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  async update(id: string, orderData: {
    dateTime?: string;
    amount?: number;
    description?: string;
    status?: 'IN_PROGRESS' | 'PENDING' | 'COMPLETED';
  }) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Failed to update order');
    return response.json();
  }
};