import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: "local",
  authDomain: "local",
  projectId: "local",
  storageBucket: "local",
  messagingSenderId: "local",
  appId: "local",
};

// Initialize Firebase
let app;
let auth: any = {};
let db: any = {};
let storage: any = {};

if (typeof window !== 'undefined' && !getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (e) {
    console.error("Firebase initialization failed in the browser:", e)
  }
}


export { app, auth, db, storage };
