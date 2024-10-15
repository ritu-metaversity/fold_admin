self.addEventListener('push', function(event) {
  console.log('Push event received.');

  console.log(event, "huihui")

  
  const options = {
      body: 'This is the notification body.',
      icon: '/path-to-icon/icon.png',
      badge: '/path-to-icon/badge.png'
  };

  const promiseChain = self.registration.showNotification('Hello, World!', options);

  event.waitUntil(
      promiseChain
          .then(() => {
              console.log('Notification displayed successfully');
          })
          .catch((error) => {
              console.error('Notification failed:', error);
          })
  );
});


self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(focusOrOpenWindow());
});

async function focusOrOpenWindow() {
  const url = new URL("/", self.location.origin).href;

  const allWindows = await self.clients.matchAll({
    type: "window",
  });
  const appWindow = allWindows.find((w) => w.url === url);

  if (appWindow) {
    return appWindow.focus();
  } else {
    return self.clients.openWindow(url);
  }
}
