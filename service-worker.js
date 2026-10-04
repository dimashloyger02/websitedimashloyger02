// service-worker.js
console.log('Service Worker активен');

self.addEventListener('notificationclick', (event) => {
    console.log('Клик по уведомлению:', event.action);
    event.notification.close();

    // Логика открытия страницы
    const url = new URL(self.location.origin);
    
    if (event.action === 'reply') {
        url.searchParams.set('action', 'show-input');
        url.searchParams.set('message', 'Введите ваш ответ:');
    } else if (event.action === 'alert') {
        url.searchParams.set('action', 'show-alert');
        url.searchParams.set('message', 'Вы нажали кнопку Alert!');
    }

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            const existingClient = clientList.find(client => client.url.startsWith(self.location.origin));
            if (existingClient) {
                existingClient.focus();
                return existingClient.navigate(url.toString());
            }
            return clients.openWindow(url.toString());
        })
    );
});
