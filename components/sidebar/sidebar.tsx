"use client"

import {
  LayoutDashboard,
  Users,
  Package,
  Calendar,
  UserCheck,
  Truck,
  BarChart3,
  Settings,
  LogOut,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isOpen: boolean
  onClose: () => void
  language: "ru" | "en"
}

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: { ru: "Дашборд", en: "Dashboard" } },
  { id: "clients", icon: Users, label: { ru: "Клиенты", en: "Clients" } },
  { id: "orders", icon: Package, label: { ru: "Заказы", en: "Orders" } },
  { id: "calendar", icon: Calendar, label: { ru: "Календарь", en: "Calendar" } },
  { id: "teams", icon: UserCheck, label: { ru: "Бригады", en: "Teams" } },
  { id: "transport", icon: Truck, label: { ru: "Транспорт", en: "Transport" } },
  { id: "reports", icon: BarChart3, label: { ru: "Отчеты", en: "Reports" } },
  { id: "settings", icon: Settings, label: { ru: "Настройки", en: "Settings" } },
]

export function Sidebar({ activeTab, onTabChange, isOpen, onClose, language }: SidebarProps) {
  const handleTabClick = (tabId: string) => {
    onTabChange(tabId)
    onClose()
  }

  const handleLogout = () => {
    console.log("Logout")
    alert(language === "ru" ? "Выход" : "Logout")
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      <div
        className={`
        fixed left-0 top-24 pb-8 h-[calc(100vh-4rem)] w-64 bg-slate-800 text-white z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <div className="p-4 h-full flex flex-col pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden self-end mb-4 text-white hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </Button>

          <nav className="space-y-4 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full hover:cursor-pointer flex justify-start items-center gap-3 px-5 py-3 text-lg rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-400 text-white hover:bg-blue-500"
                      : "text-gray-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon  color="black" className="w-9 h-9" />
                  <span>{item.label[language]}</span>
                </div>
              )
            })}
          </nav>

          <div
            onClick={handleLogout}
            className="w-full hover:cursor-pointer text-xl hover:bg-slate-700 flex justify-start items-center gap-3 px-5 py-3 text-lg rounded-lg transition-colors"
          >
            <LogOut color="black" className="w-10 h-10" />
            <span className="text-xl">{language === "ru" ? "Выход" : "Logout"}</span>
          </div>
        </div>
      </div>
    </>
  )
}
