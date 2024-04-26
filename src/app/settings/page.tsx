"use client";

import { useForm, SubmitHandler, Form } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Flex, Input, Button, Image } from "@chakra-ui/react";
import useImageCrop from "@/hooks/imageCrop/useImageCrop";
import { ControlledInput } from "@/components/elements/ControlledInput";

const schema = z.object({
  userName: z
    .string()
    .min(4, "ユーザー名は4文字以上で入力してください。")
    .max(16, "ユーザー名は16文字以下で入力してください。")
    .regex(/^[a-zA-Z0-9_]+$/, "ユーザー名は半角英数字とアンダースコア(_)のみ使用できます。"),
  displayName: z
    .string()
    .min(1, "表示名は1文字以上で入力してください。")
    .max(32, "表示名は32文字以下で入力してください。"),
  bio: z.string().max(256, "自己紹介は256文字以下で入力してください。"),
});

type FormValues = z.infer<typeof schema>;

const SettingsPage = () => {
  const { onFileChange, modalCropper, croppedImage } = useImageCrop(128, 128);

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
      <Container as="form">
        <Flex direction="column" gap={3}>
          <ControlledInput label="ユーザー名" errors={errors} isRequired {...register("userName")} />
          <ControlledInput label="表示名" errors={errors} isRequired {...register("displayName")} />
          <ControlledInput label="自己紹介" errors={errors} isRequired {...register("bio")} />
          <Button onClick={handleSubmit(onSubmit)} marginY={3} color="white" backgroundColor="blue.400">
            保存
          </Button>
        </Flex>
      </Container>
    </div>
  );
};

export default SettingsPage;
