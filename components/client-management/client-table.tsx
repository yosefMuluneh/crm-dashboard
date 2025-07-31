"use client"

import { useState, useMemo } from "react"
import { Edit, Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ClientTableProps {
  language: "ru" | "en"
  onClientClick: (clientId: string) => void
  searchQuery: string
}

const allClients = [
  {
    id: "1",
    name: "Анна Коэн",
    phone: "+972 52-123-4567",
    email: "anna.cohen@gmail.com",
    isVip: true,
    totalOrders: 5,
    totalAmount: 12500,
    lastOrderDate: "14.04.2025",
  },
  {
    id: "2",
    name: "Давид Леви",
    phone: "+972 54-987-6543",
    email: "david.levi@gmail.com",
    isVip: false,
    totalOrders: 2,
    totalAmount: 6000,
    lastOrderDate: "14.04.2025",
  },
  {
    id: "3",
    name: "Рут Голдштейн",
    phone: "+972 50-555-1234",
    email: "ruth.goldstein@gmail.com",
    isVip: false,
    totalOrders: 1,
    totalAmount: 1800,
    lastOrderDate: "14.04.2025",
  },
  {
    id: "4",
    name: "Михаил Аварбух",
    phone: "+972 53-777-8888",
    email: "mikhail.avarbukh@gmail.com",
    isVip: true,
    totalOrders: 1,
    totalAmount: 2100,
    lastOrderDate: "13.04.2025",
  },
  {
    id: "5",
    name: "Сара Бергер",
    phone: "+972 52-999-0000",
    email: "sara.berger@gmail.com",
    isVip: false,
    totalOrders: 1,
    totalAmount: 4200,
    lastOrderDate: "13.04.2025",
  },
  {
    id: "6",
    name: "Елена Иванова",
    phone: "+972 53-111-2222",
    email: "elena.ivanova@gmail.com",
    isVip: true,
    totalOrders: 3,
    totalAmount: 8500,
    lastOrderDate: "10.04.2025",
  },
  {
    id: "7",
    name: "Игорь Петров",
    phone: "+972 54-333-4444",
    email: "igor.petrov@gmail.com",
    isVip: false,
    totalOrders: 2,
    totalAmount: 5400,
    lastOrderDate: "09.04.2025",
  },
  {
    id: "8",
    name: "Мария Сидорова",
    phone: "+972 52-555-6666",
    email: "maria.sidorova@gmail.com",
    isVip: false,
    totalOrders: 1,
    totalAmount: 1950,
    lastOrderDate: "08.04.2025",
  },
]

const ITEMS_PER_PAGE = 4

export function ClientTable({ language, onClientClick, searchQuery }: ClientTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

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
    if (!searchQuery.trim()) return allClients

    const query = searchQuery.toLowerCase()
    return allClients.filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.phone.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query),
    )
  }, [searchQuery])

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

  const handleEdit = (clientId: string) => {
    console.log("Edit client:", clientId)
    alert(`${t("edit")} ${clientId}`)
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
              {paginatedClients.length > 0 ? (
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
                      ₪{client.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">{client.lastOrderDate}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-500">
                      <div
                        onClick={() => handleEdit(client.id)}
                        className="hover:text-gray-600"
                      >
                        <Edit color="black" className="w-6 h-6" />
                      </div>
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
