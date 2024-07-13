"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ANNOUNCEMENT_LOCALSTORAGE_KEY, announcements } from "@/constants/announcement";
import { getFormattedDate } from "@/utils/time";
import useLocalStorage from "@/hooks/localStorage";

const AnnouncementDialog = () => {
  const disclosure = useDisclosure();
  const cancelRef = useRef(null);
  const router = useRouter();
  const { value, setValue, isLoading } = useLocalStorage(ANNOUNCEMENT_LOCALSTORAGE_KEY);

  const recentAnnouncement = announcements[announcements.length - 1];

  useEffect(() => {
    if (isLoading) return;
    const recentAnnouncementKey = String(announcements.length - 1);
    if (recentAnnouncement && recentAnnouncementKey !== value) {
      setValue(recentAnnouncementKey);
      disclosure.onOpen();
    }
  }, [isLoading]);

  return (
    <AlertDialog
      isOpen={disclosure.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={disclosure.onClose}
      size={{ base: "sm", md: "md", lg: "lg" }}
      scrollBehavior="inside">
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            <Text fontSize="sm" color="gray.500">
              {getFormattedDate(recentAnnouncement.createdAt)}
            </Text>
            <Text>{recentAnnouncement.title}</Text>
          </AlertDialogHeader>
          <AlertDialogBody>{recentAnnouncement.content}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              onClick={() => {
                disclosure.onClose();
                router.push("/announcements");
              }}>
              過去のお知らせを見る
            </Button>
            <Button color="white" backgroundColor="primary.300" ref={cancelRef} onClick={disclosure.onClose} ml={3}>
              閉じる
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AnnouncementDialog;
