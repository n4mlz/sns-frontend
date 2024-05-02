"use client";

import path from "path";
import { useRouter } from "next/navigation";
import { Flex, Box, Text, Button, IconButton, Image } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import { userIconUrl } from "@/lib/image";
import domainConsts from "@/constants/domain";
import { adjustBio } from "@/utils/stringOperation";

type Props = {
  user: components["schemas"]["user"];
  userCallback?: (user: components["schemas"]["user"]) => void;
  enableReject?: boolean;
};

const User = ({ user, userCallback, enableReject }: Props) => {
  const router = useRouter();

  const follow = (afterStatus: string) => {
    client.PUT("/api/follows/follow", { body: { userName: user.userName } });
    userCallback?.({ ...user, followingStatus: afterStatus });
  };

  const unfollow = (afterStatus: string) => {
    client.PUT("/api/follows/unfollow", { body: { userName: user.userName } });
    userCallback?.({ ...user, followingStatus: afterStatus });
  };

  const reject = () => {
    client.PUT("/api/follows/reject", { body: { userName: user.userName } });
    userCallback?.({ ...user, followingStatus: domainConsts.NONE });
  };

  return (
    <Flex direction="row" gap="8px" padding="12px" borderBottom="2px" borderColor="gray.200">
      <Box
        w="45px"
        h="45px"
        borderRadius="full"
        backgroundColor="gray.200"
        overflow="hidden"
        onClick={() => router.push(path.join("/users", user.userName ? user.userName : ""))}>
        <Image src={userIconUrl(user.userName!)} w="45px" h="45px" alt="" />
      </Box>
      <Flex direction="column" gap="4px" flex="1">
        <Flex direction="row" justifyContent="space-between">
          <Flex
            direction="column"
            flex="1"
            onClick={() => router.push(path.join("/users", user.userName ? user.userName : ""))}>
            <Text fontWeight={700}>{user.displayName}</Text>
            <Text color="gray.500">{`@${user.userName}`}</Text>
          </Flex>
          {user.followingStatus == domainConsts.MUTUAL && (
            <Button borderRadius="full" marginX="4px" onClick={() => unfollow(domainConsts.FOLLOWED)}>
              相互フォロー
            </Button>
          )}
          {user.followingStatus == domainConsts.FOLLOWING && (
            <Button borderRadius="full" marginX="4px" onClick={() => unfollow(domainConsts.NONE)}>
              リクエスト中
            </Button>
          )}
          {user.followingStatus == domainConsts.FOLLOWED &&
            (enableReject ? (
              <Flex direction="row" gap="4px" alignItems="center">
                <Button borderRadius="full" marginX="4px" onClick={() => follow(domainConsts.MUTUAL)}>
                  リクエストを承認する
                </Button>
                <IconButton
                  isRound={true}
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                  fontSize="12px"
                  aria-label="reject"
                  icon={<CloseIcon />}
                  onClick={reject}
                />
              </Flex>
            ) : (
              <Button borderRadius="full" marginX="4px" onClick={() => follow(domainConsts.MUTUAL)}>
                リクエストを承認する
              </Button>
            ))}
          {user.followingStatus == domainConsts.NONE && (
            <Button borderRadius="full" marginX="4px" onClick={() => follow(domainConsts.FOLLOWING)}>
              リクエスト
            </Button>
          )}
          {user.followingStatus == domainConsts.OWN && (
            <Button borderRadius="full" marginX="4px" onClick={() => router.push("/settings/profile")}>
              プロフィールを編集
            </Button>
          )}
        </Flex>
        <Text onClick={() => router.push(path.join("/users", user.userName ? user.userName : ""))}>
          {adjustBio(user.biography ? user.biography : "")}
        </Text>
      </Flex>
    </Flex>
  );
};

export default User;
