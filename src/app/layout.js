import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/NavBar"; 
import { AuthProvider } from "@/context/AuthContext";
import "@/app/globals.css"; // Path using the @ alias

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextFullStack | Learning Project",
  description: "A complete Full-Stack learning project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
