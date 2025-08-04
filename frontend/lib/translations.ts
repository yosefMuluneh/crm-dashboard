import type { Translations } from "@/types"

export const translations: Translations = {
  // Header
  search: { ru: "Поиск...", en: "Search..." },

  // Sidebar
  dashboard: { ru: "Дашборд", en: "Dashboard" },
  clients: { ru: "Клиенты", en: "Clients" },
  orders: { ru: "Заказы", en: "Orders" },
  calendar: { ru: "Календарь", en: "Calendar" },
  teams: { ru: "Бригады", en: "Teams" },
  transport: { ru: "Транспорт", en: "Transport" },
  reports: { ru: "Отчеты", en: "Reports" },
  settings: { ru: "Настройки", en: "Settings" },
  logout: { ru: "Выход", en: "Logout" },

  // Order Management
  orderManagement: { ru: "Управление заказами", en: "Order Management" },
  orderManagementDesc: { ru: "Создание и управление заказами на переезд", en: "Create and manage moving orders" },
  searchOrders: { ru: "Поиск заказов...", en: "Search orders..." },
  filters: { ru: "Фильтры", en: "Filters" },
  createOrder: { ru: "Создать заказ", en: "Create Order" },
  inProgress: { ru: "В работе", en: "In Progress" },
  pending: { ru: "Ожидают", en: "Pending" },
  completed: { ru: "Завершены", en: "Completed" },

  // Client Management
  clientManagement: { ru: "Управление клиентами", en: "Client Management" },
  clientManagementDesc: { ru: "Просмотр и управление клиентской базой", en: "View and manage client database" },
  searchClients: { ru: "Поиск клиентов...", en: "Search clients..." },
  addClient: { ru: "Добавить клиента", en: "Add Client" },
  totalOrders: { ru: "Всего заказов", en: "Total Orders" },
  totalAmount: { ru: "Общая сумма", en: "Total Amount" },
  lastOrder: { ru: "Последний заказ", en: "Last Order" },

  // Table headers
  id: { ru: "ID", en: "ID" },
  client: { ru: "Клиент", en: "Client" },
  dateTime: { ru: "Дата/Время", en: "Date/Time" },
  date: { ru: "Дата", en: "Date" },
  status: { ru: "Статус", en: "Status" },
  amount: { ru: "Сумма", en: "Amount" },
  actions: { ru: "Действия", en: "Actions" },
  number: { ru: "Номер", en: "Number" },
  name: { ru: "Имя", en: "Name" },
  phone: { ru: "Телефон", en: "Phone" },
  email: { ru: "Email", en: "Email" },

  // Client Card
  clientCard: { ru: "Карточка клиента", en: "Client Card" },
  backToList: { ru: "Вернуться к списку", en: "Back to List" },
  vipClient: { ru: "VIP клиент", en: "VIP Client" },
  edit: { ru: "Редактировать", en: "Edit" },
  info: { ru: "Инфо", en: "Info" },
  history: { ru: "История", en: "History" },

  // Development placeholders
  inDevelopment: { ru: "В разработке", en: "In Development" },
}

export function useTranslation(language: "ru" | "en") {
  return (key: string): string => {
    return translations[key]?.[language] || key
  }
}
