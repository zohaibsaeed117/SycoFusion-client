import { Inter, Lato, Poppins } from "next/font/google";
import "@/css/globals.css";
import Navbar from "@/components/Navbar";
import NextTopLoader from 'nextjs-toploader';
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"]
});

export const metadata = {
  title: "Home - SycoFusion",
  description: "Welcome to SycoFusion"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <NextTopLoader
          showSpinner={false}

        />
        {/* <NextTopLoader
  color="#2299DD"
  initialPosition={0.08}
  crawlSpeed={200}
  height={3}
  crawl={true}
  showSpinner={true}
  easing="ease"
  speed={200}
  shadow="0 0 10px #2299DD,0 0 5px #2299DD"
/> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
