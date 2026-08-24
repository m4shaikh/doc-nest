import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";
import MobileNav from "@/app/components/MobileNav";
import { getCurrentUser } from "@/lib/actions/user.actions";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();

    console.log(user);

    return (
        <div className="h-screen w-full overflow-hidden">
            {/* Navbar */}
            <div className="h-[60px] shrink-0">
                <Navbar />
                <MobileNav
                    userName={user.fullName}
                    email={user.email}
                />
            </div>

            {/* Everything below navbar */}
            <div className="flex h-[calc(100vh-60px)] w-full">
                
                {/* Sidebar */}
                <div className="h-full shrink-0 hidden md:block">
                    <Sidebar
                        userName={user.fullName}
                        email={user.email}
                    />
                </div>

                {/* Page content */}
                <div className="min-w-0 flex-1 overflow-auto">
                    {children}
                </div>

            </div>
        </div>
    );
}