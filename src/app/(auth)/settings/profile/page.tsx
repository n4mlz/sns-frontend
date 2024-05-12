"use client";

import path from "path";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Box, Button, Input, Image, Skeleton, useToast, useColorModeValue } from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import BackButtonHeader from "@/components/ui/backButtonHeader";
import { ControlledInput } from "@/components/elements/ControlledInput";
import { ControlledTextarea } from "@/components/elements/ControlledTextarea";
import useImageCrop from "@/hooks/imageCrop/useImageCrop";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import domainConsts from "@/constants/domain";
import { postUserIconUrl, postUserBgImageUrl, userIconUrl, userBgImageUrl } from "@/lib/image";

const schema = z.object({
  displayName: z
    .string()
    .min(
      domainConsts.MIN_DISPLAY_NAME_LENGTH,
      `名前は${domainConsts.MIN_DISPLAY_NAME_LENGTH}文字以上で入力してください。`
    )
    .max(
      domainConsts.MAX_DISPLAY_NAME_LENGTH,
      `名前は${domainConsts.MAX_DISPLAY_NAME_LENGTH}文字以下で入力してください。`
    ),
  biography: z
    .string()
    .max(
      domainConsts.MAX_BIOGRAPHY_LENGTH,
      `自己紹介は${domainConsts.MAX_BIOGRAPHY_LENGTH}文字以下で入力してください。`
    ),
  wipIconUrl: z.string(),
  wipBgImageUrl: z.string(),
});

type FormValues = z.infer<typeof schema>;

const ProfileSettingsPage = () => {
  const router = useRouter();
  const toast = useToast();
  const authContext = useAuthContext();
  const { data, error, isLoading } = useSWR<components["schemas"]["profile"]>(
    authContext.currentUser ? "/api/settings/profile" : null
  );
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const {
    onFileChange: onIconFileChange,
    modalCropper: iconModalCropper,
    croppedImageBlob: croppedIconBlob,
    croppedImageUrl: croppedIconUrl,
  } = useImageCrop(domainConsts.ICON_IMAGE_WIDTH, domainConsts.ICON_IMAGE_HEIGHT);
  const {
    onFileChange: onBgImageFileChange,
    modalCropper: bgImageModalCropper,
    croppedImageBlob: croppedBgImageBlob,
    croppedImageUrl: croppedBgImageUrl,
  } = useImageCrop(domainConsts.BG_IMAGE_WIDTH, domainConsts.BG_IMAGE_HEIGHT);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    setIsUploading(true);
    let err1, err2, err3;
    const res = await client.PUT("/api/settings/profile", {
      body: { displayName: form.displayName, biography: form.biography },
    });
    err1 = !res.response.ok;

    if (croppedIconBlob) {
      const res = await postUserIconUrl(croppedIconBlob);
      err2 = !res.ok;
    }
    if (croppedBgImageBlob) {
      const res = await postUserBgImageUrl(croppedBgImageBlob);
      err3 = !res.ok;
    }

    setIsUploading(false);
    if (err1 || err2 || err3) {
      toast({
        title: "エラーが発生しました。",
        description: "入力内容に誤りがあるか、サーバーに問題が発生した可能性があります。",
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "保存しました !",
        status: "success",
        isClosable: true,
      });
      router.push(path.join("/users", data?.userName ? data.userName : ""));
    }
  };

  return (
    <>
      <BackButtonHeader title="プロフィールの設定" />
      <Box as="form" padding={0}>
        <Box w="100%" aspectRatio={3} backgroundColor="gray.200" overflow="hidden">
          <Skeleton isLoaded={authContext.currentUser != undefined && !isLoading}>
            <label>
              {croppedBgImageUrl ? (
                <Image src={croppedBgImageUrl} w="100%" alt="" aspectRatio={3} />
              ) : !data || !data.userName || error || isLoading ? (
                <Box w="100%" aspectRatio={3} />
              ) : (
                <Image src={userBgImageUrl(data.userName)} w="100%" aspectRatio={3} alt="" />
              )}
              <Input type="file" accept="image/*" display="none" onChange={onBgImageFileChange} />
              {bgImageModalCropper}
            </label>
            <Input value={croppedBgImageUrl} display="none" {...register("wipBgImageUrl")} />
          </Skeleton>
        </Box>
        <Box position="relative" marginBottom="44px">
          <Box
            w="88px"
            h="88px"
            position="absolute"
            top="-38px"
            left="10px"
            border="4px"
            borderColor={useColorModeValue("white", "gray.800")}
            borderRadius="44px"
            backgroundColor="gray.200"
            overflow="hidden">
            <Skeleton isLoaded={authContext.currentUser != undefined && !isLoading}>
              <label>
                {croppedIconUrl ? (
                  <Image src={croppedIconUrl} w="80px" h="80px" alt="" />
                ) : !data || !data.userName || error || isLoading ? (
                  <Box w="80px" h="80px" />
                ) : (
                  // TODO: 謎の枠線ができてしまうので onerror="this.src=(代替のURL)" などで対処する
                  // TODO: 以下を nocache にする (プロフィールを変更しても以前の画像が表示されてしまうため)
                  <Image src={userIconUrl(data.userName)} w="80px" h="80px" alt="" />
                )}
                <Input type="file" accept="image/*" display="none" onChange={onIconFileChange} />
                {iconModalCropper}
              </label>
              <Input value={croppedIconUrl} display="none" {...register("wipIconUrl")} />
            </Skeleton>
          </Box>
        </Box>
        <Flex direction="column" gap={3} paddingX={6} paddingY={3}>
          <ControlledInput
            label="名前"
            errors={errors}
            isRequired
            isLoaded={authContext.currentUser != undefined && !isLoading}
            {...register("displayName")}
            defaultValue={data && data.displayName ? data.displayName : undefined}
          />
          <ControlledTextarea
            label="自己紹介"
            errors={errors}
            isLoaded={authContext.currentUser != undefined && !isLoading}
            {...register("biography")}
            defaultValue={data && data.biography ? data.biography : undefined}
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            isLoading={isUploading}
            marginY={3}
            color="white"
            backgroundColor="primary.300">
            保存
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default ProfileSettingsPage;
