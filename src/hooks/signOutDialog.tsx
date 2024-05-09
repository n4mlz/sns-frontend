import { useRef } from "react";
import { useRouter } from "next/navigation";
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
import { signOut } from "@/lib/firebase";

const useSignOutDialog = () => {
  const disclosure = useDisclosure();
  const cancelRef = useRef(null);
  const router = useRouter();

  const onClose = () => {
    disclosure.onClose();
    signOut(() => router.push("/"));
  };

  const signOutDialog = (
    <AlertDialog
      isOpen={disclosure.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={disclosure.onClose}
      size={{ base: "sm", md: "md", lg: "lg" }}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            ログアウトの確認
          </AlertDialogHeader>
          <AlertDialogBody>ログアウトしますか？</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={disclosure.onClose}>
              キャンセル
            </Button>
            <Button colorScheme="red" onClick={() => onClose()} ml={3}>
              ログアウト
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return { ...disclosure, signOutDialog };
};

export default useSignOutDialog;
