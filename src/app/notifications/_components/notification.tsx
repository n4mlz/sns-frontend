import path from "path";
import { useRouter } from "next/navigation";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { components } from "@/lib/openapi/schema";
import { CustomLinkify } from "@/components/elements/customLinkify";
import UserIcon from "@/components/ui/userIcon";
import { getAboutDate } from "@/utils/time";

type Props = {
  notification: components["schemas"]["postNotification"];
};

const Notification = ({ notification }: Props) => {
  const router = useRouter();

  return (
    <Flex
      direction="column"
      gap="2px"
      position="relative"
      paddingTop="4px"
      paddingBottom="10px"
      borderBottom="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}>
      <Flex
        cursor="pointer"
        direction="row"
        gap="10px"
        width="80%"
        onClick={() => router.push(path.join(path.join("/posts", notification?.reactedPostId ?? "")))}>
        <Text
          color={useColorModeValue("gray.500", "gray.400")}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          flexShrink="1">
          {notification.reactedPostContent}
        </Text>
        <Text color={useColorModeValue("gray.400", "gray.500")} whiteSpace="nowrap">{`へのリアクション`}</Text>
      </Flex>
      <Flex direction="row" gap="8px">
        <UserIcon user={notification.notifier!} size="45px" />
        <Flex direction="column" gap="4px" flex="1">
          <Flex direction="column">
            <Flex direction="row" justifyContent="space-between" alignItems="center">
              <Flex
                cursor="pointer"
                direction="row"
                gap="4px"
                onClick={() => router.push(path.join(path.join("/posts", notification?.reactedPostId ?? "")))}>
                <Text fontWeight={700}>{notification?.notifier?.displayName}</Text>
                <Text color="gray.500">{`@${notification?.notifier?.userName}`}</Text>
                <Text color="gray.500">{`· ${getAboutDate(notification?.createdAt!)}`}</Text>
              </Flex>
            </Flex>
            <Text
              cursor="pointer"
              overflowWrap="anywhere"
              wordBreak="normal"
              whiteSpace="break-spaces"
              onClick={() => router.push(path.join(path.join("/posts", notification?.reactedPostId ?? "")))}>
              <CustomLinkify>{notification?.content}</CustomLinkify>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Notification;
