"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import { signIn } from "@/lib/firebase";

const Welcome = () => {
  const authContext = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (authContext.currentUser) {
      router.push("/home");
    }
  }, [authContext.currentUser]);

  return (
    <div>
      {authContext.currentUser === undefined ? (
        <div>
          <p>loading...</p>
        </div>
      ) : (
        <div>
          <p>please sign in.</p>
          <button onClick={() => signIn()}>sign in</button>
        </div>
      )}
    </div>
  );
};

export default Welcome;
