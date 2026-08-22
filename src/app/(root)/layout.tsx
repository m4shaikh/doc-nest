import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";
import { getCurrentUser } from "@/lib/actions/user.actions";

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Doc-Nest",
    description: "Your secure file manager",
};

export default async function RootLayout({children}: {children: React.ReactNode;}) {

    const user = await getCurrentUser()
    console.log(user)
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
                            <Sidebar userName={user.fullName} email={user.email}/>
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