import { Flex } from "@chakra-ui/react";
import { components } from "@/lib/openapi/schema";
import User from "@components/ui/user";

type Props = {
  users: components["schemas"]["user"][];
  usersCallback?: (users: components["schemas"]["user"][]) => void;
  enableReject?: boolean;
};

const Users = ({ users, usersCallback, enableReject }: Props) => {
  const userCallback = (index: number) => {
    return (user: components["schemas"]["user"]) => {
      const newUsers = [...users];
      newUsers[index] = user;
      usersCallback?.(newUsers);
    };
  };

  return (
    <Flex direction="column">
      {users.map((user, index) => (
        <User user={user} userCallback={userCallback(index)} enableReject={enableReject} />
      ))}
    </Flex>
  );
};

export default Users;
