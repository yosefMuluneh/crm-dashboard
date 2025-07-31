"use client"

import { useState, useMemo } from "react"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OrderTableProps {
  language: "ru" | "en"
  onClientClick: (clientId: string) => void
  searchQuery: string
  statusFilter: string
}

const allOrders = [
  { id: "#32845", client: "Анна Коэн", clientId: "1", dateTime: "14.04, 14:00", status: "В работе", amount: 2500 },
  { id: "#32846", client: "Давид Леви", clientId: "2", dateTime: "14.04, 17:00", status: "Ожидает", amount: 3200 },
  { id: "#32844", client: "Рут Голдштейн", clientId: "3", dateTime: "14.04, 09:30", status: "Завершен", amount: 1800 },
  { id: "#32843", client: "Михаил Аварбух", clientId: "4", dateTime: "13.04, 16:00", status: "Завершен", amount: 2100 },
  { id: "#32842", client: "Сара Бергер", clientId: "5", dateTime: "13.04, 10:00", status: "Завершен", amount: 4200 },
  { id: "#32841", client: "Анна Коэн", clientId: "1", dateTime: "12.04, 09:00", status: "Завершен", amount: 1900 },
  { id: "#32840", client: "Давид Леви", clientId: "2", dateTime: "11.04, 15:30", status: "Завершен", amount: 2800 },
  { id: "#32839", client: "Елена Иванова", clientId: "6", dateTime: "10.04, 11:00", status: "В работе", amount: 3500 },
  { id: "#32838", client: "Игорь Петров", clientId: "7", dateTime: "09.04, 16:45", status: "Ожидает", amount: 2700 },
  { id: "#32837", client: "Мария Сидорова", clientId: "8", dateTime: "08.04, 13:20", status: "Завершен", amount: 1950 },
  { id: "#32836", client: "Алексей Козлов", clientId: "9", dateTime: "07.04, 10:15", status: "В работе", amount: 4100 },
  {
    id: "#32835",
    client: "Ольга Морозова",
    clientId: "10",
    dateTime: "06.04, 14:30",
    status: "Завершен",
    amount: 2300,
  },
]

const ITEMS_PER_PAGE = 5

export function OrderTable({ language, onClientClick, searchQuery, statusFilter }: OrderTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      id: { ru: "ID", en: "ID" },
      client: { ru: "Клиент", en: "Client" },
      dateTime: { ru: "Дата/Время", en: "Date/Time" },
      status: { ru: "Статус", en: "Status" },
      amount: { ru: "Сумма", en: "Amount" },
      actions: { ru: "Действия", en: "Actions" },
      edit: { ru: "Редактировать", en: "Edit" },
    }
    return translations[key]?.[language] || key
  }

  // Filter and search orders
  const filteredOrders = useMemo(() => {
    let filtered = allOrders

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.client.toLowerCase().includes(query) ||
          order.dateTime.toLowerCase().includes(query) ||
          order.status.toLowerCase().includes(query) ||
          order.amount.toString().includes(query),
      )
    }

    return filtered
  }, [searchQuery, statusFilter])

  // Paginate orders
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredOrders, currentPage])

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)

  // Reset to page 1 when filters change
  useState(() => {
    setCurrentPage(1)
  })

  const getStatusColor = (status: string) => {
    if (status === "В работе" || status === "In Progress") {
      return "bg-red-100 text-red-800"
    }
    if (status === "Ожидает" || status === "Pending") {
      return "bg-orange-100 text-orange-800"
    }
    if (status === "Завершен" || status === "Completed") {
      return "bg-green-100 text-green-800"
    }
    return "bg-gray-100 text-gray-800"
  }

  const translateStatus = (status: string) => {
    if (language === "en") {
      switch (status) {
        case "В работе":
          return "In Progress"
        case "Ожидает":
          return "Pending"
        case "Завершен":
          return "Completed"
        default:
          return status
      }
    }
    return status
  }

  const handleEdit = (orderId: string) => {
    console.log("Edit order:", orderId)
    alert(`${t("edit")} ${orderId}`)
  }

  const handleClientClick = (clientName: string) => {
    const clientId = allOrders.find((order) => order.client === clientName)?.clientId || "1"
    onClientClick(clientId)
  }

  const renderPagination = () => {
    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "bg-blue-600 text-white" : ""}
        >
          {i}
        </Button>,
      )
    }

    return pages
  }

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <div className="overflow-auto h-full">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-300 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-800 uppercase tracking-wider">
                  {t("id")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-800 uppercase tracking-wider">
                  {t("client")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-800 uppercase tracking-wider">
                  {t("dateTime")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-800 uppercase tracking-wider">
                  {t("status")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-800 uppercase tracking-wider">
                  {t("amount")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-800 uppercase tracking-wider">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-md font-medium text-gray-900">{order.id}</td>
                    <td
                      className="px-4 py-4 whitespace-nowrap text-md text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => handleClientClick(order.client)}
                    >
                      {order.client}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">{order.dateTime}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-2 text-md font-semibold rounded-full ${getStatusColor(order.status)}`}
                      >
                        {translateStatus(order.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">
                      ₪{order.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-lg">
                      <div
                        variant="ghost"
                        size="lg"
                        onClick={() => handleEdit(order.id)}
                        className="font-bold cursor-pointer hover:text-gray-600"
                      >
                        <Edit className="w-6 h-6" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    {language === "ru" ? "Заказы не найдены" : "No orders found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-center border-t">
          <div className="flex items-center space-x-2">
            {renderPagination()}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="text-gray-500">...</span>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
