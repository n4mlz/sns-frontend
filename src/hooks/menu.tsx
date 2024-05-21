"use client";

import path from "path";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Box, Button, Center, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa6";
import {
  MdLogout,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlinePersonSearch,
  MdOutlineSettings,
} from "react-icons/md";
import { LuSend } from "react-icons/lu";
import { useAuthContext } from "@components/contexts/AuthProvider";
import { components } from "@/lib/openapi/schema";
import usePostModal from "@/hooks/post/postModal";
import useSignOutDialog from "@hooks/signOutDialog";

type Props = {
  postModalOpenCallback?: () => any;
  signOutDialogOpenCallback?: () => any;
};

const useMenu = ({ postModalOpenCallback, signOutDialogOpenCallback }: Props) => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const authContext = useAuthContext();
  const postModal = usePostModal();
  const signOutDialog = useSignOutDialog();

  const { data: profileData } = useSWR<components["schemas"]["profile"]>(
    authContext.currentUser ? "/api/settings/profile" : null
  );
  const { data: requestsData } = useSWR<components["schemas"]["user"][]>(
    authContext.currentUser ? "/api/follows/requests" : null
  );

  const openPostModal = () => {
    postModalOpenCallback && postModalOpenCallback();
    postModal.onOpen();
  };

  const openSignOutDialog = () => {
    signOutDialogOpenCallback && signOutDialogOpenCallback();
    signOutDialog.onOpen();
  };

  const mainMenu = (
    <Flex direction="column" gap="32px">
      <Flex
        cursor="pointer"
        direction="row"
        gap="16px"
        alignItems="center"
        onClick={() => router.push(path.join("/users", profileData?.userName ? profileData.userName : ""))}>
        <FaRegUser size="22px" />
        <Heading as="h2" size="md">
          プロフィール
        </Heading>
      </Flex>
      <Flex cursor="pointer" direction="row" gap="16px" alignItems="center" onClick={() => router.push("/settings")}>
        <MdOutlineSettings size="22px" />
        <Heading as="h2" size="md">
          設定
        </Heading>
      </Flex>
      <Flex cursor="pointer" direction="row" gap="16px" alignItems="center" onClick={() => router.push("/requests")}>
        <Box
          minW="24px"
          h="24px"
          borderRadius="full"
          backgroundColor={requestsData && requestsData.length > 0 ? "primary.300" : "primary.200"}
          color="white"
          padding="4px">
          <Center>
            <Heading as="h2" size="sm" color="white">
              {requestsData?.length ? requestsData.length : 0}
            </Heading>
          </Center>
        </Box>
        <Heading as="h2" size="md">
          リクエスト
        </Heading>
      </Flex>
      <Flex cursor="pointer" direction="row" gap="16px" alignItems="center" onClick={() => router.push("/search")}>
        <MdOutlinePersonSearch size="22px" />
        <Heading as="h2" size="md">
          ユーザーを検索
        </Heading>
      </Flex>
      <Box>
        <Button color="white" backgroundColor="primary.300" borderRadius="full" paddingX="20px">
          <Flex cursor="pointer" direction="row" gap="16px" alignItems="center" onClick={openPostModal}>
            <LuSend size="18px" />
            <Heading as="h2" size="sm">
              ポストする
            </Heading>
          </Flex>
        </Button>
      </Box>
    </Flex>
  );

  const subMenu = (
    <Flex cursor="pointer" direction="row" gap="16px">
      {colorMode === "light" ? (
        <MdOutlineDarkMode size="30px" onClick={toggleColorMode} />
      ) : (
        <MdOutlineLightMode size="30px" onClick={toggleColorMode} />
      )}
      <MdLogout size="30px" onClick={openSignOutDialog} />
    </Flex>
  );

  return { postModal, signOutDialog, mainMenu, subMenu };
};

export default useMenu;
