"use client";

import path from "path";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Box, Button, useToast, Input } from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import TitleHeader from "@/components/ui/titleHeader";
import { ControlledUserNameInput } from "@/components/elements/ControlledUserNameInput";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import domainConsts from "@/constants/domain";
import { sleep } from "@/utils/time";

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
    .regex(domainConsts.USERNAME_REGEX, "ユーザー名は半角英数字とアンダースコアのみ使用できます。"),
  dummy: z.string().readonly(),
});

type FormValues = z.infer<typeof schema>;

const userNameSettingsPage = () => {
  const router = useRouter();
  const toast = useToast();
  const authContext = useAuthContext();
  const { data, isLoading } = useSWR<components["schemas"]["profile"]>(
    authContext.currentUser ? "/api/settings/profile" : null
  );

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    setIsUploading(true);
    const res = await client.PUT("/api/settings/profile/userName", {
      body: { userName: form.userName },
    });
    setIsUploading(false);
    if (res.response.ok) {
      toast({
        title: "保存しました !",
        status: "success",
        isClosable: true,
      });
      router.push(path.join("/users", form.userName));
    } else {
      toast({
        title: "エラーが発生しました。",
        description: "入力内容に誤りがあるか、サーバーに問題が発生した可能性があります。",
        status: "error",
        isClosable: true,
      });
    }
  };

  const [isCheckedUserName, setIsCheckedUserName] = useState<boolean>(false);
  const [isCheckingUserName, setIsCheckingUserName] = useState<boolean>(false);
  let lastLoad = new Date();

  const availableUserName = async (userName: string) => {
    if (!userName) return false;
    if (!userName.match(domainConsts.USERNAME_REGEX)) return false;
    if (data && userName === data.userName) return true;
    const res = await client.GET("/api/users/{userName}", { params: { path: { userName } } });
    return !res.response.ok;
  };

  useEffect(() => {
    (async () => {
      const currentValue = getValues("userName");
      await sleep(750);
      if (currentValue !== getValues("userName")) return;
      const now = new Date();
      setIsCheckingUserName(true);
      const availability = await availableUserName(getValues("userName"));
      if (lastLoad < now) {
        setIsCheckedUserName(availability);
        setIsCheckingUserName(false);
        lastLoad = now;
      }
    })();
  }, [watch("userName"), isLoading]);

  return (
    <>
      <TitleHeader title="ユーザー名の設定" />
      <Box as="form" padding={0}>
        <Flex direction="column" gap={3} paddingX={6} paddingY={3}>
          <ControlledUserNameInput
            label="新しいユーザー名"
            errors={errors}
            isRequired
            isLoaded={authContext.currentUser != undefined && !isLoading}
            defaultValue={data && data.userName ? data.userName : undefined}
            isCheckingUserName={isCheckingUserName}
            isCheckedUserName={isCheckedUserName}
            checkingTooltipLabel="ユーザー名が使用可能か検証しています..."
            checkedTooltipLabel="このユーザー名は使用できます。"
            notCheckedTooltipLabel="このユーザー名は使用できません。"
            {...register("userName")}
          />
          <Input display="none" readOnly value={undefined} {...register("dummy")} />
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

export default userNameSettingsPage;
