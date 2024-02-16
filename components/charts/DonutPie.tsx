'use client'
import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
interface Donut {
  data: {
    labels: any[];
    data: any[];
  };
}
export default function DonutPie({ data }: Donut) {

  const opset: ApexCharts.ApexOptions = {
    labels: data.labels,
    chart: {
      id: "TesDonut",
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <ReactApexChart
      options={opset}
      series={data?.data ?? []}
      type="donut"
      width={400}
      height={400}
    />
  );
}
