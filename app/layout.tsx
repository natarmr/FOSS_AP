import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fossunited.org/c/srm-university-ap";
const SITE_NAME = "FOSS SRMAP";
const DESCRIPTION =
  "FOSS SRMAP — the free and open source community at SRM University AP. Coming soon. Brain-rot, stickers, and open source chaos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FOSS SRMAP — Coming Soon",
    template: "%s · FOSS SRMAP",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "FOSS SRMAP",
    "FOSS",
    "SRM AP",
    "SRM University AP",
    "open source",
    "FOSS United",
    "linux",
    "hackathon",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "FOSS SRMAP — Coming Soon",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FOSS SRMAP — Coming Soon",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Pre-hydration scrubber: remove bis_skin_checked / bis_register / __processed* injected by extensions before React hydrates */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var a=['bis_skin_checked','bis_register'];function s(){try{document.querySelectorAll('[bis_skin_checked]').forEach(function(e){e.removeAttribute('bis_skin_checked')});document.querySelectorAll('[bis_register]').forEach(function(e){e.removeAttribute('bis_register')});document.querySelectorAll('*').forEach(function(e){Array.from(e.attributes).forEach(function(x){if(x.name.indexOf('__processed')===0)e.removeAttribute(x.name)})})}catch(e){}}s();var o=new MutationObserver(s);try{o.observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:a})}catch(e){}setTimeout(s,0);setTimeout(s,50);setTimeout(s,300)}catch(e){}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
