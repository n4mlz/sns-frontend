"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Center, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import BackButtonHeader from "@/components/ui/backButtonHeader";
import User from "@/components/ui/user";
import { ControlledUserNameInput } from "@/components/elements/ControlledUserNameInput";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import { sleep } from "@/utils/time";

const SearchPage = () => {
  const {
    register,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const [isCheckStarted, setIsCheckStarted] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [user, setUser] = useState<components["schemas"]["user"] | undefined>(undefined);
  let lastLoad = new Date();

  useEffect(() => {
    (async () => {
      setIsCheckStarted(true);
      const currentValue = getValues("userName");
      await sleep(750);
      if (currentValue !== getValues("userName")) return;
      const now = new Date();
      setIsChecking(true);
      const user = await client.GET("/api/users/{userName}", { params: { path: { userName: getValues("userName") } } });
      if (lastLoad < now) {
        setIsCheckStarted(false);
        setIsChecking(false);
        setUser(user.response.ok ? user.data : undefined);
        lastLoad = now;
      }
    })();
  }, [watch("userName")]);

  return (
    <>
      <BackButtonHeader title="ユーザーを検索" />
      <Box as="form" paddingX={6} paddingY={3}>
        <ControlledUserNameInput
          label="検索するユーザー名"
          errors={errors}
          isRequired
          disableRightElement
          isLoaded={true}
          {...register("userName")}
        />
      </Box>
      {isChecking ? (
        <Center>
          <Spinner thickness="2px" color="gray.300" margin="40px" />
        </Center>
      ) : user ? (
        <Box marginY={4} borderTop="1px" borderColor={useColorModeValue("gray.200", "gray.700")}>
          <User user={user} />
        </Box>
      ) : getValues("userName") && !isCheckStarted ? (
        <Center paddingY={10}>
          <Text fontWeight="500" color="gray.400">
            ユーザーが存在しません
          </Text>
        </Center>
      ) : null}
    </>
  );
};

export default SearchPage;
