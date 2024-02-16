import { getServerSession } from "next-auth";
import React from "react";
import { AuthOptions } from "../api/auth/[...nextauth]/AuthOptions";
import Link from "next/link";
import DashboardCharts from "./dashboard-charts";

export default async function Page() {
  const session = await getServerSession(AuthOptions);
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex gap-2">
        <li className="flex ">
          <Link href={"/dashboard"}>
            <span>Home</span>
          </Link>
        </li>
      </ul>
      <h3 className="text-xl font-semibold">
        Welcome to dashboard, {session?.user.name}.{" "}
      </h3>
      <DashboardCharts session={session} />
    </div>
  );
}
