import React from "react";
import { getReportsForAdmin } from "@/server-actions/admin";

function ReportTile({
  name,
  description,
  value,
  isCurrency,
}: {
  name: string;
  description: string;
  value: string;
  isCurrency: boolean;
}) {
  return (
    <div className={"border p-5 border-solid bg-black flex flex-col"}>
      <div>
        <h1 className="text-cl font-bold">{name}</h1>
        <span className={"text-sm text-gray-500 font-semibold"}>
          {description}
        </span>
        <h1 className={"mt-5 text-5xl font-bold"}>
          {isCurrency ? "$" : ""}
          {value}
        </h1>
      </div>
    </div>
  );
}

export default ReportTile;
