"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { orderApi } from "@/lib/api"
import { getDisplayStatus } from "@/lib/status-utils"
import { EditOrderDialog } from "@/components/forms/edit-order-dialog"
import type { Order } from "@/types"

interface OrderTableProps {
  language: "ru" | "en"
  onClientClick: (clientId: string) => void
  searchQuery: string
  statusFilter: string
  refreshKey: number
}

const ITEMS_PER_PAGE = 5

export function OrderTable({ language, onClientClick, searchQuery, statusFilter, refreshKey }: OrderTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  console.log("statusFilter:", statusFilter)
  useEffect(() => {
    fetchOrders()
  }, [refreshKey])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const data = await orderApi.getAll()
      setOrders(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch orders')
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

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
    let filtered = orders

    // Apply status filter - statusFilter now contains backend enum values
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.client?.name.toLowerCase().includes(query) ||
          new Date(order.dateTime).toLocaleDateString().includes(query) ||
          getDisplayStatus(order.status, language).toLowerCase().includes(query) ||
          order.amount.toString().includes(query),
      )
    }

    return filtered
  }, [orders, searchQuery, statusFilter, language])

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
    const displayStatus = getDisplayStatus(status, language)
    if (displayStatus === "В работе" || displayStatus === "In Progress") {
      return "bg-red-100 text-red-800"
    }
    if (displayStatus === "Ожидает" || displayStatus === "Pending") {
      return "bg-orange-100 text-orange-800"
    }
    if (displayStatus === "Завершен" || displayStatus === "Completed") {
      return "bg-green-100 text-green-800"
    }
    return "bg-gray-100 text-gray-800"
  }

  const handleOrderUpdated = () => {
    fetchOrders()
  }

  const handleClientClick = (clientId: string) => {
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    {language === "ru" ? "Загрузка..." : "Loading..."}
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-md font-medium text-gray-900">{order.orderNumber}</td>
                    <td
                      className="px-4 py-4 whitespace-nowrap text-md text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => handleClientClick(order.clientId)}
                    >
                      {order.client?.name || 'Unknown'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">
                      {new Date(order.dateTime).toLocaleDateString('ru-RU', { 
                        day: '2-digit', 
                        month: '2-digit', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-2 text-md font-semibold rounded-full ${getStatusColor(order.status)}`}
                      >
                        {getDisplayStatus(order.status, language)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">
                      ₪{Number(order.amount).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-lg">
                      <EditOrderDialog 
                        order={order} 
                        language={language} 
                        onOrderUpdated={handleOrderUpdated} 
                      />
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
