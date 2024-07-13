"use client";

import { useToast } from "@chakra-ui/react";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import useSimpleDialog from "@hooks/SimpleDialog";

const useDeletePostDialog = (
  postId: string,
  deletePostCallBack?: (post: components["schemas"]["post"] | null) => void
) => {
  const toast = useToast();

  const onClose = async () => {
    const res = await client.DELETE("/api/posts/{postId}", { params: { path: { postId } } });
    if (res.response.ok) {
      deletePostCallBack?.(null);
      toast({
        title: "ポストを削除しました",
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "ポストの削除に失敗しました",
        description: "サーバーに問題が発生した可能性があります。",
        status: "error",
        isClosable: true,
      });
    }
  };

  const { disclosure, dialog: deletePostDialog } = useSimpleDialog(
    onClose,
    {
      header: "ポストの削除",
      body: "ポストを削除しますか？",
      button: "削除",
      close: "キャンセル",
    },
    "red.500"
  );

  return { ...disclosure, deletePostDialog };
};

export default useDeletePostDialog;
