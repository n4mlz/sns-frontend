import UserMutualsPageClient from "./page-client";

const UserMutualsPage = async ({ params }: { params: Promise<{ userName: string }> }) => {
  return <UserMutualsPageClient params={await params} />;
};

export default UserMutualsPage;
