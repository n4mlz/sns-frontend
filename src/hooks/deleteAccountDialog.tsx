"use client";

import { useToast } from "@chakra-ui/react";
import client from "@/lib/openapi";
import useSimpleDialog from "@hooks/SimpleDialog";

const useDeleteAccountDialog = (deleteAccountCallBack?: () => void) => {
  const toast = useToast();

  const onClose = async () => {
    const res = await client.DELETE("/api/settings/account");
    if (res.response.ok) {
      deleteAccountCallBack?.();
      toast({
        title: "アカウントを削除しました",
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "アカウントの削除に失敗しました",
        description: "サーバーに問題が発生した可能性があります。",
        status: "error",
        isClosable: true,
      });
    }
  };

  const { disclosure, dialog: deleteAccountDialog } = useSimpleDialog(
    onClose,
    {
      header: "アカウントの削除",
      body: "本当にアカウントを削除しますか？",
      button: "削除",
      close: "キャンセル",
    },
    "red.500"
  );

  return { ...disclosure, deleteAccountDialog };
};

export default useDeleteAccountDialog;
