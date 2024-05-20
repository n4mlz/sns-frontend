import { Flex } from "@chakra-ui/react";
import { components } from "@/lib/openapi/schema";
import Post from "@components/ui/post";

type Props = {
  posts: components["schemas"]["post"][];
  postsCallback?: (posts: components["schemas"]["post"][]) => void;
};

const Posts = ({ posts, postsCallback }: Props) => {
  const postCallback = (index: number) => {
    return (post: components["schemas"]["post"] | null) => {
      const newPosts = [...posts];
      if (post) {
        newPosts[index] = post;
      } else {
        newPosts.splice(index, 1);
      }
      postsCallback?.(newPosts);
    };
  };

  return (
    <Flex direction="column">
      {posts.map((post, index) => (
        <Post post={post} postCallback={postCallback(index)} />
      ))}
    </Flex>
  );
};

export default Posts;
