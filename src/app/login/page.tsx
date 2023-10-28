

"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import Link from "next/link";

const Login = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Button color="inherit" onClick={() => signOut()}>SIGN OUT</Button>
      </>
    );
  }
  return (
    <>
      <Link href='/auth/signout'>
        <Button color="inherit" >SIGN IN</Button>
      </Link>
    </>
  );
};

export default Login;
