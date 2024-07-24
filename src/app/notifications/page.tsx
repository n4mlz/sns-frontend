"use client";

import { useState } from "react";
import { Box, Center, Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
// @ts-ignore
import InfiniteScroll from "react-infinite-scroller";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import SetUpDialog from "@/components/handle/setUpDialog";
import TitleHeader from "@/components/ui/titleHeader";
import domainConsts from "@/constants/domain";
import Notification from "@app/notifications/_components/notification";

const NotificationsPage = () => {
  const authContext = useAuthContext();

  const [notifications, setNotifications] = useState<components["schemas"]["postNotification"][]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>();

  const loadMore = async () => {
    if (!hasMore || authContext.currentUser === undefined) {
      return;
    }

    if (authContext.currentUser === null) {
      setHasMore(false);
      return;
    }

    const res = await client.GET("/api/posts/notifications", {
      params: { query: { limit: domainConsts.CURSOR_PAGINATION_LIMIT, cursor: cursor } },
    });
    if (!res.response.ok || !res.data) {
      return;
    }

    if (res.data.nextCursor) {
      setCursor(res.data.nextCursor);
    } else {
      setHasMore(false);
    }

    if (!res.data.postNotifications) {
      return;
    }

    setNotifications([...notifications, ...res.data.postNotifications]);

    client.PUT("/api/posts/notifications/confirm", {
      body: { postNotificationIds: res.data.postNotifications.map((n) => n.postNotificationId!) },
    });
  };

  return (
    <Box>
      <SetUpDialog />
      <TitleHeader title="通知" />
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <Center borderTop="1px" borderColor={useColorModeValue("gray.200", "gray.700")}>
            <Spinner thickness="2px" color="gray.300" margin="40px" />
          </Center>
        }>
        {hasMore || notifications.length > 0 ? (
          <Box borderTop="1px" borderColor={useColorModeValue("gray.300", "gray.700")}>
            <Flex direction="column" gap="4px">
              {notifications.map((notification) => (
                <Notification notification={notification} />
              ))}
            </Flex>
          </Box>
        ) : (
          <Center paddingY="100px">
            <Text fontWeight="500" color="gray.400">
              表示する通知がありません
            </Text>
          </Center>
        )}
      </InfiniteScroll>
    </Box>
  );
};

export default NotificationsPage;
