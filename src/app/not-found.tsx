"use client";

import { Button, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { logoIcon } from "@/utils/images";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const authContext = useAuthContext();
  const router = useRouter();

  const handleHome = () => {
    authContext.currentUser ? router.push("/home") : router.push("/");
  };

  return (
    <Center h="100vh">
      <Flex direction="column" justifyContent="center" alignItems="center" gap="20px" paddingBottom="70px">
        <Image src={logoIcon.src} alt="logo" width="100px" height="100px" />
        <Heading as="h2" size="lg" mt={5}>
          404 Not Found
        </Heading>
        <Flex direction="column" gap="10px" justifyContent="center" alignItems="center" paddingY="20px">
          <Text>このページは存在しません。</Text>
          <Text>他のページを探索してみましょう。</Text>
        </Flex>
        <Button color="white" backgroundColor="primary.300" mt={5} onClick={handleHome}>
          <Text>ホームへ戻る</Text>
        </Button>
      </Flex>
    </Center>
  );
};

export default NotFound;
