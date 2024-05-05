"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import { ControlledTextarea } from "@/components/elements/ControlledTextarea";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import { userIconUrl } from "@/lib/image";
import domainConsts from "@/constants/domain";

const schema = z.object({
  content: z
    .string()
    .min(1, "1文字以上で入力してください。")
    .max(domainConsts.MAX_CONTENT_LENGTH, `${domainConsts.MAX_CONTENT_LENGTH}文字以下で入力してください。`),
});

type FormValues = z.infer<typeof schema>;

const useReplyModal = (commentId: string, submitCallback?: (reply: components["schemas"]["reply"]) => any) => {
  const disclosure = useDisclosure();
  const toast = useToast();
  const authContext = useAuthContext();

  const { data, error, isLoading } = useSWR<components["schemas"]["profile"]>(
    authContext.currentUser ? "/api/settings/profile" : null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [isOk, setIsOk] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const onOpen = () => {
    reset();
    disclosure.onOpen();
  };

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    setIsPosting(true);
    const res = await client.POST("/api/posts/replies", { body: { commentId: commentId, content: form.content } });
    setIsPosting(false);
    if (res.response.ok) {
      submitCallback && submitCallback({ ...res.data });
      disclosure.onClose();
      toast({
        title: "返信しました !",
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "返信に失敗しました",
        description: "入力内容に誤りがあるか、サーバーに問題が発生した可能性があります。",
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const currentContent = getValues("content");
    setProgress(currentContent === undefined ? 0 : (currentContent.length / domainConsts.MAX_CONTENT_LENGTH) * 100);
    setIsOk(schema.safeParse({ content: currentContent }).success);
  }, [watch("content"), isLoading]);

  const replyModal = (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} size={{ base: "sm", md: "md", lg: "lg" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader margin={1}>
          <Heading size="md">返信を追加</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="row" gap="10px">
            <Box w="35px" h="35px" borderRadius="full" backgroundColor="gray.200" overflow="hidden">
              <Skeleton isLoaded={authContext.currentUser != undefined && !isLoading}>
                {!data || !data.userName || error || isLoading ? (
                  <Box w="100%" aspectRatio={3} />
                ) : (
                  <Image src={userIconUrl(data?.userName)} w="35px" h="35px" alt="" />
                )}
              </Skeleton>
            </Box>
            <Box flex={1}>
              <ControlledTextarea
                variant="unstyled"
                placeholder="返信する"
                padding={0}
                isLoaded
                label=""
                errors={errors}
                {...register("content")}
              />
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex direction="row" gap="10px" alignItems="center">
            {progress < 95 ? (
              <CircularProgress size="25px" thickness="15px" color="blue.400" value={progress} />
            ) : progress < 100 ? (
              <CircularProgress size="25px" thickness="15px" color="yellow.400" value={progress} />
            ) : (
              <CircularProgress size="25px" thickness="15px" color="red.400" value={progress} />
            )}
            <Button
              color="white"
              backgroundColor="blue.400"
              borderRadius="full"
              isDisabled={!isOk}
              isLoading={isPosting}
              onClick={handleSubmit(onSubmit)}
              _disabled={{ backgroundColor: "blue.200" }}>
              返信
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return {
    replyModal,
    ...disclosure,
    onOpen,
  };
};

export default useReplyModal;
