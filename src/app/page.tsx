"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import { signIn, signOut } from "@/lib/firebase";
import Timeline from "@app/_components/timeline";

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
      {pageType === "timeline" && <Timeline />}
    </div>
  );
};

export default Home;
