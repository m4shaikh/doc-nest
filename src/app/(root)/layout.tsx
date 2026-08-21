import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Doc-Nest",
    description: "Your secure file manager",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={cn("font-sans", geist.variable)}>
            <body>
                <main className="h-screen w-full overflow-hidden">
                    {/* Navbar */}
                    <div className="h-[60px] shrink-0">
                        <Navbar />
                    </div>

                    {/* Everything below navbar */}
                    <div className="flex h-[calc(100vh-60px)] w-full">
                        {/* Sidebar */}
                        <div className="h-full shrink-0">
                            <Sidebar />
                        </div>

                        {/* Page content */}
                        <div className="min-w-0 flex-1 overflow-auto">
                            {children}
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}