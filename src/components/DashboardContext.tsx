//

import React, { useEffect } from "react";
import { redirect } from 'next/navigation'
import { useSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const DashboardContext = async () => {
    const data = await getServerSession(authOptions);

    // useEffect(() => {
    //     if (!session) {
    //         redirect('/api/auth/signin')
    //     }
    // }, [session])

    if (!data?.user) {
        redirect('/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fsignin')
    }

    return (
        <>
            {data &&
                <>
                    Signed in as {data?.user?.email} <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            }
        </>
    );

};

export default DashboardContext;

