"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ClientTable } from "./client-table"
import { CreateClientDialog } from "@/components/forms/create-client-dialog"

interface ClientManagementProps {
  language: "ru" | "en"
  onClientClick: (clientId: string) => void
}

export function ClientManagement({ language, onClientClick }: ClientManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      clientManagement: { ru: "Управление клиентами", en: "Client Management" },
      clientManagementDesc: { ru: "Просмотр и управление клиентской базой", en: "View and manage client database" },
      searchClients: { ru: "Поиск клиентов...", en: "Search clients..." },
      addClient: { ru: "Добавить клиента", en: "Add Client" },
    }
    return translations[key]?.[language] || key
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled in real-time via searchQuery state
  }

  const handleClientCreated = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-blue-400 mb-2">{t("clientManagement")}</h1>
          <p className="text-gray-600">{t("clientManagementDesc")}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <form onSubmit={handleSearch} className="flex-1 relative max-w-md">
            <Search color="black" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder={t("searchClients")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full w-full"
            />
          </form>

          <CreateClientDialog language={language} onClientCreated={handleClientCreated} />
        </div>
      </div>

      <div className="flex-1 px-4 lg:px-6 pb-6">
        <ClientTable language={language} onClientClick={onClientClick} searchQuery={searchQuery} refreshKey={refreshKey} />
      </div>
    </div>
  )
}
