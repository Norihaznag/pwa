import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./redux/StoreProvider";
import type { Viewport } from "next";
import Nav from "./components/nav/Nav";
import Window from "./components/nav/Window";
import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";
import Navigation from "./components/nav/Navigation";

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "Metro Food";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      
      <body className=" ">
        <StoreProvider>
          <Navigation />
          <Window />
          <Cart />
          {children}
          <Footer/>
        </StoreProvider>
      </body>
    </html>
  );
}
