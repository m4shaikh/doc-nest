import FileUploader from "../components/FileUploader";

import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";
import MobileNav from "@/app/components/MobileNav";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();
    if (!user) return redirect('/signup')

    return (
        <div className="h-screen w-full overflow-hidden">
            <div className="flex h-full">

                <div className="h-full w-[72px] lg:w-[18%] hidden md:block " >
                    <Sidebar
                        userName={user.fullName}
                        email={user.email}
                    />
                </div>
                <div className="flex-1 h-full">
                    <div className="h-[60px] shrink-0">

                        <Navbar />
                        <MobileNav
                            userName={user.fullName}
                            email={user.email}
                        />
                        <div className=" h-[calc(100vh-60px)] w-full pr-4 pb-4">

                            {children}

                            <div className=" flex-1 rounded-2xl ml-4 mr-4 mb-4">
                                <FileUploader ownerId={user.$id} accountId={user.accountId} ownerName={user.fullName} />

                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}