"use client"

import type React from "react"

import { useState } from "react"
import { Search, Bell, User, Menu, Globe, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  onMenuClick: () => void
  language: "ru" | "en"
  onLanguageChange: (lang: "ru" | "en") => void
}

export function Header({ onMenuClick, language, onLanguageChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      search: { ru: "Поиск...", en: "Search..." },
    }
    return translations[key]?.[language] || key
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      alert(`${language === "ru" ? "Глобальный поиск" : "Global search"}: ${searchQuery}`)
    }
  }

  const handleMobileSearchToggle = () => {
    setShowMobileSearch(!showMobileSearch)
    if (showMobileSearch) {
      setSearchQuery("") // Clear search when closing
    }
  }

  // Mobile search overlay
  if (showMobileSearch) {
    return (
      <header className="bg-blue-400 sticky top-0 text-white px-4 py-3 relative z-50 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMobileSearchToggle}
            className="text-white hover:bg-blue-600"
          >
            <X className="w-5 h-5" />
          </Button>
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-4 rounded-full bg-blue-100 border-blue-400 placeholder-white-200 text-white focus:bg-white focus:text-gray-900"
              autoFocus
            />
          </form>
        </div>
      </header>
    )
  }

  // Normal header
  return (
    <header className="bg-blue-400 sticky top-0 text-white lg:px-16  sm:px-4 py-7 flex items-center justify-between relative z-50 flex-shrink-0">
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden text-white hover:bg-blue-600">
          <Menu className="w-7 h-7" />
        </Button>
        <h1 className="lg:text-3xl text-2xl font-bold ">Мувер CRM</h1>
      </div>

     

      <div className="flex justify-between items-center gap-2">
        {/* Mobile search icon - only visible on mobile */}
        <div
          onClick={handleMobileSearchToggle}
          className="sm:hidden text-white hover:bg-blue-600"
        >
          <Search color="black" className="w-7 h-7" />
        </div>
         {/* Desktop search - hidden on mobile */}
      <div className="flex-1 max-w-md mx-4 hidden sm:block">
        <form onSubmit={handleSearch} className="relative">
          <Search color="black" className="absolute left-3 top-1/2 transform -translate-y-1/2  w-6 h-6" />
          <Input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full min-w-[400px] bg-blue-200 py-2 border-blue-400 placeholder-white text-white focus:bg-white focus:text-gray-900 rounded-full"
          />
        </form>
      </div>
        <div
          onClick={() => onLanguageChange(language === "ru" ? "en" : "ru")}
          className="hover:bg-blue-600 hover:cursor-pointer flex items-center justify-center w-10 h-10 rounded-full"
        >
          <Globe color="black" className="w-7 h-7" />
        </div>
        <div className="hover:bg-blue-600 hover:cursor-pointer flex items-center justify-center w-10 h-10 rounded-full">
          <Bell color="black" className="w-7 h-7" />
        </div>
        <div className="hover:bg-blue-600 hover:cursor-pointer flex items-center justify-center w-10 h-10 rounded-full">
          <User color="black" className="w-7 h-7" />
        </div>
      </div>
    </header>
  )
}
