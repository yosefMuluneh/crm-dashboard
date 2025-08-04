"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Star, Phone, Mail, Edit, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClientOrderTable } from "./client-order-table"
import { clientApi } from "@/lib/api"
import type { Client } from "@/types"

interface ClientCardProps {
  clientId: string
  language: "ru" | "en"
  onBack: () => void
}

export function ClientCard({ clientId, language, onBack }: ClientCardProps) {
  const [activeTab, setActiveTab] = useState("orders")
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchClient()
  }, [clientId])

  const fetchClient = async () => {
    try {
      setLoading(true)
      const data = await clientApi.getById(clientId)
      setClient(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch client')
      console.error('Error fetching client:', err)
    } finally {
      setLoading(false)
    }
  }

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      clientCard: { ru: "Карточка клиента", en: "Client Card" },
      backToList: { ru: "Вернуться к списку", en: "Back to List" },
      vipClient: { ru: "VIP клиент", en: "VIP Client" },
      edit: { ru: "Редактировать", en: "Edit" },
      info: { ru: "Инфо", en: "Info" },
      orders: { ru: "Заказы", en: "Orders" },
      history: { ru: "История", en: "History" },
      inDevelopment: { ru: "В разработке", en: "In Development" },
    }
    return translations[key]?.[language] || key
  }

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">{language === "ru" ? "Загрузка..." : "Loading..."}</p>
      </div>
    )
  }

  if (error || !client) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error || (language === "ru" ? "Клиент не найден" : "Client not found")}</p>
      </div>
    )
  }

  const handleEdit = () => {
    console.log("Edit client:", client.id)
    alert(`${t("edit")} ${client.name}`)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === "ru" ? "Информация о клиенте" : "Client Information"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {language === "ru" ? "Полное имя" : "Full Name"}
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{client.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {language === "ru" ? "Статус" : "Status"}
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {client.isVip
                      ? language === "ru"
                        ? "VIP клиент"
                        : "VIP Client"
                      : language === "ru"
                        ? "Обычный клиент"
                        : "Regular Client"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {language === "ru" ? "Телефон" : "Phone"}
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{client.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{client.email}</p>
                </div>
              </div>
            </div>
          </div>
        )
      case "orders":
        return <ClientOrderTable orders={client.orders} language={language} />
      case "history":
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === "ru" ? "История активности" : "Activity History"}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {language === "ru" ? "Клиент зарегистрирован" : "Client registered"}
                    </p>
                    <p className="text-xs text-gray-500">01.01.2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {language === "ru" ? "Первый заказ выполнен" : "First order completed"}
                    </p>
                    <p className="text-xs text-gray-500">15.01.2024</p>
                  </div>
                </div>
                {client.isVip && (
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {language === "ru" ? "Получен VIP статус" : "VIP status granted"}
                      </p>
                      <p className="text-xs text-gray-500">01.03.2024</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      default:
        return <ClientOrderTable orders={client.orders} language={language} />
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col justify-start items-start gap-4 mb-6">
          <div
            onClick={onBack}
            className="flex items-center cursor-pointer gap-2 text-blue-400 text-md hover:text-blue-500"
          >
            <ArrowLeft className="w-7 h-7 font-bold" />
            <span>{t("backToList")}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-blue-400">{t("clientCard")}</h1>
        </div>

        <div className="bg-blue-50 rounded-lg shadow p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">  
                <User className="w-10 h-10" />  
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
                {client.isVip && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{t("vipClient")}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{client.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{client.email}</span>
              </div>
            </div>

            <Button onClick={handleEdit} className="bg-blue-400 hover:bg-blue-600 flex items-center rounded-full gap-2">
              <Edit className="w-4 h-4" />
              <span>{t("edit")}</span>
            </Button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          <Button
            variant={activeTab === "info" ? "default" : "outline"}
            onClick={() => setActiveTab("info")}
            className={activeTab === "info" ? "bg-blue-400 text-md text-white px-8 py-2 border-blue-400 border-solid border-4 hover:border-blue-400 hover:bg-blue-400 font-bold" : "px-8 py-4 text-blue-400 text-md border-blue-400 border-solid border-4 font-bold hover:bg-blue-200 hover:text-blue-400"}
          >
            {t("info")}
          </Button>
          <Button
            variant={activeTab === "orders" ? "default" : "outline"}
            onClick={() => setActiveTab("orders")}
            className={activeTab === "orders" ? "bg-blue-400 text-md text-white px-8 py-2 border-blue-400 border-solid border-4 hover:border-blue-400 hover:bg-blue-400 font-bold" : "px-8 py-4 text-blue-400 border-blue-400 border-solid border-4 font-bold text-md hover:bg-blue-200 hover:text-blue-400"}
          >
            {t("orders")}
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "outline"}
            onClick={() => setActiveTab("history")}
            className={activeTab === "history" ? "bg-blue-400 text-md text-white px-6 py-2 border-blue-400 border-solid border-4 hover:border-blue-400 hover:bg-blue-400 font-bold" : "px-6 py-4 text-blue-400 border-blue-400 border-solid border-4 text-md font-bold hover:bg-blue-200 hover:text-blue-400"}
          >
            {t("history")}
          </Button>
      </div>
      </div>

      <div className="flex-1 px-4 lg:px-6 pb-6">{renderTabContent()}</div>
    </div>
  )
}
