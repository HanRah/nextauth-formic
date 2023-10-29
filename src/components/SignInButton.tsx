"use client";

import { Button } from "@mui/material";
import { signIn, signOut } from "next-auth/react";

const SignInButton = () => {
  return (
    <Button color="inherit" onClick={() => signIn()}>
      SIGN IN
    </Button>
  );
};

export default SignInButton;
