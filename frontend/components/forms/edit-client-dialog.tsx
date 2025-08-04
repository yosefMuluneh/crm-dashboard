"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Edit } from "lucide-react"
import { clientApi } from "@/lib/api"
import type { Client } from "@/types"

interface EditClientDialogProps {
  client: Client
  language: "ru" | "en"
  onClientUpdated: () => void
}

export function EditClientDialog({ client, language, onClientUpdated }: EditClientDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: client.name,
    phone: client.phone,
    email: client.email,
    isVip: client.isVip
  })

  useEffect(() => {
    // Update form data when client changes
    setFormData({
      name: client.name,
      phone: client.phone,
      email: client.email,
      isVip: client.isVip
    })
  }, [client])

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      editClient: { ru: "Редактировать клиента", en: "Edit Client" },
      name: { ru: "Имя", en: "Name" },
      phone: { ru: "Телефон", en: "Phone" },
      email: { ru: "Email", en: "Email" },
      vipStatus: { ru: "VIP статус", en: "VIP Status" },
      cancel: { ru: "Отмена", en: "Cancel" },
      save: { ru: "Сохранить", en: "Save" },
      saving: { ru: "Сохранение...", en: "Saving..." },
    }
    return translations[key]?.[language] || key
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.email) return

    setLoading(true)
    try {
      await clientApi.update(client.id, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        isVip: formData.isVip
      })
      
      setOpen(false)
      onClientUpdated()
    } catch (error) {
      console.error('Error updating client:', error)
      alert('Failed to update client')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        onClick={() => setOpen(true)}
        className="hover:text-gray-600 cursor-pointer"
      >
        <Edit color="black" className="w-6 h-6" />
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-blue-400">{t("editClient")} - {client.name}</DialogTitle>
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
              {loading ? t("saving") : t("save")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}