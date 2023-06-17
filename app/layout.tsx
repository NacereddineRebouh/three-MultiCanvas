import "@/styles/globals.css";
import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "ThreeJs Configurator",
  description: "ThreeJs + Nextjs Configurator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={exo2.className}>{children}</body>
    </html>
  );
}
