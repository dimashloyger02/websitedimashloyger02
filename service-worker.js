self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Закрываем уведомление
    
    // Обрабатываем действия
    switch (event.action) {
        case 'view':
            // Открываем главную страницу
            clients.openWindow('/').then(client => {
                if (client) {
                    client.focus();
                }
            });
            break;
            
        case 'alert':
            // Показываем алерт (через Client)
            clients.matchAll({type: 'window'}).then((clientList) => {
                clientList.forEach((client) => {
                    client.postMessage({
                        type: 'show-alert',
                        message: 'Вы нажали кнопку Alert!'
                    });
                });
            });
            break;
            
        case 'video':
            // Переходим к видео
            clients.openWindow('https://example.com/video').then(client => {
                if (client) {
                    client.focus();
                }
            });
            break;
            
        case 'file':
            // Открываем файл
            clients.openWindow('https://example.com/files').then(client => {
                if (client) {
                    client.focus();
                }
            });
            break;
            
        default:
            // Действие по умолчанию
            clients.openWindow('/').then(client => {
                if (client) {
                    client.focus();
                }
            });
    }
});

// Обработчик сообщений от клиента (для алерта)
self.addEventListener('message', (event) => {
    if (event.data.type === 'show-alert') {
        // Здесь можно отправить сообщение обратно клиенту
        event.source.postMessage({
            type: 'alert-response',
            message: 'Сообщение получено!'
        });
    }
});
