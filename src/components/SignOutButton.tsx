"use client";

import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <Button color="inherit" onClick={() => signOut()}>
      SIGN OUT
    </Button>
  );
};

export default SignOutButton;
