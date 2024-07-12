"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Box, Button, useToast, Input, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import TitleHeader from "@/components/ui/titleHeader";
import { ControlledUserNameInput } from "@/components/elements/ControlledUserNameInput";
import SetUpDialog from "@/components/handle/setUpDialog";
import useDeleteAccountDialog from "@/hooks/deleteAccountDialog";
import { components } from "@/lib/openapi/schema";
import domainConsts from "@/constants/domain";
import { sleep } from "@/utils/time";
import { signOut } from "@/lib/firebase";

const schema = z.object({
  userName: z
    .string()
    .min(domainConsts.MIN_USERNAME_LENGTH, `${domainConsts.MIN_USERNAME_LENGTH}文字以上で入力してください。`)
    .max(domainConsts.MAX_USERNAME_LENGTH, `${domainConsts.MAX_USERNAME_LENGTH}文字以下で入力してください。`),
  dummy: z.string().readonly(),
});

type FormValues = z.infer<typeof schema>;

const AccountDeletePage = () => {
  const router = useRouter();
  const authContext = useAuthContext();
  const { data, isLoading } = useSWR<components["schemas"]["profile"]>(
    authContext.currentUser ? "/api/settings/profile" : null
  );
  const { onOpen, deleteAccountDialog } = useDeleteAccountDialog(() => {
    signOut();
    router.push("/");
  });

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = () => {
    onOpen();
  };

  const [isCheckedUserName, setIsCheckedUserName] = useState<boolean>(false);
  const [isCheckingUserName, setIsCheckingUserName] = useState<boolean>(false);
  let lastLoad = new Date();

  const isCorrectUserName = async (userName: string) => {
    if (!userName || !data) return false;
    return userName === data.userName;
  };

  useEffect(() => {
    (async () => {
      const currentValue = getValues("userName");
      await sleep(750);
      if (currentValue !== getValues("userName")) return;
      const now = new Date();
      setIsCheckingUserName(true);
      const isOk = await isCorrectUserName(getValues("userName"));
      if (lastLoad < now) {
        setIsCheckedUserName(isOk);
        setIsCheckingUserName(false);
        lastLoad = now;
      }
    })();
  }, [watch("userName"), isLoading]);

  return (
    <>
      <SetUpDialog />
      <TitleHeader title="アカウントの削除" />
      {deleteAccountDialog}
      <Flex direction="column" gap={3} paddingX={6} paddingY={3}>
        <Text fontSize="lg" color="red.500">
          アカウントを削除します。
        </Text>
        <Text>
          アカウントを削除すると、アカウントに紐づくすべてのデータが削除されます。削除したデータは復元できませんので、ご注意ください。
        </Text>
        <Text>アカウントを削除すると、以下のデータが削除されます。</Text>
        <UnorderedList>
          <ListItem>ユーザー情報</ListItem>
          <ListItem>全てのポスト、コメント、返信、いいね</ListItem>
          <ListItem>全てのフォロー関係</ListItem>
        </UnorderedList>
      </Flex>
      <Box as="form" padding={0}>
        <Flex direction="column" gap={3} paddingX={6} paddingY={3}>
          <Text>アカウントを削除される場合は、確認のため、以下に現在のユーザー名を入力してください。</Text>
          <ControlledUserNameInput
            label="現在のユーザー名"
            errors={errors}
            isRequired
            placeholder="現在のユーザー名を入力してください (確認用)"
            isLoaded={authContext.currentUser != undefined && !isLoading}
            isCheckingUserName={isCheckingUserName}
            isCheckedUserName={isCheckedUserName}
            {...register("userName")}
            checkingTooltipLabel="ユーザー名を確認中..."
            checkedTooltipLabel="ユーザー名が一致しました。"
            notCheckedTooltipLabel="ユーザー名が一致しません。"
          />
          <Input display="none" readOnly value={undefined} {...register("dummy")} />
          <Button
            onClick={handleSubmit(onSubmit)}
            marginY={3}
            color="white"
            backgroundColor="red.500"
            isActive={!isCheckingUserName && !isCheckedUserName}>
            アカウントを削除
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default AccountDeletePage;
