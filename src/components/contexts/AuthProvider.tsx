"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, getAuth } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";

const AuthContext = createContext<{ currentUser: User | null | undefined }>({ currentUser: undefined });

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);

  const auth = getAuth(firebaseApp);

  useEffect(() => {
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
