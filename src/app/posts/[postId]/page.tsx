import PostPageClient from "./page-client";

const PostPage = async ({ params }: { params: Promise<{ postId: string }> }) => {
  return <PostPageClient params={await params} />;
};

export default PostPage;
