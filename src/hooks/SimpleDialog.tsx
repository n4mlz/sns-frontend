"use client";

import { useRef } from "react";
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

const useSimpleDialog = (
  onClose: () => any,
  message: { header: string; body: string; button: string; cancel?: string },
  buttonColor?: string,
  hasCancel?: boolean
) => {
  const disclosure = useDisclosure();
  const cancelRef = useRef(null);

  const onCloseDialog = () => {
    disclosure.onClose();
    onClose();
  };

  const dialog = (
    <AlertDialog
      isOpen={disclosure.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={disclosure.onClose}
      size={{ base: "sm", md: "md", lg: "lg" }}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {message.header}
          </AlertDialogHeader>
          <AlertDialogBody>{message.body}</AlertDialogBody>
          <AlertDialogFooter>
            {(hasCancel || hasCancel === undefined) && (
              <Button ref={cancelRef} onClick={disclosure.onClose}>
                {message.cancel}
              </Button>
            )}
            <Button color="white" backgroundColor={buttonColor} onClick={() => onCloseDialog()} ml={3}>
              {message.button}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return { disclosure, dialog };
};

export default useSimpleDialog;
