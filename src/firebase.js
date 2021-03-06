import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// process.env.KEY - legge il valore di una chiave nel file .env
// https://create-react-app.dev/docs/adding-custom-environment-variables/

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "learn-firebase-with-reac-7777c",
  // storageBucket: process.env.REACT_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

initializeApp(firebaseConfig);

// Riferimento al database
const db = getFirestore();

export { db };
