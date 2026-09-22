import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Doc-Nest",
  description: "Your secure file manager",
  icons:{icon:{url:'/DN.svg',sizes:'32x32',type:'image.png'}}
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable)}
    >
      <body className="bg-background">
        {children}
      </body>
    </html>
  );
}
