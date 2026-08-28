"use client";

import { Box, Center, Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

import { useAuthContext } from "@/components/contexts/AuthProvider";
import SetUpDialog from "@/components/handle/setUpDialog";
import InfiniteScroll from "@/components/ui/infiniteScroll";
import TitleHeader from "@/components/ui/titleHeader";
import domainConsts from "@/constants/domain";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import Notification from "@app/notifications/_components/notification";

const NotificationsPage = () => {
  const authContext = useAuthContext();
  const loaderBorderColor = useColorModeValue("gray.200", "gray.700");
  const notificationsBorderColor = useColorModeValue("gray.300", "gray.700");

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
          <Center borderTop="1px" borderColor={loaderBorderColor}>
            <Spinner thickness="2px" color="gray.300" margin="40px" />
          </Center>
        }>
        {hasMore || notifications.length > 0 ? (
          <Box borderTop="1px" borderColor={notificationsBorderColor}>
            <Flex direction="column" gap="4px">
              {notifications.map((notification) => (
                <Notification key={notification.postNotificationId} notification={notification} />
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
