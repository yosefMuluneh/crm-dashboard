"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OrderTable } from "./order-table"
import { OrderStats } from "./order-stats"
import { CreateOrderDialog } from "@/components/forms/create-order-dialog"
import { getDisplayStatus } from "@/lib/status-utils"

interface OrderManagementProps {
  language: "ru" | "en"
  onClientClick: (clientId: string) => void
}

export function OrderManagement({ language, onClientClick }: OrderManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [refreshKey, setRefreshKey] = useState(0)

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      orderManagement: { ru: "Управление заказами", en: "Order Management" },
      orderManagementDesc: { ru: "Создание и управление заказами на переезд", en: "Create and manage moving orders" },
      searchOrders: { ru: "Поиск заказов...", en: "Search orders..." },
      filters: { ru: "Фильтры", en: "Filters" },
      createOrder: { ru: "Создать заказ", en: "Create Order" },
      all: { ru: "Все", en: "All" },
      inProgress: { ru: "В работе", en: "In Progress" },
      pending: { ru: "Ожидает", en: "Pending" },
      completed: { ru: "Завершен", en: "Completed" },
    }
    return translations[key]?.[language] || key
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled in real-time via searchQuery state
  }

  const handleOrderCreated = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleFilter = () => {
    console.log("Open filters")
    // Toggle between filter states using backend enum values
    const filters = ["all", "IN_PROGRESS", "PENDING", "COMPLETED"]
    const currentIndex = filters.indexOf(statusFilter)
    const nextIndex = (currentIndex + 1) % filters.length
    setStatusFilter(filters[nextIndex])
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-blue-400 mb-2">{t("orderManagement")}</h1>
          <p className="text-gray-600">{t("orderManagementDesc")}</p>
        </div>

        <div className="flex gap-4 items-start sm:items-center">
          <form onSubmit={handleSearch} className="flex-1 relative max-w-md">
            <Search color="black" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-8 h-8" />
            <Input
              type="text"
              placeholder={t("searchOrders")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 rounded-full bg-white border-gray-200 bg-gray-100 border-4 focus:border-none placeholder-gray-200 text-gray-900 focus:bg-white focus:text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </form>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleFilter} className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">
                {statusFilter === "all"
                  ? t("filters")
                  : getDisplayStatus(statusFilter, language)}
              </span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <CreateOrderDialog language={language} onOrderCreated={handleOrderCreated} />
          <OrderStats language={language} refreshKey={refreshKey} />
        </div>
      </div>

      <div className="flex-1 px-4 lg:px-6 pb-6">
        <OrderTable
          language={language}
          onClientClick={onClientClick}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          refreshKey={refreshKey}
        />
      </div>
    </div>
  )
}
