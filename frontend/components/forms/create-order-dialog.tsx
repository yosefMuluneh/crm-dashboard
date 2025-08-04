"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { orderApi, clientApi } from "@/lib/api"
import type { Client } from "@/types"

interface CreateOrderDialogProps {
  language: "ru" | "en"
  onOrderCreated: () => void
}

export function CreateOrderDialog({ language, onOrderCreated }: CreateOrderDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [formData, setFormData] = useState({
    clientId: "",
    dateTime: "",
    amount: "",
    description: "",
    status: "PENDING" as const
  })

  useEffect(() => {
    if (open) {
      fetchClients()
    }
  }, [open])

  const fetchClients = async () => {
    try {
      const data = await clientApi.getAll()
      setClients(data)
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      createOrder: { ru: "Создать заказ", en: "Create Order" },
      client: { ru: "Клиент", en: "Client" },
      selectClient: { ru: "Выберите клиента", en: "Select client" },
      dateTime: { ru: "Дата и время", en: "Date and time" },
      amount: { ru: "Сумма", en: "Amount" },
      description: { ru: "Описание", en: "Description" },
      status: { ru: "Статус", en: "Status" },
      pending: { ru: "Ожидает", en: "Pending" },
      inProgress: { ru: "В работе", en: "In Progress" },
      completed: { ru: "Завершен", en: "Completed" },
      cancel: { ru: "Отмена", en: "Cancel" },
      create: { ru: "Создать", en: "Create" },
      creating: { ru: "Создание...", en: "Creating..." },
    }
    return translations[key]?.[language] || key
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.clientId || !formData.dateTime || !formData.amount) return

    setLoading(true)
    try {
      await orderApi.create({
        clientId: formData.clientId,
        dateTime: formData.dateTime,
        amount: parseFloat(formData.amount),
        description: formData.description || undefined,
        status: formData.status
      })
      
      setFormData({
        clientId: "",
        dateTime: "",
        amount: "",
        description: "",
        status: "PENDING"
      })
      setOpen(false)
      onOrderCreated()
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Failed to create order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-blue-400 text-lg font-bold hover:bg-blue-600 rounded-full flex items-center gap-2 py-3 text-lg px-6 cursor-pointer">
          <Plus className="font-bold w-7 h-7" />
          <span className="text-lg text-white">{t("createOrder")}</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("createOrder")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client">{t("client")}</Label>
            <Select value={formData.clientId} onValueChange={(value) => setFormData({...formData, clientId: value})}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectClient")} />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateTime">{t("dateTime")}</Label>
            <Input
              id="dateTime"
              type="datetime-local"
              value={formData.dateTime}
              onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">{t("amount")}</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">{t("status")}</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as any})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">{t("pending")}</SelectItem>
                <SelectItem value="IN_PROGRESS">{t("inProgress")}</SelectItem>
                <SelectItem value="COMPLETED">{t("completed")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("description")}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-400 hover:bg-blue-600 text-white">
              {loading ? t("creating") : t("create")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}