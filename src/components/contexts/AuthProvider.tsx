"use client";

import { User, getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import type React from "react";

import { publicEnv } from "@/constants/env";
import { firebaseApp } from "@/lib/firebase";

const AuthContext = createContext<{ currentUser: User | null | undefined }>({ currentUser: undefined });

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);

  const auth = publicEnv.FIREBASE_API_KEY ? getAuth(firebaseApp) : undefined;

  useEffect(() => {
    if (!auth) return;
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribed();
    };
  }, [auth]);
  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuthContext };
