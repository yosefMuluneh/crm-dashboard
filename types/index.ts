export interface Order {
  id: string
  client: string
  clientId: string
  dateTime: string
  status: "В работе" | "Ожидает" | "Завершен" | "In Progress" | "Pending" | "Completed"
  amount: number
}

export interface Client {
  id: string
  name: string
  phone: string
  email: string
  isVip: boolean
  avatar?: string
  orders: Order[]
  totalOrders: number
  totalAmount: number
  lastOrderDate: string
}

export type Language = "ru" | "en"

export interface Translations {
  [key: string]: {
    ru: string
    en: string
  }
}
