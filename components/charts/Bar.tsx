"use client";
import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
interface Donut {
  data: {
    labels: any[];
    data: any[];
  };
}
export default function Bar({ data }: Donut) {
  const opset: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {},
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: data.labels,
      labels: {
        style: {
          //   colors: colors,
          fontSize: "12px",
        },
      },
    },
  };

  return (
    <div className="text-white">
      <ReactApexChart
        options={opset}
        series={[
          {
            name: "Total",
            data: data?.data ?? [],
          },
        ]}
        type="bar"
        width={400}
        height={400}
      />
    </div>
  );
}
