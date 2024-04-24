import { getApp, getApps, initializeApp } from "firebase/app";
import { publicEnv } from "@/constants/env";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: publicEnv.FIREBASE_API_KEY,
  authDomain: publicEnv.FIREBASE_AUTH_DOMAIN,
  projectId: publicEnv.FIREBASE_PROJECT_ID,
  storageBucket: publicEnv.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: publicEnv.FIREBASE_MESSAGING_SENDER_ID,
  appId: publicEnv.FIREBASE_APP_ID,
  measurementId: publicEnv.FIREBASE_MESSAGING_SENDER_ID,
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const signIn = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebaseApp);
  return signInWithPopup(auth, provider);
};

const signOut = () => {
  const auth = getAuth(firebaseApp);
  return firebaseSignOut(auth);
};

export { firebaseApp, signIn, signOut };