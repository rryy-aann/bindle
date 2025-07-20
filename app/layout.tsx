import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Bindle",
  description: "Bindle MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto w-full p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

