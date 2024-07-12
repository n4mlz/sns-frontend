"use client";

import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { MdCheckCircle } from "react-icons/md";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import PageBackButton from "@/components/elements/pageBackButton";
import { logo, slides } from "@/utils/images";

const AboutPage = () => {
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

  return (
    <>
      <Box height="30px">
        <PageBackButton />
      </Box>
      <Flex
        direction="column"
        gap="25px"
        paddingY="20px"
        justifyContent="center"
        alignItems="center"
        position="relative">
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
        <Flex direction="row" gap="4px" alignItems="center">
          <QuestionIcon color="primary.400" />
          <Heading as="h2" size="md">
            snooze とは？
          </Heading>
        </Flex>
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
        <Splide options={splideOptions}>
          {slides.map((slide, index) => (
            <SplideSlide key={index}>
              <Box border={useColorModeValue("0px", "1px")} borderColor="gray.500" borderRadius="3px">
                <Image src={slide.src} alt="" borderRadius="2px" />
              </Box>
            </SplideSlide>
          ))}
        </Splide>
        <Flex w="100%" direction="column" alignItems="center" gap="25px" paddingTop="10px" paddingBottom="30px">
          <Divider w="90%" />
          <Flex direction="column" gap="10px" justifyContent="center" alignItems="center">
            <Link href="/terms-of-service" _hover={{ textDecoration: "none" }}>
              利用規約
            </Link>
            <Link href="/privacy-policy" _hover={{ textDecoration: "none" }}>
              プライバシーポリシー
            </Link>
            <Link href="/announcements" _hover={{ textDecoration: "none" }}>
              過去のお知らせ
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default AboutPage;
