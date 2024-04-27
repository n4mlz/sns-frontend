"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Flex, Button } from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import { ControlledInput } from "@/components/elements/ControlledInput";
import client from "@/lib/openapi";
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
    .regex(domainConsts.USERNAME_REGEX, "ユーザー名は半角英数字とハイフンのみ使用できます。"),
});

type FormValues = z.infer<typeof schema>;

const userNameSettingsPage = () => {
  const authContext = useAuthContext();
  const { data, isLoading } = useSWR(authContext.currentUser ? "/api/settings/profile" : null);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (form) => {
    client.PUT("/api/settings/profile/userName", {
      body: { userName: form.userName },
    });
  };

  const [isAvailableUserName, setIsAvailableUserName] = useState<boolean>(false);
  const [isLoadingAvailable, setIsLoadingAvailable] = useState<boolean>(false);
  let lastLoad = new Date();

  const availableUserName = async (userName: string) => {
    if (!userName) return false;
    if (!userName.match(domainConsts.USERNAME_REGEX)) return false;
    if (data && userName === data.userName) return true;
    const res = await client.GET("/api/users/{userName}", { params: { path: { userName } } });
    if (res.data && res.data.userName) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    (async () => {
      const currentValue = getValues("userName");
      await sleep(750);
      if (currentValue !== getValues("userName")) return;
      const now = new Date();
      setIsLoadingAvailable(true);
      const availability = await availableUserName(getValues("userName"));
      if (lastLoad < now) {
        setIsAvailableUserName(availability);
        setIsLoadingAvailable(false);
        lastLoad = now;
      }
    })();
  }, [watch("userName")]);

  return (
    <Container as="form" padding={0}>
      <Flex direction="column" gap={3} paddingX={6} paddingY={3}>
        <ControlledInput
          label="新しいユーザー名"
          errors={errors}
          isRequired
          isUserName
          isLoaded={authContext.currentUser != undefined && !isLoading}
          isLoadingAvailable={isLoadingAvailable}
          isAvailableUserName={isAvailableUserName}
          {...register("userName")}
          defaultValue={data && data.userName ? data.userName : null}
        />
        <Button onClick={handleSubmit(onSubmit)} marginY={3} color="white" backgroundColor="blue.400">
          保存
        </Button>
      </Flex>
    </Container>
  );
};

export default userNameSettingsPage;