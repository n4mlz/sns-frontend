import { getApp, getApps, initializeApp } from "firebase/app";
import { publicEnv } from "@/constants/env";
import { GoogleAuthProvider, getAuth, signOut as firebaseSignOut, signInWithPopup } from "firebase/auth";
import { ANNOUNCEMENT_LOCALSTORAGE_KEY } from "@/constants/announcement";

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

const signIn = async (afterAuth?: () => any) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebaseApp);
  const credential = await signInWithPopup(auth, provider);
  localStorage.removeItem(ANNOUNCEMENT_LOCALSTORAGE_KEY);
  afterAuth?.();
  return credential;
};

const signOut = async (afterAuth?: () => any) => {
  const auth = getAuth(firebaseApp);
  const credential = await firebaseSignOut(auth);
  localStorage.removeItem(ANNOUNCEMENT_LOCALSTORAGE_KEY);
  afterAuth?.();
  return credential;
};

export { firebaseApp, signIn, signOut };
