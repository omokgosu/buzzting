import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Buzzting - 버즈빌 사내소개팅",
  description: "버즈빌 동료들이 소개해주는 친구 소개팅 플랫폼",
  keywords: ["버즈빌", "소개팅", "사내소개팅", "buzzting", "buzzvil"],
  authors: [{ name: "Buzzvil" }],
  openGraph: {
    title: "Buzzting - 버즈빌 사내소개팅",
    description: "버즈빌 동료들이 소개해주는 친구 소개팅 플랫폼",
    type: "website",
    locale: "ko_KR",
    siteName: "Buzzting",
  },
  twitter: {
    card: "summary",
    title: "Buzzting - 버즈빌 사내소개팅",
    description: "버즈빌 동료들이 소개해주는 친구 소개팅 플랫폼",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#C4956A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} antialiased`}>
        <Providers>
          <div className="mobile-container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
