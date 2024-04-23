"use client";

import { useAuthContext } from "@/components/contexts/AuthProvider";
import { signIn, signOut } from "@/lib/firebase";
import { useEffect, useState } from "react";

const Home = () => {
  const authContext = useAuthContext();
  const [pageType, setPageType] = useState<"login" | "timeline" | undefined>(undefined);

  useEffect(() => {
    if (authContext.currentUser) {
      setPageType("timeline");
    } else if (authContext.currentUser === null) {
      setPageType("login");
    } else {
      setPageType(undefined);
    }
  }, [authContext.currentUser]);

  return (
    <div>
      {pageType === undefined && (
        <div>
          <p>loading...</p>
        </div>
      )}
      {pageType === "login" && (
        <div>
          <p>please sign in.</p>
          <button onClick={() => signIn()}>sign in</button>
        </div>
      )}
      {pageType === "timeline" && (
        <div>
          <p>timeline</p>
          <button onClick={() => signOut()}>sign out</button>
        </div>
      )}
    </div>
  );
};

export default Home;
