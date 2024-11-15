import React from "react";
import PageTitle from "@/components/page-title";
import ShowForm from "@/app/admin/shows/_common/show-form";

function AddShow() {
  return (
    <div>
      <PageTitle title={"Add show"} />
      <div className="mt-7">
        <ShowForm />
      </div>
    </div>
  );
}

export default AddShow;
