import React from "react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInButton from "../SignInButton";
import SignOutButton from "../SignOutButton";

import { getServerSession } from "next-auth";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return <SignOutButton />;
  }
  return <SignInButton />;
};

export default Login;
