'use client'
import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
interface Donut {
  data: {
    labels: any[];
    data: any[];
  };
}
export default function NormalPie({ data }: Donut) {
  const opset: ApexCharts.ApexOptions = {
    chart: {
      type: "pie",
    },
    labels: data.labels,
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
      type="pie"
      width={400}
      height={400}
    />
  );
}
