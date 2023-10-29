import React from "react";

import LoginForm from "@/components/LoginForm";

import { getCsrfToken } from "next-auth/react";




async function GetServerSideCsrfToken() {
    const csrfToken = await getCsrfToken()
    return csrfToken
}

export default async function SignIn() {
    const csrfToken = await GetServerSideCsrfToken()

    return (
        <LoginForm csrfToken={csrfToken} />
    );
}


