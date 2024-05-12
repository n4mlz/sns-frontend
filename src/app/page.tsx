"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Center, Flex, Heading, Spinner } from "@chakra-ui/react";
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
        <Center>
          <Spinner thickness="2px" color="gray.300" margin="40px" />
        </Center>
      ) : (
        <Flex direction="column" gap="20px" paddingY="100px" justifyContent="center" alignItems="center">
          <Heading as="h2" size="md">
            はじめよう。
          </Heading>
          <Button color="white" backgroundColor="primary.300" onClick={() => signIn(() => router.push("/home"))}>
            Google でサインイン
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default Welcome;
