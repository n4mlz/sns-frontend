import AuthRedirect from "@/components/handle/authRedirect";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthRedirect />
      {children}
    </>
  );
}
