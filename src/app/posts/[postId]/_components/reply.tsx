import path from "path";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Linkify from "linkify-react";
import { components } from "@/lib/openapi/schema";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import UserIcon from "@/components/ui/userIcon";
import useDeleteReplyDialog from "@/hooks/reply/deleteReplyDialog";
import { getAboutDate } from "@/utils/time";

type Props = {
  reply: components["schemas"]["reply"];
  replyCallback?: (reply: components["schemas"]["reply"] | null) => void;
};

const Reply = ({ reply, replyCallback }: Props) => {
  const router = useRouter();
  const authContext = useAuthContext();

  const { data } = useSWR<components["schemas"]["profile"]>(authContext.currentUser ? "/api/settings/profile" : null);

  const { onOpen, deleteReplyDialog } = useDeleteReplyDialog(reply.replyId!, replyCallback);

  return (
    <Flex direction="row" gap="8px">
      <UserIcon user={reply.replier!} size="45px" />
      <Flex direction="column" gap="4px" flex="1">
        <Flex direction="column">
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Flex
              cursor="pointer"
              direction="row"
              gap="4px"
              onClick={() => router.push(path.join("/users", reply?.replier?.userName ? reply.replier.userName : ""))}>
              <Text fontWeight={700}>{reply?.replier?.displayName}</Text>
              <Text color="gray.500">{`@${reply?.replier?.userName}`}</Text>
              <Text color="gray.500">{`· ${getAboutDate(reply?.createdAt!)}`}</Text>
            </Flex>
            {reply.replier?.userName === data?.userName && (
              <Menu>
                <MenuButton>
                  <ChevronDownIcon fontSize="20px" color="gray.500" />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={onOpen}>返信を削除</MenuItem>
                  {deleteReplyDialog}
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Text overflowWrap="anywhere" wordBreak="normal" whiteSpace="break-spaces">
            <Linkify>{reply?.content}</Linkify>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Reply;
