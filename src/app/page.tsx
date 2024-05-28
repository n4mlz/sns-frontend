"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { MdCheckCircle } from "react-icons/md";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import { signIn } from "@/lib/firebase";
import { logo, slides } from "@/utils/images";

const Welcome = () => {
  const authContext = useAuthContext();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

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
        <Flex direction="column" gap="25px" paddingTop="50px" justifyContent="center" alignItems="center">
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
          <Accordion allowToggle>
            <AccordionItem border="0px">
              <AccordionButton opacity={0.3} _expanded={{ opacity: 1 }}>
                <Center w="100%">
                  <Flex direction="row" gap="4px" alignItems="center">
                    <QuestionIcon color="primary.400" />
                    <Heading as="h2" size="md">
                      snooze とは？
                    </Heading>
                  </Flex>
                  <AccordionIcon />
                </Center>
              </AccordionButton>
              <AccordionPanel>
                <List spacing={3} paddingX="30px">
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.400" />
                    ユーザーそれぞれがプライベートな"鍵垢"を持つことができる、全く新しいコンセプトの SNS です。
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.400" />
                    自分の許可した人たちとのみ交流できる閉じた空間で、自由にポストや交流が楽しめます。
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.400" />
                    相互フォローになることでしかお互いのポストを閲覧できないようになっているので、人との繋がりをより深く感じられます。
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Splide options={splideOptions}>
            {slides.map((slide, index) => (
              <SplideSlide key={index}>
                <Box border={useColorModeValue("0px", "1px")} borderColor="gray.500" borderRadius="3px">
                  <Image src={slide.src} alt="" borderRadius="2px" />
                </Box>
              </SplideSlide>
            ))}
          </Splide>
          <Flex direction="column" justifyContent="center" alignItems="center" gap="25px" paddingTop="25px">
            <Checkbox colorScheme="green" onChange={(e) => setIsChecked(e.target.checked)}>
              <Link href="/terms-of-service" color="primary.300" target="_blank" rel="noopener noreferrer">
                利用規約
              </Link>
              と
              <Link href="/privacy-policy" color="primary.300" target="_blank" rel="noopener noreferrer">
                プライバシーポリシー
              </Link>
              に同意する
            </Checkbox>
            <Button
              color="white"
              backgroundColor="primary.300"
              isDisabled={!isChecked}
              onClick={() => signIn(() => router.push("/home"))}>
              Google でサインイン
            </Button>
          </Flex>
          <Flex w="100%" direction="column" alignItems="center" gap="25px" paddingTop="25px" paddingBottom="30px">
            <Divider w="90%" />
            <Flex direction="column" gap="10px" justifyContent="center" alignItems="center">
              <Link href="/terms-of-service" _hover={{ textDecoration: "none" }}>
                利用規約
              </Link>
              <Link href="/privacy-policy" _hover={{ textDecoration: "none" }}>
                プライバシーポリシー
              </Link>
            </Flex>
          </Flex>
        </Flex>
      )}
    </div>
  );
};

export default Welcome;
