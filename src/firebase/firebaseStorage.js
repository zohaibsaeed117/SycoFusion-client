import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_AUTH_DOMAIN,
  projectId: process.env.NEXT_PROJECT_ID,
  storageBucket: "sycofusion-bf692.appspot.com",
  messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_APP_ID,
  measurementId: process.env.NEXT_MEASUREMENT_ID
};



const app = initializeApp(firebaseConfig);


export const storage = getStorage();