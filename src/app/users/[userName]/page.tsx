import UserPageClient from "./page-client";

const UserPage = async ({ params }: { params: Promise<{ userName: string }> }) => {
  return <UserPageClient params={await params} />;
};

export default UserPage;
