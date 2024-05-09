import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { Container } from "@chakra-ui/react";
import { AuthProvider } from "@/components/contexts/AuthProvider";
import SWRConfigProvider from "@/components/contexts/SWRConfigProvider";
import ChakraConfigProvider from "@/components/contexts/ChakraConfigProvider";
import { metaDataConsts } from "@/constants/metadata";
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
  metadataBase: new URL(metaDataConsts.SITE_URL),
  title: { default: metaDataConsts.SITE_NAME, template: `%s | ${metaDataConsts.SITE_NAME}` },
  description: metaDataConsts.SITE_DESCRIPTION,
  icons: [{ rel: "icon", url: "/images/favicon.ico", type: "image/x-icon" }],
  openGraph: {
    title: metaDataConsts.SITE_NAME,
    description: metaDataConsts.SITE_DESCRIPTION,
    type: "website",
    locale: "ja_JP",
    url: metaDataConsts.SITE_URL,
    siteName: metaDataConsts.SITE_NAME,
    // TODO: OGP を追加する
    // images: [
    //   {
    //     url: "/images/ogp.png",
    //     width: 1200,
    //     height: 630,
    //     alt: metaDataConsts.SITE_NAME,
    //   },
    // ],
  },
  // TODO: OGP を追加する
  // twitter: {
  //   title: metaDataConsts.SITE_NAME,
  //   description: metaDataConsts.SITE_DESCRIPTION,
  //   card: "summary_large_image",
  //   images: [
  //     {
  //       url: `${metaDataConsts.SITE_URL}/images/ogp.png`,
  //       width: 1200,
  //       height: 630,
  //       alt: metaDataConsts.SITE_NAME,
  //     },
  //   ],
  // },
  alternates: {
    canonical: metaDataConsts.SITE_URL,
  },
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
