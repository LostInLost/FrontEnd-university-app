"use client";
import LoadingComponents from "@/components/Suspense/LoadingComponents";
import Bar from "@/components/charts/Bar";
import DonutPie from "@/components/charts/DonutPie";
import NormalPie from "@/components/charts/NormalPie";
import { fetcher } from "@/lib/Fetcher";
import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
} from "@nextui-org/react";
import React from "react";
import ReactApexChart from "react-apexcharts";
import useSWR from "swr";

export default function DashboardCharts({ session }: { session: any }) {
  const { data } = useSWR(["/api/admin/dashboard", session?.user], fetcher);
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader>
            <h1 className="text-lg font-bold">Student by Gender</h1>
          </CardHeader>
          <CardBody>
            {data && <DonutPie data={data.studentByGender} />}
            {!data && <LoadingComponents label="Loading Charts..." />}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h1 className="text-lg font-bold">Student by City</h1>
          </CardHeader>
          <CardBody>
            {data && <NormalPie data={data.studentByCity} />}
            {!data && <LoadingComponents label="Loading Charts..." />}
          </CardBody>
        </Card>
        <div className="col-span-2">
          <Card className="">
            <CardHeader>
              <h1 className="text-lg font-bold">Student by Year of Birth</h1>
            </CardHeader>
            <CardBody className="dark:text-white">
              <div className="flex justify-center">
                {data && <Bar data={data.studentByYear} />}
                {!data && <LoadingComponents label="Loading Charts..." />}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
