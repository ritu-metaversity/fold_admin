import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDgfmJU8KvaD5lilnAqMr_5Jk_EC1Wsh_4",
  authDomain: "foldadmin.firebaseapp.com",
  projectId: "foldadmin",
  storageBucket: "foldadmin.appspot.com",
  messagingSenderId: "408489342286",
  appId: "1:408489342286:web:d21d8d5805dc77c5b85a1f",
  measurementId: "G-2CPKLRHVX9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = getMessaging(firebaseApp);

export { messaging, getToken, onMessage };
