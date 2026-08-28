import PostLikesPageClient from "./page-client";

const PostLikesPage = async ({ params }: { params: Promise<{ postId: string }> }) => {
  return <PostLikesPageClient params={await params} />;
};

export default PostLikesPage;
