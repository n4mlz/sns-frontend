"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Center, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import TitleHeader from "@/components/ui/titleHeader";
import User from "@/components/ui/user";
import { ControlledUserNameInput } from "@/components/elements/ControlledUserNameInput";
import { components } from "@/lib/openapi/schema";
import { sleep } from "@/utils/time";
import useSWR from "swr";
import path from "path";

const SearchPage = () => {
  const {
    register,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const [isCheckStarted, setIsCheckStarted] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");

  const { data, isLoading, mutate } = useSWR<components["schemas"]["user"]>(
    userName ? path.join("/api/users", userName) : null
  );

  let lastLoad = new Date();

  useEffect(() => {
    (async () => {
      setIsCheckStarted(true);
      const currentValue = getValues("userName");
      await sleep(750);

      if (currentValue !== getValues("userName")) return;

      const now = new Date();
      setUserName(currentValue);
      await mutate(undefined, true);

      if (lastLoad < now) {
        setIsCheckStarted(false);
        lastLoad = now;
      }
    })();
  }, [watch("userName")]);

  return (
    <>
      <TitleHeader title="ユーザーを検索" />
      <Box paddingX={6} paddingY={3}>
        <ControlledUserNameInput
          label="検索するユーザー名"
          errors={errors}
          isRequired
          disableRightElement
          isLoaded={true}
          {...register("userName")}
        />
      </Box>
      {isLoading && isCheckStarted ? (
        <Center>
          <Spinner thickness="2px" color="gray.300" margin="40px" />
        </Center>
      ) : data && data.userName ? (
        <Box marginY={4} borderTop="1px" borderColor={useColorModeValue("gray.200", "gray.700")}>
          <User user={data} userCallback={(user) => mutate(user, false)} />
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
