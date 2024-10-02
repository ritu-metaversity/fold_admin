importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAOGq_NoxCTAe-nRVz1gP_7wxV6-tR5N4o",
  authDomain: "rituraj-78aa5.firebaseapp.com",
  projectId: "rituraj-78aa5",
  storageBucket: "rituraj-78aa5.appspot.com",
  messagingSenderId: "142529887787",
  appId: "1:142529887787:web:a181ec11a53e27b35db46e"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message", payload);

  const notificationTitle = payload?.notification?.title || "Background Title";
  const notificationOptions = {
    body: payload?.notification?.body || "Background Body",
    icon: payload?.notification?.icon || "/default-icon.png",
  };

  self?.registration?.showNotification(notificationTitle, notificationOptions);
});
