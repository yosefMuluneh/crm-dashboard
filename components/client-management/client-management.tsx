"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ClientTable } from "./client-table"

interface ClientManagementProps {
  language: "ru" | "en"
  onClientClick: (clientId: string) => void
}

export function ClientManagement({ language, onClientClick }: ClientManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")

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

  const handleAddClient = () => {
    console.log("Add new client")
    alert(t("addClient"))
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{t("clientManagement")}</h1>
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

          <Button onClick={handleAddClient} className="bg-blue-400 h-full font-bold hover:bg-blue-500 flex items-center gap-2">
            <Plus className="w-7 h-7" />
            <span className="text-lg">{t("addClient")}</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 px-4 lg:px-6 pb-6">
        <ClientTable language={language} onClientClick={onClientClick} searchQuery={searchQuery} />
      </div>
    </div>
  )
}
