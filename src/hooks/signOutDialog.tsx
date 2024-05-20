"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/firebase";
import useSimpleDialog from "@hooks/SimpleDialog";

const useSignOutDialog = () => {
  const router = useRouter();

  const { disclosure, dialog: signOutDialog } = useSimpleDialog(
    () => signOut(() => router.push("/")),
    {
      header: "ログアウトの確認",
      body: "ログアウトしますか？",
      button: "ログアウト",
      cancel: "キャンセル",
    },
    "red.500"
  );

  return { ...disclosure, signOutDialog };
};

export default useSignOutDialog;
