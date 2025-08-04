"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Edit } from "lucide-react"
import { orderApi, clientApi } from "@/lib/api"
import { getBackendStatus, getDisplayStatus } from "@/lib/status-utils"
import type { Client, Order } from "@/types"

interface EditOrderDialogProps {
  order: Order
  language: "ru" | "en"
  onOrderUpdated: () => void
}

export function EditOrderDialog({ order, language, onOrderUpdated }: EditOrderDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [formData, setFormData] = useState({
    clientId: order.clientId,
    dateTime: new Date(order.dateTime).toISOString().slice(0, 16),
    amount: order.amount.toString(),
    description: order.description || "",
    status: order.status
  })

  useEffect(() => {
    if (open) {
      fetchClients()
    }
  }, [open])

  useEffect(() => {
    // Update form data when order changes
    setFormData({
      clientId: order.clientId,
      dateTime: new Date(order.dateTime).toISOString().slice(0, 16),
      amount: order.amount.toString(),
      description: order.description || "",
      status: order.status
    })
  }, [order])

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
      editOrder: { ru: "Редактировать заказ", en: "Edit Order" },
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
      save: { ru: "Сохранить", en: "Save" },
      saving: { ru: "Сохранение...", en: "Saving..." },
    }
    return translations[key]?.[language] || key
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.clientId || !formData.dateTime || !formData.amount) return

    setLoading(true)
    try {
      await orderApi.update(order.id, {
        dateTime: formData.dateTime,
        amount: parseFloat(formData.amount),
        description: formData.description || undefined,
        status: formData.status
      })
      
      setOpen(false)
      onOrderUpdated()
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Failed to update order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        onClick={() => setOpen(true)}
        className="font-bold cursor-pointer hover:text-gray-600"
      >
        <Edit className="w-6 h-6" />
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-blue-400">{t("editOrder")} {order.orderNumber}</DialogTitle>
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
            <Button type="submit" className="bg-blue-400 hover:bg-blue-600" disabled={loading}>
              {loading ? t("saving") : t("save")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}