import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Profile Settings - SycoFusion",
  description: "Welcome to SycoFusion",
};

export default function RootLayout({ children }) {
  return (
    <>
    {children}
    </>
  );
}
