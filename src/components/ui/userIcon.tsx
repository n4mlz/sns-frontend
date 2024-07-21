"use client";

import path from "path";
import { useRouter } from "next/navigation";
import { Box, Image, ResponsiveValue, Skeleton, useColorModeValue } from "@chakra-ui/react";
import { components } from "@/lib/openapi/schema";

type Props = {
  user: components["schemas"]["user"];
  size?: ResponsiveValue<number | string>;
  isLoading?: boolean;
  disableClick?: boolean;
};

const UserIcon = ({ user, size, isLoading, disableClick }: Props) => {
  const router = useRouter();

  return (
    <Box
      w={size}
      h={size}
      borderRadius="full"
      backgroundColor={useColorModeValue("gray.200", "gray.900")}
      overflow="hidden"
      cursor="pointer"
      onClick={!disableClick ? () => router.push(path.join("/users", user.userName ?? "")) : undefined}>
      <Skeleton isLoaded={!isLoading}>
        {user && user.iconUrl && user.iconUrl !== "" ? (
          <Image src={user.iconUrl} w={size} h={size} alt="" cursor="pointer" />
        ) : (
          <Box w={size} h={size} cursor="pointer" />
        )}
      </Skeleton>
    </Box>
  );
};

export default UserIcon;
