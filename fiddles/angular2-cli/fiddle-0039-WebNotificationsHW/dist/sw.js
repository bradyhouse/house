
self.addEventListener('fetch', function(event) {
  event.waitUntil(async function() {
    if (!event.clientId) return;
    const client = await clients.get(event.clientId);
    if (!client) return;
    self.client = client;
  }());
});

self.addEventListener('notificationclick', function(event) {
  if (self.client) {
    self.client.postMessage({
      message: {
        action: event.action,
        id: event.notification.data.id
      },
      time: new Date().toString()
    });
  }
});

