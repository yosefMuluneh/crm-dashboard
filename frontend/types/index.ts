export interface Order {
  id: string
  orderNumber: string
  clientId: string
  dateTime: string
  status: "IN_PROGRESS" | "PENDING" | "COMPLETED"
  amount: number
  description?: string
  createdAt: string
  updatedAt: string
  client?: {
    id: string
    name: string
    isVip: boolean
  }
}

export interface Client {
  id: string
  name: string
  phone: string
  email: string
  isVip: boolean
  totalOrders: number
  totalAmount: number
  lastOrderDate: string | null
  createdAt: string
  updatedAt: string
  orders: Order[]
}

export type Language = "ru" | "en"

export interface Translations {
  [key: string]: {
    ru: string
    en: string
  }
}
