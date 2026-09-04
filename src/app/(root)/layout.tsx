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
                <div className=" flex-1 overflow-auto bg-popover rounded-2xl ml-4 mr-4 mb-4">
                    {children}
                </div>

            </div>
        </div>
    );
}