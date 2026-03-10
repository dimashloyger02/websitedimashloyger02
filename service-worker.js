// Обработка клика по уведомлению
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
