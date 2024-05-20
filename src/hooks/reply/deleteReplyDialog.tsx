"use client";

import { useToast } from "@chakra-ui/react";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import useSimpleDialog from "@hooks/SimpleDialog";

const useDeleteReplyDialog = (
  replyId: string,
  deleteReplyCallBack?: (reply: components["schemas"]["reply"] | null) => void
) => {
  const toast = useToast();

  const onClose = async () => {
    const res = await client.DELETE("/api/posts/replies/{replyId}", { params: { path: { replyId } } });
    if (res.response.ok) {
      deleteReplyCallBack?.(null);
      toast({
        title: "返信を削除しました",
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "返信の削除に失敗しました",
        description: "サーバーに問題が発生した可能性があります。",
        status: "error",
        isClosable: true,
      });
    }
  };

  const { disclosure, dialog: deleteReplyDialog } = useSimpleDialog(
    onClose,
    {
      header: "返信の削除",
      body: "返信を削除しますか？",
      button: "削除",
      cancel: "キャンセル",
    },
    "red.500"
  );

  return { ...disclosure, deleteReplyDialog };
};

export default useDeleteReplyDialog;
