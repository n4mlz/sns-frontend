import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { Container } from "@chakra-ui/react";
import { AuthProvider } from "@/components/contexts/AuthProvider";
import SWRConfigProvider from "@/components/contexts/SWRConfigProvider";
import ChakraConfigProvider from "@/components/contexts/ChakraConfigProvider";
import "normalize.css";
import "@styles/global.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notojp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-notojp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SNS",
  description: "鍵垢しか存在しないクローズドなSNS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notojp.variable}`}>
        <AuthProvider>
          <SWRConfigProvider>
            <ChakraConfigProvider>
              <Container position="relative" maxW="600px" minH="100vh" padding={0}>
                {children}
              </Container>
            </ChakraConfigProvider>
          </SWRConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
