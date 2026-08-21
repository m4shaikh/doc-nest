import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Sidebar from '@/app/components/Sidebar';
import Navbar from '@/app/components/Navbar';
const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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

                <main className='min-h-screen w-full flex '>
                    <div className=' w-[20%]' >
                        <Sidebar />
                    </div>
                    <div className=' w-full'>
                        <div className='h-[60px]'>
                            <Navbar />
                        </div>
                        <div className='flex'>
                            {children}
                        </div>
                    </div>
                </main>

            </body>
        </html>
    );
}