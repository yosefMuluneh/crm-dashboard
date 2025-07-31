"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar/sidebar"
import { Header } from "./header/header"
import { OrderManagement } from "./order-management/order-management"
import { ClientManagement } from "./client-management/client-management"
import { ClientCard } from "./client-card/client-card"

export function CRMDashboard() {
  const [activeTab, setActiveTab] = useState("orders")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [language, setLanguage] = useState<"ru" | "en">("ru")
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setSelectedClientId(null) // Clear selected client when changing tabs
  }

  const renderContent = () => {
    // Only show client card if we have a selected client AND we're on clients tab
    if (selectedClientId && (activeTab === "clients" || activeTab === "orders")) {
      return <ClientCard clientId={selectedClientId} language={language} onBack={() => setSelectedClientId(null)} />
    }

    switch (activeTab) {
      case "dashboard":
        return (
          <div className="p-6 text-gray-600">
            {language === "ru" ? "Дашборд - В разработке" : "Dashboard - In Development"}
          </div>
        )
      case "clients":
        return <ClientManagement language={language} onClientClick={setSelectedClientId} />
      case "orders":
        return <OrderManagement language={language} onClientClick={setSelectedClientId} />
      case "calendar":
        return (
          <div className="p-6 text-gray-600">
            {language === "ru" ? "Календарь - В разработке" : "Calendar - In Development"}
          </div>
        )
      case "teams":
        return (
          <div className="p-6 text-gray-600">
            {language === "ru" ? "Бригады - В разработке" : "Teams - In Development"}
          </div>
        )
      case "transport":
        return (
          <div className="p-6 text-gray-600">
            {language === "ru" ? "Транспорт - В разработке" : "Transport - In Development"}
          </div>
        )
      case "reports":
        return (
          <div className="p-6 text-gray-600">
            {language === "ru" ? "Отчеты - В разработке" : "Reports - In Development"}
          </div>
        )
      case "settings":
        return (
          <div className="p-6 text-gray-600">
            {language === "ru" ? "Настройки - В разработке" : "Settings - In Development"}
          </div>
        )
      default:
        return <OrderManagement language={language} onClientClick={setSelectedClientId} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} language={language} onLanguageChange={setLanguage} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange} // Use the new handler instead of setActiveTab
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          language={language}
        />
        <main className="flex-1 lg:ml-64 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
