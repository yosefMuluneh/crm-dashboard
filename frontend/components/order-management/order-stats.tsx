"use client"

import { useState, useEffect } from "react"
import { orderApi } from "@/lib/api"
import type { Order } from "@/types"

interface OrderStatsProps {
  language: "ru" | "en"
  refreshKey?: number
}

export function OrderStats({ language, refreshKey }: OrderStatsProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [refreshKey])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const data = await orderApi.getAll()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders for stats:', error)
    } finally {
      setLoading(false)
    }
  }
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      inProgress: { ru: "В работе", en: "In Progress" },
      pending: { ru: "Ожидают", en: "Pending" },
      completed: { ru: "Завершены", en: "Completed" },
    }
    return translations[key]?.[language] || key
  }

  // Calculate stats from real data
  const inProgressCount = orders.filter(order => order.status === 'IN_PROGRESS').length
  const pendingCount = orders.filter(order => order.status === 'PENDING').length
  const completedCount = orders.filter(order => order.status === 'COMPLETED').length

  const stats = [
    { label: t("inProgress"), count: inProgressCount, color: "bg-red-100 text-red-800" },
    { label: t("pending"), count: pendingCount, color: "bg-orange-100 text-orange-800" },
    { label: t("completed"), count: completedCount, color: "bg-green-100 text-green-800" },
  ]

  if (loading) {
    return (
      <div className="flex gap-4 items-center">
        <div className="px-4 py-3 rounded-md text-center sm:text-lg text-md font-medium bg-gray-100 text-gray-800">
          {language === "ru" ? "Загрузка..." : "Loading..."}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-4 items-center">
      {stats.map((stat) => (
        <div key={stat.label} className={`px-4 py-3 rounded-md text-center sm:text-lg text-md font-medium ${stat.color}`}>
          {stat.label}: {stat.count}
        </div>
      ))}
    </div>
  )
}
