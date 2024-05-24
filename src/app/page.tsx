"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Center, Flex, Heading, Image, Spinner, useColorModeValue } from "@chakra-ui/react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import { signIn } from "@/lib/firebase";
import { logo, slides } from "@/utils/images";

const Welcome = () => {
  const authContext = useAuthContext();
  const router = useRouter();

  const splideOptions = {
    autoplay: true,
    interval: 3000,
    rewind: true,
    pagination: false,
    pauseOnHover: true,
    perPage: 3,
    perMove: 1,
    gap: "10px",
    padding: "20px",
    arrows: false,
  };

  useEffect(() => {
    if (authContext.currentUser) {
      router.push("/home");
    }
  }, [authContext.currentUser]);

  return (
    <div>
      {authContext.currentUser !== null ? (
        <Center>
          <Spinner thickness="2px" color="gray.300" margin="40px" />
        </Center>
      ) : (
        <Flex direction="column" gap="25px" paddingY="100px" justifyContent="center" alignItems="center">
          <Box w="50%">
            <Image src={logo.src} alt="logo" w="fit-content" paddingRight="7%" />
          </Box>
          <Flex direction="column" gap="10px" justifyContent="center" alignItems="center">
            <Heading as="h2" size="sm">
              静かな世界で愚痴をこぼしたい人へ。
            </Heading>
            <Heading as="h2" size="sm">
              鍵垢しか存在しないクローズドなSNS
            </Heading>
          </Flex>
          <Button color="white" backgroundColor="primary.300" onClick={() => signIn(() => router.push("/home"))}>
            Google でサインイン
          </Button>
          <Splide options={splideOptions}>
            {slides.map((slide, index) => (
              <SplideSlide key={index}>
                <Box border={useColorModeValue("0px", "1px")} borderColor="gray.500" borderRadius="3px">
                  <Image src={slide.src} alt="" borderRadius="2px" />
                </Box>
              </SplideSlide>
            ))}
          </Splide>
        </Flex>
      )}
    </div>
  );
};

export default Welcome;
