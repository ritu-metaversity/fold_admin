import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAOGq_NoxCTAe-nRVz1gP_7wxV6-tR5N4o",
  authDomain: "rituraj-78aa5.firebaseapp.com",
  projectId: "rituraj-78aa5",
  storageBucket: "rituraj-78aa5.appspot.com",
  messagingSenderId: "142529887787",
  appId: "1:142529887787:web:a181ec11a53e27b35db46e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = getMessaging(firebaseApp);

export { messaging, getToken, onMessage };
