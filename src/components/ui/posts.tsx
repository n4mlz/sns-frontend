import { Flex } from "@chakra-ui/react";
import { components } from "@/lib/openapi/schema";
import Post from "@components/ui/post";

type PostsProps = {
  posts: components["schemas"]["post"][];
};

const Posts = ({ posts }: PostsProps) => {
  return (
    <Flex direction="column">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </Flex>
  );
};

export default Posts;
