import React from "react";
import Spinner from "@/components/spinner";

function Loading() {
  return (
    <div className={"flex justify-center items-center mt-56"}>
      <Spinner />
    </div>
  );
}

export default Loading;
