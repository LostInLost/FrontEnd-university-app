import { CircularProgress } from "@nextui-org/react";
import React from "react";

export default function LoadingComponents({ label }: { label: string }) {
  return (
    <div className="flex justify-center">
      <CircularProgress label={label} />
    </div>
  );
}
