"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { signIn } from "@/lib/firebase";
import { components } from "@/lib/openapi/schema";
import { useAuthContext } from "@/components/contexts/AuthProvider";

const AuthRedirect = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const authContext = useAuthContext();
  const [dialog, setDialog] = useState<"userNull" | "userNameNull" | undefined>(undefined);

  const { data, error, isLoading } = useSWR<components["schemas"]["profile"]>(
    authContext.currentUser ? "/api/settings/profile" : null
  );

  useEffect(() => {
    if (authContext.currentUser === null) {
      setDialog("userNull");
      onOpen();
    }
  }, [authContext.currentUser]);

  useEffect(() => {
    if (authContext.currentUser && !isLoading && (!data || !data.userName || error)) {
      setDialog("userNameNull");
      onOpen();
    }
  }, [data, error, isLoading]);

  return (
    <>
      {dialog === "userNull" && (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                はじめよう
              </AlertDialogHeader>

              <AlertDialogBody>Google アカウントでログインすることで、簡単に開始できます。</AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  color="white"
                  backgroundColor="blue.400"
                  onClick={() => {
                    onClose();
                    signIn();
                  }}
                  ml={3}>
                  Google でログイン
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
      {dialog === "userNameNull" && (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                ユーザー名の登録
              </AlertDialogHeader>

              <AlertDialogBody>まずはユーザー名を登録しましょう !</AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  color="white"
                  backgroundColor="blue.400"
                  onClick={() => {
                    onClose();
                    router.push("/settings/userName");
                  }}
                  ml={3}>
                  ユーザー名を登録
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  );
};

export default AuthRedirect;
