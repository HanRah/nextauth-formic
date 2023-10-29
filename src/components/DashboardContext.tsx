"use client";

import React, { useEffect } from "react";
import { redirect } from 'next/navigation'
import { useSession, signOut } from "next-auth/react";

const DashboardContext = () => {
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) {
            redirect('/api/auth/signin')
        }
    }, [session])

    // if (!session) {
    //     redirect('/api/auth/signin')
    // }

    return (
        <>
            {session &&
                <>
                    Signed in as {session?.user?.email} <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            }
        </>
    );

};

export default DashboardContext;

