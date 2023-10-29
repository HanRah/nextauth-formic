import React from "react";

import { authOptions } from "../api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div>
      Dashboard
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
