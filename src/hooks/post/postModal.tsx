"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { components } from "@/lib/openapi/schema";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import UserIcon from "@/components/ui/userIcon";
import client from "@/lib/openapi";
import domainConsts from "@/constants/domain";
import { ControlledTextarea } from "@/components/elements/ControlledTextarea";

const schema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "1文字以上で入力してください。")
    .max(domainConsts.MAX_CONTENT_LENGTH, `${domainConsts.MAX_CONTENT_LENGTH}文字以下で入力してください。`),
});

type FormValues = z.infer<typeof schema>;

const usePostModal = (submitCallback?: (comment: components["schemas"]["post"]) => any) => {
  const disclosure = useDisclosure();
  const toast = useToast();
  const authContext = useAuthContext();

  const { data, isLoading } = useSWR<components["schemas"]["profile"]>(
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
    const res = await client.POST("/api/posts", { body: { content: form.content } });
    setIsPosting(false);
    if (res.response.ok) {
      submitCallback?.({ ...res.data });
      disclosure.onClose();
      toast({
        title: "ポストしました !",
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "ポストに失敗しました",
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

  const postModal = (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} size={{ base: "sm", md: "md", lg: "lg" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader margin={1}>
          <Heading size="md">ポストする</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="row" gap="10px">
            <UserIcon
              user={data!}
              size="35px"
              isLoading={authContext.currentUser == undefined || isLoading}
              disableClick
            />
            <Box flex={1}>
              <ControlledTextarea
                placeholder="いまどうしてる？"
                isLoaded
                isUnstyled
                autoFocus
                label=""
                errors={errors}
                submitCallback={handleSubmit(onSubmit)}
                {...register("content")}
              />
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex direction="row" gap="10px" alignItems="center">
            {progress < 95 ? (
              <CircularProgress size="25px" thickness="15px" color="primary.300" value={progress} />
            ) : progress < 100 ? (
              <CircularProgress size="25px" thickness="15px" color="yellow.400" value={progress} />
            ) : (
              <CircularProgress size="25px" thickness="15px" color="red.400" value={progress} />
            )}
            <Button
              color="white"
              backgroundColor="primary.300"
              borderRadius="full"
              isDisabled={!isOk}
              isLoading={isPosting}
              onClick={handleSubmit(onSubmit)}>
              ポストする
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return {
    postModal,
    ...disclosure,
    onOpen,
  };
};

export default usePostModal;
