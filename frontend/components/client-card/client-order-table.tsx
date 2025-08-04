"use client"

interface Order {
  id: string
  dateTime: string
  status: string
  amount: number
}

interface ClientOrderTableProps {
  orders: Order[]
  language: "ru" | "en"
}

export function ClientOrderTable({ orders, language }: ClientOrderTableProps) {
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      number: { ru: "Номер", en: "Number" },
      date: { ru: "Дата", en: "Date" },
      amount: { ru: "Сумма", en: "Amount" },
      status: { ru: "Статус", en: "Status" },
    }
    return translations[key]?.[language] || key
  }

  const getStatusColor = (status: string) => {
    if (status === "В работе" || status === "IN_PROGRESS") {
      return "bg-red-100 text-red-800"
    }
    if (status === "Ожидает" || status === "PENDING") {
      return "bg-orange-100 text-orange-800"
    }
    if (status === "Завершен" || status === "COMPLETED") {
      return "bg-green-100 text-green-800"
    }
    return "bg-gray-100 text-gray-800"
  }

  const translateStatus = (status: string) => {
    if (language === "ru") {
      switch (status) {
        case "IN_PROGRESS":
          return "В работе"
        case "PENDING":
          return "Ожидает"
        case "COMPLETED":
          return "Завершен"
        default:
          return status
      }
    }
    else {
      switch (status) {
        case "IN_PROGRESS":
          return "In Progress"
        case "PENDING":
          return "Pending"
        case "COMPLETED":
          return "Completed"
        default:
          return status
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <div className="overflow-auto h-full">
          <table className="w-full min-w-[500px]">
            <thead className="bg-gray-300 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-900 uppercase tracking-wider">
                  {t("number")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-900 uppercase tracking-wider">
                  {t("date")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-900 uppercase tracking-wider">
                  {t("amount")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-900 uppercase tracking-wider">
                  {t("status")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-md font-medium text-gray-900">{order.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">{order.dateTime}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">
                    ₪{order.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-md font-semibold rounded-full ${getStatusColor(order.status)}`}
                    >
                      {translateStatus(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
