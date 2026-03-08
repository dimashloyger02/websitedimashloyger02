self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    clients.openWindow('/').then(client => {
        if (client) {
            client.focus();
        }
    });
});

self.addEventListener('push', (event) => {
    event.waitUntil(
        self.registration.showNotification('Новое сообщение', {
            body: 'У вас есть новое сообщение',
            icon: '/path-to-icon.png'
        })
    );
});
