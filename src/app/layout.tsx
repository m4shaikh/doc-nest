import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'Doc-Nest',
  description: 'Your secure file manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body >
        {/* Everything here will show on EVERY page (e.g., a top navigation bar) */}
        
        {/* This is where your page.tsx content gets injected */}
        <main className='min-h-screen w-full'>{children}</main>
        
      </body>
    </html>
  );
}