"use client";

import { useToast } from "@chakra-ui/react";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import useSimpleDialog from "@hooks/SimpleDialog";

const useDeleteCommentDialog = (
  commentId: string,
  deleteCommentCallBack?: (comment: components["schemas"]["comment"] | null) => void
) => {
  const toast = useToast();

  const onClose = async () => {
    const res = await client.DELETE("/api/posts/comments/{commentId}", { params: { path: { commentId } } });
    if (res.response.ok) {
      deleteCommentCallBack?.(null);
      toast({
        title: "コメントを削除しました",
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "コメントの削除に失敗しました",
        description: "サーバーに問題が発生した可能性があります。",
        status: "error",
        isClosable: true,
      });
    }
  };

  const { disclosure, dialog: deleteCommentDialog } = useSimpleDialog(
    onClose,
    {
      header: "コメントの削除",
      body: "コメントを削除しますか？",
      button: "削除",
      close: "キャンセル",
    },
    "red.500"
  );

  return { ...disclosure, deleteCommentDialog };
};

export default useDeleteCommentDialog;
