// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDgfmJU8KvaD5lilnAqMr_5Jk_EC1Wsh_4",
  authDomain: "foldadmin.firebaseapp.com",
  projectId: "foldadmin",
  storageBucket: "foldadmin.appspot.com",
  messagingSenderId: "408489342286",
  appId: "1:408489342286:web:d21d8d5805dc77c5b85a1f",
  measurementId: "G-2CPKLRHVX9"
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
