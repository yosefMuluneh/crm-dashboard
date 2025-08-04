"use client"

import { useState, useMemo, useEffect } from "react"
import { Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { clientApi } from "@/lib/api"
import { EditClientDialog } from "@/components/forms/edit-client-dialog"
import type { Client } from "@/types"

interface ClientTableProps {
  language: "ru" | "en"
  onClientClick: (clientId: string) => void
  searchQuery: string
  refreshKey: number
}

const ITEMS_PER_PAGE = 4

export function ClientTable({ language, onClientClick, searchQuery, refreshKey }: ClientTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  

  useEffect(() => {
    fetchClients()
  }, [refreshKey])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const data = await clientApi.getAll()
      setClients(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch clients')
      console.error('Error fetching clients:', err)
    } finally {
      setLoading(false)
    }
  }

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      name: { ru: "Имя", en: "Name" },
      phone: { ru: "Телефон", en: "Phone" },
      email: { ru: "Email", en: "Email" },
      totalOrders: { ru: "Всего заказов", en: "Total Orders" },
      totalAmount: { ru: "Общая сумма", en: "Total Amount" },
      lastOrder: { ru: "Последний заказ", en: "Last Order" },
      actions: { ru: "Действия", en: "Actions" },
      edit: { ru: "Редактировать", en: "Edit" },
    }
    return translations[key]?.[language] || key
  }

  // Filter clients based on search query
  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients

    const query = searchQuery.toLowerCase()
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.phone.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query),
    )
  }, [clients, searchQuery])

  // Paginate clients
  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredClients.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredClients, currentPage])

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE)

  // Reset to page 1 when search changes
  useState(() => {
    setCurrentPage(1)
  })

  const handleClientUpdated = () => {
    fetchClients()
  }

  const handleClientClick = (clientId: string) => {
    onClientClick(clientId)
  }

  const renderPagination = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
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
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-300 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-900 uppercase tracking-wider">
                  {t("name")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-900 uppercase tracking-wider">
                  {t("phone")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-900 uppercase tracking-wider">
                  {t("email")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-900 uppercase tracking-wider">
                  {t("totalOrders")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-900 uppercase tracking-wider">
                  {t("totalAmount")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-900 uppercase tracking-wider">
                  {t("lastOrder")}
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-gray-900 uppercase tracking-wider">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    {language === "ru" ? "Загрузка..." : "Loading..."}
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : paginatedClients.length > 0 ? (
                paginatedClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center cursor-pointer" onClick={() => handleClientClick(client.id)}>
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-md font-medium text-blue-600 hover:text-blue-800">{client.name}</span>
                            {client.isVip && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">{client.phone}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">{client.email}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">{client.totalOrders}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">
                      ₪{Number(client.totalAmount).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">
                      {client.lastOrderDate ? new Date(client.lastOrderDate).toLocaleDateString('ru-RU') : '-'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-500">
                      <EditClientDialog 
                        client={client} 
                        language={language} 
                        onClientUpdated={handleClientUpdated} 
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    {language === "ru" ? "Клиенты не найдены" : "No clients found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-center border-t">
          <div className="flex items-center space-x-2">{renderPagination()}</div>
        </div>
      )}
    </div>
  )
}
