"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Flex, Box, Button, Input, Image, Skeleton } from "@chakra-ui/react";
import { ControlledInput } from "@/components/elements/ControlledInput";
import useImageCrop from "@/hooks/imageCrop/useImageCrop";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import { postUserIconUrl, postUserBgImageUrl, userIconUrl, userBgImageUrl } from "@/lib/image";
import client from "@/lib/openapi";
import domainConsts from "@/constants/domain";

const schema = z.object({
  userName: z
    .string()
    .min(
      domainConsts.MIN_USERNAME_LENGTH,
      `ユーザー名は${domainConsts.MIN_USERNAME_LENGTH}文字以上で入力してください。`
    )
    .max(
      domainConsts.MAX_USERNAME_LENGTH,
      `ユーザー名は${domainConsts.MAX_USERNAME_LENGTH}文字以下で入力してください。`
    )
    .regex(/^[a-zA-Z0-9_]+$/, "ユーザー名は半角英数字とアンダースコア(_)のみ使用できます。"),
  displayName: z
    .string()
    .min(
      domainConsts.MIN_DISPLAY_NAME_LENGTH,
      `表示名は${domainConsts.MIN_DISPLAY_NAME_LENGTH}文字以上で入力してください。`
    )
    .max(
      domainConsts.MAX_DISPLAY_NAME_LENGTH,
      `表示名は${domainConsts.MAX_DISPLAY_NAME_LENGTH}文字以下で入力してください。`
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

const SettingsPage = () => {
  const authContext = useAuthContext();
  const { data, error, isLoading } = useSWR(authContext.currentUser ? "/api/settings/profile" : null);

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

  const onSubmit: SubmitHandler<FormValues> = (form) => {
    client.PUT("/api/settings/profile", {
      body: { userName: form.userName, displayName: form.displayName, biography: form.biography },
    });

    if (croppedIconBlob) {
      postUserIconUrl(croppedIconBlob);
    }
    if (croppedBgImageBlob) {
      postUserBgImageUrl(croppedBgImageBlob);
    }
  };

  return (
    <div>
      <Container as="form" padding={0}>
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
        <Flex direction="column" gap={3} paddingX={6} paddingY={3}>
          <Box w={90} h={90} borderRadius={45} backgroundColor="gray.200" overflow="hidden">
            <Skeleton isLoaded={authContext.currentUser != undefined && !isLoading}>
              <label>
                {croppedIconUrl ? (
                  <Image src={croppedIconUrl} w={90} h={90} alt="" />
                ) : !data || !data.userName || error || isLoading ? (
                  <Box w={90} h={90} />
                ) : (
                  // TODO: 謎の枠線ができてしまうので onerror="this.src=(代替のURL)" などで対処する
                  // TODO: 以下を nocache にする (プロフィールを変更しても以前の画像が表示されてしまうため)
                  <Image src={userIconUrl(data.userName)} w={90} h={90} alt="" />
                )}
                <Input type="file" accept="image/*" display="none" onChange={onIconFileChange} />
                {iconModalCropper}
              </label>
              <Input value={croppedIconUrl} display="none" {...register("wipIconUrl")} />
            </Skeleton>
          </Box>
          <ControlledInput
            label="ユーザー名"
            errors={errors}
            isRequired
            isLoaded={authContext.currentUser != undefined && !isLoading}
            isUserName
            {...register("userName")}
            defaultValue={data && data.userName ? data.userName : null}
          />
          <ControlledInput
            label="表示名"
            errors={errors}
            isRequired
            isLoaded={authContext.currentUser != undefined && !isLoading}
            {...register("displayName")}
            defaultValue={data && data.displayName ? data.displayName : null}
          />
          <ControlledInput
            label="自己紹介"
            errors={errors}
            isRequired
            isLoaded={authContext.currentUser != undefined && !isLoading}
            {...register("biography")}
            defaultValue={data && data.biography ? data.biography : null}
          />
          <Button onClick={handleSubmit(onSubmit)} marginY={3} color="white" backgroundColor="blue.400">
            保存
          </Button>
        </Flex>
      </Container>
    </div>
  );
};

export default SettingsPage;
