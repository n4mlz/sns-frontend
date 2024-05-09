"use client";

import { useRouter } from "next/navigation";
import { Flex, Heading } from "@chakra-ui/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuAtSign } from "react-icons/lu";
import BackButtonHeader from "@/components/ui/backButtonHeader";

const SettingsPage = () => {
  const router = useRouter();

  return (
    <>
      <BackButtonHeader title="設定" />
      <Flex direction="column" gap="32px" padding="20px">
        <Flex
          cursor="pointer"
          direction="row"
          gap="16px"
          alignItems="center"
          onClick={() => router.push("/settings/profile")}>
          <FaRegCircleUser size="22px" />
          <Heading as="h2" size="md">
            プロフィール設定
          </Heading>
        </Flex>
        <Flex
          cursor="pointer"
          direction="row"
          gap="16px"
          alignItems="center"
          onClick={() => router.push("/settings/userName")}>
          <LuAtSign size="22px" />
          <Heading as="h2" size="md">
            ユーザー名設定
          </Heading>
        </Flex>
      </Flex>
    </>
  );
};

export default SettingsPage;
