interface OrderStatsProps {
  language: "ru" | "en"
}

export function OrderStats({ language }: OrderStatsProps) {
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      inProgress: { ru: "В работе", en: "In Progress" },
      pending: { ru: "Ожидают", en: "Pending" },
      completed: { ru: "Завершены", en: "Completed" },
    }
    return translations[key]?.[language] || key
  }

  const stats = [
    { label: t("inProgress"), count: 42, color: "bg-red-100 text-red-800" },
    { label: t("pending"), count: 18, color: "bg-orange-100 text-orange-800" },
    { label: t("completed"), count: 156, color: "bg-green-100 text-green-800" },
  ]

  return (
    <div className="flex gap-4 items-center">
      {stats.map((stat) => (
        <div key={stat.label} className={`px-4 py-3 rounded-md text-center  sm:text-lg text-md font-medium ${stat.color}`}>
          {stat.label}: {stat.count}
        </div>
      ))}
    </div>
  )
}
