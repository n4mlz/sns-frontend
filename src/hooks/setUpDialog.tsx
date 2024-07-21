"use client";

import { useRef, useState } from "react";
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
  Checkbox,
  Flex,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { signIn } from "@/lib/firebase";
import { components } from "@/lib/openapi/schema";
import { useAuthContext } from "@/components/contexts/AuthProvider";

const useSetUpDialog = () => {
  const router = useRouter();
  const disclosure = useDisclosure();
  const cancelRef = useRef(null);
  const authContext = useAuthContext();
  const [dialog, setDialog] = useState<"userNull" | "userNameNull" | undefined>(undefined);
  const [isChecked, setIsChecked] = useState(false);

  const { data, isLoading, error } = useSWR<components["schemas"]["profile"]>(
    authContext.currentUser ? "/api/settings/profile" : null
  );

  const onOpen = () => {
    if (authContext.currentUser === null) {
      setDialog("userNull");
    } else if (!error && authContext.currentUser && !isLoading && (!data || !data.userName)) {
      setDialog("userNameNull");
    }
    disclosure.onOpen();
    setIsChecked(false);
  };

  const setUpDialog = (
    <>
      {dialog === "userNull" && (
        <AlertDialog
          isOpen={disclosure.isOpen}
          leastDestructiveRef={cancelRef}
          onClose={disclosure.onClose}
          size={{ base: "sm", md: "md", lg: "lg" }}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                はじめよう
              </AlertDialogHeader>
              <AlertDialogBody>
                <Flex direction="column" gap="10px" paddingBottom="10px">
                  <Text>Google アカウントでログインすることで、簡単に開始できます。</Text>
                  <Checkbox colorScheme="green" onChange={(e) => setIsChecked(e.target.checked)}>
                    <Link href="/terms-of-service" color="primary.300" target="_blank" rel="noopener noreferrer">
                      利用規約
                    </Link>
                    と
                    <Link href="/privacy-policy" color="primary.300" target="_blank" rel="noopener noreferrer">
                      プライバシーポリシー
                    </Link>
                    に同意する
                  </Checkbox>
                </Flex>
              </AlertDialogBody>
              <AlertDialogFooter justifyContent="center" paddingBottom="25px">
                <Button
                  color="white"
                  backgroundColor="primary.300"
                  isDisabled={!isChecked}
                  onClick={() => {
                    disclosure.onClose();
                    signIn(() => router.push("/home"));
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
        <AlertDialog
          isOpen={disclosure.isOpen}
          leastDestructiveRef={cancelRef}
          onClose={disclosure.onClose}
          size={{ base: "sm", md: "md", lg: "lg" }}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                ユーザー名の登録
              </AlertDialogHeader>
              <AlertDialogBody>まずはユーザー名を登録しましょう !</AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  color="white"
                  backgroundColor="primary.300"
                  onClick={() => {
                    disclosure.onClose();
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

  return { ...disclosure, onOpen, setUpDialog };
};

export default useSetUpDialog;
