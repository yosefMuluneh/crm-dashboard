// Status mapping utilities
export const statusMap = {
  backend: {
    'IN_PROGRESS': 'В работе',
    'PENDING': 'Ожидает', 
    'COMPLETED': 'Завершен'
  },
  frontend: {
    'В работе': 'IN_PROGRESS',
    'Ожидает': 'PENDING',
    'Завершен': 'COMPLETED'
  },
  english: {
    'IN_PROGRESS': 'In Progress',
    'PENDING': 'Pending',
    'COMPLETED': 'Completed'
  }
};

export const getDisplayStatus = (status: string, language: 'ru' | 'en' = 'ru'): string => {
  if (language === 'en') {
    return statusMap.english[status as keyof typeof statusMap.english] || status;
  }
  return statusMap.backend[status as keyof typeof statusMap.backend] || status;
};

export const getBackendStatus = (displayStatus: string): string => {
  return statusMap.frontend[displayStatus as keyof typeof statusMap.frontend] || displayStatus;
};