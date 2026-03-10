// В service-worker.js
self.addEventListener('notificationclick', (event) => {
    console.log('Обработчик notificationclick сработал');
    event.notification.close();
    
    switch (event.action) {
        case 'reply':
            console.log('Обработка действия reply');
            clients.matchAll({type: 'window'}).then((clientList) => {
                clientList.forEach((client) => {
                    client.postMessage({
                        type: 'show-input',
                        message: 'Введите ваш ответ:'
                    });
                });
            });
            break;
            
        case 'alert':
            console.log('Обработка действия alert');
            clients.matchAll({type: 'window'}).then((clientList) => {
                clientList.forEach((client) => {
                    client.postMessage({
                        type: 'show-alert',
                        message: 'Вы нажали кнопку Alert!'
                    });
                });
            });
            break;
            
        default:
            console.log('Действие по умолчанию');
            clients.openWindow('/').then(client => {
                if (client) {
                    client.focus();
                }
            });
    }
});
