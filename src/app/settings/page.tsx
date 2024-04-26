"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Flex, Box, Button, Input, Image } from "@chakra-ui/react";
import { ControlledInput } from "@/components/elements/ControlledInput";
import useImageCrop from "@/hooks/imageCrop/useImageCrop";
import { userBgImageUrl, userIconUrl } from "@/lib/image";
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
  bio: z
    .string()
    .max(
      domainConsts.MAX_BIOGRAPHY_LENGTH,
      `自己紹介は${domainConsts.MAX_BIOGRAPHY_LENGTH}文字以下で入力してください。`
    ),
  wipIconUrl: z.string().url(),
  wipBgImageUrl: z.string().url(),
});

type FormValues = z.infer<typeof schema>;

const SettingsPage = () => {
  const { data, error, isLoading } = useSWR("/api/settings/profile");

  const {
    onFileChange: onIconFileChange,
    modalCropper: iconModalCropper,
    croppedImage: croppedIcon,
  } = useImageCrop(domainConsts.ICON_IMAGE_WIDTH, domainConsts.ICON_IMAGE_HEIGHT);
  const {
    onFileChange: onBgImageFileChange,
    modalCropper: bgImageModalCropper,
    croppedImage: croppedBgImage,
  } = useImageCrop(domainConsts.BG_IMAGE_WIDTH, domainConsts.BG_IMAGE_HEIGHT);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (form) => {
    console.log(form);
    reset();
  };

  return (
    <div>
      <Container as="form" padding={0}>
        <Box w="100%" aspectRatio={3}>
          <label>
            {croppedBgImage ? (
              <Image src={croppedBgImage} alt="背景画像" w="100%" aspectRatio={3} />
            ) : !data || !data.userName || error || isLoading ? (
              <Box w="100%" aspectRatio={3} backgroundColor="gray.200" />
            ) : (
              <Image src={userBgImageUrl(data.userName)} alt="背景画像" />
            )}
            <Input type="file" accept="image/*" display="none" onChange={onBgImageFileChange} />
            {bgImageModalCropper}
          </label>
          <Input value={croppedBgImage} display="none" {...register("wipBgImageUrl")} />
        </Box>
        <Flex direction="column" gap={3} paddingX={6} paddingY={3}>
          <Box w={90} h={90}>
            <label>
              {croppedIcon ? (
                <Image src={croppedIcon} alt="アイコン" w={90} h={90} borderRadius={45} />
              ) : !data || !data.userName || error || isLoading ? (
                <Box w={90} h={90} backgroundColor="gray.200" borderRadius={45} />
              ) : (
                <Image src={userIconUrl(data.userName)} alt="アイコン" />
              )}
              <Input type="file" accept="image/*" display="none" onChange={onIconFileChange} />
              {iconModalCropper}
            </label>
            <Input value={croppedIcon} display="none" {...register("wipIconUrl")} />
          </Box>
          <ControlledInput
            label="ユーザー名"
            errors={errors}
            isRequired
            isUserName
            {...register("userName")}
            defaultValue={data && data.userName ? data.userName : null}
          />
          <ControlledInput
            label="表示名"
            errors={errors}
            isRequired
            {...register("displayName")}
            defaultValue={data && data.displayName ? data.displayName : null}
          />
          <ControlledInput
            label="自己紹介"
            errors={errors}
            isRequired
            {...register("bio")}
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
