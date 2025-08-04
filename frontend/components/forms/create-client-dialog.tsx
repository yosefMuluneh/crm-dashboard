"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"
import { clientApi } from "@/lib/api"

interface CreateClientDialogProps {
  language: "ru" | "en"
  onClientCreated: () => void
}

export function CreateClientDialog({ language, onClientCreated }: CreateClientDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    isVip: false
  })

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      addClient: { ru: "Добавить клиента", en: "Add Client" },
      name: { ru: "Имя", en: "Name" },
      phone: { ru: "Телефон", en: "Phone" },
      email: { ru: "Email", en: "Email" },
      vipStatus: { ru: "VIP статус", en: "VIP Status" },
      cancel: { ru: "Отмена", en: "Cancel" },
      create: { ru: "Создать", en: "Create" },
      creating: { ru: "Создание...", en: "Creating..." },
    }
    return translations[key]?.[language] || key
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.email) return

    setLoading(true)
    try {
      await clientApi.create({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        isVip: formData.isVip
      })
      
      setFormData({
        name: "",
        phone: "",
        email: "",
        isVip: false
      })
      setOpen(false)
      onClientCreated()
    } catch (error) {
      console.error('Error creating client:', error)
      alert('Failed to create client')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex bg-blue-400 hover:bg-blue-600 items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>{t("addClient")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("addClient")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="vip"
              checked={formData.isVip}
              onCheckedChange={(checked) => setFormData({...formData, isVip: checked})}
            />
            <Label htmlFor="vip">{t("vipStatus")}</Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t("cancel")}
            </Button>
            <Button type="submit" className="bg-blue-400 hover:bg-blue-600" disabled={loading}>
              {loading ? t("creating") : t("create")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}