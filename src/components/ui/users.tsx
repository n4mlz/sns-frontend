import { Flex } from "@chakra-ui/react";
import { components } from "@/lib/openapi/schema";
import User from "@components/ui/user";

type UsersProps = {
  users: components["schemas"]["user"][];
  usersCallback?: (users: components["schemas"]["user"][]) => void;
};

const Users = ({ users, usersCallback }: UsersProps) => {
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
        <User user={user} userCallback={userCallback(index)} />
      ))}
    </Flex>
  );
};

export default Users;
