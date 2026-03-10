// Обработка клика по уведомлению
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    // Обрабатываем действия
    switch (event.action) {
        case 'view':
            // Открываем форму ввода
            clients.matchAll({type: 'window'}).then((clientList) => {
                clientList.forEach((client) => {
                    client.postMessage({
                        type: 'show-input',
                        message: 'Введите текст:'
                    });
                });
            });
            break;
            
        case 'alert':
            // Показываем алерт
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

// Обработчик сообщений от клиента
self.addEventListener('message', (event) => {
    // Обработка ввода текста
    if (event.data.type === 'input-response') {
        const inputText = event.data.text;
        event.source.postMessage({
            type: 'input-confirmed',
            message: `Получен текст: ${inputText}`
        });
    }
    
    // Обработка алерта
    if (event.data.type === 'show-alert') {
        event.source.postMessage({
            type: 'alert-response',
            message: 'Сообщение получено!'
        });
    }
});
