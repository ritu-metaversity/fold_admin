// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Check if Firebase Cloud Messaging is supported
async function initializeFirebaseMessaging() {
  const messagingSupported = await isSupported();
  
  if (messagingSupported) {
    // Get Firebase Cloud Messaging instance
    const messaging = getMessaging(firebaseApp);
    console.log("Firebase Messaging is supported and initialized.");
    // Here you can set up listeners for notifications, request permission, etc.
  } else {
    console.log("Firebase Messaging is not supported in this browser.");
    // You can handle fallback logic here, such as showing a warning to the user
  }
}

// Call the function to initialize Firebase Messaging
initializeFirebaseMessaging();
